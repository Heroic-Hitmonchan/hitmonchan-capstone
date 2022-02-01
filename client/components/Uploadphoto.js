import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'
// import { uploadFile } from 'react-s3';
global.Buffer = global.Buffer || require('buffer').Buffer

const config = {
  bucketName: 'momentsbucket',
  dirName: 'photos',
  region: 'us-west-2',
  accessKeyId: 'AKIAUBWGZK5JGMFLPCPD',
  secretAccessKey: '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',
}


const UploadPhoto = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [ratio, setRatio] = useState(null)

  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 1
      })

      if (!result.cancelled) {
        setRatio(result.height/result.width)
        let manipResult = await manipulateAsync(
          result.uri,
          [],
          {
            compress: 1,
            format: SaveFormat.JPEG
          }
        )

        const imagePath = manipResult.uri

        // THIS IS COMMENTED OUT, AS IT RELATESE TO AWS

        // const imageExt = imagePath.split('.').pop()
        // const imageMime = `image/${imageExt}`

        // let picture = await fetch(imagePath)
        // console.log("Picture fetched from image path")
        // console.log("Prototype of picture:", Object.getPrototypeOf(picture))
        // picture = await picture.blob()

        // const imageData = new File([picture], `photo.${imageExt}`, {
        //   type: imageMime
        // })
        // console.log("imageData generated")

        // let { data:uploadData } = await uploadFile(imageData, config)

        // console.log("data uploaded to AWS")

        setImage(imagePath)
      }
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 250, height: 250*ratio }} />}
      <View >
      {/* <TouchableOpacity
          style={styles.button}
          onPress={uploadFile}
        >
          <Text style={styles.buttonTitle}> Upload Photo </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonTitle}> Go to home view </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default UploadPhoto

const styles = StyleSheet.create({
  button: {
    flex: 0.5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    borderWidth: 5,
    padding: 20,
    backgroundColor: 'silver',
  }
})
