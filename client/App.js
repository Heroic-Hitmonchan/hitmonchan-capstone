// import {CLIENT_ID, CLIENT_SECRET} from '@env'
import * as React from 'react'
import { StatusBar } from 'expo-status-bar';
import PhotoScreen from './components/PhotoScreen'
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAuthRequest, ResponseType } from 'expo-auth-session';
import { Provider, useDispatch, useSelector } from "react-redux";
import Routes from './components/Routers'
import { setAuthorization } from './redux/auth'
import {store} from './index';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token'
}

export default function AppWrapper () {

  return (
    <Provider store={store}> 
      <App />
    </Provider>
  )
}

 const App = () => {
  // console.log(CLIENT_ID)
  // console.log(CLIENT_SECRET)
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
      console.log("Access Token", access_token)
      dispatch(setAuthorization(access_token));
    }
  }, [response])

  return (
    // <Routes />
    
      <View style={styles.container}>
        <Text>Hello world!</Text>
        <Button disabled={!request} title="Login" onPress={() => promptAsync()} />
        <StatusBar style="auto" />
        < PhotoScreen />
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

