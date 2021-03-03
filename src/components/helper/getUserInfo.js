import {StoreContext} from "../../utils/store";
import React, { useContext } from 'react';
import axios from "axios";

export default function (props) {
    let store = useContext(StoreContext);

    let jwt = localStorage.getItem('jwt') || ''
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
    axios.get('http://localhost:3000/user-info')
        .then(res => {
            store.store.setUsername((e) => res.data.user.username)
            store.store.setName((e) => res.data.user.name)
            store.store.setLoggedIn((e) => true)
            store.store.setUserId((e) => res.data.user.id ?? "")
            store.store.setAvatar((e) =>res.data.user.avatar ?? "")
        })
        .catch(err => console.error(err))
}