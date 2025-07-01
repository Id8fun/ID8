/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import { LanguageProvider } from './src/hooks/useLanguage';

export const wrapRootElement = ({ element }) => {
  return <LanguageProvider>{element}</LanguageProvider>;
};
