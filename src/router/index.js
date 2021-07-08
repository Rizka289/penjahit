import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Splash, Login, Register, WelcomeAuth} from '../pages';
import HalamanPesan from '../pages/pelanggan/pesan';

const Stack = createStackNavigator();

// kumpulan aviigasi" antar halaman
const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{}} name="Order" component={HalamanPesan} />
      <Stack.Screen options={{ headerShown: false}} name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="WelcomeAuth"
        component={WelcomeAuth}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
