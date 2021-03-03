import React, {useCallback, useEffect, useState} from 'react';
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
// @ts-ignore
import { ReactTitle } from 'react-meta-tags'
function App() {

    const [username, setUsername] = useState('')
    const [loggedIn, setLoggedIn] = useState('')
    const [userId, setUserId] = useState('')
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')

    let jwt = localStorage.getItem('jwt') || ''
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    axios.get('http://localhost:3000/user-info')
        .then(res => {
            initStore.store.setUsername((e: any) => res.data.user.username)
            initStore.store.setName((e: any) => res.data.user.name)
            initStore.store.setLoggedIn((e: any) => true)
            initStore.store.setUserId((e: any) => res.data.user.id ?? "")
            initStore.store.setAvatar((e: any) =>res.data.user.avatar ?? "")
        })
        .catch(err => console.error(err))

    const initStore: any = {
        store: {
            username: username,
            setUsername: setUsername,
            loggedIn: loggedIn,
            setLoggedIn: setLoggedIn,
            userId: userId,
            setUserId: setUserId,
            avatar: avatar,
            setAvatar: setAvatar,
            name: name,
            setName: setName
        }
    }

  return (
      <StoreContext.Provider value={initStore}>
          <div className="App">
              <ReactTitle title="Viblo Pha ke"/>
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
