import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react'
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

const UpdateProfile = ({ route, navigation }) => {
    const [loading, isLoading] = useState(false);
    const [daftarKec, setDaftarKec] = useState([]);
    const [daftarDesa, setDaftarDesa] = useState([]);
    const params = route.params;
    const key_mapping_profile = ["alamat", "email", "hp", "kelamin", "ttl"];
    const [message, setMessage] = useState(null)
    const [tampilPassword, setTampilPassword] = useState(false)
    const [body, setBody] = useState({
        nama_lengkap: params.nama_lengkap,
        username: params.username,
        kelamin: params.kelamin,
        tanggal_lahir: Date.parse(params.ttl),
        email: params.email,
        no_hp: params.hp,
        alamat: params.alamat,
        kode_wilayah: params.kode_wilayah,
        password: null,
        role: params.role
    });
    useEffect(() => {
        let url = "http://penjahit.kamscodelab.tech/uihelper/getwilayah?id=21.71&level=3";
        fetch(url)
            .then(res => res.json())
            .then(res => {
                const keys = Object.keys(res);
                let tmp = [];
                keys.forEach(k => {
                    tmp.push({
                        id: res[k].id,
                        name: res[k].nama
                    })
                });
                setDaftarKec(tmp)
            })
            .catch((e) => console.log(e));
    }, [])
    const getWilayah = async (id) => {
        const data = await Uihelper.getWilayah(id.substr(0, 8), 4)
        let tmp = []
        Object.keys(data).forEach(k => {
            tmp.push({
                id: data[k].id,
                name: data[k].nama
            })
        });
        setDaftarDesa(tmp);
    }
    const sendData = async () => {
        isLoading(true);
        const result = await Auth.updateProfile(body);
        if (!result.success) {
            setMessage(result.message);
            isLoading(false);
        } else {
            const data = await Auth.loadData('_token_');
            setMessage(null);
            setTimeout(() => {isLoading(false); navigation.navigate("Profile", data)}, 5000);
        }
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
                <Text style={styles.text.welcome}>Update Profile</Text>
            </View>
            <View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>{body.role}</Text>
                    <TextInput defaultValue={body.nama_lengkap} onChangeText={v => setBody({ ...body, nama_lengkap: v })} style={styles.form.formControl} />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>{params.role == 'penjahit' ? "Nama Toko" : "Username"}</Text>
                    <TextInput defaultValue={body.username} onChangeText={v => setBody({ ...body, username: v })} style={styles.form.formControl} />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Jenis Kelamin</Text>
                    <Picker selectedValue={body.kelamin} onValueChange={v => setBody({ ...body, kelamin: v })} style={styles.form.formControl} >
                        <Picker.Item label="Laki-laki" value="l" />
                        <Picker.Item label="Perempuan" value="p" />
                    </Picker>
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Tangal Lahir</Text>
                    <DatePicker textColor={colors.random()} fadeToColor={"none"} mode={'date'} date={new Date(body.tanggal_lahir)} androidVariant={'nativeAndroid'} onDateChange={(v) => setBody({ ...body, tanggal_lahir: v.getTime() })} />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Email</Text>
                    <TextInput textContentType={'emailAddress'} autoCompleteType={'email'} defaultValue={body.email} onChangeText={v => setBody({ ...body, email: v })} style={styles.form.formControl} />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>No Hp</Text>
                    <TextInput keyboardType={'number-pad'} defaultValue={body.no_hp} onChangeText={v => setBody({ ...body, no_hp: v })} style={styles.form.formControl} />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Kecamatan</Text>
                    <Select2
                        isSelectSingle
                        style={styles.form.formControl}
                        colorTheme={colors.default}
                        popupTitle="Pilih Kecamatan"
                        title="Pilih Kecamatan"
                        data={daftarKec}
                        onSelect={(data) => {
                            getWilayah(data.toString(), 4)
                        }}
                        onRemoveItem={(data) => {
                            console.log("removed: " + data);
                        }}
                    />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Desa</Text>
                    <Select2
                        isSelectSingle
                        style={styles.form.formControl}
                        colorTheme={colors.default}
                        popupTitle="Pilih Kelurahan"
                        title="Pilih Kelurahan"
                        data={daftarDesa}
                        onSelect={(data) => {
                            setBody({ ...body, kode_wilayah: data.toString() })
                        }}
                        onRemoveItem={(data) => {
                            console.log("removed: " + data);
                        }}
                    />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Alamat Lengkap</Text>
                    <TextInput defaultValue={body.alamat} onChangeText={v => setBody({ ...body, alamat: v })} style={styles.form.formControl} />
                </View>
                <View style={styles.form.formGroup}>
                    <Text style={styles.form.label}>Password</Text>
                    <TextInput secureTextEntry={!tampilPassword} placeholder="Biarkan kosong jika tidak ingin mengganti password" defaultValue={body.password} onChangeText={v => setBody({ ...body, password: v })} style={styles.form.formControl} />
                    <Text onPress={() => setTampilPassword(!tampilPassword)} style={{ ...styles.text.welcome, marginLeft: 20, fontSize: 15, marginTop: 5 }}>{tampilPassword ? "Sembunyikan Password" : "Tampilkan Password"}</Text>
                </View>
                <Text style={message != null && message != true ? local_styles.show : local_styles.hide}>{message}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <ActionBttuon onPress={sendData} title={"Simpan"} />
            </View>
        </ScrollView>
    );
}

export default UpdateProfile;

const local_styles = {
    hide: {
        display: 'none'
    },
    show: {
        textAlign: "center", color: "red", fontSize: 10
    }
}