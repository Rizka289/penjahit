import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView, Modal, Pressable } from "react-native";
import Auth from "../../../models/Auth";
import { colors } from "../../../utils";
const ModalEl = ({modalStyle={}, navigation, modalData, title = "", subtitle, type = 'list', open, openModal }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                openModal(!open);
            }}
        >

            <View style={{...styles.centeredView, ...modalStyle }}>
                <View style={styles.modalView}>
                    <Pressable onPress={() => openModal(!open)} style={styles.closeButton}>
                        <Text style={{ color: colors.disable, fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>X</Text>
                    </Pressable>
                    <Text style={{ color: colors.default, fontSize: 20 }}>{title}</Text>
                    <Text style={{ color: colors.disable, fontSize: 15, marginBottom: 15 }}>{subtitle}</Text>
                    <ScrollView>
                        {
                            type == 'list' ? modalData.map(v => (<Text>{v}</Text>)) : modalData.map(v => v)
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>

    );
}

export default ModalEl;
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
        bottom: 2
    },
    tinyLogo: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: 400,
        overflow: 'scroll',
        shadowColor: "#000",
        alignItems: "center",
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
    },
    closeButton: {
        borderRadius: 50,
        width: 40,
        height: 40,
        borderColor: '#2196F3',
        borderWidth: 1,
        position: 'absolute',
        top: -15,
        right: -10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});