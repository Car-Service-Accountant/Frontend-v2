import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const user = useSelector((store: RootState) => store.auth.value);
  if (!user.isLogedIn) {
    // redirect to login/register pages and make auth controlled that will controll access to the app
  }
  console.log(router);

  console.log(user);

  return <p>Just home</p>;
}
