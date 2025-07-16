import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Home';
import ComparePage from './pages/ComparePage';
import DashboardPage from './pages/Dashboard';
import WatchlistPage from './pages/WatchlistPage';
import CoinPage from './pages/Coin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/coin/:id" element={<CoinPage />} />
        <Route path="/compare" element={<ComparePage />} /> 
        <Route path="/watchlist" element={<WatchlistPage />} /> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
