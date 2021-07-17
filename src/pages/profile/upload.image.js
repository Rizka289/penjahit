import React, { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Image, View } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import Auth from '../../models/Auth';
import ImagePicker from "react-native-customized-image-picker"

const UploadImage = () => {
    const [photo, setPhoto] = useState(null);
    const [loading, isLoading] = useState(false);
    const handleChoosePhoto = () => {
        // isLoading(true)
        const options = {
            noData: true,
        }
        ImagePicker.openPicker({}).then(image => {
            console.log(image);
        });
    }

    useEffect(async () => {
        const data = await Auth.loadData();
        // console.log();
        setPhoto("https://penjahit.kamscodelab.tech/public/img/profile/" + data.poto);
    }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            {photo && (
                <Image
                    source={{ uri: photo.uri }}
                    style={{ width: 300, height: 300 }}
                />
            )}
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
        </View>
    )
}

export default UploadImage;