'use client';
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import { fetchAllArticles, Product } from '../../../supaBase/supabaseController';

interface ProductSelectionProps {
  maxArticles?: number;
  category?: string;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({ maxArticles = 15, category = '' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const articles = await fetchAllArticles();
        const filteredArticles = category
          ? articles.filter((article) => article.categorie === category)
          : articles;
        setProducts(filteredArticles.slice(0, maxArticles));
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [maxArticles, category]);

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
          categorie={product.categorie}
          stock={product.stock}
        />
      ))}
    </div>
  );
};

export default ProductSelection;