// /app/components/log/LoginRegister.tsx

'use client';

import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import { User, getStoredUsers, setStoredUsers } from '@/app/utils/storage';
import './LoginRegister.scss';

const LoginRegister: React.FC = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  // États pour le formulaire de connexion
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // États pour le formulaire d'inscription
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  const [users, setUsersState] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = getStoredUsers();
    console.log('Stored users:', storedUsers);
    setUsersState(storedUsers);
  }, []);

  // Fonction de gestion de la connexion
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting to login with:', { email: loginEmail, password: loginPassword });
    const user = users.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );

    if (user) {
      console.log('Login successful:', user);
      login(user); // Utiliser la fonction de login du contexte
      // Rediriger vers le dashboard
      router.push('/dashboard');
    } else {
      console.log('Login failed: Invalid credentials');
      setLoginError('Email ou mot de passe incorrect.');
    }
  };

  // Fonction de gestion de l'inscription
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting to register with:', { username: registerUsername, email: registerEmail, password: registerPassword });
    const existingUser = users.find(
      (u) => u.email === registerEmail || u.username === registerUsername
    );

    if (existingUser) {
      console.log('Registration failed: User already exists');
      setRegisterError('Utilisateur déjà existant.');
      setRegisterSuccess('');
    } else {
      // Ajouter le nouvel utilisateur aux données factices
      const newUser: User = {
        id: users.length + 1,
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      };
      const updatedUsers = [...users, newUser];
      console.log('Registering new user:', newUser);
      setUsersState(updatedUsers);
      setStoredUsers(updatedUsers);
      setRegisterSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setRegisterError('');
      // Réinitialiser les champs d'inscription
      setRegisterUsername('');
      setRegisterEmail('');
      setRegisterPassword('');
    }
  };

  return (
    <div className="login-register-container">
      <div className="tabs">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => {
            setIsLogin(true);
            setLoginError('');
            setRegisterError('');
            setRegisterSuccess('');
          }}
        >
          Connexion
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => {
            setIsLogin(false);
            setLoginError('');
            setRegisterError('');
            setRegisterSuccess('');
          }}
        >
          Inscription
        </button>
      </div>

      {isLogin ? (
        <form className="form login-form" onSubmit={handleLogin}>
          <h2>Connexion</h2>
          {loginError && <p className="error">{loginError}</p>}
          <div className="form-group">
            <label htmlFor="login-email">Email :</label>
            <input
              type="email"
              id="login-email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Mot de passe :</label>
            <input
              type="password"
              id="login-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      ) : (
        <form className="form register-form" onSubmit={handleRegister}>
          <h2>Inscription</h2>
          {registerError && <p className="error">{registerError}</p>}
          {registerSuccess && <p className="success">{registerSuccess}</p>}
          <div className="form-group">
            <label htmlFor="register-username">Nom d'utilisateur :</label>
            <input
              type="text"
              id="register-username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-email">Email :</label>
            <input
              type="email"
              id="register-email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="register-password">Mot de passe :</label>
            <input
              type="password"
              id="register-password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      )}
    </div>
  );
};

export default LoginRegister;
