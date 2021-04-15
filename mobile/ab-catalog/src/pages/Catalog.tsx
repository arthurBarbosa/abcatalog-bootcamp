import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ProductCard, SearchInput } from '../components';

import productImg from '../assets/product.png';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../styles';

const products = [
  {
    id: 1,
    imgUrl: productImg,
    name: 'Smart',
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
  const [search, setSearch] = useState('');
  const data = search.length > 0 ?
    products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())) : products
  return (
    <ScrollView contentContainerStyle={theme.scrollContainer}>
      <SearchInput placeholder="Nome do Produto" search setSearch={setSearch} />
      {data.map((product) => (
        <ProductCard  {...product} key={product.id} />
      ))}
    </ScrollView>
  )
}

export default Catalog;