// routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 将 BrowserRouter 改为 Router
import MainTheme from './MainTheme';
import Navbar from './Navbar';
import HomePage from './HomePage';
import BasicToolsPage from './components/BasicToolsPage';
import BTCPage from './BTCPage';
import EVMPage from './EVMPage';

import Base64Tool from './components/basic/Base64Tool';
import MnemonicGenerator from './components/basic/MnemonicGenerator';
import BatchAddressGenerator from './components/basic/BatchAddressGenerator';

const RoutesComponent = () => {
    console.log("init routes");
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/basic" element={<BasicToolsPage />} >
        <Route path="base64" element={<Base64Tool />} />
        <Route path="mnemonic-generator" element={<MnemonicGenerator />} />
        <Route path="batch-address-generator" element={<BatchAddressGenerator />} />
      </Route>
      <Route path="/btc" element={<BTCPage />} />
      <Route path="/evm" element={<EVMPage />} />
    </Routes>
  );
};

const RoutesWrapper = () => {
  return (
    <Router>
      <MainTheme>
        <Navbar />
        <RoutesComponent />
      </MainTheme>
    </Router>
  );
};

export default RoutesWrapper;
