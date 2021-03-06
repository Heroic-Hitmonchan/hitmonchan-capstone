// import {CLIENT_ID, CLIENT_SECRET} from '@env'
import * as React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useAuthRequest, ResponseType } from 'expo-auth-session';
import { Provider, useDispatch, useSelector } from "react-redux";
import { setAuthorization, logout } from '../redux/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token'
}

const Home = ({ navigation }) => {

  const isLoggedIn = useSelector((state) => {
    return state.auth;
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '12ab9fc82d684679b569135ea050d5d8',
      clientSecret: '3c13d792c46d4c33a76bd6b2e8b5de94',
      scopes: ['user-read-email', 'playlist-modify-public'],
      usePKCE: false,
      redirectUri: 'exp://172.25.221.63:19000'
    },
    discovery
  )

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params
      dispatch(setAuthorization(access_token));
    }
  }, [response])

  const logout = () => {
    dispatch(setAuthorization({}))
  }

  if (Object.keys(isLoggedIn).length === 0) {
    return (
      <View style={styles.container}>
        <Text>Landing page before login</Text>
        <Button style={styles.login_btn} disabled={!request} title="Login" onPress={() => promptAsync()} />
        <StatusBar style="auto" />
      </View>

    )
  } else {
    // console.log(console.log(Object.keys(isLoggedIn).length))
    return (
      <View style={styles.container}>
        <Text>Landing page after login</Text>

        <View style={styles.login_view}>
          <TouchableOpacity
            style={styles.login_btn}
            onPress={() => navigation.navigate('CameraScreen')}
          >
            <Text style={styles.buttonTitle}> Take a picture </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.login_view}>
          <TouchableOpacity
            style={styles.login_btn}
            // onPress={() => goToTest()}
            onPress={() => navigation.navigate('UploadPhoto')}
          >
            <Text style={styles.buttonTitle}> Go to UploadPhoto view </Text>
          </TouchableOpacity>
        </View>


        <View style={styles.login_view}>
          <Pressable style={styles.login_btn} disabled={!request} title="Logout" onPress={() => logout()}>
            <Text>Logout</Text>
          </Pressable>
        </View>

      </View>
    )
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  login_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_btn: {
    borderWidth: 5,
    padding: 20,
    backgroundColor: 'silver',
  },
  backgroundColorbuttonTitle: {
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

