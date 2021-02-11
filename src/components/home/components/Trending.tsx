import React from 'react';
import {Col, Row} from "reactstrap";
import '../../../assets/css/trending.css'
import '../../../assets/css/post.css'

function Trending () {
    return (
        <div className={'text-left'}>
            <Row className={'mb-2'}>
                <p>Vanilla JS Project: Animated sticker</p>
            </Row>
            <Row className={'size-13'}>
                Trần Cường
            </Row>
            <Row className={'size-13'}>
                291 lượt xem
            </Row>
            <hr/>
        </div>

    );
}

export default Trending;
