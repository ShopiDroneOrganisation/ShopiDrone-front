'use client'
import React from 'react';
import Card from '../Card/Card';
import { products } from '../ProductList/ProductList';

const ProductSelection = () => {
    const selectedProducts = products.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
         {selectedProducts.map(product => (
                <Card
                    key={product.id}
                    id={product.id}
                    img={product.img}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                />
            ))}
    </div>
  );
};

export default ProductSelection;