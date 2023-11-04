import { Box, Typography, useTheme } from '@mui/material'
export interface ReportHeaderProps {
  countRepairs?: number
  totalCost?: number
  profit?: number
  pureProfit?: number
}

const ReportHeader = ({ countRepairs, totalCost, profit, pureProfit }: ReportHeaderProps) => {
  const theme = useTheme()
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.light,
          alignItems: 'center',
          display: 'flex',
          height: '48px',
          paddingLeft: '15px',
          overflowX: 'auto',
        }}
      >
        <Box sx={{ width: '150px' }}>
          <Typography fontWeight={600}>Брой ремонти</Typography>
        </Box>
        <Box sx={{ width: '150px' }}>
          <Typography fontWeight={600}>Разход</Typography>
        </Box>
        <Box sx={{ width: '150px' }}>
          <Typography fontWeight={600}>Приход</Typography>
        </Box>
        <Box sx={{ width: '150px' }}>
          <Typography fontWeight={600}>Чиста печалба</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '48px', paddingLeft: '15px', overflowX: 'auto' }}>
        <Box sx={{ width: '150px' }}>
          <Typography fontWeight={600}>{countRepairs || '0'}</Typography>
        </Box>
        <Box sx={{ width: '150px' }}>
          <Typography fontWeight={600}>{`${totalCost} лв` || '0 лв'}</Typography>
        </Box>
        <Box sx={{ width: '150px' }}>
          <Typography fontWeight={600}>{`${profit} лв` || '0 лв'}</Typography>
        </Box>
        <Box sx={{ width: '150px' }}>
          <Typography fontWeight={600}>{`${pureProfit} лв` || '0 лв'}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ReportHeader
