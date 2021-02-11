import React from 'react';
import './App.css';

// @ts-ignore
import Home from './components/home/Home.tsx'
import ScrollToTop from "react-scroll-to-top";


function App() {
  return (
    <div className="App">
        <ScrollToTop smooth />
        <Home />
    </div>
  );
}
export default App;
