import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Utils from '../components/atoms/Utils/func';
import { colors } from '../utils';
import Auth from './Auth';

const PenjahitModel = {
    getAllPenjahit: async () => {
        let data = await fetch('https://penjahit.kamscodelab.tech/penjahit/all').then(res => res.json()).then(res => res).catch(err => console.log(err))
        let output = [];
        if (data.type == 'success') {
            Object.keys(data.message).forEach(k => {
                if (k != 'type') {
                    let tmp = { ...data.message[k], color: colors.random() }
                    tmp.poto = "https://penjahit.kamscodelab.tech/public/img/profile/" + tmp.poto;

                    output.push(tmp);
                }

            })
        }

        return output;
    },
    buatPesanan: async (body) => {
        let output = await fetch('https://penjahit.kamscodelab.tech/penjahit/pesan', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...body,
                _token: await Auth.loadToken(),
                pemesan: await Auth.loadData().then(res => res.username)
            })
        })
            .then((response) => response.json())
            .then(async (json) => {
                console.log("Result \n", json);
                return {
                    message: json.message,
                    success: json.type == 'success',
                }
            })
            .catch((error) => {
                console.log(error)
            });
        return output;
    },

    loadDataPesanan: async (penjahit) => {
        const user = await Auth.loadData();
        let data = await fetch('https://penjahit.kamscodelab.tech/penjahit/pesanan', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                penjahit: penjahit,
                pemesan: user.username
            })
        }).then(res => res.json()).then(res => res).catch(err => console.log(err))
        let output = {
            saya: [],
            semua: [],
        };
        if (data.type == 'success') {
            Object.keys(data.message).forEach(k => {
                const pesanan = data.message[k];
                if (pesanan.pemesan == user.username)
                    output.saya.push(pesanan);

                output.semua.push(pesanan)
            })
        }

        return output;
    }, 
    updatePortofolio: async (body) => {
        const user = await Auth.loadData();
        console.log("Body \n", JSON.stringify({
            ...body,
            user: user.username,
            _token: await Auth.loadToken()
        }));
        let data = await fetch('https://penjahit.kamscodelab.tech/portofolio/update', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                ...body,
                user: user.username,
                _token: await Auth.loadToken()
            })
        }).then(res => res.json()).then(async res => {
            if(res.type == 'success'){
                await AsyncStorage.removeItem('_token_');
                await Auth.saveToken(res.token);
            }
            return {
                token: res.token,
                success: res.type == 'success',
                message: res.message
            }
        }).catch(err => console.log(err))
        
        return data;
    },

    pesananPembeli: async ()=>{
        const pembeli = await Auth.loadData();
        let data = await fetch('https://penjahit.kamscodelab.tech/pesanan/pelanggan?usr=' + pembeli.username).then(res => res.json()).then(res => res);
        const keys=Object.keys(data);
        let out = {
            semua: [],
            selesai: []
        }
        if(keys.length == 1 && keys[0] == 'type')
            return out
        else{
           
           keys.forEach(k => {
               if(k != "type"){
                    out.semua.push(data[k]);
                    if(data[k].status == 'selesai')
                        out.selesai.push(data[k])
               }
           }) 

           return out;
        }
            
        
    }
};

export default PenjahitModel;