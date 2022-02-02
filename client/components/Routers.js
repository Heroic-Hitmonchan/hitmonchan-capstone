import React from "react";
import { Router, Scene } from 'react-native-router-flux';
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Button } from 'react-native';
import Home from './Home';
import CameraScreen from './CameraScreen'
import UploadPhoto from "./Uploadphoto";
import PostCameraScreen from "./PostCameraScreen"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ImageSelect from "./ImageSelection";

const Stack = createNativeStackNavigator();



const Routes = () => {

    const isLoggedIn = useSelector((state) => {
        return !!state.auth;
    });

    const dispatch = useDispatch();

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name='Home' component={Home}  />
                    <Stack.Screen name='CameraScreen' component={CameraScreen} />
                    <Stack.Screen name='UploadPhoto' component={UploadPhoto} />
                    <Stack.Screen name='PostCameraScreen' component={PostCameraScreen} />
                    <Stack.Screen name="ImageSelection" component={ImageSelect} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name='Home' component={Home} initial={true} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}

export default Routes;

