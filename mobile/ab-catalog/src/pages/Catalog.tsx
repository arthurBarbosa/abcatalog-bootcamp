import React from 'react';
import { Text, View } from 'react-native';
import { ProductCard } from '../components';

import productImg from '../assets/product.png';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../styles';

const products = [
  {
    id: 1,
    imgUrl: productImg,
    name: 'Computador desktop - intel core I7',
    price: 2279.0
  },

  {
    id: 2,
    imgUrl: productImg,
    name: 'Computador desktop - intel core I7',
    price: 2279.0
  },

  {
    id: 3,
    imgUrl: productImg,
    name: 'Computador desktop - intel core I7',
    price: 2279.0
  }

]

const Catalog: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={theme.scrollContainer}>
      {products.map((product) => (
        <ProductCard  {...product} />
      ))}
    </ScrollView>
  )
}

export default Catalog;