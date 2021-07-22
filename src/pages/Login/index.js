import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { logo } from '../../assets';
import styles from '../../utils/styles';
import ActionBttuon from '../../components/atoms/Button/ActionButton';
import Auth from '../../models/Auth';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = ({ navigation }) => {
  const [loading, isLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [body, setBody] = useState({
    email: "",
    password: ""
  });

  const handleGoTo = screen => {
    navigation.replace(screen);
  };

  const sendData = async () => {
    isLoading(true);
    const results = await Auth.login(body.email, body.password);
    console.log(results);
    if (!results.success){
      isLoading(false);
      setMessage(results.message);
    }
    else {
      const data = await jwtDecode(results.message);
      navigation.replace(data.role.charAt(0).toUpperCase() + data.role.slice(1));
    }
  }
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={logo} style={styles.wrapper.ilustration} />
        <Text style={styles.text.welcome}>Masuk</Text>
      </View>
      <View style={styles.form.formGroup}>
        <Text style={styles.form.label}>Email</Text>
        <TextInput defaultValue={body.email} onChangeText={v => setBody({...body, email: v})} style={styles.form.formControl} />
      </View>
      <View style={styles.form.formGroup}>
        <Text style={styles.form.label}>Password</Text>
        <TextInput defaultValue={body.password} onChangeText={v => setBody({...body, password: v})} style={styles.form.formControl} />
      </View>
      <Text style={{ textAlign: "center", color: "red", fontSize: 10 }}>{message}</Text>
      <View style={{ marginHorizontal: '25%' }}>
        <ActionBttuon onPress={sendData} title="Login" />
      </View>
      <Text style={{ marginHorizontal: 15 }} onPress={() => handleGoTo('LupaPassword')} >Lupa Password .?</Text>

    </View>
  );
};

export default Login;
