import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './components/screens/MainPage';
import React, { useRef } from 'react';



function App() {
  return (
   <>
      <store>
        <Router>
          <Routes>
            <Route path="/" element={< MainPage/>} />
          </Routes>
        </Router>
      </store>
   
   
   </>
  );
}

export default App;
