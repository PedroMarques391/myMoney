import { useState } from 'react';
import Login from './screens/Login';
import Signin from './screens/Signin';
import { Background, Container, Link, LinkText, Logo } from './styles';
import { Platform, TextInput } from 'react-native';


const Auth = (): React.JSX.Element => {
    const [screen, setScreen] = useState<'login' | 'signin'>('login');

    const textChangeScreen: string = screen === 'login'
        ? 'Não tem uma conta?'
        : 'Já tem uma conta?';

    function handleScreen() {
        setScreen((prevScreen) => prevScreen === 'login' ? 'signin' : 'login');
    }

    return (
        <Background>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <Logo source={require('../../../assets/MyMoney.png')} />
                {screen === 'login' ? <Login /> : <Signin />}
                <Link onPress={handleScreen}>
                    <LinkText>{textChangeScreen}</LinkText>
                </Link>

            </Container>
        </Background>
    );
};



export default Auth;
