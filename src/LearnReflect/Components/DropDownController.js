import React, { useState } from 'react';
import MenuIcon from '../../LearnReflect/Images/menuimg.png';
import { Link } from 'react-router-dom'; 
import { useAuth } from './Authanciation/AuthProvider';
import styles from '../Css/DropdownMenu.module.css';

function DropdownMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const { logout, isAuthenticated } = useAuth(); 

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className={styles.dropdown}>
      <img 
        src={MenuIcon} 
        alt="Menu Icon" 
        className={styles.menuIcon} 
        onClick={toggleMenu} 
      />
      {isMenuOpen && (
        <div className={styles.dropdownContent}>
          {isAuthenticated ? (
            <>
              <Link to="/profile">Profile</Link>
              <Link onClick={logout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          <Link to="/Futures">Futures</Link>
          <Link to="/AboutPage">About</Link>  
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
