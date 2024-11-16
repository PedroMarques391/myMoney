import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Profile from '../pages/Profile';


const AppDrawer = createDrawerNavigator();

const AppRouter = (): React.JSX.Element => {
    return (
        <AppDrawer.Navigator
            screenOptions={{
                headerTitle: "",
                drawerActiveBackgroundColor: "#e5e6eb",
                drawerLabelStyle: {
                    fontWeight: "bold",
                },
                drawerInactiveBackgroundColor: "#005073",
                drawerActiveTintColor: "#131313",
                drawerInactiveTintColor: "#fff",
                drawerStyle: {
                    backgroundColor: "#71c7ec",
                    paddingTop: 15
                },
                headerTintColor: "white",
                headerStyle: {
                    backgroundColor: "#71c7ec"

                },

            }}


        >
            <AppDrawer.Screen name="Home" component={Home} />
            <AppDrawer.Screen name="Registro" component={Register} />
            <AppDrawer.Screen name="Profile" component={Profile} />
        </AppDrawer.Navigator>
    );
};




export default AppRouter;