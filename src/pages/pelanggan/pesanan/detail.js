import {Image, ScrollView, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../../utils";
import Utils from "../../../components/atoms/Utils/func";
import Spinner from "react-native-loading-spinner-overlay";
import Auth from "../../../models/Auth";
import Toast from "react-native-simple-toast";

const DetailPesanan = ({ route, navigation }) => {
    const params = route.params;
    const [loading, isLoading] = useState(false);
    const [wilayah, setWilayah] = useState({
        kab: "-",
        kec: '-',
        desa: "-"
    });
    const mapStatus = {
        'dipesan': 'Dipesan',
        'diterima': 'Pesanan Diterima',
        'dikerjakan': 'Pesanan sedang dikerjakan',
        'batal': 'Pesaan Dibatalkan',
        'tolak': 'Pesanan Ditolak',
        'selesai': 'Pesanan Selesai'
    }
    console.log(params);
    useEffect(async () => {
        if (!Utils.isEmpty(params.kode_wilayah)) {
            let temp = {}
            await fetch("https://penjahit.kamscodelab.tech/uihelper/getwilayahnama/" + params.kode_wilayah).then(async res => {
                const data = await res.json();
                console.log("WIL \n", data);
                const mapping = {
                    '4': 'desa',
                    '3': 'kec',
                    '2': 'kab'
                };
                Object.keys(data).forEach(k => {
                    temp[mapping[data[k].level]] = data[k].nama
                })

                setWilayah(temp);
            })
        }

    }, [])

    const sendData = async (action = 'batal') => {
        isLoading(true);
        const token = await Auth.loadToken()
        await fetch("https://penjahit.kamscodelab.tech/pesanan/status/", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _token: token, pemesan: params.pemesan, pesanan: params.id, status_baru: action})
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if(res.type == 'success')
                params.status = action
            isLoading(false);
            Toast.show(res.message)
        }).catch(() => {isLoading(false)})
    }
    const genButton = () => {
        let buttons = [];
        const status = params.status;
        const role = params.role;

        if ((status == 'dipesan' || status == 'diterima') && role == 'pelanggan')
            return [<TouchableOpacity key="batal" onPress={() => sendData('batal')} style={{ backgroundColor: '#EEEEEE', width: 70, justifyContent: 'center', borderRadius: 25, paddingVertical: 5, position: 'absolute', left: '42%', bottom: -15, borderBottomColor: '#BDC7C9', borderBottomWidth: 1, borderLeftColor: '#BDC7C9', borderLeftWidth: 1, borderRightColor: '#BDC7C9', borderRightWidth: 1 }}>
                <Text style={{ color: colors.danger, textAlign: 'center' }} >Batalkan</Text>
            </TouchableOpacity>]


        if (role == 'penjahit') {
            switch (status) {
                case "dipesan":
                    buttons.push(<TouchableOpacity key="terima" onPress={() => sendData('diterima')} style={{ backgroundColor: '#EEEEEE', width: 70, justifyContent: 'center', borderRadius: 25, paddingVertical: 5, position: 'absolute', left: '25%', bottom: -15, borderBottomColor: '#BDC7C9', borderBottomWidth: 1, borderLeftColor: '#BDC7C9', borderLeftWidth: 1, borderRightColor: '#BDC7C9', borderRightWidth: 1 }}>
                        <Text style={{ color: colors.success, textAlign: 'center' }} >Terima</Text>
                    </TouchableOpacity>);

                    buttons.push(
                        <TouchableOpacity key="tolak" onPress={() => sendData('tolak')} style={{ backgroundColor: '#EEEEEE', width: 70, justifyContent: 'center', borderRadius: 25, paddingVertical: 5, position: 'absolute', left: '65%', bottom: -15, borderBottomColor: '#BDC7C9', borderBottomWidth: 1, borderLeftColor: '#BDC7C9', borderLeftWidth: 1, borderRightColor: '#BDC7C9', borderRightWidth: 1 }}>
                            <Text style={{ color: colors.danger, textAlign: 'center' }} >Tolak</Text>
                        </TouchableOpacity>
                    );

                    break;
                case "diterima":
                    buttons.push
                        (
                            <TouchableOpacity key="kerjakan" onPress={() => sendData('dikerjakan')} style={{ backgroundColor: '#EEEEEE', width: 70, justifyContent: 'center', borderRadius: 25, paddingVertical: 5, position: 'absolute', left: '42%', bottom: -15, borderBottomColor: '#BDC7C9', borderBottomWidth: 1, borderLeftColor: '#BDC7C9', borderLeftWidth: 1, borderRightColor: '#BDC7C9', borderRightWidth: 1 }}>
                                <Text style={{ color: colors.success, textAlign: 'center' }} >Kerjakan</Text>
                            </TouchableOpacity>
                        );
                    break;

                case "dikerjakan":
                    buttons.push
                        (
                            <TouchableOpacity key="selesai" onPress={() => sendData('selesai')} style={{ backgroundColor: '#EEEEEE', width: 70, justifyContent: 'center', borderRadius: 25, paddingVertical: 5, position: 'absolute', left: '42%', bottom: -15, borderBottomColor: '#BDC7C9', borderBottomWidth: 1, borderLeftColor: '#BDC7C9', borderLeftWidth: 1, borderRightColor: '#BDC7C9', borderRightWidth: 1 }}>
                                <Text style={{ color: colors.success, textAlign: 'center' }} >Selesai</Text>
                            </TouchableOpacity>
                        );
                    break

            }
        }

        return buttons
    }
    const buttons = genButton();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ backgroundColor: '#126E82', paddingVertical: 30 }}>
                <Image style={{ alignSelf: 'center', width: 80, height: 80, borderRadius: 50, borderColor: 'white', borderWidth: 1 }} source={{ uri: Utils.imagePath(params.poto) }} />
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>{params.nama_lengkap.toUpperCase()}</Text>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 15, marginBottom: 30 }}>{params.role == 'penjahit' ? params.pemesan : params.penjahit}</Text>
            </View>

            <View style={[styles.simpleMenu, styles.shadow]}>
                <Text style={{ color: '#393E46', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Status Pesanan</Text>
                <Text style={{ color: colors.disable, fontSize: 17, textAlign: 'center' }}>{mapStatus[params.status]}</Text>
                {
                    buttons
                }
            </View>
            {/* <ModalEl styles={{height: 70}} subtitle={"Toko " + params.username} title={"Pesanan Saya"} open={openModal} openModal={setOpenModal} type="list_element" modalData={MenuPesanan} /> */}
            <View style={{ backgroundColor: '#F6F6F6', marginTop: -25, borderTopRightRadius: 20, borderTopLeftRadius: 30 }}>
                <View style={{ marginTop: 70 }}>
                    <View style={{ marginHorizontal: 25, marginVertical: 35 }}>
                        <Text style={{ color: '#6B778D', fontWeight: 'bold', fontSize: 17 }}>Detail Pesanan <Text style={{fontSize: 13, color: colors.disable}}>Id: {params.id}</Text></Text>
                        <View style={{ ...styles.shadow, paddingVertical: 25, paddingHorizontal: 20, borderRadius: 10, backgroundColor: 'white', flex: 1, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>Tanggal Pesan</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{params.dibuat.substr(0, 10)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>Bahan Yang digunakan</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{Utils.capitalize(params.bahan)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>Sumber bahan</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{params.bahan_sendiri == 1 ? "Dibawa sendiri" : "Disediakan penjahit"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>Model Yang akan dibuat</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{Utils.capitalize(params.model)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={{ marginHorizontal: 25, marginVertical: 35 }}>
                        <Text style={{ color: '#6B778D', fontWeight: 'bold', fontSize: 17 }}>{params.role == 'pelanggan' ? "Detail Penjahit" : "Detail Pemesan"} <Text style={{fontSize: 13, color: colors.disable}}> {params.role == 'pelanggan' ? "Nama Toko: " + params.penjahit : "Username: " + params.pemesan}</Text></Text>
                        <View style={{ ...styles.shadow, paddingVertical: 25, paddingHorizontal: 20, borderRadius: 10, backgroundColor: 'white', flex: 1, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>{params.role == 'pelanggan' ? 'Nama Penjahit' : 'Nama Pemesan'}</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{params.nama_lengkap}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>Nomor Hp</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{params.hp}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>Email</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{params.email}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>Kabupaten</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{wilayah.kab}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>Kecamatan</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{wilayah.kec}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>Kelurahan/ Desa</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{wilayah.desa}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15, borderBottomWidth: 4, borderBottomColor: '#F6F6F6' }} >
                                <Text style={{ color: '#393E46' }}>Alamat Lengkap</Text>
                                <Text style={{ marginLeft: 25, color: '#B2B1B9' }} >{params.alamat}</Text>
                            </View>
                            
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default DetailPesanan;
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
        justifyContent: 'center',
        width: '70%',
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 25,
        position: 'absolute',
        top: 180
    }
});
