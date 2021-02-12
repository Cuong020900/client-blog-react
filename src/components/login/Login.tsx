import React from 'react';
import {Button, Container, Input} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUpload} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import '../../assets/css/signin.css'


function Login(props: any) {

    return (
        <Container className={'sign-in'}>
            <form>
                <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                       autoFocus/>
                <label htmlFor="inputPassword" className="visually-hidden">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                       required/>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
            </form>
        </Container>

    );
}

export default Login;
