import React from 'react';
import '../../assets/css/home.css'
import {Col, Container, Row} from "reactstrap";
import '../../assets/css/blog.css'
// import Thumbnail from "./thumbnail/Thumbnail";
import PostOverview from "./components/PostOverview";
import Trending from "./components/Trending";


function HomeContent(props: any) {
    let list_post = []
    for (let i = 0; i < 10; i++) {
        list_post.push(PostOverview())
    }

    let list_post_trending = []
    for (let i = 0; i < 16; i++) {
        list_post_trending.push(Trending())
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col className={'col-md-9'} >
                        <h4 className={'text-secondary font-weight-bold text-left'}>Danh sách bài viết</h4>
                    </Col>
                    <Col className={'col-md-3'}>
                        <h4 className={'text-primary font-weight-bold decoration'}>Top Trending</h4>
                    </Col>
                </Row>
                <Row className={'mt-3'}>
                    <Col className={'col-md-9'}>
                        {
                            list_post
                        }
                    </Col>
                    <Col className={'col-md-3 trending'}>
                        {list_post_trending}
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default HomeContent;
