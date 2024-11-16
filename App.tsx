import 'react-native-gesture-handler'
import {
  StatusBar,
} from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/authContext';
import 'react-native-gesture-handler';
import HistoricProvider from './src/contexts/historicContext';


function App(): React.JSX.Element {


  return (
    <NavigationContainer>
      <AuthProvider>
        <HistoricProvider>
          <StatusBar barStyle={'light-content'}
            backgroundColor={'#131313'} />
          <Routes />
        </HistoricProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
