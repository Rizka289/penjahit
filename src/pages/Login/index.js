import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { logo } from '../../assets';
import styles from '../../utils/styles';
import ActionBttuon from '../../components/atoms/Button/ActionButton';

const Login = ({navigation}) => {
  const handleGoTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <View style={{ backgroundColor: 'white', flex: 1}}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={logo} style={styles.wrapper.ilustration} />
        <Text style={styles.text.welcome}>Masuk</Text>
      </View>
      <View style={styles.form.formGroup}>
        <Text style={styles.form.label}>Email</Text>
        <TextInput style={styles.form.formControl} />
      </View>
      <View style={styles.form.formGroup}>
        <Text style={styles.form.label}>Password</Text>
        <TextInput style={styles.form.formControl} />
      </View>

      <View style={{marginHorizontal: '25%'}}>
        <ActionBttuon title="Login"  />
      </View>
      <Text style={{marginHorizontal: 15}} onPress={() => handleGoTo('Register')} >Lupa Password .?</Text>

    </View>
  );
};

export default Login;
