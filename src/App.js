import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/details" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
