import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import OrderContext from '../../../context/order/orderContext';

const OrderSteps = () => {
    const orderContext = useContext(OrderContext);
    const { steps, currentStepIndex } = orderContext;

    return (
        <View style={styles.container}>
            <ScrollView>
                {steps.length > 0 ? steps[currentStepIndex - 1].component() : <></>}
            </ScrollView>
            <Text>{currentStepIndex}</Text>
        </View>
    );
};

export default OrderSteps;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flex: 2,
    },
});