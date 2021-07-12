import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash, Login, Register, WelcomeAuth } from '../pages';
import { DrawerButton, Text } from 'react-native';
import HalamanPesan from '../pages/pelanggan/pesan';
import DashbordPelanggan from '../pages/pelanggan/dashboard';
import SidebarPelanggan from '../components/atoms/Button/Sidebar.Pelanggan';
import { Button } from '../components';
import ProfileAvatar from '../components/atoms/Button/Profile';
import { colors } from '../utils';
import ProfilePenjual from '../pages/Profile/penjual';
// import ProfileAvatar from 

const Stack = createStackNavigator();

// kumpulan aviigasi" antar halaman
const Router = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen options={{}} name="Order" component={HalamanPesan} /> */}
      <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Pelanggan" component={DashbordPelanggan}
        options={(nav) => ({
          title: "Consuo",
          headerStyle: {
            backgroundColor: colors.default,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (<ProfileAvatar navigation={nav.navigation}/>)

        })}
      />
      <Stack.Screen
        name="PofilePenjahit" component={ProfilePenjual}
        options={({nav}) => ({
          title: "Consuo",
          headerStyle: {
            backgroundColor: colors.default,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (<ProfileAvatar navigation={nav.navigation} />)

        })}
      />
      <Stack.Screen
        name="WelcomeAuth"
        component={WelcomeAuth}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
