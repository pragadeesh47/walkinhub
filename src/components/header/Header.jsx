// Header.js
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { toast } from 'react-toastify';
import Icon from "../../assets/businessman.png"

const authLinks = ['/login', '/signup'];

const Header = () => {
  const location = useLocation();
  const [linkValue, setLinkValue] = useState('');
  const [linkText, setLinkText] = useState('');
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  // Listen for auth state changes to update currentUser state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      toast.success('Successfully signed out');
    } catch (error) {
      toast.error(error.message || 'Error signing out');
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes('post-walkin')) {
      setLinkValue('');
      setLinkText('Go Back');
    } else {
      setLinkValue('post-walkin');
      setLinkText('Post a Job');
    }
  }, [location.pathname]);

  // Don't render header on login or signup pages
  if (authLinks.some((path) => location.pathname.startsWith(path))) {
    return null;
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <div className='app-logo-container'>
        <img className='app-icon' src={Icon}/>
        <Link to="/" className="logo">
          Walkin<span>Hub</span>
        </Link>
        </div>
        <div className="header-right">
          {/* Only render link if linkValue is not empty */}
          {(
            <Link to={`/${linkValue}`} className="open-door-link">
              {linkText}
            </Link>
          )}
          {currentUser && (
            <button
              onClick={handleSignOut}
              aria-label="Sign out"
              className="signout-button"
              type="button"
            >
              <FaSignOutAlt size={24} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;