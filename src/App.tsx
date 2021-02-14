import React, {useEffect, useState} from 'react';
import './App.css';
import 'reactjs-popup/dist/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @ts-ignore
import Home from './components/home/Home.tsx'
import ScrollToTop from "react-scroll-to-top";
import './assets/css/blog.css'
import {
    BrowserRouter as Router
} from 'react-router-dom';
import {StoreContext, storeContextDefaultValue} from './utils/store';
import axios from "axios";

function App() {

    const [username, setUsername] = useState('')
    const [loggedIn, setLoggedIn] = useState('')

    const initStore: any = {
        store: {
            username: username,
            setUsername: setUsername,
            loggedIn: loggedIn,
            setLoggedIn: setLoggedIn
        }
    }

    useEffect( () => {
        let jwt = localStorage.getItem('jwt') || ''
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
        axios.get('http://localhost:3000/user-info')
            .then(res => {
                initStore.store.setUsername(res.data.user.name)
                initStore.store.setLoggedIn(true)
            })
            .catch(err => console.log(err))
    }, [])

  return (
      <StoreContext.Provider value={initStore}>
          <div className="App">
              <Router>
                  <ToastContainer/>
                  <ScrollToTop smooth/>
                  <Home/>
              </Router>
          </div>
      </StoreContext.Provider>
  );
}
export default App;
