import { ArrowDown, ArrowUp, } from 'lucide-react-native'
import { ContainerList, IconView, TypeText, Type, Infos, Text } from './styles'
import { IHistoricalItemInterface } from '../pages/Home'
import { Alert, View } from 'react-native';


type dataProps = {
    data: IHistoricalItemInterface
    handleDelete: (data: IHistoricalItemInterface) => void
};

const HistoricList = ({ data, handleDelete }: dataProps): React.JSX.Element => {

    const { type, date, title, value } = data

    const icon = type === "receita"
        ? <ArrowUp size={25} color={"white"} />
        : <ArrowDown size={25} color={"white"} />

    const color = type === "receita"
        ? "green"
        : "red"

    const handleAlert = () => {
        Alert.alert(
            "Atenção",
            "Para excluir um registro, segure o card por alguns segundos."
        );
    }

    return (
        <>
            {!data ? <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'baseline', color: "black" }}>Sem itens registrados hoje</Text> : (
                <ContainerList>
                    <Type onPress={handleAlert} onLongPress={() => handleDelete(data)}>
                        <Infos>
                            <IconView $primary={type === "receita" ? true : false}>
                                {icon}
                                <TypeText>{type}</TypeText>
                            </IconView>
                            <Text>{date}</Text>
                        </Infos>
                        <Infos>
                            <Text>{title}</Text>
                            <Text style={{ color: color }}
                            >R${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}</Text>
                        </Infos>
                    </Type>


                </ContainerList>
            )}
        </>
    )
}



export default HistoricList