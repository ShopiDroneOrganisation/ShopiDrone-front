'use client';

import { useState, useContext, useEffect } from 'react';
import { categorie } from '@/app/types/categorie';
import './sell.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

export default function Sell() {
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const categories = Object.values(categorie).filter((value) => typeof value === "string");
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/auth');
        }
    }, [user, router]);

    if (!user) {
        return null; // ou un loader
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImage(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    return (
        <div className="sell-page">
            <div className="sell-container">
                <h1>Vendre un article</h1>
                
                <form className="sell-form">
                    <div className="form-grid">
                        {/* Colonne gauche */}
                        <div className="form-column">
                            <div className="form-section">
                                <h2>Photo de l'article</h2>
                                <p className="hint">Ajoutez une photo de votre article</p>
                                
                                <div className="image-upload-container">
                                    <div className="image-grid">
                                        {previewUrl ? (
                                            <div className="image-preview">
                                                <img src={previewUrl} alt="Preview" />
                                                <button 
                                                    type="button" 
                                                    className="remove-image"
                                                    onClick={removeImage}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="upload-box">
                                                <FaCloudUploadAlt size={40} />
                                                <span>Ajouter une photo</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    hidden
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h2>Description</h2>
                                <div className="form-group">
                                    <textarea 
                                        id="description" 
                                        rows={8}
                                        placeholder="Décrivez votre article (caractéristiques, accessoires inclus...)"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Colonne droite */}
                        <div className="form-column">
                            <div className="form-section">
                                <h2>Informations sur l'article</h2>
                                
                                <div className="form-group">
                                    <label htmlFor="title">Titre de l'annonce *</label>
                                    <input 
                                        type="text" 
                                        id="title" 
                                        placeholder="ex: DJI Mini 3 Pro" 
                                        required 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Catégorie *</label>
                                    <select id="category" required>
                                        <option value="">Sélectionnez une catégorie</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Prix *</label>
                                    <div className="price-input">
                                        <input 
                                            type="number" 
                                            id="price" 
                                            min="0" 
                                            step="0.01" 
                                            required 
                                        />
                                        <span className="currency">€</span>
                                    </div>
                                </div>
                            </div>

                            <div className="warning-section">
                                <h3>Règles de publication</h3>
                                <ul>
                                    <li>
                                        <span className="dot"></span>
                                        Publiez uniquement des articles en rapport avec l'univers des drones
                                    </li>
                                    <li>
                                        <span className="dot"></span>
                                        Vérifiez que votre article est en état de fonctionnement
                                    </li>
                                    <li>
                                        <span className="dot"></span>
                                        Décrivez précisément l'état de votre article
                                    </li>
                                </ul>
                            </div>

                            <button type="submit" className="submit-button">
                                Publier l'annonce
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
