"use client";
import React from "react";
import {useParams} from "next/navigation";
import {products} from "../../components/ProductList/ProductList";
import Image from "next/image";

const ProductDetail: React.FC = () => {
    const params = useParams();
    const {id} = params;

    if (!id || Array.isArray(id)) {
        return <p>Invalid product ID</p>;
    }
    const product = products.find((p) => p.id === parseInt(id, 10));
    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className="details-item">
            <div className="wrapper -large -padded">
                <div className="grid -three product-grid">
                    <div className="col -two -auto">
                        <Image src={product.img} alt={product.name} width={746} height={500} className={'product-img'}/>
                        <div className="description">
                            <div className="title-4 label">Description</div>
                            <p className="body desc">{product.description}</p>
                        </div>
                    </div>
                    <div className="col -one -auto right-col">
                        <div className="content">
                            <div className="title-4">{product.name}</div>
                            <div className="body price">{product.price} €</div>
                            <div className="grid -two category">
                                <div className="col -one -auto">
                                    <div className="body">Catégorie</div>
                                </div>
                                <div className="col -one -auto">
                                    <div className="body">Hélice</div>
                                </div>
                            </div>
                            <button className="btn add-btn">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            </div>


            {/*<div className="details-item-infos">
        <div className="details-image">
          <img src={product.img} alt={product.name} />
        </div>
        <div className="details-text">
          <div className="details-info">
            <h2>{product.name}</h2> 
            <p>${product.price}</p>
          </div>
      <div className="details-button-container">
          <p>{product.description}</p>
        <button className="details-button">Ajouter au panier</button>
        </div>
      </div>
      </div>*/}
        </div>
    );
};

export default ProductDetail;
