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
  boxShadow: '0px 0px 5px 0px rgba(128, 128, 128, 0.20)',
}))

const elements = [
  <StyledBox className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox className={classes.taxesCars}>
    <Box>
      <Typography>Ток</Typography>
      <Typography>1 януари , 2023</Typography>
    </Box>
    <Box>
      <Typography>320лв</Typography>
    </Box>
  </StyledBox>,
  <StyledBox className={classes.taxesCars}>
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
