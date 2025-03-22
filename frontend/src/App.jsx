import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails';


export default function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
    </Router>
  )
}
