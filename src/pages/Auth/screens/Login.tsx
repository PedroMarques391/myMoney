import { useState } from 'react';
import { AreaInput, IconButtons, Input, SubmitButton, SubmitText } from '../styles';
import { useAuth } from '../../../hooks/useAuth';
import Loading from '../../../components/Loading';
import { Alert, TouchableOpacity } from 'react-native';
import { EyeClosed, LucideEye } from 'lucide-react-native';

const Login = (): React.JSX.Element => {
    const [focusedInput, setFocusedInput] = useState<'email' | 'password' | null>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const { login, loadingAuth } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            return Alert.alert('Erro', 'Todos os campos são obrigatórios!', [
                { text: 'OK' }
            ]);
        }
        await login(email.toLowerCase(), password);
    };


    return (
        <>
            <AreaInput>
                <Input
                    placeholder="Email"
                    autoCorrect={false}
                    value={email}
                    onChangeText={(text: string) => setEmail(text)}
                    autoCapitalize="none"
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    isFocused={focusedInput === 'email'}
                />
            </AreaInput>

            <AreaInput>
                <Input
                    placeholder="Senha"
                    autoCorrect={false}
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                    autoCapitalize="none"
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    isFocused={focusedInput === 'password'}
                    secureTextEntry={!showPassword ? false : true}
                />
                <IconButtons
                    onPress={() => setShowPassword(prevState => !prevState)}>
                    {!showPassword
                        ? <LucideEye color={"black"} size={25} />
                        : <EyeClosed color={"black"} size={25} />}
                </IconButtons>

            </AreaInput>

            <SubmitButton onPress={handleLogin} disabled={loadingAuth}>
                {loadingAuth
                    ? <Loading isTransparent />
                    : <SubmitText>Acessar</SubmitText>}
            </SubmitButton>
        </>
    );
};

export default Login;
