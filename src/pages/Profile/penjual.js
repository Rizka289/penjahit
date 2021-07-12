import { ScrollView, Text } from "react-native";
import React from "react";
const ProfilePenjual = ({route, navigation}) => {
    const params = route.params;
    
    return (
        <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
            <Text>{params.name}</Text>
        </ScrollView>
    );
};

export default ProfilePenjual;