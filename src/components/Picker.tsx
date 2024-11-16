import { Picker as RNPicker } from '@react-native-picker/picker'
interface IPickerProps {
    option: string
    onChange: (item: any) => void
}

const Picker = ({ option, onChange }: IPickerProps): React.JSX.Element => {
    return (
        <RNPicker
            selectedValue={option}
            onValueChange={onChange}
        >
            <RNPicker.Item key={1} label="Hoje" value="today" />
            <RNPicker.Item key={2} label="Entrada" value="revenue" />
            <RNPicker.Item key={3} label="Saída" value="expenses" />
        </RNPicker>
    )
}



export default Picker