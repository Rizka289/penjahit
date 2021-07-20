import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal, Pressable, BackHandler } from "react-native";
import Auth from "../../../models/Auth";
import { colors } from "../../../utils";
const ProfileAvatar = ({ navigation }) => {
    const [profileMenu, isOpenMenu] = useState(false);
    const [params, setParams] = useState({});
    useEffect(async () => {
        BackHandler.addEventListener('hardwareBackPress', async () => {
            const data = await Auth.loadData();
            setParams(data);
            return false;
        });
        const data = await Auth.loadData();
        setParams(data);
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => isOpenMenu(!profileMenu)}>
                    <Image
                        onTap
                        style={styles.tinyLogo}
                        source={{
                            uri: "https://penjahit.kamscodelab.tech/public/img/profile/" + params.poto,
                        }}
                    />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={profileMenu}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    isOpenMenu(!profileMenu);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text onPress={() => { navigation.navigate('Profile', params); isOpenMenu(false) }} style={styles.modalText}>My Profile</Text>
                        <Text style={styles.modalText} onPress={() => { navigation.navigate("Pesanan", params); isOpenMenu(false) }}>Pesanan</Text>
                        <Text onPress={() => { Auth.logOut(navigation), isOpenMenu(false) }} style={styles.modalText}>Keluar</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => isOpenMenu(false)}
                        >
                            <Text style={styles.textStyle}>Tutup</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>

    );
}

export default ProfileAvatar;
const styles = StyleSheet.create({
    container: {
        marginRight: 30,
        borderRadius: 50,
        borderColor: 'white',
        borderStyle: "solid",
        borderWidth: 1,
        width: 50,
        height: 50,
        position: 'absolute',
        right: 0,
        bottom: 2,

    },
    tinyLogo: {
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: 'white',
        borderStyle: "solid",
        borderWidth: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});