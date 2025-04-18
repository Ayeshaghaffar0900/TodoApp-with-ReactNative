import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function Signup({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const res = await fetch('http://<your-ip>:5000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) navigation.navigate('Login');
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput onChangeText={setEmail} value={email} />
      <Text>Password</Text>
      <TextInput secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
