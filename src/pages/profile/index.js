import { FlatList, Image, ScrollView, TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../utils";
import { camera, keranjang } from "../../assets";
import PenjahitModel from "../../models/Penjahit";
import ModalEl from "../../components/atoms/Utils/Modal";
import CircleButton from "../../components/atoms/Button/CircleButton";
import Utils from "../../components/atoms/Utils/func";
import ActionBttuon from "../../components/atoms/Button/ActionButton";
import Auth from "../../models/Auth";
import Uihelper from "../../models/Uihelper";


const Section = ({ button = null, option = {}, items = [], onPress = () => { }, style = {} }) => {
    if (!option.height)
        option.height = 55 * (items.length + 1);
    if (option.onAddClicked == undefined)
        option.onAddClicked = () => { }
    if (option.isNodata)
        option.height = 120;
    return (
        <View style={{ ...{ marginHorizontal: 25, marginVertical: 20 }, ...style }}>
            <Text style={{ color: '#6B778D', fontWeight: 'bold', fontSize: 17 }}>{option.section_name}</Text>
            <View style={{ ...styles.shadow, borderRadius: 10, backgroundColor: 'white', flex: 1, marginTop: 10, paddingVertical: 15 }}>
                {
                    items.length > 0 ? <ScrollView>{items}</ScrollView> : option.isNodata ?
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', marginVertical: 15, color: colors.disable }}>Tidak ada data</Text>
                        </View> : null
                }
            </View>
            {button}
        </View>
    )
}

const CardPenjahit = ({ navigation, params }) => {
    const [pesanan, setPesanan] = useState({
        semua: [],
        selesai: []
    })

    useEffect(async () => {
        const res = await Uihelper.daftarPesanan(params);
        setPesanan(res.data);
    }, [])
    return (
        <View style={[styles.simpleMenu, styles.shadow]}>
            <View >
                <Text style={{ color: '#393E46', textAlign: 'center' }}>Semua Pesanan</Text>
                <Text style={{ color: '#393E46', textAlign: 'center' }}>{pesanan.selesai.length} / {pesanan.semua.length}</Text>
            </View >
            <View>
                <Text style={{ color: '#393E46', textAlign: 'center' }}>Selesai</Text>
                <Text style={{ color: '#393E46', textAlign: 'center' }}>{pesanan.selesai.length}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Pesanan", { ...params, pesanan: pesanan })} style={{ backgroundColor: '#DDDDDD', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, shadowColor: '#000', shadowRadius: 10, elevation: 5, position: 'absolute', bottom: -10, left: '35%' }}>
                <Text style={{ color: '#706897', textAlign: 'center' }}>Lihat Pesanan</Text>
            </TouchableOpacity>
        </View>
    )
}

const CardPembeli = ({ openModalSemuaPesanan, openModalPesananSelesai, params, navigation }) => {
    const [pesanan, setPesanan] = useState({
        semua: [],
        selesai: []
    })

    useEffect(async () => {
        const res = await Uihelper.daftarPesanan(params);
        setPesanan(res.data);
    }, [])
    return (

        <View style={[styles.simpleMenu, styles.shadow]}>
            <View >
                <Text style={{ color: '#393E46', textAlign: 'center' }}>Semua Pesanan</Text>
                <Text style={{ color: '#393E46', textAlign: 'center' }}>{pesanan.selesai.length} / {pesanan.semua.length}</Text>
            </View >
            <View>
                <Text style={{ color: '#393E46', textAlign: 'center' }}>Selesai</Text>
                <Text style={{ color: '#393E46', textAlign: 'center' }}>{pesanan.selesai.length}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Pesanan", { ...params, pesanan: pesanan })} style={{ backgroundColor: '#DDDDDD', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, shadowColor: '#000', shadowRadius: 10, elevation: 5, position: 'absolute', bottom: -10, left: '35%' }}>
                <Text style={{ color: '#706897', textAlign: 'center' }}>Lihat Pesanan</Text>
            </TouchableOpacity>
        </View>
    )
};

const Profile = ({ route, navigation }) => {
    const [params, setParams] = useState(route.params)
    useEffect(async () => {
        const data = await Auth.loadData();
        setParams({ ...params, ...data })
    }, [])

    const key_mapping_profile = {
        alamat: ["Alamat"],
        email: ["E-mail"],
        hp: ['No Hp'],
        kelamin: ["Jenis Kelamin", { l: 'Laki-laki', p: 'Perempuan' }],
        ttl: ['Tanggal Lahir'],
    }
    const key_mapping_portofolio = {
        model: ["Model yang bisa dijahit", v => Utils.replaceAll(v, ';', ', ')],
        bahan: ["Bahan yang bisa dijahit", v => Utils.replaceAll(v, ';', ', ')],
        spesialisasi: ["Penjahit pakaian untuk", v => Utils.replaceAll(v, ';', ', ')],
        menyediakan_bahan: ["Menyediakan bahan", v => v == 1 ? "Ya" : "Tidak"],
        sertifikasi: ["Memiliki sertifikat", v => v == 1 ? "Ya" : "Tidak"],
        note: ["Catatan", v => v],
        pengalaman: ["Sudah menjahit selama", v => v < 12 ? v + " Bulan" : v % 12 == 0 ? Math.floor(v / 12) + " Tahun" : Math.floor(v / 12) + " Tahun, " + v % 12 + " Bulan"]
    }
    const profile = [];
    const keahlian = [];
    Object.keys(params).forEach(k => {
        if (k != 'portofolio' && key_mapping_profile[k]) {
            const tmp = {
                key: k,
                title: key_mapping_profile[k][0],
                value: key_mapping_profile[k][1] == undefined || key_mapping_profile[k][1] == {} ? params[k] : key_mapping_profile[k][1][params[k]]
            }
            if (k == 'alamat') {
                if (tmp.value.length > 65)
                    tmp.value = tmp.value.substr(0, 65) + ' ...';
            }

            profile.push(
                <View key={tmp.key} style={styles.section_item} >
                    <Text style={{ color: '#393E46' }}>{tmp.title}</Text>
                    <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{tmp.value}</Text>
                </View>
            );
        }
    });
    profile.push(
        <View key="_pass_" style={styles.section_item} >
            <Text style={{ color: '#393E46' }}>Password</Text>
            <Text style={{ marginLeft: 25, color: '#393E46' }} >*******</Text>
        </View>
    );

    if (Object.keys(params.portofolio).length != 0) {
        Object.keys(params.portofolio).forEach(k => {
            if (Object.keys(key_mapping_portofolio).includes(k)) {
                keahlian.push(
                    <View key={k} style={styles.section_item} >
                        <Text style={{ color: '#393E46' }}>{key_mapping_portofolio[k][0]}</Text>
                        <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{params.portofolio[k] != undefined ? key_mapping_portofolio[k][1](params.portofolio[k]) : ""}</Text>
                    </View>
                )
            }
        })
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#7C83FD', paddingVertical: 30 }}>
                <Image style={{ alignSelf: 'center', width: 80, height: 80, borderRadius: 50, borderColor: 'white', borderWidth: 1 }} source={{ uri: "https://penjahit.kamscodelab.tech/public/img/profile/" + params.poto }} />
                <TouchableOpacity onPress={() => navigation.navigate("UploadImage", params)} style={{ position: 'absolute', top: '45%', left: '50%', backgroundColor: 'rgba(0,0,0, 0.2)', width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                    <Image style={{ width: 35, height: 35 }} source={camera} />
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>{params.nama_lengkap.toUpperCase()}</Text>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, marginBottom: 30 }}>{params.username}</Text>
            </View>

            {
                params.role == 'penjahit' ? <CardPenjahit params={params} navigation={navigation} /> : <CardPembeli params={params} navigation={navigation} />
            }

            <View style={{ backgroundColor: '#F6F6F6', marginTop: -25, borderTopRightRadius: 30, borderTopLeftRadius: 30 }}>
                <View style={{ marginTop: 50 }}>
                    <Section
                        button={
                            <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile', params)} style={{ ...styles.shadow, justifyContent: 'center', paddingHorizontal: 5, borderRadius: 10, borderColor: '#2C2E43', borderWidth: 1, backgroundColor: 'white', position: 'absolute', bottom: -10, right: '30%', zIndex: 10 }}>
                                <Text style={{ color: '#B2B1B9', fontSize: 20, textAlign: 'center' }}>Edit Profile</Text>
                            </TouchableOpacity>
                        }

                        option={{ section_name: "Profile" }}
                        items={profile}
                    />
                    {params.role == 'penjahit' ?
                        <Section button={
                            params.portofolio == {} ?
                                <TouchableOpacity onPress={() => navigation.navigate('UpdatePortofolio', params)} style={{ ...styles.shadow, width: 35, height: 35, justifyContent: 'center', borderRadius: 100, borderColor: 'lightgrey', borderWidth: 1, backgroundColor: 'white', position: 'absolute', top: '50%', left: '45%', zIndex: 10 }}>
                                    <Text style={{ color: '#B2B1B9', fontSize: 24, textAlign: 'center' }}>+</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => navigation.navigate('UpdatePortofolio', params)} style={{ ...styles.shadow, justifyContent: 'center', paddingHorizontal: 5, borderRadius: 10, borderColor: '#2C2E43', borderWidth: 1, backgroundColor: 'white', position: 'absolute', bottom: -20, right: '30%', zIndex: 10 }}>
                                    <Text style={{ color: '#B2B1B9', fontSize: 20, textAlign: 'center' }}>Edit Keahlian</Text>
                                </TouchableOpacity>
                        }
                            option={{ section_name: "Keahlian", isNodata: params.portofolio == {}, onAddClicked: () => console.log("ADD") }}
                            items={keahlian}
                            style={{ marginBottom: 100 }}
                        />
                        : null}
                </View>

                <View style={{ alignItems: 'center' }} >
                    <ActionBttuon title={'Log Out'} onPress={async () => await Auth.logOut(navigation)} />
                </View>

            </View>
        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    section_item: {
        flex: 1,
        marginHorizontal: 20,
        borderBottomColor: '#F6F6F6',
        borderBottomWidth: 2,
        justifyContent: 'flex-end'
    },
    simpleMenu: {
        backgroundColor: 'white',
        zIndex: 99,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 25,
        position: 'absolute',
        top: 180,
    },
});
