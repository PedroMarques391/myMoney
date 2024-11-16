import styled from "styled-components/native";


const LayoutContainer = styled.SafeAreaView`
flex: 1;
align-items: center;
padding-top: 30px;
background: #fff
`

const InputView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ClearButton = styled.TouchableOpacity`
  margin-left: 10px;
  justify-content: center
`;

const InputEdit = styled.TextInput.attrs({
  placeholderTextColor: 'gray',
})`
flex: 1; 
border-bottom-width: 1px; 
border-bottom-color: #ccc; 
padding: 10px;

`

//HistoricListStyles


const ContainerList = styled.View`
  flex: 1;
  background-color: #71c7ec;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 10px;

`;

const Type = styled.TouchableOpacity`
  flex:1;
  justify-content: space-around;
  background-color: #ffff;
  padding: 12px;
  border-radius: 10px;
  

`;

const IconView = styled.View<{ $primary?: boolean }>`
flex-direction: row;
  background-color: ${props => props.$primary ? "#4caf50" : "red"} ; 
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 150px;
`;

const TypeText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: 600;
`;


const Infos = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center
`

const Text = styled.Text<{ $primary?: boolean }>`
  font-size: 18px;
  color: #333333;
  font-weight: bold;
  margin-top: 4px;
  padding: 8px;
  flex: 1;
  text-align: ${props => props.$primary ? "left" : "right"}; 
`;




export {
  LayoutContainer,
  ClearButton,
  InputView,
  InputEdit,
  ContainerList,
  IconView,
  Type,
  TypeText,
  Text,
  Infos
}