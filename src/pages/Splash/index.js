import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import { logo } from '../../assets';
import styles from '../../utils/styles';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('WelcomeAuth');
    }, 2000);
  });
  return (
    <View style={styles.wrapper.page}>
      <Image source={logo} style={styles.wrapper.ilustration} />
    </View>
  );
};

export default Splash;
