import styled from "styled-components/native";


const Container = styled.View`
flex-direction: row;
margin-bottom: 25px;
justify-content: space-between;
width: 90%;
align-items: start;
padding: 20px 0 20px 0;
`

const SectionInfo = styled.View`
gap: 5px;
flex: 1;
`


const ImageContainer = styled.TouchableOpacity`
width: 100px
`

const NameText = styled.Text`
font-size: 20px;
color: #005073;
font-style: italic
`

const EmailText = styled.Text`
font-size: 16px;
color: rgba(16,125,172, 0.6);
font-style: oblique 
`

const BalanceText = styled.Text`
margin-top: 5px;
font-size: 30px;
color: #107dac;
font-weight: bold
`

const OrderBy = styled.View`
justify-content: space-between;
align-items: center;
flex-direction: row;
width: 90%;
height: 60px;
margin-bottom: 10px;
`

const Title = styled.Text`
flex:1;
font-size: 16px;
width: 100%;
font-weight: 500;
color: green;
`
const PickerContainer = styled.View`
  flex:1;
  background-color: #ffffff;
  border-radius: 8px;
  height: 60px;
  justify-content: center
`;


const PickerContainerIOS = styled.View`
width: 100%;
z-index: 5;
position: relative; 
overflow: hidden;
`

const ButtonClosePicker = styled.TouchableOpacity`
position: absolute;
top: 10px;
right: 10px;
z-index: 10;
padding: 5px;

`

const AlertView = styled.View`
flex: 1;
width: 100%;
padding-top: 15px;
background-color: #fff;
border-top-right-radius: 20px;
border-top-left-radius: 20px;
padding-left: 10px;
padding-right: 10px;
align-items: center;

`

const AlertText = styled.Text`
margin-top: 50px;
font-size: 20px; 
color: #107dac; 
text-align: center; 
line-height: 28px; 
font-weight: 500; 
letter-spacing: 0.5px;
padding: 10px
`



const ButtonToRegister = styled.TouchableOpacity`
  background-color: #71c7ec;
  width: 60%;
  padding: 20px 24px; 
  border-radius: 15px; 
  margin-top: 50px; 
  align-items: center; 
  justify-content: center; 
`;

const ButtonToRegisterText = styled.Text`
  color: #fff;
  font-size: 16px; 
  font-weight: 600; 
  text-align: center; 
  text-transform: uppercase; 
`;

export {
  BalanceText,
  Container,
  NameText,
  Title,
  SectionInfo,
  EmailText,
  OrderBy,
  PickerContainer,
  PickerContainerIOS,
  ImageContainer,
  ButtonClosePicker,
  AlertView,
  AlertText,
  ButtonToRegister,
  ButtonToRegisterText

}
