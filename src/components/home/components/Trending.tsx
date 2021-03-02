import React from 'react';
import {Button, Col, Row} from "reactstrap";
import '../../../assets/css/trending.css'
import '../../../assets/css/post.css'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye} from '@fortawesome/free-solid-svg-icons'

function Trending (username = 'Trần Quốc Cường', title: string = 'Không có tiêu đề', view: number = 0, postId = -1) {
    return (
        <div className={'text-left'}>
            <Row className={'mb-0'}>
                <Link className="size-medium link-secondary" to={"/post?id=" + postId}>{title}</Link>
            </Row>
            <Row className={'size-13'}>
                @{username}
            </Row>
            <Row className={'size-13'}>
                <FontAwesomeIcon icon={faEye} className={'view-icon'} /> {view}
            </Row>
            <hr/>
        </div>

    );
}

export default Trending;
