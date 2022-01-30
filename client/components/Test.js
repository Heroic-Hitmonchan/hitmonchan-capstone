import React, { useEffect, useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Actions } from "react-native-router-flux";
import Home from "./Home";


const Test = () => {

    const goToHome = () => {
        Actions.Home()
    }

    return (
        <View>
            <Text>
            I'm the test component
            <View >
          <TouchableOpacity
            
            onPress={()=>goToHome()}
          >
            <Text > Go to home view </Text>
          </TouchableOpacity>
        </View>

            </Text>
        </View>
    )
}

export default Test