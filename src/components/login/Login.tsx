import React from 'react';
import { Button, Container, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import '../../assets/css/signin.css'
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';


function Login(props: any) {

    const [signInSuccess, setSignInSuccess] = React.useState(false)
    const [userName, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')

    const signIn = async () => {
        if (!(!!userName || !!password)) {
            toast.warning('Nhập đầy đủ các trường')
            return
        }
        let dataSend = {
            user: {
                username: userName,
                password: password
            }
        }
        try {
            let result = await axios.post('http://localhost:3000/login', dataSend)

            if (+result.status !== 202) {
                toast.error("Không đăng nhập được")
                return
            }
    
            let jwt = result.data.jwt
    
            localStorage.setItem('jwt', jwt)
            toast.success("Đăng nhập thành công")
            setSignInSuccess(true)
            window.location.href = "/"
        } catch {
            toast.warning("Sai tên đăng nhập hoặc mật khẩu")
        }
        
    }

    if (signInSuccess) return (<Redirect to={'/'} />)
    else
        return (
            <Container className={'sign-in'}>
                <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                <form className={'text-left'}>
                    <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                        value={userName}
                        onChange={(e) => {
                            setUserName(userName => e.target.value)
                        }}
                        autoFocus />
                    <label htmlFor="inputPassword" className="visually-hidden mt-3">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(password => e.target.value)
                        }}
                        required />
                    <div className="checkbox mt-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                    </div>
                </form>
                <button className="w-100 btn btn-lg btn-primary mt-5" onClick={signIn}>Sign in</button>
            </Container>

        );

}

export default Login;
