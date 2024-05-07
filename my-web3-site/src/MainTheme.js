// MainTheme.js
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const MainTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MainTheme;