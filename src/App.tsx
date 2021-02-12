import React from 'react';
import './App.css';
import 'reactjs-popup/dist/index.css';
// @ts-ignore
import Home from './components/home/Home.tsx'
import ScrollToTop from "react-scroll-to-top";
import './assets/css/blog.css'


function App() {
  return (
    <div className="App">
        <ScrollToTop smooth />
        <Home />
    </div>
  );
}
export default App;
