import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { logo } from '../../assets';
import styles from '../../utils/styles';
import ActionBttuon from '../../components/atoms/Button/ActionButton';
import Auth from '../../models/Auth';
import Uihelper from '../../models/Uihelper';
import DatePicker from 'react-native-date-picker';
import Select2 from "react-select2-native";


const Register = ({ navigation }) => {
  const [message, setMessage] = useState(null);
  const [daftarKec, setDaftarKec] = useState([]);
  const [daftarDesa, setDaftarDesa] = useState([]);
  const [body, setBody] = useState({
    nama_lengkap: "",
    username: "",
    kelamin: "l",
    tanggal_lahir: Date.now() / 1000,
    email: "",
    no_hp: "",
    alamat: "",
    kode_wilayah: "",
    role: "pelanggan"
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

  const handleGoTo = screen => {
    navigation.navigate(screen);
  };

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

    console.log("body: ", body);
    const results = await Auth.register(body);
    console.log("============== \n");
    console.log("RESULT: ", results);
    if (!results.success)
      setMessage(results.message);
    else
      setMessage(true)

  }
  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={logo} style={styles.wrapper.ilustration} />
        <Text style={styles.text.welcome}>Daftar</Text>
      </View>
      <View style={message != true ? {} : local_styles.hide}>
      <View style={styles.form.formGroup}>
          <Text style={styles.form.label}>Daftar Sebagai</Text>
          <Picker selectedValue={body.kelamin} onValueChange={v => setBody({ ...body, role: v })} style={styles.form.formControl} >
            <Picker.Item label="Pelanggan" value="pelanggan" />
            <Picker.Item label="Penjual" value="penjual" />
          </Picker>
        </View>
        <View style={styles.form.formGroup}>
          <Text style={styles.form.label}>Nama Lengkap</Text>
          <TextInput defaultValue={body.nama_lengkap} onChangeText={v => setBody({ ...body, nama_lengkap: v })} style={styles.form.formControl} />
        </View>
        <View style={styles.form.formGroup}>
          <Text style={styles.form.label}>{body.role == 'pelanggan' ? "Username" : "Nama Toko"}</Text>
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
          <DatePicker mode={'date'} date={new Date(body.tanggal_lahir * 1000)} androidVariant={'nativeAndroid'} onDateChange={(v) => setBody({ ...body, tanggal_lahir: Math.floor(v.getTime() / 1000) })} />
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
            style={{ borderRadius: 5 }}
            colorTheme="blue"
            popupTitle="Select item"
            title="Select item"
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
            style={{ borderRadius: 5 }}
            colorTheme="blue"
            popupTitle="Select item"
            title="Select item"
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
        <Text style={message != null && message != true ? local_styles.show : local_styles.hide}>{message}</Text>
        <View style={{ marginHorizontal: '25%' }}>
          <ActionBttuon onPress={sendData} title="Daftar" />
          <Text style={{ marginBottom: 50 }} onPress={() => handleGoTo('Login')} >Sudah punya akun?, Masuk</Text>
        </View>
      </View>
      <View style={message == true ? {} : local_styles.hide}>
          <Text style={{textAlign: 'center'}}>Anda Berhasil Mendaftar, Silahkan Buka Email Anda untuk Aktifasi Akun</Text>
          <Text style={{ marginTop: 50, textAlign: 'center'}} onPress={() => handleGoTo('Login')} >Klik disin untuk Masuk</Text>
      </View>

    </ScrollView>
  );
};

export default Register;

const local_styles = {
  hide: {
    display: 'none'
  },
  show: {
    textAlign: "center", color: "red", fontSize: 10
  }
}