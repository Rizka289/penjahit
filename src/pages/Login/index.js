import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { logo } from '../../assets';
import styles from '../../utils/styles';
import ActionBttuon from '../../components/atoms/Button/ActionButton';
import Auth from '../../models/Auth';
import { useState } from 'react';

const Login = ({navigation}) => {
  const [message, setMessage] = useState(null);
  let email = "", password = "";

  const handleGoTo = screen => {
    navigation.navigate(screen);
  };
  
  const sendData = async () => {
    const results = await Auth.login(email, password);
    if(!results.success)
      setMessage(results.message);
    else
      setMessage("")
  }
  return (
    <View style={{ backgroundColor: 'white', flex: 1}}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={logo} style={styles.wrapper.ilustration} />
        <Text style={styles.text.welcome}>Masuk</Text>
      </View>
      <View style={styles.form.formGroup}>
        <Text style={styles.form.label}>Email</Text>
        <TextInput onChangeText={v => email = v} style={styles.form.formControl} />
      </View>
      <View style={styles.form.formGroup}>
        <Text style={styles.form.label}>Password</Text>
        <TextInput onChangeText={v => password = v} style={styles.form.formControl} />
      </View>
      <Text style={{textAlign:"center", color: "red", fontSize: 10}}>{message}</Text>
      <View style={{marginHorizontal: '25%'}}>
        <ActionBttuon onPress={sendData} title="Login"  />
      </View>
      <Text style={{marginHorizontal: 15}} onPress={() => handleGoTo('Register')} >Lupa Password .?</Text>

    </View>
  );
};

export default Login;
