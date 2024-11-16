import styled from "styled-components/native";

const Container = styled.SafeAreaView`
flex: 1;
width: 90%;
align-items: center
`
const Input = styled.TextInput.attrs({
    placeholderTextColor: "black"
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
width: 60%;
height: 50px;                
background-color: #71c7ec;    
border-radius: 25px;          
justify-content: center;    
align-items: center;          
margin-top: 12px;              
`;


const SubmitText = styled.Text`
color: #fff;                
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
`

export {
    Container,
    Input,
    Submit,
    PickerView,
    SubmitText
}