import { wrapper } from "@/redux/store";
import { GetServerSidePropsContext } from "next";

export default function AddCar() {
  return <p>AddCar</p>;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: GetServerSidePropsContext) => {

  return {
    props: {},
  };
});