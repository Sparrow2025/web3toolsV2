import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

const NavigationLink = ({ to, text, prefix }) => {
    const location = useLocation();
    let isActive = location.pathname.startsWith(prefix)
    if (location.pathname === '/' && to === '/basic') {
        isActive = true
    }
  return (
    <Button
      component={Link}
      to={to}
      color="inherit"
      sx={{ backgroundColor: isActive ? '#e0e0e0' : 'transparent' }}
    >
      {text}
    </Button>
  );
};

export default NavigationLink;