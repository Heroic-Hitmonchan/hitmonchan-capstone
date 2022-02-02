import React, { useEffect, useState, createRef } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

let AsyncImagePicker = async () => {
  try {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission === false) {
      alert("Permission to access camera roll is required");
      return;
    }
    let image = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowNull: false,
    });

    let base = `data:image/${image.uri.split(".")[1]};base64,${image.base64}`;
    console.log(base.slice(0, 100))

    return base;
  } catch (error) {
    console.error(error);
  }
};
//
export default function ImageSelect() {
  const [image, setImage] = useState(false);
  useEffect(() => {
    AsyncImagePicker()
      .then((res) => setImage(res))
      .catch((error) => console.error(error));
  }, [image]);
  return (
    image && (
    <View>
        <Image source={{uri: image}} />
    </View>
    )
  );
}
