import { useEffect, useRef, useState } from 'react';
import Login from './screens/Login';
import Signin from './screens/Signin';
import { Background, Container, Link, LinkText, Logo } from './styles';
import { Animated, Platform, Text, TextInput, View } from 'react-native';
import WelcomeScreen from '../../components/WelcomeScreen';


const Auth = (): React.JSX.Element => {
    const [screen, setScreen] = useState<'login' | 'signin'>('login')
    const [showWelcome, setShowWelcome] = useState<boolean>(true);

    const textChangeScreen: string = screen === 'login'
        ? 'Não tem uma conta?'
        : 'Já tem uma conta?';

    function handleScreen() {
        setScreen((prevScreen) => prevScreen === 'login' ? 'signin' : 'login');
    }


    return (
        <Background>
            {showWelcome ? (
                <WelcomeScreen setShowWelcome={setShowWelcome} />
            ) : (
                <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Logo source={require('../../../assets/MyMoney.png')} />
                    {screen === 'login' ? <Login /> : <Signin />}
                    <Link onPress={handleScreen}>
                        <LinkText>{textChangeScreen}</LinkText>
                    </Link>
                </Container>
            )}
        </Background>
    );
};



export default Auth;
