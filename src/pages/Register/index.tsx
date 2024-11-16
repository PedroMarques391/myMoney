import { Alert, Button, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import Layout from '../../components/Layout'
import { Container, Header, HeaderContent, HeaderLabel, HeaderText, HeaderValueSection, HeaderValueText, HeaderValueView, Input, PickerView, Submit, SubmitText } from './styles'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import { child, get, push, ref, set } from 'firebase/database';
import { db } from '../../database/firebase.config';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';
import Picker from '../../components/Picker';
import { ButtonClosePicker, PickerContainerIOS } from '../Home/styles';
import { Wallet, X } from 'lucide-react-native';
import { formated } from '../../utils/formated';
import { useHistoric } from '../../hooks/useHistoric';



const Register = (): React.JSX.Element => {
    const [value, setValue] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [type, setType] = useState<"receita" | "despesa">("receita")
    const [loadingRegister, setLoadingRegister] = useState<boolean>(false)
    const [showPicker, setShowPicker] = useState<boolean>(false)
    const { user } = useAuth()
    const { formatedBalance, totalRegisters } = useHistoric()

    const name = user?.name.split(" ")[0]

    const pickerItens = [
        { key: 1, label: "Despesa", value: "despesa" },
        { key: 2, label: "Receita", value: "receita" },
    ]

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

                    <Header>
                        <HeaderContent>
                            <HeaderText>{name}, você já tem {totalRegisters} registro(s). Deseja registrar mais um item?</HeaderText>
                            <HeaderValueView>
                                <HeaderLabel>Valor em Carteira</HeaderLabel>
                                <HeaderValueSection>
                                    <Wallet size={25} color="#005073" />
                                    <HeaderValueText>R$ {formatedBalance}</HeaderValueText>
                                </HeaderValueSection>
                            </HeaderValueView>
                        </HeaderContent>
                    </Header>

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
                        {Platform.OS === 'android' ? (
                            <Picker
                                option={type}
                                itemObject={pickerItens}
                                onChange={(type) => setType(type)}
                            />
                        ) : <Button title={type} onPress={() => setShowPicker(prevState => !prevState)} />}
                    </PickerView>
                    <Submit onPress={handleRegister}>
                        {loadingRegister ? <Loading isTransparent color='#fff' /> : <SubmitText>Registrar</SubmitText>}
                    </Submit>

                </Container>
            </TouchableWithoutFeedback>

            {
                showPicker && (
                    <PickerContainerIOS>
                        <ButtonClosePicker
                            onPress={() => setShowPicker(false)}
                        >
                            <X size={30} color={"#71c7ec"} />
                        </ButtonClosePicker>
                        <Picker
                            itemObject={pickerItens}
                            option={type}
                            onChange={(itemValue) => setType(itemValue)}
                        />
                    </PickerContainerIOS>
                )
            }
        </Layout>
    )
}



export default Register