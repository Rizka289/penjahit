import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Select2 from 'react-select2-native';
import { logo } from '../../assets';
import ActionBttuon from '../../components/atoms/Button/ActionButton';
import Auth from '../../models/Auth';
import Uihelper from '../../models/Uihelper';
import { colors } from '../../utils';
import styles from '../../utils/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';
import TagInput from 'react-native-tags-input';
import PenjahitModel from '../../models/Penjahit';


const Portofilio = ({ route, navigation }) => {
    const [loading, isLoading] = useState(false);
    const params = route.params;
    const portofolio = params.portofolio;
    const key_mapping_profile = ["alamat", "email", "hp", "kelamin", "ttl"];
    const [message, setMessage] = useState(null)
    const [body, setBody] = useState({
        sertifikasi: portofolio != {} && portofolio.sertifikasi != undefined ? parseInt(portofolio.sertifikasi) : 0,
        pengalaman:  portofolio != {} && portofolio.pengalaman != undefined ? portofolio.pengalaman : "0",
        menyediakan_bahan:  portofolio != {} && portofolio.menyediakan_bahan != undefined ? parseInt(portofolio.menyediakan_bahan) : 0,
        model: {
            tagsArray: portofolio != {} &&  portofolio.model != undefined ? portofolio.model.split(';') : []
        },
        bahan: {
            tagsArray: portofolio != {} && portofolio.bahan != undefined ? portofolio.bahan.split(';') : []

        },
        spesialisasi: {
            tagsArray: portofolio != {} && portofolio.spesialisasi != undefined ? portofolio.spesialisasi.split(';') : []

        },
        note:  portofolio != {} && portofolio.sertifikasi != undefined ? portofolio.note : ""
    });
    const sendData = async () => {
        isLoading(true)
        const res = await PenjahitModel.updatePortofolio(body);
        console.log("RES \n", res);
        if (res.success) {
            const data = await Auth.loadData('_token_');
            setMessage(null);
            setTimeout(() => { isLoading(false); navigation.navigate("Profile", data) }, 5000);
        } else {
            setMessage(res.message);
            isLoading(false)
        }
        isLoading(false)
    }

    return (
        <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={logo} style={styles.wrapper.ilustration} />
                <Text style={styles.text.welcome}>Lengkapi portofolio anda</Text>
            </View>
            <View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Pengalaman Menjahit <Text style={{ fontSize: 12, color: colors.disable }}>(Masukkan dalam bulan)</Text></Text>
                    <TextInput placeholder={"Dalam Bulan"} keyboardType={'number-pad'} defaultValue={body.pengalaman} onChangeText={v => setBody({ ...body, pengalaman: v })} style={styles.form.formControl} />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Menyediakan Bahan</Text>
                    <Picker selectedValue={body.menyediakan_bahan} onValueChange={(v) => setBody({ ...body, menyediakan_bahan: v })} style={styles.form.formControl} >
                        <Picker.Item value={1} label={"Ya"} />
                        <Picker.Item value={0} label={"Tidak"} />
                    </Picker>
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Memiliki Sertifikat</Text>
                    <Picker selectedValue={body.sertifikasi} onValueChange={(v) => setBody({ ...body, sertifikasi: v })} style={styles.form.formControl} >
                        <Picker.Item value={1} label={"Ya"} />
                        <Picker.Item value={0} label={"Tidak"} />
                    </Picker>
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={{ ...styles.form.label, marginBottom: 0 }}>Model yang bisa dijahit</Text>
                    <TagInput labelStyle={{ marginLeft: 20, color: colors.disable }} label={"Contoh: Gaun, Rok"} tagStyle={{ height: 50, paddinVertical: 4 }} keysForTag={","} placeholder={"Pisahkan dengan koma"} inputContainerStyle={local_styles.tagInput} tags={body.model} updateState={(v) => setBody({ ...body, model: v })} />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={{ ...styles.form.label, marginBottom: 0 }}>Bahan yang bisa dijahit</Text>
                    <TagInput labelStyle={{ marginLeft: 20, color: colors.disable }} label={"Contoh: Katun, Organdi"} tagStyle={{ height: 50, paddinVertical: 4 }} keysForTag={","} placeholder={"Pisahkan dengan koma"} inputContainerStyle={local_styles.tagInput} tags={body.bahan} updateState={(v) => setBody({ ...body, bahan: v })} />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={{ ...styles.form.label, marginBottom: 0 }}>Anda bisa Menjahit untuk siapa saja</Text>
                    <TagInput labelStyle={{ marginLeft: 20, color: colors.disable }} label={"Contoh: Wanita, Anak-anak"} tagStyle={{ height: 50, paddinVertical: 4 }} keysForTag={","} placeholder={"Pisahkan dengan koma"} inputContainerStyle={local_styles.tagInput} tags={body.spesialisasi} updateState={(v) => setBody({ ...body, spesialisasi: v })} />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Catatan</Text>
                    <TextInput multiline={true} numberOfLines={3} placeholder={"Catatan akan ditampilkan kepada calon pelanggan"} defaultValue={body.note} onChangeText={v => setBody({ ...body, note: v })} style={styles.form.formControl} />
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <ActionBttuon onPress={sendData} title={"Simpan"} />
            </View>
        </ScrollView>
    );
}

export default Portofilio;

const local_styles = {
    hide: {
        display: 'none'
    },
    show: {
        textAlign: "center", color: "red", fontSize: 10
    },
    tagInput: {
        height: 43,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    }
}