import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash, Login, Register, WelcomeAuth } from '../pages';
import DashbordPelanggan from '../pages/pelanggan/dashboard';
import ProfileAvatar from '../components/atoms/Button/Profile';
import { colors } from '../utils';
import ProfilePenjual from '../pages/pelanggan/pesan/penjual';
import DashboardPenjahit from '../pages/penjahit/dashboard';
import FormPesan from '../pages/pelanggan/pesan';
import Profile from '../pages/profile';
import UpdateProfile from '../pages/profile/update';
import Portofilio from '../pages/profile/portofolio';
import UploadImage from '../pages/profile/upload.image';
import Pesanan from '../pages/pelanggan/pesanan/pesanan';
import DetailPesanan from '../pages/pelanggan/pesanan/detail';

const Stack = createStackNavigator();

// kumpulan aviigasi" antar halaman
const Router = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen options={{}} name="Order" component={HalamanPesan} /> */}
      <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="FormPesan" component={FormPesan} />
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
          headerRight: () => (<ProfileAvatar navigation={nav.navigation} />)

        })}
      />
      <Stack.Screen
        name="Penjahit" component={DashboardPenjahit}
        options={(nav) => ({
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
        name="PofilePenjahit" component={ProfilePenjual}
        options={(nav) => ({
          title: "Consuo",
          headerStyle: {
            backgroundColor: colors.default,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (<ProfileAvatar navigation={(nav.navigation)} />)

        })}
      />
      <Stack.Screen
        name="WelcomeAuth"
        component={WelcomeAuth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ 
           headerTransparent: true,
           title: ""
        }}

      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        
      />
       <Stack.Screen
        name="UpdatePortofolio"
        component={Portofilio}
        
      />
         <Stack.Screen
        name="UploadImage"
        component={UploadImage}
        
      />
         <Stack.Screen
        name="Pesanan"
        component={Pesanan}
        options={{headerTransparent: true}}
      />
         <Stack.Screen
        name="DetailPesanan"
        component={DetailPesanan}
        options={{headerTransparent: true, title:""}}
      />
    </Stack.Navigator>
  );
};

export default Router;
