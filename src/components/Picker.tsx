import {Picker as RNPicker} from '@react-native-picker/picker';
import {Platform} from 'react-native';

interface IItemObjectInterface {
  key: number;
  label: string;
  value: string;
}
interface IPickerProps {
  option: string;
  onChange: (item: any) => void;
  itemObject: IItemObjectInterface[];
}

const Picker = ({
  option,
  onChange,
  itemObject,
}: IPickerProps): React.JSX.Element => {
  return (
    <RNPicker
      style={{
        backgroundColor: Platform.OS === 'ios' ? '#e5e5e5' : '#fff',
        color: '#6fa8dc',
      }}
      placeholder="red"
      selectedValue={option}
      onValueChange={onChange}>
      {itemObject.map(item => (
        <RNPicker.Item key={item.key} label={item.label} value={item.value} />
      ))}
    </RNPicker>
  );
};

export default Picker;
