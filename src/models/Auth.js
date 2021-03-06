import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
const Auth = {
    login: async (email, password) => {
        console.log("Body \n", { email: email, password: password });

        let output = await fetch('https://penjahit.kamscodelab.tech/login', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                _token: await Auth.loadToken()
            })
        })
            .then((response) => response.json())
            .then(async (json) => {
                console.log("Result \n", json);
                if (json.type == 'success')
                    await Auth.saveToken(json.message)
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
    logOut: async (navigation) => {
        await AsyncStorage.removeItem('_token_');
        navigation.navigate('Splash')
    },
    saveToken: async (token) => {
        try {
            await AsyncStorage.setItem('_token_', token);
        } catch (error) {
            console.log(error);
        }
    },
    register: async (body) => {
        let output = await fetch('https://penjahit.kamscodelab.tech/register', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ ...body, _token: await Auth.loadToken() })
        })
            .then((response) => response.json())
            .then((json) => {
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
    updateProfile: async (body) => {
        let output = await fetch('https://penjahit.kamscodelab.tech/update', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ ...body, _token: await Auth.loadToken() })
        })
            .then((response) => response.json())
            .then(async (json) => {
                if(json.type == 'success'){
                    await AsyncStorage.removeItem("_token_");
                    await Auth.saveToken(json.token);
                }
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
    loadToken: async () => {
        try {
            const value = await AsyncStorage.getItem('_token_');
            if (value !== null) {
                return value;
            }
            return "";
        } catch (error) {
            return "";
        }
    },
    loadData: async (item = '_token_') => {
        try {
            const value = await AsyncStorage.getItem(item);
            if (value !== null) {
                return await jwtDecode(value);
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    mustLogin: async (navigation) => {
        const token = await Auth.loadToken();
        if (token == '')
            navigation.replace('WelcomeAuth');
        else {
            const data = jwtDecode(token);
            if (Date.now() >= Date.parse(data.login_at))
                navigation.replace('WelcomeAuth');

        }
    },
    dontLogin: async (navigation) => {
        const token = await Auth.loadToken();
        if (token != '') {
            const data = jwtDecode(token);
            navigation.replace(data.role.charAt(0).toUpperCase() + data.role.slice(1));
        }

    },
}

export default Auth;