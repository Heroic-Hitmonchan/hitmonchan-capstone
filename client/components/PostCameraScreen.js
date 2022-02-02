import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
const getColors = require('get-image-colors')

const PostCameraScreen = ({ navigation }) => {

    const theImage = useSelector((state) => {
        console.log(state.theCamera.image)
        return state.theCamera.image;
    });
        useEffect(() => {
           return async () => {
                getColors(theImage).then(colors => {
                    console.log(colors)
                })
            }
        },[])
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
                source={{ uri: theImage }}
                style={{ width: 300, height: 300, backgroundColor: 'blue' }}
            />
            <View >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('CameraScreen')}
                >
                    <Text style={styles.buttonTitle}> ReTake a picture </Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default PostCameraScreen;

const styles = StyleSheet.create({
    button: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        borderWidth: 5,
        padding: 20,
        backgroundColor: 'silver',
    }
})