import { Button, FlatList, StyleSheet, Platform, Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
    BalanceText, Container,
    EmailText, NameText,
    SectionInfo, Title,
    OrderBy,
    PickerContainer,
    ButtonClosePicker,
    PickerContainerIOS,
    ImageContainer,
    AlertView,
    AlertText,
    ButtonToRegister,
    ButtonToRegisterText
} from './styles';
import HistoricList from '../../components/HistoricList';
import { child, ref, remove, set } from 'firebase/database';
import { db } from '../../database/firebase.config';
import dayjs from 'dayjs';
import Loading from '../../components/Loading';
import { Image } from '../Profile/styles';
import { X } from 'lucide-react-native';
import Picker from '../../components/Picker';
import { useFocusEffect, useNavigation, } from '@react-navigation/native';
import { useHistoric } from '../../hooks/useHistoric';


export interface IHistoricalItemInterface {
    id: string;
    type: string;
    title: string;
    value: number;
    date: string;
}


const Home = (): React.JSX.Element => {
    const { user } = useAuth()
    const { formatedBalance, historic, loading, setSelectedOption, balance, selectedOption } = useHistoric()
    const { uid, name, url, email } = user || {};
    const navigate: any = useNavigation()
    const [showPicker, setShowPicker] = useState<boolean>(false)
    const [loadingImage, setLoadingImage] = useState<boolean>(false)

    const IOSPickerLabel = {
        today: "Hoje",
        revenue: "Entrada",
        expenses: "Saída",
    }

    const pickerItens = [
        { key: 1, label: "Hoje", value: "today" },
        { key: 2, label: "Entrada", value: "revenue" },
        { key: 3, label: "Saída", value: "expenses" },
    ]

    useFocusEffect(
        useCallback(() => {

            setSelectedOption("today");


            return () => {
                setSelectedOption("today");
            };
        }, [])
    );

    useEffect(() => {
        if (url) {
            Image.prefetch(url).then(() => setLoadingImage(false)).catch(() => setLoadingImage(false));
        }
    }, [url]);



    const handleDelete = (data: IHistoricalItemInterface) => {
        const currentDate = dayjs().format("DD/MM/YYYY")

        if (data.date < currentDate) {
            Alert.alert("Ops", "Você não pode excluir registros antigos.");
            return;
        }

        Alert.alert(
            "Confirmando Exclusão",
            `Nome: ${data.title}\nTipo: ${data.type}\nValor: R$ ${data.value}`,
            [
                {
                    text: "Cancelar",
                    style: "destructive",
                },
                {
                    text: "Confirmar",
                    onPress: () => onDelete(data),
                    style: "default",
                },
            ],
            { cancelable: false }
        );


    }

    async function onDelete(data: IHistoricalItemInterface) {
        const dataRef = ref(db, `historic/${uid}/${data.id}`)
        await remove(dataRef).
            then(async () => {
                let currentBalance: any = balance
                data.type === "despesa"
                    ? currentBalance += data.value
                    : currentBalance -= data.value
                const userRef = ref(db, `users/${uid}`)
                const childRef = child(userRef, "balance")
                await set(childRef, currentBalance)
            }).
            catch((error) => console.log(error))
    }

    function goToProfile() {
        if (loading) return
        navigate.navigate("Profile")
    }

    return (
        <Layout>
            <Container>
                <SectionInfo>
                    <NameText>Seja bem vindo {name}!</NameText>
                    <EmailText>{email}</EmailText>
                    <BalanceText>{balance === undefined ? "Carregando Saldo" : `R$ ${formatedBalance}`}</BalanceText>
                </SectionInfo>

                <ImageContainer onPress={goToProfile}>
                    {loadingImage && loading ? <Loading isTransparent /> : <Image
                        style={{ borderRadius: 50 }}
                        source={url ? { uri: url } : require("../../../assets/iconDefault.png")} />}
                </ImageContainer>

            </Container>
            <OrderBy>
                <Title>
                    {selectedOption === "today"
                        ? "Movimentações de Hoje"
                        : "Movimentações"}
                </Title>
                <PickerContainer>
                    {Platform.OS === "android" ? (
                        <Picker
                            itemObject={pickerItens}
                            option={selectedOption}
                            onChange={(itemValue) => setSelectedOption(itemValue)}
                        />
                    )
                        : <Button title={IOSPickerLabel[selectedOption]} onPress={() => setShowPicker(prevState => !prevState)} />}
                </PickerContainer>

            </OrderBy>


            {loading ? <Loading isTransparent /> : (

                historic.length === 0 ? (
                    <AlertView>
                        <AlertText>
                            Parece que ainda não há itens registrados hoje. Vamos começar?
                        </AlertText>
                        <ButtonToRegister onPress={() => {
                            setShowPicker(false)
                            navigate.navigate("Registro")
                        }}>
                            <ButtonToRegisterText>Cadastrar</ButtonToRegisterText>
                        </ButtonToRegister>
                    </AlertView>
                ) : (
                    <FlatList
                        style={styles.list}
                        showsVerticalScrollIndicator={false}
                        data={historic}
                        renderItem={({ item }) => <HistoricList
                            handleDelete={handleDelete}
                            data={item}
                        />

                        }
                        keyExtractor={item => item.id}
                    />
                )
            )}

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
                            option={selectedOption}
                            onChange={(itemValue) => setSelectedOption(itemValue)}
                        />
                    </PickerContainerIOS>
                )
            }
        </Layout>
    )
};


export default Home;

const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: "100%",
        paddingTop: 15,
        backgroundColor: "#EFF4F9",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
    }
})
