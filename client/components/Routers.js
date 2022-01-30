import React from "react";
import { Router, Scene, Stack } from 'react-native-router-flux';
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, Button } from 'react-native';
import Home from './Home';
import PhotoScreen from './PhotoScreen'
import UploadPhoto from "./UploadPhoto";


const Routes = () => {

    const isLoggedIn = useSelector((state) => {
        return !!state.auth;
    });

    const dispatch = useDispatch();

    return (
        <Router>
            {isLoggedIn ? (
                <Stack key='root'>
                    <Scene key='Home' component={Home} initial={true} />
                    <Scene key='PhotoScreen' component={PhotoScreen} title={PhotoScreen}/>
                    <Scene key='UploadPhoto' component={UploadPhoto} title={UploadPhoto}/>
                </Stack>
            ) : (
                <Scene key='root'>
                    <Scene key='Home' component={Home} initial={true} />
                </Scene>
            )}


        </Router>
    )
}

export default Routes;

