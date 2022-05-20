import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { getApps, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './components/auth/Landing';
import Register from './components/auth/Register';

import { API_KEY, PROJECT_ID, SENDER_ID, APP_ID, MEASUREMENT_ID } from '@env';

export type RootStackParamList = {
  Landing: undefined;
  Register: undefined;
  Login: undefined;
};

interface IAppProps {}

interface IAppState {
  loaded: boolean;
  loggedIn: boolean;
}

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
}

const Stack = createStackNavigator<RootStackParamList>();

export default class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      loaded: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    onAuthStateChanged(getAuth(), user => {
      if (!user) {
        this.setState({ loggedIn: false, loaded: true });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    const email = getAuth().currentUser?.email;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>User is logged in with {email}</Text>
      </View>
    );
  }
}
