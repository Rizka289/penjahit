import React, { useEffect, useState } from "react"
import { BackHandler, Text, View } from "react-native"
import Alert from "../../../components/atoms/Utils/Alert"
import Auth from "../../../models/Auth";

const DashboardPenjahit = ({navigation}) => {
    const [profile, setProfile] = useState({
        portofolio: {}
    });
    useEffect(async () => {
        const data = await Auth.loadData('_token_'); 
        // BackHandler.addEventListener('hardwareBackPress', async () => await Auth.mustLogin(navigation))
        BackHandler.addEventListener('hardwareBackPress', () => false)
        
        if(data == null)
            navigation.replace("Splash")    
        setProfile({...profile, ...data});
    }, []);

    return (
        <View>            
            {Object.keys(profile.portofolio).length == 0 ? <Alert onPress={() => navigation.navigate("UpdatePortofolio", profile)} style={'warning'} text={"Lengkapi portofolio anda untuk memudahkan calon pelanggan anda"} /> : null}
        </View>
    );
}

export default DashboardPenjahit;