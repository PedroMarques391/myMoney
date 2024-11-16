import { useState } from 'react';
import { AreaInput, IconButtons, Input, SubmitButton, SubmitText } from '../styles';
import { useAuth } from '../../../hooks/useAuth';
import Loading from '../../../components/Loading';
import { Alert } from 'react-native';
import { EyeClosed, LucideEye } from 'lucide-react-native';

const Signin = (): React.JSX.Element => {
    const [focusedInput, setFocusedInput] = useState<'email' | 'password' | 'name' | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const { createUser, loadingAuth } = useAuth()


    const handleSignin = async () => {

        if (!email || !password || !name) {
            console.log('Campos obrigatórios ausentes!');
            return Alert.alert('Erro', 'Todos os campos são obrigatórios!', [
                { text: 'OK' }
            ]);
        }
        await createUser(email.toLowerCase(), password, name);


    };


    return (
        <>
            <AreaInput>
                <Input
                    placeholder="Nome"
                    autoCorrect={false}
                    value={name}
                    onChangeText={(text: string) => setName(text)}
                    autoCapitalize="none"
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                    isFocused={focusedInput === 'name'}
                />
            </AreaInput>

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
                    textContentType='password'
                    secureTextEntry={!showPassword ? false : true}
                />
                <IconButtons
                    onPress={() => setShowPassword(prevState => !prevState)}>
                    {!showPassword
                        ? <LucideEye color={"black"} size={25} />
                        : <EyeClosed color={"black"} size={25} />}
                </IconButtons>
            </AreaInput>

            <SubmitButton onPress={handleSignin} disabled={loadingAuth}>
                {loadingAuth
                    ? <Loading isTransparent />
                    : <SubmitText>Criar Conta</SubmitText>}
            </SubmitButton>
        </>
    );
};



export default Signin;

