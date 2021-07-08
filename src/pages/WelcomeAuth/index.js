import React from 'react';
import {View, Text, Image} from 'react-native';
// import {color} from 'react-native-reanimated';
import {logo} from '../../assets';
import ActionBttuon from '../../components/atoms/Button/ActionButton';
import styles from '../../utils/styles';


const WelcomeAuth = ({navigation}) => {
  const handleGoTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.wrapper.page}>
      <Image source={logo} style={styles.wrapper.ilustration} />
      <Text style={styles.text.welcome}>Selamat Datang di Consuo Jahit</Text>
      <ActionBttuon
        desc="Silahkan masuk, jika anda sudah memiliki akun"
        title="Masuk"
        onPress={() => handleGoTo('Login')}
      />
      <ActionBttuon
        desc="Atau, silahkan daftar jika anda belum memiliki akun"
        title="Daftar"
        onPress={() => handleGoTo('Register')}
      />
    </View>
  );
};

export default WelcomeAuth;
