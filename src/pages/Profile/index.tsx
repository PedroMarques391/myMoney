import { Alert, Modal, Platform } from 'react-native'
import Layout from '../../components/Layout'
import { useAuth } from '../../hooks/useAuth'
import {
    Container, InfoView,
    Image, InfoSection,
    Contacts, MainInfos,
    TextProfile, Title,
    Button,
    ButtonText,
    ModalContainer,
    ModalView,
    ConfirmButton,
    Sections,
    SectionText,
    HistoricInfo,
    HistoricView,
    HistoricInfoTitle,
    HistoricInfoSubtitle,
    ButtonContainer,

} from './styles'
import { useEffect, useState } from 'react'
import InputWithClearButton from '../../components/InputWithClearButton'
import { DollarSign, LogOut, TrendingDown, TrendingUp, User, XSquare } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { useHistoric } from '../../hooks/useHistoric'
import { formated } from '../../utils/formated'

const Profile = (): React.JSX.Element => {
    const { logout, user, updateProfile } = useAuth()
    const { balance, totalExpenses, totalRevenue, totalRegisters } = useHistoric()
    const [showModal, setShowModal] = useState<boolean>(false)

    const [url, setUrl] = useState<string>(user?.url || "")
    const [name, setName] = useState<string>(user?.name || "")
    const [work, setWork] = useState<string>(user?.work || "")
    const [phone, setPhone] = useState<string>(user?.phone || "")

    const formatedBalance = balance && formated(balance)
    const formatedExpenses = balance && formated(totalExpenses)
    const formatedRevenues = balance && formated(totalRevenue)

    useEffect(() => {
        resetUserData();
    }, [user]);

    const navigate: any = useNavigation()

    const handleLogout = () => {
        Alert.alert("Sair da conta", "Tem certeza? ", [
            {
                style: 'destructive',
                text: "Confimar",
                onPress: () => logout()
            },
            {
                style: 'cancel',
                text: "Cancelar",


            }
        ])

    }

    const handleEdit = () => {
        setShowModal(true)
    }

    const resetUserData = () => {
        setUrl(user?.url || "");
        setName(user?.name || "");
        setWork(user?.work || "");
        setPhone(user?.phone || "");
    };

    const closeModal = () => {
        resetUserData()
        setShowModal(false)
    }

    const handleFinish = async () => {
        if (!name || !work || !phone) {
            Alert.alert("Ops!!", "Todos os campos devem ser preencidos")
            return
        }
        if (phone.length < 11) {
            Alert.alert("Ops!!", "Telefone inválido.")
            return
        }
        await updateProfile(url, name, work, phone)
        Alert.alert("Tudo certo!!", "Perfil Atualizado com Sucesso")
        setShowModal(false)
    }

    const formatPhone = (phone: string) => {
        return phone.replace(
            /(\d{2})(\d{1})(\d{4})(\d{4})/,
            "($1) $2 $3-$4"
        );
    };

    const formatedPhone = user?.phone ? formatPhone(user.phone) : ""


    return (
        <Layout>
            <Container>
                <InfoView>
                    <MainInfos>
                        <Image
                            style={{ borderRadius: 50 }}
                            source={user?.url ? { uri: user?.url } : require("../../../assets/iconDefault.png")} />
                        <InfoSection>
                            <Title>{user?.name}</Title>
                            <TextProfile $primary>{user?.work}</TextProfile>
                        </InfoSection>
                    </MainInfos>
                    <Contacts>
                        <TextProfile>{formatedPhone}</TextProfile>
                        <TextProfile>{user?.email}</TextProfile>
                    </Contacts>
                </InfoView>

                <HistoricView>
                    <HistoricInfo>
                        <HistoricInfoTitle>R$ {formatedBalance}</HistoricInfoTitle>
                        <HistoricInfoSubtitle>Carteira</HistoricInfoSubtitle>
                    </HistoricInfo>
                    <HistoricInfo>
                        <HistoricInfoTitle>{totalRegisters}</HistoricInfoTitle>
                        <HistoricInfoSubtitle>Registros</HistoricInfoSubtitle>
                    </HistoricInfo>
                </HistoricView>

                <Sections>
                    <TrendingUp size={30} color={"#005073"} />
                    <SectionText>R$ {formatedRevenues}</SectionText>
                </Sections>

                <Sections>
                    <TrendingDown size={30} color={"#005073"} />
                    <SectionText>R$ {formatedExpenses}</SectionText>
                </Sections>

                <ButtonContainer onPress={handleEdit}>
                    <User size={30} color={"#005073"} />
                    <SectionText>Editar Perfil</SectionText>
                </ButtonContainer>

                <ButtonContainer onPress={() => navigate.navigate("Registro")}>
                    <DollarSign size={30} color={"#005073"} />
                    <SectionText>Registrar Gastos</SectionText>
                </ButtonContainer>




                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    <ModalContainer
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                    >
                        <ModalView>
                            <Button onPress={closeModal}>
                                <XSquare
                                    size={30} color={"red"} />
                            </Button>
                            <Image
                                style={{ borderRadius: 50 }}
                                source={url ? { uri: url } : require("../../../assets/iconDefault.png")}
                            />

                            <InputWithClearButton
                                value={url}
                                onChangeText={setUrl}
                                onClear={() => setUrl("")}
                                placeholder="URL"
                            />
                            <InputWithClearButton
                                value={name}
                                onChangeText={setName}
                                onClear={() => setName("")}
                                placeholder="Nome"
                            />
                            <InputWithClearButton
                                value={work}
                                onChangeText={setWork}
                                onClear={() => setWork("")}
                                placeholder="Profissão"
                            />
                            <InputWithClearButton
                                value={phone}
                                onChangeText={setPhone}
                                onClear={() => setPhone("")}
                                maxLength={11}
                                keyboardType='numeric'
                                placeholder="Telefone"
                            />
                            <ConfirmButton onPress={handleFinish}>
                                <ButtonText>
                                    Confirmar Alterações
                                </ButtonText>
                            </ConfirmButton>
                        </ModalView>

                    </ModalContainer>
                </Modal>

            </Container>
            <ButtonContainer $primary onPress={handleLogout}>
                <LogOut size={30} color={"#f30000"} />
                <SectionText $primary>Sair</SectionText>
            </ButtonContainer>
        </Layout>
    )
}



export default Profile

