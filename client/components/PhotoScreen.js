import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera'
import { useDispatch, useSelector } from "react-redux";
import { setNewCapturedImage, showTheCamera, hasPermission } from '../redux/image'

const PhotoScreen = () => {

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
            {showCameraScreen ?
                <Camera style={{ flex: 1 }} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        {/* <TouchableOpacity
                            style={styles.Camera_button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> Flip </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.Camera_button}
                            onPress={async () => {
                                const captured_photo = await takePhoto();
                                if (!captured_photo.cancelled) {
                                    setImage(captured_photo.uri)
                                }
                                setShowCamera(false)
                                // Alert.alert('Debug', JSON.stringify(captured_photo));
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> Photo </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.Camera_button}
                            onPress={() => {
                                setShowCamera(false)
                            }}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> Cancel </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
                :
                <View style={{ flex: 1, marginTop: 50 }}>

                    <View
                        style={{ width: '100%', alignItems: 'center' }}
                    >
                        {theImage && (
                            <Image
                                source={{ uri: theImage }}
                                style={{ width: 300, height: 300, backgroundColor: 'blue' }}
                            />
                        )}

                    </View>
                    <View style={{ flex: 0.5 }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setShowCamera(true)}
                        >
                            <Text style={styles.buttonTitle}> Take a picture </Text>
                        </TouchableOpacity>
                    </View>

                </View>}

        </View>
    )
}

export default PhotoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
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
        // marginTop: 100,
        padding: 20,
        backgroundColor: 'silver',
        // borderRadius: 10,

    },
    button: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
    }
});