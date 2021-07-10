import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import { logo } from '../../assets';
import Auth from '../../models/Auth';
import styles from '../../utils/styles';
import jwt_decode from "jwt-decode"

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(async () => {
      const token = await Auth.loadToken();
      if(token == '')
        navigation.replace('WelcomeAuth');
      else{
        const data = jwt_decode(token);
        if(Date.now() >= Date.parse(data.login_at))
          navigation.replace('WelcomeAuth');
        else
          navigation.replace('WelcomeAuth');

      }
    }, 2000);
  });
  return (
    <View style={styles.wrapper.page}>
      <Image source={logo} style={styles.wrapper.ilustration} />
    </View>
  );
};

export default Splash;
