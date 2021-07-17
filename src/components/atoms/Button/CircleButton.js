import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../../utils/styles';

const CircleButton = ({marginTop= -20, textPos = 10, text, width = 50, height = 50, top, right=0, left = 0, bottom =0, fontSize = 60, backgroundColor = '#B2B1B9', color = 'white', borderColor = '#515E63', borderWidth = 2, onPress = () => {}, onLongPress = () => {}}) => {
    const local_styles = {
        button: {
            width: width,
            height: height,
            borderRadius: 100,
            borderColor: borderColor,
            borderWidth: borderWidth,
            justifyContent: 'center',
            backgroundColor: backgroundColor,
            top: top, 
            right: right, 
            left: left,
            bottom:bottom, 
            position: 'absolute'
        }, 
        buttonTitle: {
            fontSize: fontSize, 
            textAlign: 'center', 
            marginTop: marginTop, 
            color: color, 
            top: textPos
        }   
    }

    return (
        <TouchableOpacity onPress={onPress} style={{...styles, ...local_styles.button}}>
            <Text style={local_styles.buttonTitle}>{text}</Text>
        </TouchableOpacity>
    );
}
export default CircleButton