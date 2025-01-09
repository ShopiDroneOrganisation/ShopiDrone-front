'use client';
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { fetchAllArticles, Product } from '../../../supaBase/supabaseController';

const ProductSelection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const articles = await fetchAllArticles();
        setProducts(articles.slice(0, 15)); // Sélectionne les 4 premiers produits
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Chargement des produits...</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          img={product.image}
          name={product.nom}
          price={product.prix}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ProductSelection;
