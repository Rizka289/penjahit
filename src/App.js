import React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Router from './router';
import SidebarPelanggan from './components/atoms/Button/Sidebar.Pelanggan';

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
});

export default App;
