// services/supabaseController.ts
import { createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';

// Initialisation du client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Interface pour un produit
export interface Product {
  id: number;
  nom: string;
  prix: number;
  description: string;
  image: string;
  categorie: string;
  utilisateur_id: string;
}

// Interface pour un utilisateur (optionnel)
export interface AuthUser {
  id: string;
  email: string;
  // Ajoutez d'autres propriétés si nécessaire
}

// =========================
// Fonctions pour les Articles
// =========================

/**
 * Récupère tous les articles depuis la table 'article'.
 * @returns Promise<Product[]> - Liste des articles.
 */
export const fetchAllArticles = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from<Product>('article').select('*');
  if (error) {
    console.error('Error fetching articles:', error.message);
    return [];
  }
  return data || [];
};

/**
 * Récupère un article par son ID.
 * @param id - ID de l'article à récupérer.
 * @returns Promise<Product | null> - L'article correspondant ou null si non trouvé.
 */
export const fetchProductById = async (id: number): Promise<Product | null> => {
  const { data, error } = await supabase.from<Product>('article').select('*').eq('id', id).single();
  if (error) {
    console.error(`Error fetching product with ID ${id}:`, error.message);
    return null;
  }
  return data;
};

/**
 * Ajoute un nouvel article à la table 'article'.
 * @param product - Détails du nouvel article (sauf l'ID).
 * @returns Promise<boolean> - true si l'ajout est réussi, false sinon.
 */
export const addProduct = async (product: Omit<Product, 'id'>): Promise<boolean> => {
  const { error } = await supabase.from<Product>('article').insert(product);
  if (error) {
    console.error('Error adding product:', error.message);
    return false;
  }
  return true;
};

// =========================
// Fonctions de Gestion des Images
// =========================

/**
 * Sanitize le nom du fichier en supprimant les accents et les caractères non valides.
 * @param filename - Nom original du fichier.
 * @returns string - Nom du fichier sanitisé.
 */
const sanitizeFilename = (filename: string): string => {
  return filename
    .normalize('NFD') // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Remplace les caractères invalides par des underscores
    .toLowerCase(); // Optionnel: convertit en minuscules
};

/**
 * Télécharge une image dans Supabase Storage et retourne son URL publique.
 * @param userId - ID de l'utilisateur qui télécharge l'image.
 * @param imageFile - Fichier image à télécharger.
 * @returns Promise<string | null> - URL publique de l'image ou null en cas d'erreur.
 */
export const uploadImage = async (userId: string, imageFile: File): Promise<string | null> => {
  try {
    // Sanitiser le nom du fichier
    const sanitizedFilename = sanitizeFilename(imageFile.name);

    // Générer un nom unique pour l'image
    const imageName = `${userId}/${Date.now()}_${sanitizedFilename}`;

    // Télécharger l'image dans le bucket 'images'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(imageName, imageFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Récupérer l'URL publique de l'image
    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(uploadData.path);

    if (!publicUrlData) {
      throw new Error('Error getting public URL');
    }

    return publicUrlData.publicUrl;
  } catch (error: any) {
    console.error('Error uploading image:', error.message);
    return null;
  }
};

/**
 * Supprime une image de Supabase Storage.
 * @param imagePath - Chemin de l'image à supprimer dans le bucket 'images'.
 * @returns Promise<boolean> - true si la suppression est réussie, false sinon.
 */
export const deleteImage = async (imagePath: string): Promise<boolean> => {
  const { error } = await supabase.storage.from('images').remove([imagePath]);
  if (error) {
    console.error('Error deleting image:', error.message);
    return false;
  }
  return true;
};

// =========================
// Fonctions d'Authentification
// =========================

/**
 * Inscrit un nouvel utilisateur.
 * @param email - Email de l'utilisateur.
 * @param password - Mot de passe de l'utilisateur.
 * @returns Promise<{ user: User | null, error: Error | null }> - Utilisateur créé et/ou erreur.
 */
export const signUp = async (email: string, password: string): Promise<{ user: User | null; error: Error | null }> => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { user: data.user, error };
};

/**
 * Connecte un utilisateur existant.
 * @param email - Email de l'utilisateur.
 * @param password - Mot de passe de l'utilisateur.
 * @returns Promise<{ session: Session | null, error: Error | null }> - Session utilisateur et/ou erreur.
 */
export const signIn = async (email: string, password: string): Promise<{ session: Session | null; error: Error | null }> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { session: data.session, error };
};

/**
 * Déconnecte l'utilisateur actuel.
 * @returns Promise<{ error: Error | null }> - Erreur éventuelle.
 */
export const signOut = async (): Promise<{ error: Error | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Récupère la session actuelle de l'utilisateur.
 * @returns Promise<{ session: Session | null, error: Error | null }> - Session utilisateur et/ou erreur.
 */
export const getSession = async (): Promise<{ session: Session | null; error: Error | null }> => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};

/**
 * Écoute les changements d'état d'authentification.
 * @param callback - Fonction à appeler lors d'un changement d'état.
 * @returns { data: { subscription: () => void }, error: any } - Objet d'abonnement.
 */
export const onAuthStateChange = (
  callback: (event: string, session: Session | null) => void
): { data: { subscription: () => void }; error: any } => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return { data: { subscription: data.subscription.unsubscribe }, error: null };
};
