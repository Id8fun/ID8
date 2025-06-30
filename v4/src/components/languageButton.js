import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '@hooks/useLanguage';

const StyledLanguageButton = styled.div`
  position: relative;
  display: inline-block;

  .language-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    cursor: pointer;
  }

  .language-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--navy);
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    z-index: 100;
    min-width: 120px;
    margin-top: 5px;
    
    .language-option {
      padding: 10px 15px;
      cursor: pointer;
      font-size: var(--fz-xs);
      font-family: var(--font-mono);
      color: var(--lightest-slate);
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      
      &:hover {
        background-color: rgba(100, 255, 218, 0.1);
        color: var(--green);
      }
      
      &.active {
        color: var(--green);
        background-color: rgba(100, 255, 218, 0.1);
      }
      
      &:first-child {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
      }
      
      &:last-child {
        border-radius: 0 0 var(--border-radius) var(--border-radius);
      }
    }
  }
`;

const LanguageButton = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languageLabels = {
    'en': 'EN',
    'zh-CN': '简中',
    'zh-TW': '繁中'
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-button-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <StyledLanguageButton className="language-button-container">
      <button className="language-button" onClick={handleToggle}>
        {languageLabels[currentLanguage]}
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((language) => (
            <button
              key={language}
              className={`language-option ${currentLanguage === language ? 'active' : ''}`}
              onClick={() => handleLanguageChange(language)}
            >
              {languageLabels[language]}
            </button>
          ))}
        </div>
      )}
    </StyledLanguageButton>
  );
};

export default LanguageButton;