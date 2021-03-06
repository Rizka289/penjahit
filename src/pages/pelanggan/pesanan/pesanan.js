import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Uihelper from '../../../models/Uihelper';
import Spinner from 'react-native-loading-spinner-overlay';
import { reload } from '../../../assets';
import styles from '../../../utils/styles/index'
import { colors } from '../../../utils/colors';
import Utils from '../../../components/atoms/Utils/func';


const Pesanan = ({ route, navigation }) => {
    const params = route.params;
    const [freload, isReload] = useState(false);
    const [pesanan, setPesanan] = useState({ success: true, message: null, data: { selesai: [], semua: [] }, el: { semua: [], selesai: [] } });
    const [loading, isLoading] = useState(true);
    const potoProfile = "https://penjahit.kamscodelab.tech/public/img/profile/" + params.poto
    useEffect(async () => {
        isLoading(true)
        await Uihelper.daftarPesanan().then(res => {
            if (res.success)
                setPesanan(res);
            isLoading(false)
        }).catch(() => {
            isLoading(false)
        });


    }, [freload]);
    const mapStatus = {
        'dipesan': 'Dipesan',
        'diterima': 'Pesanan Diterima',
        'dikerjakan': 'Pesanan sedang dikerjakan',
        'batal': 'Dibatalkan',
        'tolak': 'Ditolak',
        'selesai': 'Selesai'
    }
    const elSemuaPesanan = [];
    const elSelesaiPesanan = [];

    if (pesanan.data.semua.length > 0) {
        pesanan.data.semua.forEach(v => {
            elSemuaPesanan.push(
                <TouchableOpacity onPress={() => navigation.navigate("DetailPesanan", { ...v, role: params.role })} style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomColor: '#E1E5EA', borderBottomWidth: 2, height: 80, alignItems: 'center' }} key={v.id}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 50, borderColor: '#E1E5EA', borderWidth: 1 }} source={{ uri: Utils.imagePath(v.poto) }} />
                        <View>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: '#45526C' }}>{v.nama_lengkap}</Text>
                            <Text style={{ marginLeft: 10, fontSize: 12, color: colors.disable }}>{params.role == 'penjahit' ? v.pemesan : v.penjahit}</Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text style={{ marginRight: 10, fontSize: 17, color: '#45526C' }}>{mapStatus[v.status]}</Text>
                        <Text style={{ marginRight: 10, fontSize: 12, color: '#45526C' }}>{v.dibuat.substr(0, 10)}</Text>
                    </View>
                </TouchableOpacity>
            )
        });

    }

    if (pesanan.data.selesai.length > 0) {
        pesanan.data.selesai.forEach(v => {
            elSelesaiPesanan.push(
                <TouchableOpacity onPress={() => navigation.navigate("DetailPesanan", { ...v, role: params.role })} style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomColor: '#E1E5EA', borderBottomWidth: 2, height: 80, alignItems: 'center' }} key={v.id}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 50, borderColor: '#E1E5EA', borderWidth: 1 }} source={{ uri: Utils.imagePath(v.poto) }} />
                        <View>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: '#45526C' }}>{v.nama_lengkap}</Text>
                            <Text style={{ marginLeft: 10, fontSize: 12, color: colors.disable }}>{params.role == 'penjahit' ? v.pemesan : v.penjahit}</Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text style={{ marginRight: 10, fontSize: 17, color: '#45526C' }}>{mapStatus[v.status]}</Text>
                        <Text style={{ marginRight: 10, fontSize: 12, color: '#45526C' }}>{v.dibuat.substr(0, 10)}</Text>
                    </View>
                </TouchableOpacity>
            )
        });


    }



    const Semua = () => {
        return (
            <View style={{ backgroundColor: '#E1E5EA', flex: 1 }}>
                {
                    elSemuaPesanan.length == 0 ?
                        <TouchableOpacity onPress={() => isReload(!freload)}>
                            <Image style={{ width: 50, height: 50, marginVertical: '45%', alignSelf: 'center' }} source={reload} />
                        </TouchableOpacity>
                        : <ScrollView style={local_style.listContiner}>{elSemuaPesanan.map(e => e)}</ScrollView>

                }

            </ View>
        )
    };

    const Selesai = () => (
        <View style={{ backgroundColor: '#E1E5EA', flex: 1 }}>
            {
                elSelesaiPesanan.length == 0 ?
                    <TouchableOpacity onPress={() => isReload(!freload)}>
                        <Image style={{ width: 50, height: 50, marginVertical: '45%', alignSelf: 'center' }} source={reload} />
                    </TouchableOpacity>
                    : <ScrollView style={local_style.listContiner}>{elSelesaiPesanan.map(e => e)}</ScrollView>

            }

        </ View>
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

const local_style = {
    listContiner: {
        ...styles.shadow,
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 20
    }
}