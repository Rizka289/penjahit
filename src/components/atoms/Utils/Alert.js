import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../utils";

const Alert = ({text, style="disable", onPress= () => {} }) => {
    const styles = StyleSheet.create({
        alert: {
            backgroundColor: colors[style], 
            alignContent: 'center', 
            paddingHorizontal: 10, 
            paddingVertical: 5, 
            borderRadius: 5, 
            marginHorizontal: 5, 
            marginVertical: 5
        }, 
        text: {
            textAlign: 'center', 
            color: 'white', 
            fontSize: 17
        }
    })
    return (
        <TouchableOpacity onPress={onPress} style={styles.alert}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

export default Alert;