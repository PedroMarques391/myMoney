import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  width: 90%;
  align-items: center;
`;

const Header = styled.View`
  margin-top: 10px;
  width: 100%;
  padding: 20px;
  background-color: #71c7ec;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const HeaderContent = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 15px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #e6f7ff;
  margin-bottom: 10px;
`;

const HeaderValueView = styled.View`
  width: 100%;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const HeaderLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #007aa6;
`;

const HeaderValueSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const HeaderValueText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #005073;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: 'black',
})`
  width: 90%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0 16px 0 16px;
  background-color: #fff;
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
`;

const Submit = styled.TouchableOpacity`
  margin-top: 20px;
  width: 80%;
  height: 50px;
  border: 1px solid #71c7ec;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

const SubmitText = styled.Text`
  color: #71c7ec;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const PickerView = styled.View`
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0 16px 0 16px;
  background-color: #fff;
  font-size: 16px;
  height: 56px;
  justify-content: center;
`;

export {
  Container,
  Header,
  HeaderText,
  HeaderValueView,
  HeaderValueText,
  Input,
  Submit,
  PickerView,
  SubmitText,
  HeaderValueSection,
  HeaderLabel,
  HeaderContent,
};
