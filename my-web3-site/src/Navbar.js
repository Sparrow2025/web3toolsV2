// Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavigationLink from './NavigationLink';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Web3 Tools
        </Typography>
        <NavigationLink to="/basic" text="基础" prefix='/basic' />
        <NavigationLink to="/btc" text="BTC" prefix='/btc' />
        <NavigationLink to="/evm" text="EVM" prefix='/evm' />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
