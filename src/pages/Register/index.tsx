import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Layout from '../../components/Layout'
import { Container, Input, PickerView, Submit, SubmitText } from './styles'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../hooks/useAuth';
import { child, get, push, ref, set } from 'firebase/database';
import { db } from '../../database/firebase.config';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';



const Register = (): React.JSX.Element => {
    const [value, setValue] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [type, setType] = useState<"receita" | "despesa">("receita")
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false)
    const { user } = useAuth()

    const navigation: any = useNavigation()

    function handleRegister() {
        Keyboard.dismiss()
        if (!title || !value || isNaN(parseFloat(value))) {
            Alert.alert("Ops!!", "Todos os campos devem ser preenchidos corretamente.");
            return;
        }
        setLoadingRegister(true)
        Alert.alert(
            "Confirmando Dados",
            `Nome: ${title}\nTipo: ${type}\nValor: R$ ${value}`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                    onPress: () => setLoadingRegister(false)
                },
                {
                    text: "Confirmar",
                    onPress: handleAdd,
                    style: "default",
                },
            ],
            { cancelable: false }
        );
    }

    async function handleAdd() {
        setLoadingRegister(true)
        const uid = user?.uid
        const dataRef = ref(db, `historic/${uid}`)
        const node = await push(dataRef)
        await set(node, {
            title: title,
            type: type,
            value: parseFloat(value),
            date: dayjs().format('DD/MM/YYYY')
        })

        const userRef = ref(db, `users/${uid}`)

        await get(userRef).then(async (snapshot) => {
            let balance = parseFloat(snapshot.val().balance)
            type === "despesa"
                ? balance -= parseFloat(value)
                : balance += parseFloat(value)
            const childRef = child(userRef, "balance")

            await set(childRef, balance)
        })

        setValue("")
        setTitle("")
        Keyboard.dismiss()
        setLoadingRegister(false)
        navigation.navigate('Home');

    }

    return (
        <Layout>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Container>
                    <Input
                        placeholder='Valor desejado'
                        keyboardType='numeric'
                        returnKeyType='next'
                        enterKeyHint='done'
                        onSubmitEditing={() => Keyboard.dismiss()}
                        onChangeText={(number: string) => setValue(number)}
                        value={value}
                    />
                    <Input
                        placeholder='Titulo'
                        keyboardType='default'
                        returnKeyType='next'
                        enterKeyHint='done'
                        onSubmitEditing={() => Keyboard.dismiss()}
                        onChangeText={(text: string) => setTitle(text)}
                        value={title}
                    />

                    <PickerView>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue) => setType(itemValue)}
                        >
                            <Picker.Item key={0} label="Despesa" value="despesa" />
                            <Picker.Item key={1} label="Receita" value="receita" />
                        </Picker>
                    </PickerView>
                    <Submit onPress={handleRegister}>
                        {loadingRegister ? <Loading isTransparent color='#fff' /> : <SubmitText>Registrar</SubmitText>}
                    </Submit>
                </Container>
            </TouchableWithoutFeedback>
        </Layout>
    )
}



export default Register