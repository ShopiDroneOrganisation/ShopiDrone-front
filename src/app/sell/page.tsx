// src/app/sell/page.tsx
'use client'; // Doit être la première ligne du fichier

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Import correct pour Next.js 13+
import { supabase, addProduct, uploadImage, Product, User } from '../../supaBase/supabaseController';
import './sell.scss';

export default function Sell() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // États du formulaire
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('none');
  const [price, setPrice] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error.message);
      }
      if (session) {
        setUser(session.user);
      } else {
        router.push('/auth'); // Redirige vers /auth si non authentifié
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        router.push('/auth'); // Redirige vers /auth si déconnecté
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      setMessage({ type: 'error', text: 'Vous devez être connecté pour ajouter un article.' });
      return;
    }

    if (category === 'none') {
      setMessage({ type: 'error', text: 'Veuillez sélectionner une catégorie.' });
      return;
    }

    if (!imageFile) {
      setMessage({ type: 'error', text: 'Veuillez télécharger une image.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // 1. Télécharger l'image dans Supabase Storage et obtenir l'URL publique
      const publicURL = await uploadImage(user.id, imageFile);

      if (!publicURL) {
        throw new Error('Erreur lors du téléchargement de l\'image.');
      }

      // 2. Ajouter l'article à la base de données avec l'URL de l'image
      const newProduct: Omit<Product, 'id'> = {
        nom: title,
        prix: price,
        description: description,
        image: publicURL,
        categorie: category,
        utilisateur_id: user.id, // Utilisation de l'ID utilisateur de Supabase
      };

      const success = await addProduct(newProduct);

      if (success) {
        setMessage({ type: 'success', text: 'Article ajouté avec succès !' });
        // Réinitialiser le formulaire
        setTitle('');
        setDescription('');
        setCategory('none');
        setPrice(0);
        setImageFile(null);
      } else {
        throw new Error('Erreur lors de l\'ajout de l\'article.');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      setMessage({ type: 'error', text: error.message || 'Une erreur est survenue.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-sell">
      <div className="wrapper -medium -padded">
        <h1>Vends ton article</h1>
        <form onSubmit={handleSubmit}>
          <div className="bloc">
            <div className="img-area flex -align-center -justify-center">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                required
              />
              {imageFile && <p>{imageFile.name}</p>}
            </div>
          </div>

          <div className="bloc">
            <div className="grid -two">
              <div className="col -one label -auto">Titre</div>
              <div className="col -one -auto">
                <input
                  type="text"
                  className="input-text"
                  placeholder="ex: Hélice"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            <hr className="separator" />
            <div className="grid -two">
              <div className="col label -one -auto">Décris ton article</div>
              <div className="col -one -auto">
                <textarea
                  name="description"
                  id="description"
                  className="text-area"
                  placeholder="ex: état neuf"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bloc">
            <div className="grid -two">
              <div className="col -one -auto label flex -align-center">Catégorie</div>
              <div className="col -one -auto">
                <select
                  name="category"
                  id="category"
                  className="select btn -outline"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="none">Sélectionne une catégorie</option>
                  <option value="drone">Drone</option>
                  <option value="batterie">Batterie</option>
                  <option value="helices">Hélices</option>
                  <option value="camera">Caméra</option>
                  <option value="telecommande">Télécommande</option>
                  <option value="electronique">Électronique</option>
                  {/* Ajoutez d'autres catégories selon vos besoins */}
                </select>
              </div>
            </div>
          </div>

          <div className="bloc">
            <div className="grid -two">
              <div className="col -one label -auto">Prix</div>
              <div className="col -one -auto">
                <input
                  type="number"
                  className="input-text"
                  placeholder="0,00€"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button type="submit" className="btn add-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  );
}
