import { Box, Typography, useTheme } from '@mui/material'
export interface ReportHeaderProps {
  countRepairs?: number
  totalCost?: number
  revenue?: number
  pureProfit?: number
}

const ReportHeader = ({ countRepairs, totalCost, revenue, pureProfit }: ReportHeaderProps) => {
  const theme = useTheme()

  // TODO make condition to check if data is loaded else set 0 , we recive undentified which is truety value , soo we need to care for it
  return (
    <Box sx={{ boxShadow: '0px 0px 5px 0px rgba(128, 128, 128, 0.20)', mb: 3 }}>
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
        <Box sx={{ minWidth: '150px' }}>
          <Typography fontWeight={600}>Брой ремонти</Typography>
        </Box>
        <Box sx={{ minWidth: '150px' }}>
          <Typography fontWeight={600}>Разход</Typography>
        </Box>
        <Box sx={{ minWidth: '150px' }}>
          <Typography fontWeight={600}>Приход</Typography>
        </Box>
        <Box sx={{ minWidth: '150px' }}>
          <Typography fontWeight={600}>Чиста печалба</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '48px', paddingLeft: '15px', overflowX: 'auto' }}>
        <Box sx={{ minWidth: '150px' }}>
          <Typography fontWeight={600}>{countRepairs || '0'}</Typography>
        </Box>
        <Box sx={{ minWidth: '150px' }}>
          <Typography fontWeight={600}>{`${totalCost} лв` || '0 лв'}</Typography>
        </Box>
        <Box sx={{ minWidth: '150px' }}>
          <Typography fontWeight={600}>{`${revenue} лв` || '0 лв'}</Typography>
        </Box>
        <Box sx={{ minWidth: '150px' }}>
          <Typography fontWeight={600}>{`${pureProfit} лв` || '0 лв'}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ReportHeader
