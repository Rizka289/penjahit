import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { logo } from '../../../assets';
import styles from '../../../utils/styles';
import Auth from '../../../models/Auth';
import { colors } from '../../../utils';
import { FlatGrid } from 'react-native-super-grid';
import PenjahitModel from '../../../models/Penjahit';
import Alert from '../../../components/atoms/Utils/Alert';
import Spinner from 'react-native-loading-spinner-overlay';


const DashbordPelanggan = ({ navigation }) => {
    const [loading, isLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [reload, reloadPage] = useState(false);
    const [profile, setProfile] = useState({})

    useEffect(async () => {
        BackHandler.addEventListener('hardwareBackPress', async () => await Auth.mustLogin(navigation))
        const data = await Auth.loadData()
        const penjahit = await PenjahitModel.getAllPenjahit();
        const tmp = { ...data, penjahit: penjahit }
        isLoading(false);
        setProfile(tmp)
        console.log("Penjahit _inner", tmp.penjahit);

    }, [reload])

    console.log("Penjahit", profile.penjahit);

    const [items, setItems] = useState(profile.penjahit);
    console.log("ITEMS", items);
    let email = "", password = "";

    const handleGoTo = (screen, params = {}) => {
        navigation.navigate(screen, params);
    };

    const searchPenjahit = (key) => {
        if (key == "")
            setItems(profile.penjahit);
        else {
            let item = profile.penjahit.filter((v, i) => v.nama_lengkap.toLowerCase().includes(key.toLowerCase()) || v.username.toLowerCase().includes(key.toLowerCase()));
            setItems(item);
        }

    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={logo} style={styles.wrapper.ilustration} />
                <Text style={styles.text.welcome}>{profile.nama_lengkap}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ color: colors.default, marginLeft: 20 }}>Pilih penjahit andalanmu</Text>
                <TextInput onChangeText={searchPenjahit} style={styles.form.formControl} />
                {(items != undefined && items.length > 0) || (profile.penjahit != undefined && profile.penjahit.length > 0) ? <FlatGrid
                    itemDimension={130}
                    data={items || profile.penjahit}
                    style={styles.gridView}

                    spacing={10}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleGoTo("PofilePenjahit", item)} style={[{ ...local_styles.itemContainer, ...styles.shadow }, { backgroundColor: item.color }]}>
                            <Image style={{ width: 60, height: 60, position: 'absolute', top: 10, left: 10, borderRadius: 50, borderColor: 'white', borderWidth: 1 }} source={{ uri: item.poto }} />
                            <Text style={local_styles.itemName}>{item.nama_lengkap}</Text>
                            <Text style={local_styles.itemCode}>{item.username}</Text>
                        </TouchableOpacity>
                    )}
                /> : <Alert onPress={() => reloadPage(true)} text={"Tidak ada penjual yang ditemukan, Click untuk reload halaman"} style={'info'} />}
            </View>
        </View>
    );
};

const local_styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});

export default DashbordPelanggan;
