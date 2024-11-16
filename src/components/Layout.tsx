import { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { LayoutContainer } from "./styles"



interface ILayoutInterface {
    children: ReactNode
}


const Layout = ({ children }: ILayoutInterface): React.JSX.Element => {
    return (
        <LayoutContainer>
            {children}
        </LayoutContainer>
    )
}



export default Layout