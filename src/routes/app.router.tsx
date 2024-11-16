import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

const AnimatedIcon = ({
    name,
    focused,
    color,
    size,
}: {
    name: any;
    focused: boolean;
    color: string;
    size: number;
}) => {
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: focused ? -15 : 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [focused]);

    return (
        <Animated.View style={{ transform: [{ translateY }] }}>
            <Ionicons name={name} size={focused ? size + 5 : size} color={color} />
        </Animated.View>
    );
};

const AppRouter = (): React.JSX.Element => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: "#71c7ec",
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 60,
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",

                },
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnimatedIcon
                            name={focused ? 'wallet' : 'wallet-outline'}
                            focused={focused}
                            color={color}
                            size={size}
                        />
                    ),
                }}
                name="Registro"
                component={Register}
            />
            <Tab.Screen
                navigationKey='1'
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnimatedIcon
                            name={focused ? 'home' : 'home-outline'}
                            focused={focused}
                            color={color}
                            size={size}
                        />
                    ),
                }}
                name="Home"
                component={Home}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <AnimatedIcon
                            name={focused ? 'person' : 'person-outline'}
                            focused={focused}
                            color={color}
                            size={size}
                        />
                    ),
                }}
                name="Profile"
                component={Profile}
            />
        </Tab.Navigator>
    );
};

export default AppRouter;
