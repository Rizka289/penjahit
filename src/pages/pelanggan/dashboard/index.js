import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { logo } from '../../../assets';
import styles from '../../../utils/styles';
import ActionBttuon from '../../../components/atoms/Button/ActionButton';
import { useState } from 'react';
import Auth from '../../../models/Auth';
import { colors } from '../../../utils';
import { FlatGrid } from 'react-native-super-grid';

const Card = ({ title, desc, bg = colors.default }) => {
    return (
        <View style={{ backgroundColor: bg, width: '40%', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 10, }}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{title.toUpperCase()}</Text>
            <Text style={{ color: colors.dark, fontSize: 14 }}>{desc}</Text>
        </View>
    )
}

const DashbordPelanggan = ({ navigation }) => {
    const [message, setMessage] = useState(null);
    const [profile, setProfile] = useState({})
    const defItems = [
        { name: 'TURQUOISE', code: '#1abc9c' },
        { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' },
        { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60' },
        { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' },
        { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' },
        { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c' },
        { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' },
        { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' },
        { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' },
        { name: 'ASBESTOS', code: '#7f8c8d' },
    ];

    const [items, setItems] = useState(defItems);
    useEffect(async () => {
        const data = await Auth.loadData()
        setProfile(data)
    }, [])

    let email = "", password = "";

    const handleGoTo = (screen, params = {}) => {
        navigation.navigate(screen, params);
    };

    const sendData = async () => {
        const results = await Auth.login(email, password);
        console.log(results);
        if (!results.success)
            setMessage(results.message);
        else
            setMessage("")
    }

    const searchPenjahit = (key) => {
        if (key == "")
            setItems(defItems);
        else {
            let item = defItems.filter((v, i) => v.name.includes(key));
            setItems(item);
        }

    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={logo} style={styles.wrapper.ilustration} />
                <Text style={styles.text.welcome}>{profile.nama_lengkap}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{color: colors.default, marginLeft: 20}}>Pilih penjahit andalanmu</Text>
                <TextInput onChangeText={searchPenjahit} style={styles.form.formControl} />
                <FlatGrid
                    itemDimension={130}
                    data={items}
                    style={styles.gridView}

                    spacing={10}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleGoTo("PofilePenjahit", item)} style={[local_styles.itemContainer, { backgroundColor: item.code }]}>
                            <Image style={{ width: 60, height: 60, position: 'absolute', top: 10, left: 10, borderRadius: 50 }} source={logo} />
                            <Text style={local_styles.itemName}>{item.name}</Text>
                            <Text style={local_styles.itemCode}>{item.code}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

const local_styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});

export default DashbordPelanggan;
