import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { colors } from '../utils';

const PenjahitModel = {
    getAllPenjahit: async () => {
        let data = await fetch('https://penjahit.kamscodelab.tech/penjahit/all').then(res => res.json()).then(res => res).catch(err => console.log(err))
        let output = [];
        if(data.type == 'success'){
            Object.keys(data.message).forEach(k => {
                if(k != 'type'){
                    let tmp = {...data.message[k], color: colors.random()}
                    tmp.poto = "https://penjahit.kamscodelab.tech/public/img/profile/" + tmp.poto;
                    
                    output.push(tmp);
                }
                    
            })
        }

       return output;
    }
};

export default PenjahitModel;