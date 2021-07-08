import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import OrderContext from '../../../context/order/orderContext';
import OrderSteps from './steps';

const OrderForm = ({ routes }) => {
    const orderContext = useContext(OrderContext);
    const { setSteps, setCurrentStep } = orderContext;
    useEffect(() => {
        setSteps([...routes]);
        setCurrentStep(1);
    }, []);

    return (
        <View style={styles.container}>
            {/* <StepHeader /> */}
            <OrderSteps />
            {/* <StepFooter /> */}
        </View>
    );
};

export default OrderForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});