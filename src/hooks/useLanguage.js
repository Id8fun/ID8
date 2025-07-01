import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getTranslation, defaultLanguage, languages } from '@locales';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

  useEffect(() => {
    // Check if we're in the browser and localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && languages.includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  const changeLanguage = language => {
    if (languages.includes(language)) {
      setCurrentLanguage(language);
      // Only use localStorage if we're in the browser
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('language', language);
      }
    }
  };

  const t = key => getTranslation(key, currentLanguage);

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    languages,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LanguageProvider };

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default useLanguage;
