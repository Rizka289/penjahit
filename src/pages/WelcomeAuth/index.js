import React from 'react';
import {View, Text, Image} from 'react-native';
// import {color} from 'react-native-reanimated';
import {welcomeAuth} from '../../assets';
import {colors} from '../../utils';
import ActionBttuon from './ActionButton';

const WelcomeAuth = ({navigation}) => {
  const handleGoTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.wrapper.page}>
      <Image source={welcomeAuth} style={styles.wrapper.ilustration} />
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
const styles = {
  wrapper: {
    page: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      flex: 1,
    },
    ilustration: {
      width: 219,
      height: 119,
      marginBottom: 7,
    },
  },
  text: {
    welcome: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.default,
      marginBottom: 76,
    },
  },
};
export default WelcomeAuth;
