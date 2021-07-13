import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../utils";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 15,
        alignItems: 'flex-end',
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

    if (option.isNodata)
        option.height = 50;
    return (
        <View style={{ marginHorizontal: 25, marginVertical: 20 }}>
            <Text style={{ color: '#6B778D', fontWeight: 'bold', fontSize: 17 }}>{option.section_name}</Text>
            <View style={{ ...styles.shadow, borderRadius: 10, backgroundColor: 'white', flex: 1, marginTop: 10, height: option.height, overflow: 'scroll' }}>
                {items.length > 0 ? items : option.isNodata ? <Text style={{ textAlign: 'center', marginVertical: 15, color: colors.disable }}>Tidak ada data</Text> : null}
            </View>
        </View>
    )
}

const ProfilePenjual = ({ route, navigation }) => {
    const params = route.params;
    const pengalaman = !params.portofolio ? undefined : params.portofolio.pengalaman;

    const key_mapping = {
        alamat: ["Alamat"],
        email: ["E-mail"],
        hp: ['No Hp'],
        kelamin: ["Jenis Kelamin", { l: 'Laki-laki', p: 'Perempuan' }],
        ttl: ['Tanggal Lahir']
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
                tmp.value += "aljkaihakbakjbgfajbjabga";
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

    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ backgroundColor: params.color, paddingVertical: 30 }}>
                <Image style={{ alignSelf: 'center', width: 80, height: 80, borderRadius: 50, borderColor: 'white', borderWidth: 1 }} source={{ uri: params.poto }} />
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>{params.nama_lengkap.toUpperCase()}</Text>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>{params.username}</Text>
                <Text style={{ color: 'white', textAlign: 'center', marginTop: 15, fontSize: 15 }}>{!pengalaman ? "- Bulan " : pengalaman < 12 ? pengalaman + " Bulan" : Math.floor(pengalaman / 12) + " Tahun, " + pengalaman % 12 + " Bulan"} Pengalaman sebagai penjahit </Text>
            </View>
            <View style={[styles.simpleMenu, styles.shadow]}>
                <View>
                    <Text style={{color: '#393E46' }}>Riwayat Pesanan</Text>
                    <Text style={{color: '#393E46' }}>70/86</Text>
                </View>
                <View>
                    <Text style={{color: '#393E46' }}>Pesanan Anda</Text>
                    <Text style={{color: '#393E46' }}>0/0  <FontAwesome style={{fontSize: 20, color: colors.default}} onPress={() => {console.log("TAMBAH")}} name={'plus-circle'} /></Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#F6F6F6', marginTop: -30, borderTopRightRadius: 20, borderTopLeftRadius: 30 }}>
                <View style={{ marginTop: 50 }}>
                    <Section option={{ section_name: "Profile" }} items={profile} />
                    <Section option={{ section_name: "Keahlian", isNodata: true }} items={keahlian} />
                </View>
            </View>
        </ScrollView>
    );
};

export default ProfilePenjual;
