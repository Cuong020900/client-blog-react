import React from 'react';
import {Col, Row} from "reactstrap";
import Avatar from 'react-avatar';
import '../../../assets/css/post.css'
import {Link} from "react-router-dom";

function PostOverview (username = 'Trần Quốc Cường', title: string = 'Không có tiêu đề', view: number = 0, postId = -1) {
    return (
        <div>
            <Row>
                {/*image*/}
                <Col className={'col-md-1'}>
                    <Avatar src={"https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg"} size="50" round={true} />
                </Col>
                <Col className={'col-md-11 size-mini text-left'}>
                    {/*user info*/}
                    <Row>
                        <Col className={'col-md-2 p-0 text-primary'}>{username}</Col>
                        <Col className={'col-md-2 p-0'}>Tuesday, 9:39 PM</Col>
                        <Col className={'col-md-1 p-0'}>5 min read</Col>
                    </Row>
                    {/*Title*/}
                    <Row>
                        <Col className={'text-left p-0 mb-0'}>
                            <Link className="p-2 size-medium link-secondary" to={"/post?id=" + postId}>{title}</Link>
                        </Col>
                    </Row>
                    {/*tags*/}
                    <Row>
                        <span className={'mb-0 tags'}>#vscode</span>
                        <span className={'mb-0 tags'}>#javascript</span>
                    </Row>
                    {/*statistics*/}
                    <Row>
                        {view} lượt xem
                    </Row>
                </Col>
            </Row>
            <hr/>

        </div>

    );
}

export default PostOverview;
