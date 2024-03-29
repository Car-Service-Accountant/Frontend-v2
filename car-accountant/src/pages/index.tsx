import { Box, Divider, Grid, Typography, styled, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import finishedToday from '../utils/repairs/finishedToday'
import finishedDayBefore from '../utils/repairs/finishedDayBefore'
import finishedThisMonth from '../utils/repairs/finishedThisMonth'
import finishedMonthBefore from '../utils/repairs/finishedMonthBefore'
import finishedThisWeek from '../utils/repairs/finishedThisWeek'
import finishedLastWeek from '../utils/repairs/finishedWeekBefore'
import finishedYearBefore from '../utils/repairs/finishedLastYear'
import finishedThisYear from '../utils/repairs/finishedThisYear'
import dataCalulatorForLiveData, { formatDate } from '../utils/repairs/finishedRepairsForLiveData'
import Circle from '@/components/progressCircle'
import ProgressiveNumber from '@/components/progressiveNumbers'
import BoxSpawner from '@/components/boxSpowner'
import { asyncFetchAllRepairs } from '@/features/redux/repairs/reducer'
import { asyncFetchAllCars } from '@/features/redux/cars/reducer'
import { RootState } from '@/features/redux/store'
import elements from '@/constants/mockedTaxes'
import { asyncFetchAllEmployers } from '@/features/redux/employers/reducer'

const Home = () => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const theme = useTheme()
  const cars = useSelector((state: RootState) => state.cars)
  const user = useSelector((state: RootState) => state.auth.user)
  const repairs = useSelector((state: RootState) => state.repairs)
  const [paiedTodayData, setPaiedTodayData] = useState<any>({})
  const [paiedYestardayData, setPaiedYestardayData] = useState<any>({})
  const [todaysProfit, setTodaysProfit] = useState<number>(0)
  const [percentBarForToday, setPercentBarForToday] = useState<number>(0)
  const [paiedThisWeekData, setPaiedThisWeekData] = useState<any>({})
  const [paiedWeekBeofreData, setPaiedWeekBeofreData] = useState<any>({})
  const [weeklyProfit, setWeeklyProfit] = useState<number>(0)
  const [percentBarForWeek, setPercentBarForWeek] = useState<number>(0)
  const [paiedThisMonthData, setPaiedThisMonthData] = useState<any>({})
  const [paiedMonthBeofreData, setPaiedMonthBeofreData] = useState<any>({})
  const [monthlyProfit, setMonthlyProfit] = useState<number>(0)
  const [percentBarForMonth, setPercentBarForMonth] = useState<number>(0)

  const [paiedThisYearData, setPaiedThisYearData] = useState<any>({})
  const [paiedYearBeofreData, setPaiedYearBeofreData] = useState<any>({})
  const [YearProfit, setYearProfit] = useState<number>(0)
  const [percentBarForYear, setPercentBarForYear] = useState<number>(0)
  const [unpaiedRepairs, setUpaiedRepairs] = useState<{ car: any; repair: any; totalCost: number }[]>([])
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // style
  const PREFIX = 'home'

  const classes = {
    boxWrapper: `${PREFIX}-boxWrapper`,
    secondRow: `${PREFIX}-secondRow`,
    thirdRow: `${PREFIX}-thirdRow`,
    imageWrapper: `${PREFIX}-imageWrapper`,
    taxesCars: `${PREFIX}-taxesCars`,
    awaitingWrapper: `${PREFIX}-awaitingWrapper`,
  }

  const StyledGrid = styled(Grid)(({ theme }) => ({
    [`& .${classes.boxWrapper}`]: {
      borderRadius: '8px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: '0px 0px 5px 0px rgba(128, 128, 128, 0.20)',
    },
    [`& .${classes.taxesCars}`]: {
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: '8px',
      backgroundColor: theme.palette.background.default,
      marginTop: '10px',
      height: '10%',
      boxShadow: '0px 0px 5px 0px rgba(128, 128, 128, 0.20)',
    },
    [`& .${classes.secondRow}`]: {
      border: '1px solid',
      borderRadius: '8px',
      padding: '10px',
    },
    [`& .${classes.thirdRow}`]: {
      border: '1px solid',
      borderRadius: '8px',
      padding: '10px',
    },
    [`& .${classes.imageWrapper}`]: {
      paddingTop: '20px',
      paddingLeft: '20px',
      borderRadius: '50%',
    },
    [`& .${classes.awaitingWrapper}`]: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: '26px',
      paddingBottom: '13px',
      paddingTop: '13px',
      paddingRight: '10%',
    },
    [`& .${classes.awaitingWrapper}:hover`]: {
      backgroundColor: '#EAF5FF',
    },
  }))

  useEffect(() => {
    if (user?.companyId) {
      dispatch(asyncFetchAllRepairs(user?.companyId))
    }
    if (user?.companyId) {
      dispatch(asyncFetchAllCars(user?.companyId))
    }
    if (user?.companyId) {
      dispatch(asyncFetchAllEmployers(user?.companyId))
    }
  }, [user])

  useEffect(() => {
    if (cars) {
      const allRepairs: { car: any; repair: any; totalCost: number }[] = []
      const unfinishedCars = cars?.cars?.filter((car) => car.repairs.some((repair) => !repair.finished))
      unfinishedCars?.forEach((car) => {
        car.repairs.forEach((repair) => {
          if (!repair.paied) {
            let priceForLabor = 0
            let priceForParts = 0
            priceForLabor += repair.priceForLabor
            repair.parts.forEach((part) => {
              priceForParts += part.servicePrice
            })
            allRepairs.push({
              car,
              repair,
              totalCost: priceForLabor + priceForParts,
            })
          }
        })
      })
      setUpaiedRepairs(allRepairs)
    }
  }, [cars])

  // Today's profit
  useEffect(() => {
    if (repairs?.repairs?.length || 0 > 0) {
      setPaiedTodayData(finishedToday(repairs.repairs))
    }
    if (repairs?.repairs?.length || 0 > 0) {
      setPaiedYestardayData(finishedDayBefore(repairs.repairs))
    }
    if (repairs?.repairs?.length || 0 > 0) {
      setPaiedThisWeekData(finishedThisWeek(repairs.repairs))
    }
    if (repairs?.repairs?.length || 0 > 0) {
      setPaiedWeekBeofreData(finishedLastWeek(repairs.repairs))
    }
    if (repairs?.repairs?.length || 0 > 0) {
      setPaiedThisMonthData(finishedThisMonth(repairs.repairs))
    }
    if (repairs?.repairs?.length || 0 > 0) {
      setPaiedMonthBeofreData(finishedMonthBefore(repairs.repairs))
    }
    if (repairs?.repairs?.length || 0 > 0) {
      setPaiedThisYearData(finishedThisYear(repairs.repairs))
    }
    if (repairs?.repairs?.length || 0 > 0) {
      setPaiedYearBeofreData(finishedYearBefore(repairs.repairs))
    }
  }, [repairs.repairs])

  useEffect(() => {
    if (paiedTodayData) {
      setTodaysProfit(paiedTodayData.totalProfitToday)
    }
    if (paiedTodayData.totalProfitToday !== 0 && paiedYestardayData.totalYestardayProfit !== 0) {
      const result = paiedTodayData?.totalProfitToday / paiedYestardayData?.totalYestardayProfit
      if (result) {
        setPercentBarForToday(result > 0 && result !== Infinity ? result : 1)
      }
    }
    if (paiedThisWeekData) {
      setWeeklyProfit(paiedThisWeekData.totalProfitForThisWeek)
    }
    if (paiedThisWeekData && paiedWeekBeofreData) {
      const result = paiedThisWeekData?.totalProfitForThisWeek / paiedWeekBeofreData?.totalProfitForWeekBefore
      if (result) {
        setPercentBarForWeek(result > 0 && result !== Infinity ? result : 1)
      }
    }
    if (paiedThisMonthData) {
      setMonthlyProfit(paiedThisMonthData.totalProfitForThisMonth)
    }
    if (paiedThisMonthData && paiedMonthBeofreData) {
      const result = paiedThisMonthData?.totalProfitForThisMonth / paiedMonthBeofreData?.totalProfitForMotnthBefore
      if (result) {
        setPercentBarForMonth(result > 0 && result !== Infinity ? result : 1)
      }
    }
    if (paiedThisYearData) {
      setYearProfit(paiedThisYearData.totalProfitForThisYear)
    }
    if (paiedThisYearData && paiedYearBeofreData) {
      const result = paiedThisYearData?.totalProfitForThisYear / paiedYearBeofreData?.totalProfitForYearBefore
      if (result) {
        setPercentBarForYear(result > 0 && result !== Infinity ? result : 1)
      }
    }
  }, [paiedTodayData])

  const awaitingPaiments = () => {
    const tempResults: React.ReactNode[] = []
    if (unpaiedRepairs.length > 0) {
      for (let index = 0; index < 3; index++) {
        const unpaiedRepair = unpaiedRepairs?.[index]
        if (unpaiedRepair) {
          const owner = unpaiedRepair?.car?.owner
          const carNumber = unpaiedRepair?.car?.carNumber
          const endDate = new Date(unpaiedRepair?.repair?.endDate)
          const day = endDate.toISOString().substring(0, 10)

          tempResults.push(
            <>
              <Box className={classes.awaitingWrapper}>
                <Typography fontSize={16} sx={{ minWidth: 200 }} fontWeight={theme.typography.fontWeightBold}>
                  {owner}
                </Typography>
                <Typography fontSize={16} sx={{ minWidth: 200 }} fontWeight={theme.typography.fontWeightBold}>
                  {carNumber}
                </Typography>
                <Typography fontSize={16} sx={{ minWidth: 200 }} fontWeight={theme.typography.fontWeightBold}>
                  {formatDate(day)}
                </Typography>
              </Box>
              <Divider />
            </>,
          )
        }
      }
    }
    return tempResults
  }

  const awaitingPaimentsElements: React.ReactNode[] = awaitingPaiments()

  // let carProggressThisMonth = 0
  // if (paiedThisMonthData.repairsThisMonth && paiedMonthBeofreData.repairsInMonthBefore) {
  //   carProggressThisMonth = (paiedThisMonthData?.repairsThisMonth - paiedMonthBeofreData?.repairsInMonthBefore) * 100
  // }

  // let sortedRepairs: any = []
  // if (repairs?.length || 0 > 0) {
  //   sortedRepairs = sortByDateAndCalculateProfit(repairs)
  // }

  const liveData = dataCalulatorForLiveData(repairs.repairs)

  // workstation

  return (
    <StyledGrid container>
      <Grid item xs={12} container>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          sx={{
            paddingTop: { lg: '15px', md: '30px', xs: '30px', sm: '30px' },
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
        >
          <Box
            sx={{ padding: '30px', display: 'flex', flexDirection: { xl: 'row', lg: 'column' } }}
            className={classes.boxWrapper}
          >
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box style={{ paddingTop: '0px', paddingRight: '30px' }}>
                {repairs.repairs && <Circle progress={percentBarForToday} />}
              </Box>
            </Box>
            <Box>
              <Typography
                variant='h3'
                color={theme.palette.text.primary}
                fontWeight={theme.typography.fontWeightBold}
                fontSize='16px'
                sx={{ paddingLeft: '0px', paddingTop: '20px' }}
              >
                Дневен доход
              </Typography>

              <Typography
                variant='h6'
                color={todaysProfit > 0 ? '#50BC1D' : theme.palette.text.primary}
                fontWeight={theme.typography.fontWeightBold}
                fontSize='18px'
                sx={{ paddingLeft: '0px', paddingTop: '0px' }}
              >
                {todaysProfit ? <ProgressiveNumber number={todaysProfit} /> : '0'} лв.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          sx={{
            paddingTop: { lg: '15px', md: '30px', xs: '30px', sm: '30px' },
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
        >
          <Box
            sx={{ padding: '30px', display: 'flex', flexDirection: { xl: 'row', lg: 'column' } }}
            className={classes.boxWrapper}
          >
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box style={{ paddingTop: '0px', paddingRight: '30px' }}>
                {repairs.repairs && <Circle progress={percentBarForWeek} />}
              </Box>
            </Box>
            <Box>
              <Typography
                variant='h3'
                color={theme.palette.text.primary}
                fontWeight={theme.typography.fontWeightBold}
                fontSize='16px'
                sx={{ paddingLeft: '0px', paddingTop: '20px' }}
              >
                Седмичен доход
              </Typography>
              <Typography
                variant='h6'
                color={weeklyProfit > 0 ? '#50BC1D' : theme.palette.text.primary}
                fontWeight={theme.typography.fontWeightBold}
                fontSize='18px'
                sx={{ paddingLeft: '0px', paddingTop: '0px' }}
              >
                {weeklyProfit ? <ProgressiveNumber number={weeklyProfit} /> : '0'} лв.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          sx={{
            paddingTop: { lg: '15px', md: '30px', xs: '30px', sm: '30px' },
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
        >
          <Box
            sx={{ padding: '30px', display: 'flex', flexDirection: { xl: 'row', lg: 'column' } }}
            className={classes.boxWrapper}
          >
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box style={{ paddingTop: '0px', paddingRight: '30px' }}>
                {repairs.repairs && <Circle progress={percentBarForMonth} />}
              </Box>
            </Box>
            <Box>
              <Typography
                variant='h3'
                color={theme.palette.text.primary}
                fontWeight={theme.typography.fontWeightBold}
                fontSize='16px'
                sx={{ paddingLeft: '0px', paddingTop: '20px' }}
              >
                Месечен доход
              </Typography>
              <Typography
                variant='h6'
                color={monthlyProfit > 0 ? '#50BC1D' : theme.palette.text.primary}
                fontWeight={theme.typography.fontWeightBold}
                fontSize='18px'
                sx={{ paddingLeft: '0px', paddingTop: '0px' }}
              >
                {monthlyProfit ? <ProgressiveNumber number={monthlyProfit} /> : '0'} лв.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={3}
          sx={{
            paddingTop: { lg: '15px', md: '30px', xs: '30px', sm: '30px' },
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
        >
          <Box
            sx={{ padding: '30px', display: 'flex', flexDirection: { xl: 'row', lg: 'column' } }}
            className={classes.boxWrapper}
          >
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box style={{ paddingTop: '0px', paddingRight: '30px' }}>
                {repairs.repairs && <Circle progress={percentBarForYear} />}
              </Box>
            </Box>
            <Box>
              <Typography
                variant='h3'
                color={theme.palette.text.primary}
                fontWeight={theme.typography.fontWeightBold}
                fontSize='16px'
                sx={{ paddingLeft: '0px', paddingTop: '20px' }}
              >
                Годишен доход
              </Typography>
              <Typography
                variant='h6'
                color={YearProfit > 0 ? '#50BC1D' : theme.palette.text.primary}
                fontWeight={theme.typography.fontWeightBold}
                fontSize='18px'
                sx={{ paddingLeft: '0px', paddingTop: '0px' }}
              >
                {YearProfit ? <ProgressiveNumber number={YearProfit} /> : '0'} лв.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid xs={12} container style={{ marginTop: '30px' }}>
        <Grid item xs={12} sm={12} md={12} lg={9} sx={{ paddingLeft: '15px', paddingRight: '15px' }}>
          <Box
            className={classes.boxWrapper}
            style={{
              display: 'flex',
              justifyContent: 'center',
              zIndex: '-2',
              paddingTop: '25px',
              paddingBottom: '25px',
            }}
          >
            <ResponsiveContainer width='95%' height='100%' minHeight='245px'>
              <LineChart data={liveData?.combinedData} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line name='Разходи за части' type='monotone' dataKey='totalPartCosts' stroke='#173475' />
                <Line name='Печалба от части' type='monotone' dataKey='totalProfitFromParts' stroke='#8DC8FC' />
                <Line name='Печалба за труд' type='monotone' dataKey='totalPriceForLabor' stroke='#C500FF' />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          {/* {awaitingPaimentsElements.length > 0 && ( */}
          {awaitingPaimentsElements.length > 0 && (
            <Box className={classes.boxWrapper} style={{ zIndex: '-2', marginTop: '30px' }}>
              <Typography fontSize='22px' fontWeight={theme.typography.fontWeightBold} style={{ padding: '26px' }}>
                Чакащи плащания
              </Typography>
              <Box overflow='auto'>
                <Box
                  width={isMobile ? 'fit-content' : 'auto'}
                  style={{
                    backgroundColor: theme.palette.primary.light,
                    padding: '14px',
                    paddingRight: '10%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ minWidth: '200px' }}>
                    <Typography fontSize={16} fontWeight={theme.typography.fontWeightBold} sx={{ marginLeft: '15px' }}>
                      Име на клиент
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: '200px' }}>
                    <Typography fontSize={16} fontWeight={theme.typography.fontWeightBold}>
                      Номер на колата
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: '200px' }}>
                    <Typography fontSize={16} fontWeight={theme.typography.fontWeightBold}>
                      Дата на изпълнение
                    </Typography>
                  </Box>
                </Box>
                <BoxSpawner boxes={awaitingPaimentsElements} />
              </Box>
            </Box>
          )}
          {/* )} */}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={3}
          sx={{
            paddingTop: { lg: '0px', md: '30px', xs: '30px', sm: '30px' },
            paddingLeft: '15px',
            paddingRight: '15px',
          }}
        >
          <Box className={classes.boxWrapper} style={{ padding: '26px' }}>
            <Box style={{ paddingBottom: '20px', paddingTop: '20px' }}>
              <Typography fontWeight={600} fontSize={'22px'}>
                Скорощни разходи
              </Typography>
            </Box>
            <BoxSpawner boxes={elements} />
          </Box>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}

export default Home
