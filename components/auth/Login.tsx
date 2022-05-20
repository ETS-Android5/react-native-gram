import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getApps } from 'firebase/app';
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

interface ILoginProps {}

interface ILoginState {
  email: string;
  password: string;
  name: string;
}

export default class Login extends Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };

    this.onSignIn = this.onSignIn.bind(this);
  }

  async onSignIn() {
    const { email, password } = this.state;
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log('user:', user);
    } catch (error) {
      console.log(getApps().length);
      console.log(auth);
      console.log(error);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextInput
          placeholder="name"
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <Button onPress={() => this.onSignIn()} title="Sign In" />
      </View>
    );
  }
}
