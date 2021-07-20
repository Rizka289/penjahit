import React, { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Image, View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import Auth from '../../models/Auth';
import * as ImagePicker from "react-native-image-picker"
import Toast from 'react-native-simple-toast'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Utils from '../../components/atoms/Utils/func';


const UploadImage = ({route, navigation}) => {
    const params = route.params;
    const [photo, setPhoto] = useState({});
    const [loading, isLoading] = useState(false);
    const [data, setData] = useState({});
    const handleChoosePhoto = () => {
        ImagePicker.launchImageLibrary({includeBase64: true}, (response) => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('Image Picker Error: ', response.error);
            } else {
                setPhoto({
                    uri: response.assets[0].uri,
                    base64: response.assets[0].base64
                });
            }
        });
    }
    // console.log(photo);
    const upload = async () => {
        isLoading(true);
        const token = await Auth.loadToken();
        const url = "https://penjahit.kamscodelab.tech/upload";
        await fetch(url, {
            method: "POST", 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({base64: photo.base64, _token: token})
        }).then(async res => res.json()).then(async res => {
           Toast.show(res.message) 
            if(res.type == 'success'){
               isLoading(false);
               await AsyncStorage.removeItem('_token_');
               Auth.saveToken(res.token);
               setTimeout(() => {
                    navigation.replace(Utils.capitalize(params.role), {...params, poto: res.image})
               }, 2000)
            }
        }).catch(err => console.log(err))
    }

    useEffect(async () => {
        const data = await Auth.loadData();
        setData(data);
        setPhoto({ ...photo, uri: "https://penjahit.kamscodelab.tech/public/img/profile/" + data.poto });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            {photo && (
                <Image
                    source={{ uri: photo.uri }}
                    style={{ width: 300, height: 300, alignSelf: 'center', backgroundColor: 'white' }}
                />
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginHorizontal: 100 }}>
                <Button title={"Pilih Gambar"} onPress={handleChoosePhoto} />
                <Button onPress={() => upload()} title={"Upload"} disabled={"https://penjahit.kamscodelab.tech/public/img/profile/" + data.poto == photo.uri} />
            </View>
        </View>
    )
}

export default UploadImage;