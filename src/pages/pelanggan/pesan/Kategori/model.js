import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { colors } from '../../../../utils';
import styles from '../../../../utils/styles';

const KategoriModel = ({ kategori = [], body, setBody }) => {
    if (kategori.length == 0) {
        kategori = [
            "Gaun", "Kamisal", "Celana", "Kemeja", "Rok", "Baju Pengantinn", "Setelan",
            "Seragam Dinas/ Sekolah", "Jas"
        ];
    }
    console.log();
    return (
        <View >
            <Text>Pilih model yang akan dijahit</Text>
            <FlatGrid
                itemDimension={130}
                data={kategori}
                style={styles.gridView}
                spacing={10}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {setBody({...body, model: item.toLowerCase()})}} style={[{ ...local_style.itemContainer, ...styles.shadow }, { backgroundColor: body.model == item.toLowerCase() ? '#6e3b6e' : '#f9c2ff'}]}>
                        <Text style={[local_style.itemName, {color: body.model == item.toLowerCase() ? 'white' : 'black'}]}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const local_style = {
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        // height: 50,
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
}

export default KategoriModel;