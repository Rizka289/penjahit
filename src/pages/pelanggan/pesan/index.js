import React from 'react';
import StepsState from './src/context/stepsState';
import Shipping from './src/Shipping';
import Payments from './src/Payments';
import Confirmation from './src/Confirmation';
import OrderForm from './content';

export default function HalamanPesan() {
  const routes = [
    {
      title: 'Shipping',
      component: () => <Shipping />,
    },
    {
      title: 'Payments',
      component: () => <Payments />,
    },
    {
      title: 'Confirmation',
      component: () => <Confirmation />,
    },
  ];
  return (
    <StepsState>
      <OrderForm routes={routes} />
    </StepsState>
  );
}