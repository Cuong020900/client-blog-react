import React from 'react';
import { Button, Container, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import '../../assets/css/signin.css'
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';
import Avatar from 'react-avatar';


function Signup(props: any) {
    const [userName, setUserName] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [avatar, setAvatar] = React.useState('')
    const [rePassword, setRePassword] = React.useState('')
    const [signUpSuccess, setSignUpSuccess] = React.useState(false)

    const validatePassword = () => {
        if (!(password === rePassword)) {
            toast.warning('Password not match')
            return false
        }
        return true
    }

    const signUp = async () => {
        if (!(!!name || !!userName || !!password || !!rePassword)) {
            toast.warning('Please fill all box!!')
            return
        }
        if (!validatePassword()) return

        let dataSend = {
            user: {
                username: userName,
                name: name,
                password: password,
                avatar: avatar
            }
        }

        let result = await axios.post('http://localhost:3000/users', dataSend)

        if (+result.status !== 201) {
            toast.error("Cannot create account!!")
            return
        }

        let jwt = result.data.jwt

        localStorage.setItem('jwt', jwt)
        toast.success("Create account successfully!!")
        setSignUpSuccess(true)
        window.location.href = "/"
    }

    if (signUpSuccess) return (<Redirect to={'/'} />)
    else
        return (
            <Container className={'sign-up'}>
                <h1 className="h3 mb-3 fw-normal">Sign up</h1>
                <form className={'text-left'}>
                    <label htmlFor="inputUsername" className="visually-hidden">Username</label>
                    <input type="text" id="inputUsername" className="form-control" placeholder="Username"
                        // @ts-ignore
                        value={userName}
                        // @ts-ignore
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                        autoFocus />
                    <label htmlFor="inputPassword" className="visually-hidden mt-3">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                        // @ts-ignore
                        value={password}
                        // @ts-ignore
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <label htmlFor="inputRePassword" className="visually-hidden mt-3">Re-Password</label>
                    <input type="password" id="inputRePassword" className="form-control" placeholder="Re-Password"
                        // @ts-ignore
                        value={rePassword}
                        // @ts-ignore
                        onChange={(e) => {
                            setRePassword(e.target.value)
                        }}
                    />
                    <label htmlFor="inputName" className="visually-hidden mt-3">Full name</label>
                    <input type="text" id="inputName" className="form-control" placeholder="Full name"
                        // @ts-ignore
                        value={name}
                        // @ts-ignore
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <label htmlFor="inputAvatar" className="visually-hidden mt-3">Avatar</label>
                    <input type="text" id="inputAvatar" className="form-control mb-3" placeholder="Avatar URL"
                        // @ts-ignore
                        value={avatar}
                        // @ts-ignore
                        onChange={(e) => {
                            setAvatar(e.target.value)
                        }}
                    />
                    <Avatar size={'200'} round={true} src={avatar}></Avatar>
                </form>
                <button className="w-100 btn btn-lg btn-primary mt-5" onClick={signUp} >Register</button>
            </Container>
        );
}

export default Signup;
