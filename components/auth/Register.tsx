import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

interface IRegisterProps {}

export default class Register extends Component<IRegisterProps> {
  constructor(props: IRegisterProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {}

  render() {
    return (
      <View>
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
        <Button onPress={() => this.onSignUp()} title="Sign Up" />
      </View>
    );
  }
}
