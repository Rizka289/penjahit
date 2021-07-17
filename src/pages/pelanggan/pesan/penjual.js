import { FlatList, Image, ScrollView, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../../utils";
import { keranjang } from "../../../assets";
import PenjahitModel from "../../../models/Penjahit";
import ModalEl from "../../../components/atoms/Utils/Modal";
import Utils from "../../../components/atoms/Utils/func";

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
        // flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 20,
        marginVertical: 15,
        // alignItems: 'flex-end',
        borderBottomColor: '#F6F6F6',
        borderBottomWidth: 2
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
        top: 180
    }
});

const Section = ({ option = {}, items = [] }) => {
    if (!option.height)
        option.height = 55 * (items.length + 1);

    if (items.length == 0 && option.isNodata)
        option.height = 50;

    
    return (
        <View style={{ marginHorizontal: 25, marginVertical: 20 }}>
            <Text style={{ color: '#6B778D', fontWeight: 'bold', fontSize: 17 }}>{option.section_name}</Text>
            <View style={{ ...styles.shadow, borderRadius: 10, backgroundColor: 'white', flex: 1, marginTop: 10, overflow: 'scroll' }}>
                {items.length > 0 ? items : option.isNodata ? <Text style={{ textAlign: 'center', marginVertical: 15, color: colors.disable }}>Tidak ada data</Text> : null}
            </View>
        </View>
    )
}

const buatItemModal = (data) => {



}

const ProfilePenjual = ({ route, navigation }) => {
    const params = route.params;
    const elementPesananSaya = [];
    const pengalaman = !params.portofolio ? undefined : params.portofolio.pengalaman;
    const [openModal, setOpenModal] = useState(false);
    const [pesanan, setPesanan] = useState({
        saya: [],
        semua: []
    });
    const key_mapping = {
        alamat: ["Alamat"],
        email: ["E-mail"],
        hp: ['No Hp'],
        kelamin: ["Jenis Kelamin", { l: 'Laki-laki', p: 'Perempuan' }],
        ttl: ['Tanggal Lahir']
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
    useEffect(async () => {
        const data = await PenjahitModel.loadDataPesanan(params.username)
        console.log("Pesanan \n", data);
        setPesanan(data)
    }, []);
    const selesai = {
        saya: [],
        semua: []
    };

    if (pesanan.semua.length > 0) {
        if (pesanan.saya.length > 0) {
            selesai.saya = pesanan.saya.filter((v) => v.status == 'selesai');
            pesanan.saya.forEach(v => {
                elementPesananSaya.push(
                    <TouchableOpacity onPress={() => console.log(v)} key={v.id} style={{ paddingVertical: 5, paddingHorizontal: 20, borderBottomColor: '#F6F6F6', borderBottomWidth: 3, marginBottom: 15 }}>
                        <Text>Detail Pesanan</Text>
                        <View >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Id Pesanan</Text>
                                <Text style={{ marginLeft: 30 }}>{v.id}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Dipesan pada</Text>
                                <Text style={{ marginLeft: 30 }}>{v.dibuat}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Model</Text>
                                <Text style={{ marginLeft: 30 }}>{v.model}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Bahan</Text>
                                <Text style={{ marginLeft: 30 }}>{v.bahan}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Status</Text>
                                <Text style={{ marginLeft: 30 }}>{v.status}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )

            })
        }
        selesai.semua = pesanan.semua.filter((v) => v.status == 'selesai');
    }

    const profile = [];
    const keahlian = [];
    Object.keys(params).forEach(k => {
        if (k != 'portofolio' && key_mapping[k]) {
            const tmp = {
                key: k,
                title: key_mapping[k][0],
                value: key_mapping[k][1] == undefined || key_mapping[k][1] == {} ? params[k] : key_mapping[k][1][params[k]]
            }
            if (k == 'alamat') {
                if (tmp.value.length > 65)
                    tmp.value = tmp.value.substr(0, 65) + ' ...';
            }


            profile.push(
                <View key={tmp.key} style={styles.section_item} >
                    <Text style={{ color: '#393E46' }}>{tmp.title}</Text>
                    <Text style={{ marginLeft: 25, color: '#393E46' }} >{tmp.value}</Text>
                </View>
            );
        }
    });

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
            <View style={{ backgroundColor: params.color, paddingVertical: 30 }}>
                <Image style={{ alignSelf: 'center', width: 80, height: 80, borderRadius: 50, borderColor: 'white', borderWidth: 1 }} source={{ uri: params.poto }} />
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>{params.nama_lengkap.toUpperCase()}</Text>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, marginBottom: 30 }}>{params.username}</Text>
                {/* <Text style={{ color: 'white', textAlign: 'center', marginTop: 15, fontSize: 15 }}>{!pengalaman ? "- Bulan " : pengalaman < 12 ? pengalaman + " Bulan" : Math.floor(pengalaman / 12) + " Tahun, " + pengalaman % 12 + " Bulan"} Pengalaman sebagai penjahit </Text> */}
            </View>

            <View style={[styles.simpleMenu, styles.shadow]}>
                <View>
                    <Text style={{ color: '#393E46' }}>Semua Pesanan</Text>
                    <Text style={{ color: '#393E46' }}>{selesai.semua.length} / {pesanan.semua.length}</Text>
                </View>
                <TouchableOpacity onPress={() => setOpenModal(true)} style={{ marginLeft: 15 }}>
                    <Text style={{ color: '#393E46' }}>Pesanan Anda</Text>
                    <Text style={{ color: '#393E46' }}>{selesai.saya.length} / {pesanan.saya.length} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('FormPesan', params)} style={{ ...styles.shadow, top: 30, left: 30, backgroundColor: colors.info, borderRadius: 50, borderWidth: 1, borderColor: 'black', justifyContent: 'center' }}>
                    <Image style={{}} source={keranjang} />
                </TouchableOpacity>
            </View>
            <ModalEl subtitle={"Toko " + params.username} title={"Pesanan Saya"} open={openModal} openModal={setOpenModal} type="list_element" modalData={elementPesananSaya} />
            <View style={{ backgroundColor: '#F6F6F6', marginTop: -25, borderTopRightRadius: 20, borderTopLeftRadius: 30 }}>
                <View style={{ marginTop: 50 }}>
                    <Section option={{ section_name: "Profile" }} items={profile} />
                    <Section option={{ section_name: "Keahlian", isNodata: true }} items={keahlian} />
                </View>
            </View>
        </ScrollView>
    );
};

export default ProfilePenjual;
