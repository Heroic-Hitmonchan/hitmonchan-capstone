import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';


const UploadPhoto = ({ navigation }) => {

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>
        I'm the UploadPhoto component
      </Text>
      <View >
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