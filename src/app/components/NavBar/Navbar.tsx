// /app/components/NavBar/Navbar.tsx

'use client';

import React, { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { MdLogout, MdInfo } from 'react-icons/md';
import './navbar.scss';

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  const handleSellClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      router.push('/auth');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/" className="navbar-logo">
          ShopiDrone
        </Link>
        <div className="navbar-items">
          <Link href="/fullList" className={`nav-item ${pathname === '/fullList' ? 'active' : ''}`}>
            Acheter
          </Link>
          <Link 
            href={user ? "/sell" : "#"} 
            className={`nav-item ${pathname === '/sell' ? 'active' : ''}`}
            onClick={handleSellClick}
          >
            Vendre tes pièces
          </Link>
          {/* Ajoutez d'autres liens ici si nécessaire */}
        </div>
      </div>
      <div className="navbar-right">
        {!user ? (
          <Link href="/auth" className="login-link">
            Se connecter
          </Link>
        ) : (
          <div className="profile-container" ref={dropdownRef}>
            <FaUserCircle
              size={30}
              className="profile-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link href="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                  <MdInfo size={20} /> Info
                </Link>
                <button className="dropdown-item" onClick={handleLogout}>
                  <MdLogout size={20} /> Déconnexion
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
