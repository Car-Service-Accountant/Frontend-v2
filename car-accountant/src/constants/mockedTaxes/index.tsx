import { Box, Typography, styled } from '@mui/material'

const PREFIX = 'taxes'

const classes = {
  taxesCars: `${PREFIX}-taxesCars`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: '8px',
  backgroundColor: theme.palette.background.default,
  marginTop: '10px',
  height: '10%',
  padding: '20px',
}))

const elements = [
  <StyledBox key={'key-1'} className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox key={'key-2'} className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox key={'key-3'} className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox key={'key-4'} className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox key={'key-5'} className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox key={'key-6'} className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox key={'key-7'} className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox key={'key-8'} className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox key={'key-9'} className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
]

export default elements
