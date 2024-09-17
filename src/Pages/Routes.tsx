import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/index';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default RoutesComponent;
