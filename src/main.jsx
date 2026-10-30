import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';
import ApiDocs from './ApiDocs.jsx';
import SliceDocs from './SliceDocs.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/home-page">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/api" element={<ApiDocs />} />
        <Route path="/slice" element={<SliceDocs />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
