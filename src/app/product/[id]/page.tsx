"use client";
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchProductById } from '@/supaBase/supabaseController'
import './product.scss'
import ProductSelection from '@/app/components/ProductSelection/ProductSelection'
import mondialRelay from '@/app/public/svg/mondialRelais.svg'
import relaisColis from '@/app/public/images/relais-colis.png'
import chronopost from '@/app/public/images/shop2shop.png'
import colissimo from '@/app/public/images/colissimo.png'
import Image from 'next/image'
import AddToCart from '@/app/components/AddToCart/AddToCart'

export default function ProductPage() {
  const params = useParams() as { id: string }
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      if (params.id) {
        const productData = await fetchProductById(params.id)
        setProduct(productData)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  useEffect(() => {
    if (showModal) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = e.currentTarget.querySelector('img');
    if (!image) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;
    
    image.style.transformOrigin = `${x}% ${y}%`;
  };

  if (loading) {
    return <div className="product-page-loader">Chargement...</div>
  }

  if (!product) {
    return <div>Produit non trouvé</div>
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div 
          className="product-image"
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => {
            const image = e.currentTarget.querySelector('img');
            if (image) {
              image.style.transformOrigin = 'center center';
            }
          }}
        >
          <Image 
            src={product.image} 
            alt={product.nom} 
            width={600} 
            height={400} 
            className="product-main-image" 
          />

        </div>
        
        <div className="product-info">
          <h1 className="product-name">{product.nom}</h1>
          
          <div className="product-pricing">
            <div className="price-block">
              <span className="price-value">{product.prix} €</span>
            </div>
            <div className="price-block">
              <span className="price-value taxed-price">{(product.prix * 1.2).toFixed(2)} €</span>
            </div>
            <div className="protection-info">
              <span>Inclut la Protection acheteurs ⓘ</span>
            </div>
          </div>

          <div className="product-stock">
            <span className="stock-label">Stock:</span>
            <span className="stock-value">{product.stock} unités</span>
          </div>

          <hr className="product-divider" />

          <div className="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <hr className="product-divider" />

          <div className="shipping-info">
            <span className="shipping-label">Envoi</span>
            <span className="shipping-value">à partir de 3,89 €</span>
          </div>

          <AddToCart 
            article={{
              id: product.id,
              nom: product.nom,
              prix: product.prix,
              image: product.image,
              stock: product.stock
            }} 
          />
        </div>
      </div>

      <div className="delivery-info">
        
        <hr className="delivery-divider" />
        
        <h2>Remise en main propre avec paiement sécurisé</h2>
        
        <div className="delivery-points">
          <div className="point">
            <span>✓ Réservez ce bien jusqu'au rendez-vous avec le vendeur</span>
          </div>
          <div className="point">
            <span>✓ Restez libre de refuser ce bien s'il ne correspond pas à vos attentes</span>
          </div>
        </div>

        <div className="how-it-works">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}>Comment ça marche ?</a>
        </div>

        <hr className="delivery-divider" />

        <div className="shipping-section">
          <h3>Livraison</h3>
          <p className="shipping-subtitle">Recevez ce bien à domicile ou à deux pas de chez vous</p>
          
          <div className="shipping-options">
            <div className="option">
              <div className="option-left">
                <Image src={mondialRelay} alt="Mondial Relay" width={30} height={30} />
                <div className="option-details">
                  <span className="option-name">Mondial Relay</span>
                  <span className="option-delay">En point de retrait sous 3-5 jours</span>
                </div>
              </div>
              <span className="option-price">6,49 €</span>
            </div>

            <div className="option">
              <div className="option-left">
                <Image src={relaisColis} alt="Relais colis" width={30} height={30} />
                <div className="option-details">
                  <span className="option-name">Relais colis</span>
                  <span className="option-delay">En point de retrait sous 3-5 jours</span>
                </div>
              </div>
              <span className="option-price">6,49 €</span>
            </div>

            <div className="option">
              <div className="option-left">
                <Image src={chronopost} alt="Shop2Shop by Chronopost" width={30} height={30} />
                <div className="option-details">
                  <span className="option-name">Shop2Shop by Chronopost</span>
                  <span className="option-delay">En point de retrait sous 3-5 jours</span>
                </div>
              </div>
              <span className="option-price">6,49 €</span>
            </div>

            <div className="option">
              <div className="option-left">
                <Image src={colissimo} alt="Colissimo" width={30} height={30} />
                <div className="option-details">
                  <span className="option-name">Colissimo</span>
                  <span className="option-delay">à votre domicile sous 2-3 jours</span>
                </div>
              </div>
              <span className="option-price">16,60 €</span>
            </div>
          </div>
        </div>

        <hr className="delivery-divider" />

        <div className="similar-products">
          <h3>Articles similaires</h3>
          <ProductSelection maxArticles={12} />
        </div>
        
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            <h2>Les étapes de la remise en main propre avec paiement sécurisé</h2>
            <div className="steps">
              <div className="step">
                <span className="step-icon">✅</span>
                <p>En réservant l'article, le vendeur vous confirme la disponibilité de l'article</p>
              </div>
              <div className="step">
                <span className="step-icon">📅</span>
                <p>Vous vous organisez avec le vendeur pour définir le lieu et la date de votre rendez-vous</p>
              </div>
              <div className="step">
                <span className="step-icon">📱</span>
                <p>Pensez à prendre votre téléphone portable pour déclencher le paiement depuis votre messagerie leboncoin pendant le rendez-vous</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
