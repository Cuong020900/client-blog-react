import React from 'react';
import {Button, Container, Input} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUpload} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import '../../assets/css/signin.css'
import {toast} from "react-toastify";
import { Redirect } from 'react-router-dom';


function UserTopBar(props: any) {
    return (
        <Container className={'user-info'}>
        </Container>
    );
}

export default UserTopBar;
