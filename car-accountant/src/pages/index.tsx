import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/router';
import { Box, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import theme from './theme';

export default function Home() {
  const router = useRouter();
  const user = useSelector((store: RootState) => store.auth.value);
  const messages = ['Message 1', 'Message 2', 'Message 3', 'Message 4'];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    innerWidth: "200px",
    slidesToScroll: 1,
  };

  return (
    <Grid container>
      <Grid item xs={8}>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ height: "100vh" }}
          style={{ marginTop: "90px", backgroundColor: "white" }}>
          <Typography color={theme.palette.primary.main}> Soo come and get this !</Typography>
          <Slider {...settings}>
            {messages.map((message, index) => (
              <div key={index}>
                <Typography variant="h6" color={theme.palette.primary.main}>{message}</Typography>
              </div>
            ))}
          </Slider>
        </Box>
      </Grid>
    </Grid>
  );
};
