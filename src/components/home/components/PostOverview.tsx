import React from 'react';
import {Col, Row} from "reactstrap";
import Avatar from 'react-avatar';
import '../../../assets/css/post.css'
import {Link} from "react-router-dom";

function PostOverview (username = 'Trần Quốc Cường', tags: [], title: string = 'Không có tiêu đề', view: number = 0, cmt_count: number = 0, avatar: string = "https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg", postId = -1) {
    const tags_render = tags?.map(tag => {
        return (<span className={'mb-0 tags'}>#{tag}</span>)
    }) 
    return (
        <div>
            <Row>
                {/*image*/}
                <Col className={'col-md-1'}>
                    <Avatar src={avatar} size="50" round={true} />
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
                        {tags_render}
                    </Row>
                    {/*statistics*/}
                    <Row>
                        {view} views - {cmt_count} comment
                    </Row>
                </Col>
            </Row>
            <hr/>

        </div>

    );
}

export default PostOverview;
