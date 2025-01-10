// /app/auth/page.tsx

'use client';

import { useState } from 'react';
import './AuthPage.scss';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-tabs">
                    <button 
                        className={`tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Connexion
                    </button>
                    <button 
                        className={`tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Inscription
                    </button>
                </div>

                <div className="auth-form">
                    <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>
                    
                    <form>
                        {!isLogin && (
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Nom complet"
                                    required 
                                />
                            </div>
                        )}
                        
                        <div className="form-group">
                            <input 
                                type="email" 
                                placeholder="Email"
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="password" 
                                placeholder="Mot de passe"
                                required 
                            />
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    placeholder="Confirmer le mot de passe"
                                    required 
                                />
                            </div>
                        )}

                        <button type="submit" className="submit-btn">
                            {isLogin ? 'Se connecter' : "S'inscrire"}
                        </button>
                    </form>

                    {isLogin && (
                        <p className="forgot-password">
                            <a href="#">Mot de passe oublié ?</a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

