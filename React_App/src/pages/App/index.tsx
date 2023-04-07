import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import Liked from "../Liked";
import Header from '../../components/Header';



const App: React.FC = () => {

  return (
    <div className="App">
      <Header />
      <BrowserRouter basename='/'>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/liked/`} element={<Liked />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;