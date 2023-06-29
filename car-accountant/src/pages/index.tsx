import PrimaryButton from "@/components/PrimaryButton";
import { RootState, wrapper } from "@/redux/store";
import { Box } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { useSelector } from "react-redux";

const Home = () => {

  const user = useSelector((state: RootState) => state)

  console.log("user after header ==> ", user);

  return (
    <Box sx={{ marginTop: "300px" }}>
      <PrimaryButton text="login" link="/login" />
    </Box>

  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: GetServerSidePropsContext) => {

  return {
    props: {},
  };
});