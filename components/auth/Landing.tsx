import React from 'react';
import { View, Button } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from 'App';

export default function Landing() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
