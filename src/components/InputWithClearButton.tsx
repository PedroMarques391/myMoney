import React from 'react';
import { TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import { ClearButton, InputView, InputEdit } from './styles';



interface IInputWithClearButtonProps {
    value: string;
    onChangeText: (text: string) => void;
    onClear: () => void;
    placeholder: string;
    secureTextEntry?: boolean;
    maxLength?: number
    keyboardType?: "default" | 'numeric' | 'email-address'
}

const InputWithClearButton = ({
    value,
    onChangeText,
    onClear,
    placeholder,
    secureTextEntry = false,
    maxLength,
    keyboardType = "default"
}: IInputWithClearButtonProps) => {
    return (
        <InputView>
            <InputEdit
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                maxLength={maxLength}
                keyboardType={keyboardType}
            />
            <ClearButton onPress={onClear}>
                <X color="red" size={30} />
            </ClearButton>
        </InputView>
    );
};

export default InputWithClearButton;
