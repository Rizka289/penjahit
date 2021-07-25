import React from 'react'
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react/cjs/react.development';
import { logo } from '../../assets';
import ActionBttuon from '../../components/atoms/Button/ActionButton';
import styles from '../../utils/styles';



const ResetPassword = () => {
    const [message, setMessage] = useState(null)
    const [loading, isLoading] = useState(false)
    const [body, setBody] = useState({
        email: ""
    })
    
    const sendData = async () => {
        isLoading(true);
        const res = await fetch('https://penjahit.kamscodelab.tech/reset', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
         }).then(res => res.json()).then(res => res).catch(err => {
             isLoading(false)
             setMessage("Error")
         })
    
         setMessage(res.message)
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
                <Text style={styles.text.welcome}>Lupa Password</Text>
            </View>
            <View style={styles.form.formGroup}>
                <Text style={styles.form.label}>Masukkan Email Anda</Text>
                <TextInput textContentType={'emailAddress'} autoCompleteType={'email'} defaultValue={body.email} onChangeText={v => setBody({ ...body, email: v })} style={styles.form.formControl} />
            </View>
            <Text style={message != null && message != true ? local_styles.show : local_styles.hide}>{message}</Text>
            <View style={message != "Berhasil, kami telah mengirimkan email untuk reset password" ? local_styles.show : local_styles.hide} >
                <ActionBttuon  onPress={() => sendData()} title={"Kirim"} />
            </View>
        </ScrollView>
    )
}

export default ResetPassword;

const local_styles = {
    hide: {
      display: 'none'
    },
    show: {
      textAlign: "center", color: "red", fontSize: 14,
      alignItems: 'center'
    },
  }