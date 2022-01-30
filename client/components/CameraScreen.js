import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera'
import { useDispatch, useSelector } from "react-redux";
import { setNewCapturedImage, showTheCamera, hasPermission } from '../redux/image'

const CameraScreen = ({ navigation }) => {

    // const [hasPermission, setHasPermission] = useState(null);
    // const [type, setType] = useState(Camera.Constants.Type.back);
    // const [showCamera, setShowCamera] = useState(false)
    // const [image, setImage] = useState(null)

    const permission = useSelector((state) => {
        return state.theCamera.permission;
    });

    const showCameraScreen = useSelector((state) => {
        return state.theCamera.showCamera;
    });

    const theImage = useSelector((state) => {
        return state.theCamera.image;
    });

    const dispatch = useDispatch();

    const setImage = (image) => {
        dispatch(setNewCapturedImage(image))
    }

    const setShowCamera = (value) => {
        dispatch(showTheCamera(value))
    }

    const setHasPermission = (value) => {
        dispatch(hasPermission(value))
    }



    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (permission === null) {
        return <View />;
    }
    if (permission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePhoto = async () => {
        if (cameraRef) {
            console.log(' took a picture');
            try {
                let photo = await cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                return photo;
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <View style={styles.container}>
            <Camera style={{ flex: 1 }} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.Camera_button}
                        onPress={async () => {
                            const captured_photo = await takePhoto();
                            if (!captured_photo.cancelled) {
                                setImage(captured_photo.uri);
                                navigation.navigate('PostCameraScreen')
                            }
                            setShowCamera(false)
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> Photo </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Camera_button}
                        onPress={() => {
                            setShowCamera(false);
                            navigation.navigate('Home')
                        }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> Cancel </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
}

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 40,
    },
    Camera_button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',

    },
    buttonTitle: {
        borderWidth: 5,
        padding: 20,
        backgroundColor: 'silver',
    },
    button: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
    }
});