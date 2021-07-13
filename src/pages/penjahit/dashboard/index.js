import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import Alert from "../../../components/atoms/Utils/Alert"
import Auth from "../../../models/Auth";

const DashboardPenjahit = ({navigation}) => {
    const [profile, setProfile] = useState({});
    useEffect(async () => {
        const data = await Auth.loadData('_token_');        
        setProfile({...profile, ...data});
    });
    return (
        <View>            
            {profile.portofolio == {} ? <Alert onPress={() => console.log("Lengkapi Data")} style={'warning'} text={"Lengkapi portofolio anda untuk memudahkan calon pelanggan anda"} /> : null}
        </View>
    );
}

export default DashboardPenjahit;