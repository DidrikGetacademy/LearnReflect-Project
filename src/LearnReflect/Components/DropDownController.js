import React, { useState } from 'react';
import MenuIcon from '../../LearnReflect/Images/LearnReflect.jpeg'
import { Link } from 'react-router-dom'; 
import { useAuth } from './Authanciation/AuthProvider';
import PrivateRouteMenu from './Authanciation/PrivateRoute';
function DropdownMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
const { logout } = useAuth();

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};
  return (
    <div className='dropdown'>
      <img src={MenuIcon} alt="MenuIcon Logo" className='menu-icon' onClick={toggleMenu} />
      {isMenuOpen && (
        <div className='dropdown-content'>
          <PrivateRouteMenu>
            {(isAuthenticated) => (
              <>
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
              </>
            )}
          </PrivateRouteMenu>
          <Link to="/Futures">Futures</Link>
          <Link to="/AboutPage">About</Link>  
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;




