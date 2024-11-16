import styled from "styled-components/native";

const Container = styled.View`
flex: 1;
width: 90%;
align-items: center;
`

const InfoView = styled.View`
gap: 10px;

`

const MainInfos = styled.View`
flex-direction: row;
justify-content: space-around;
width: 100%;
padding: 5px 0 5px 0


`

const Image = styled.Image`
height: 100px;
width: 100px;



`

const InfoSection = styled.View`
flex: 1;
gap: 6px;
justify-content: center;
align-items: center;
padding: 5px

`

const Title = styled.Text`
font-size: 24px;
font-weight: bold;
color: #005073;
text-align: start;
width: 80%;
text-transform: capitalize
`

const TextProfile = styled.Text<{ $primary?: boolean; }>`
font-size: ${props => props.$primary ? "15px" : "17px"};
font-weight: 600;
font-style: ${props => props.$primary ? "italic" : "normal"};
color: ${props => props.$primary ? "#107dac" : "#999999"};
text-align: start;
width: 80%

`

const Contacts = styled.View`
margin-top: 10px;
padding: 16px 16px 16px 0px;
gap: 8px;
margin-bottom: 10px

`

const Sections = styled.View`
flex-direction: row;
width: 100%;
gap: 20px;
justify-content: start;
align-items: center;
height: 70px;
padding-left: 10px

`

const SectionText = styled.Text<{ $primary?: boolean }>`
  font-size: 18px;
  color: ${(props) => (props.$primary ? 'red' : '#107dac')};
  font-weight: ${(props) => (props.$primary ? '300' : 'normal')};
`


const ButtonContainer = styled.TouchableOpacity<{ $primary?: boolean }>`
flex-direction: row;
width: 100%;
gap: 20px;
justify-content: start;
align-items: center;
height: ${props => props.$primary ? "auto" : "70px"};
padding: ${props => props.$primary ? "10px 0px 12px 30px" : "10px"};
border-top-width: ${props => props.$primary ? "2px" : "0px"};
border-top-color: ${props => props.$primary ? "#E0E0E0" : "none"};
border-style: ${props => props.$primary ? "solid" : "none"};

`

const HistoricView = styled.View`
flex-direction: row;
width: 100%;
margin-top: 5px;
gap: 5px
`

const HistoricInfo = styled.View`
border: 1px solid #999999;
justify-content: center;
align-items: center;
gap: 5px;
flex: 1;
padding: 10px;
`
const HistoricInfoTitle = styled.Text`
font-size: 25px;
color: #107dac
`

const HistoricInfoSubtitle = styled.Text`
font-size: 15px;
font-weight: 800;
color: #bcbcbc
`

const Button = styled.TouchableOpacity<{ $primary?: boolean }>`
border: 1px solid ;
border-color: ${props => props.$primary ? "#005073" : "transparent"};
justify-content: center;
align-items: center;
height: 70px;
flex: ${props => props.$primary ? "1" : "none"};
position: ${props => props.$primary ? "static" : "absolute"};
top: ${props => props.$primary ? "0" : "10px"};
right: ${props => props.$primary ? "0" : "40px"}; 
`

const RegisterButton = styled.TouchableOpacity`
margin-top: 20px;
justify-content: center;
align-items: center;
height: 60px;
width: 80%;
border-radius: 10px;
background-color: #71c7ec

`

const RegisterButtonText = styled.Text`
font-size: 16px;
font-weight: bold;
color: #FFF;
letter-spacing: 2px;
`

const ButtonText = styled.Text`
font-size: 16px;
font-weight: 500;
color: #005073

`


const ModalContainer = styled.KeyboardAvoidingView`
flex: 1;
justify-content: flex-end;
background-color: rgba(0, 0, 0, 0.5);

`

const ModalView = styled.View`
position: relative;
background-color: #fff;
border-top-right-radius: 20px;
border-top-left-radius: 20px;
padding: 20px;
width: 100%;
max-height: 70%; 
align-items: center;
gap: 20px;
margin-top: auto; 
`

const ConfirmButton = styled.TouchableOpacity`
width: 80%;
padding: 15px;
border: 1px solid #005073;
border-radius: 20px;
justify-content: center;
align-items: center;

`

export {
  Container,
  Contacts,
  InfoSection,
  InfoView,
  Image,
  MainInfos,
  TextProfile,
  Title,
  Button,
  ButtonText,
  ModalContainer,
  ModalView,
  ConfirmButton,
  Sections,
  SectionText,
  HistoricInfo,
  HistoricInfoTitle,
  HistoricInfoSubtitle,
  HistoricView,
  ButtonContainer

}