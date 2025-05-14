import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StockPage from './StockPage';
import CorrelationPage from './CorrelationPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/">Stock Page</Link>
          <Link to="/correlation">Correlation Heatmap</Link>
        </nav>
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/correlation" element={<CorrelationPage />} />
        </Routes>
      </div>
    </Router>
  );
}