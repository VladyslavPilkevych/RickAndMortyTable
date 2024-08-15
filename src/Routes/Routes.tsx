import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TablePage from '../pages/TablePage';
import CharacterDetailsPage from '../pages/CharacterDetailsPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TablePage />} />
      <Route path="/character/:id" element={<CharacterDetailsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default AppRoutes;
