import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Auth from '../../../models/Auth';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useEffect } from 'react/cjs/react.development';
import Uihelper from '../../../models/Uihelper';
import Spinner from 'react-native-loading-spinner-overlay';
import { reload } from '../../../assets';

const Pesanan = ({ route, navigation }) => {
    const params = route.params;
    // const [reload, isReload] = useState
    const [pesanan, setPesanan] = useState({success: true, message: null, data:{ selesai: [], semua: [] }});
    const [loading, isLoading] = useState(true);
    const potoProfile = "https://penjahit.kamscodelab.tech/public/img/profile/" + params.poto
    useEffect(async () => {
        isLoading(true)
        const p = await Uihelper.daftarPesanan(params.username);
        isLoading(false)

    }, []);
    const Semua = () => (
        <ScrollView style={{ backgroundColor: '#0C4271', flex: 1}}>
            {pesanan.success ? <TouchableOpacity > <Image style={{width: 50, height: 50, marginVertical: '45%', alignSelf: 'center'}} source={reload} /></TouchableOpacity> : null}
        </ ScrollView>
    );

    const Selesai = () => (
        <ScrollView style={{ backgroundColor: '#0C4271', }}>
        </ ScrollView>
    );
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Semua' },
        { key: 'second', title: 'Selesai' },
    ]);
    const renderScene = SceneMap({
        first: Semua,
        second: Selesai,
    });
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
             <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ backgroundColor: '#7C83FD', paddingVertical: 30 }}>
                <Image style={{ alignSelf: 'center', width: 80, height: 80, borderRadius: 50, borderColor: 'white', borderWidth: 1 }} source={{ uri: potoProfile }} />
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>{params.nama_lengkap.toUpperCase()}</Text>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, marginBottom: 30 }}>{params.username}</Text>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                
            />
        </View>
    );
};

export default Pesanan;