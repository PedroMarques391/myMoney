import { ActivityIndicator, Text, View } from 'react-native'
import styled from 'styled-components/native'

const LoadingView = styled.View<{ $transparent?: boolean }>`
flex: 1;
width: 100%;
justify-content: center;
align-items: center;
background-color: ${props => props.$transparent ? "transparent" : "#107dac"};
`

type TLoadingProps = { isTransparent?: boolean, color?: string }


const Loading = ({ isTransparent, color = "#000" }: TLoadingProps): React.JSX.Element => {
    return (
        <LoadingView $transparent={isTransparent}>
            <ActivityIndicator color={isTransparent ? color : "#ffffff"} size={'large'} />
        </LoadingView>
    )
}

export default Loading