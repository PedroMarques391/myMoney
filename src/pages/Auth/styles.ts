import styled from 'styled-components/native';

const Background = styled.View`
  flex: 1;
  background-color: #71c7ec;
`;
const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.Image`
  margin-bottom: 15px;
`;
const AreaInput = styled.View`
  flex-direction: row;
  position: relative;
  align-items: center;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: '#005073',
})<{isFocused?: boolean}>`
  background: rgba(248, 248, 250, 0.5);
  width: 90%;
  font-size: 17px;
  margin-bottom: 15px;
  color: #005073;
  padding: 12px;
  border-radius: 7px;
  letter-spacing: 4px;
  border: 2px solid;
  border-color: ${({isFocused}) => (isFocused ? '#fff' : 'transparent')};
  transition: border 4s ease-in-out;
`;

const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #f8f8fa;
  width: 70%;
  margin-top: 15px;
  border-radius: 10px;
`;

const SubmitText = styled.Text`
  font-size: 18px;
  color: #005073;
  font-weight: 500;
  letter-spacing: 5px;
`;

const Link = styled.TouchableOpacity`
  margin: 15px 0 15px 0;
`;

const LinkText = styled.Text`
  color: #005073;
  text-decoration: underline;
  font-size: 15px;
  text-decoration-color: #005073;
`;

const IconButtons = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
`;

export {
  Background,
  Container,
  AreaInput,
  Input,
  Logo,
  Link,
  LinkText,
  SubmitButton,
  SubmitText,
  IconButtons,
};
