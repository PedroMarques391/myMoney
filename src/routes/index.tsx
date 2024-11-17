import Loading from '../components/Loading';
import {useAuth} from '../hooks/useAuth';
import Auth from '../pages/Auth';
import AppRouter from './app.router';

const Routes = (): React.JSX.Element => {
  const {signed, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }
  return signed ? <AppRouter /> : <Auth />;
};

export default Routes;
