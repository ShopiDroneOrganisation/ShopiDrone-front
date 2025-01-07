"use client";
import React from "react";
import { useParams } from "next/navigation";
import "./DetailsItem.scss";
import { products } from "../../components/ProductList/ProductList";

const ProductDetail: React.FC = () => {
  const params = useParams();
  const { id } = params;

  if (!id || Array.isArray(id)) {
    return <p>Invalid product ID</p>;
  }
  const product = products.find((p) => p.id === parseInt(id, 10));
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="details-item">
      <div className="details-item-infos">
        <div className="details-image">
          <img src={product.img} alt={product.name} />
        </div>
        <div className="details-text">
          <div className="details-info">
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="details-button-container">
      <p>${product.price}</p>
        <button className="details-button">Ajouter au panier</button>
      </div>
    </div>
  );
};

export default ProductDetail;
