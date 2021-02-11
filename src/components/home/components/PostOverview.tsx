import React from 'react';
import {Col, Row} from "reactstrap";
import Avatar from 'react-avatar';
import '../../../assets/css/post.css'

function Home () {
    return (
        <div>
            <Row>
                {/*image*/}
                <Col className={'col-md-1'}>
                    <Avatar githubHandle="sitebase" size="50" round={true} />
                </Col>
                <Col className={'col-md-11 size-mini text-left'}>
                    {/*user info*/}
                    <Row>
                        <Col className={'col-md-2 p-0 text-primary'}>Trần Quốc Cường</Col>
                        <Col className={'col-md-2 p-0'}>Tuesday, 9:39 PM</Col>
                        <Col className={'col-md-1 p-0'}>5 min read</Col>
                    </Row>
                    {/*Title*/}
                    <Row>
                        <Col className={'text-left p-0 mb-0'}>
                            <h5>Là lập trình viên, bạn đã từng nghe nói đến .editorconfig?</h5>
                        </Col>
                    </Row>
                    {/*tags*/}
                    <Row>
                        <span className={'mb-0 tags'}>#vscode</span>
                        <span className={'mb-0 tags'}>#javascript</span>
                    </Row>
                    {/*statistics*/}
                    <Row>
                         9 lượt xem
                    </Row>

                </Col>
            </Row>
            <hr/>

        </div>

    );
}

export default Home;
