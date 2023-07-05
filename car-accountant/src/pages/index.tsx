import PrimaryButton from "@/components/PrimaryButton";
import { authSlice } from "@/redux/auth/reducer";
import { asyncFetchAllRepairs } from "@/redux/repairs/reducer";
import { repairState, repairsTypes } from "@/redux/repairs/types";
import { RootState, wrapper } from "@/redux/store";
import { Box, Grid, Typography, colors, styled, useTheme } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import finishedToday from "../utils/repairs/finishedToday";
import finishedDayBefore from "../utils/repairs/finishedDayBefore";
import finishedThisMonth from "../utils/repairs/finishedThisMonth";
import finishedMonthBefore from "../utils/repairs/finishedMonthBefore";
import finishedThisWeek from "../utils/repairs/finishedThisWeek";
import finishedLastWeek from "../utils/repairs/finishedWeekBefore";
import sortByDateAndCalculateProfit from "../utils/repairs/sortByDateAndCalculateProfit";
import dataCalulatorForLiveData from "../utils/repairs/finishedRepairsForLiveData"


const Home = (props: any) => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const theme = useTheme()
  const isLoadedRepais = useSelector((state: RootState) => state.repairs.isDoneLoading)
  const repairs = useSelector((state: RootState) => state.repairs.repairs)

  console.log(repairs);


  useEffect(() => {
    if (props.user && !isLoadedRepais) {
      dispatch(asyncFetchAllRepairs(props?.user?.companyId || ""));
    }
  }, [props.user]);

  // style
  const PREFIX = "home"

  const classes = {
    boxWrapper: `${PREFIX}-boxWrapper`,
    secondRow: `${PREFIX}-secondRow`,
    thirdRow: `${PREFIX}-thirdRow`,
    imageWrapper: `${PREFIX}-imageWrapper`,
  }

  const StyledGrid = styled(Grid)(({ theme }) => ({
    paddingLeft: "16px",
    width: "100%",
    height: "100%",
    paddingRight: "16px",
    paddingTop: "46px",
    paddingBottom: "30px",

    [`& .${classes.boxWrapper}`]: {
      borderRadius: "8px",
      backgroundColor: theme.palette.background.paper,
      height: "100%",
      boxShadow: "0px 0px 5px 0px rgba(128, 128, 128, 0.20)"
    },
    [`& .${classes.secondRow}`]: {
      border: "1px solid",
      borderRadius: "8px",
      padding: "10px",
    },
    [`& .${classes.thirdRow}`]: {
      border: "1px solid",
      borderRadius: "8px",
      padding: "10px",
    },
    [`& .${classes.imageWrapper}`]: {
      paddingTop: "20px",
      paddingLeft: "20px",
      borderRadius: "50%"
    },
  }))
  //style

  //wrokstation
  //Today's profit
  let paiedTodayData: any = {};
  if (repairs?.length || 0 > 0) {
    paiedTodayData = finishedToday(repairs);
  }
  //Profit for prevous day
  let paiedYestardayData: any = {};
  if (repairs?.length || 0 > 0) {
    paiedYestardayData = finishedDayBefore(repairs);
  }

  const proggressBarForToday =
    paiedTodayData.totalProfitToday - paiedYestardayData.totalYestardayProfit;
  //Profit for this month
  let paiedThisMonthData: any = {};
  if (repairs?.length || 0 > 0) {
    paiedThisMonthData = finishedThisMonth(repairs);
  }

  //Profit for  month before
  let paiedMonthBeofreData: any = {};
  if (repairs?.length || 0 > 0) {
    paiedMonthBeofreData = finishedMonthBefore(repairs);
  }

  const proggressBarForThisMonth =
    paiedThisMonthData.totalProfitForThisMonth -
    paiedMonthBeofreData.totalProfitForMotnthBefore;

  //this Week profit
  let paiedThisWeekData: any = {};
  if (repairs?.length || 0 > 0) {
    paiedThisWeekData = finishedThisWeek(repairs);
  }

  //Week before
  let paiedWeekBeofreData: any = {};
  if (repairs?.length || 0 > 0) {
    paiedWeekBeofreData = finishedLastWeek(repairs);
  }

  const proggressBarForThisWeek =
    paiedThisWeekData.totalProfitForThisWeek -
    paiedWeekBeofreData.totalProfitForMotnthBefore;

  let carProggressThisMonth = 0;
  if (
    paiedThisMonthData.repairsThisMonth &&
    paiedMonthBeofreData.repairsInMonthBefore
  ) {
    carProggressThisMonth =
      (paiedThisMonthData?.repairsThisMonth -
        paiedMonthBeofreData?.repairsInMonthBefore) *
      100;
  }

  let sortedRepairs: any = [];
  if (repairs?.length || 0 > 0) {
    sortedRepairs = sortByDateAndCalculateProfit(repairs);
  }

  const dataForLiveData = dataCalulatorForLiveData(repairs)

  //workstation

  return (
    <StyledGrid container style={{ minHeight: "93vh" }}>
      <Grid item xs={12} container >
        <Grid item xs={4} sx={{ padding: "15px" }}>
          <Box className={classes.boxWrapper}>
            <Box>
              <Image
                src='/../public/pics/tempUser.png'
                className={classes.imageWrapper}
                alt="Missing image"
                width={60}
                height={60}
              />
            </Box>
            <Typography variant="h3" color={theme.palette.text.primary} fontWeight={theme.typography.fontWeightBold} fontSize="16px" sx={{ paddingLeft: "20px", paddingTop: "20px" }}>
              Дневен доход
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary} fontWeight={theme.typography.fontWeightBold} fontSize="32px" sx={{ paddingLeft: "20px", paddingTop: "20px" }}>
              280 лв.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ padding: "15px" }}>
          <Box className={classes.boxWrapper}>
            <Image
              src='/../public/pics/tempUser.png'
              className={classes.imageWrapper}
              alt="Missing image"
              width={60}
              height={60}
            />
            <Typography variant="h3" color={theme.palette.text.primary} fontWeight={theme.typography.fontWeightBold} fontSize="16px" sx={{ paddingLeft: "20px", paddingTop: "20px" }}>
              Седмичен доход
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary} fontWeight={theme.typography.fontWeightBold} fontSize="32px" sx={{ paddingLeft: "20px", paddingTop: "20px" }}>
              280 лв.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ padding: "15px" }}>
          <Box className={classes.boxWrapper}>
            <Image
              src='/../public/pics/tempUser.png'
              className={classes.imageWrapper}
              alt="Missing image"
              width={60}
              height={60}
            />
            <Typography variant="h3" color={theme.palette.text.primary} fontWeight={theme.typography.fontWeightBold} fontSize="16px" sx={{ paddingLeft: "20px", paddingTop: "20px" }}>
              Месечен доход
            </Typography>
            <Typography variant="h6" color={theme.palette.text.primary} fontWeight={theme.typography.fontWeightBold} fontSize="32px" sx={{ paddingLeft: "20px", paddingTop: "20px" }}>
              280 лв.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} >
        <Grid item xs={8} sx={{ padding: "15px" }}>
          <Box className={classes.boxWrapper} style={{ zIndex: '-2', paddingTop: "10px" }}>
            <LineChart width={1030} height={350} data={dataForLiveData?.combinedData}
              margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line name="Разходи за части" type="monotone" dataKey="totalPartCosts" stroke="#173475" />
              <Line name="Печалба от части" type="monotone" dataKey="totalProfitFromParts" stroke="#8DC8FC" />
              <Line name="Печалба за труд" type="monotone" dataKey="totalPriceForLabor" stroke="#C500FF" />
            </LineChart>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.thirdRow}>

      </Grid>
    </StyledGrid >
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: GetServerSidePropsContext) => {

  return {
    props: {},
  };
});