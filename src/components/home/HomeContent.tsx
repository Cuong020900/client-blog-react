import React, {useContext, useEffect, useState} from 'react';
import '../../assets/css/home.css'
import {Col, Container, Row} from "reactstrap";
import '../../assets/css/blog.css'
// import Thumbnail from "./thumbnail/Thumbnail";
import PostOverview from "./components/PostOverview";
import Trending from "./components/Trending";
import Popup from "reactjs-popup";
import {StoreContext} from "../../utils/store";
import axios from "axios";

function HomeContent(props: any) {

    const [listPost, setListPost] = useState([])
    useEffect(() => {
        let listPostTemp: any[] = []
        axios.get('http://localhost:3000/posts')
            .then(res => {
                res.data.data.forEach((e: any) => {
                    listPostTemp.push(PostOverview(e.username, e.title, e.id))
                })
                // @ts-ignore
                setListPost(listPostTemp)
            })
    }, [])

    let list_post_trending = []
    for (let i = 0; i < 16; i++) {
        list_post_trending.push(Trending())
    }

    const store = useContext(StoreContext)

    return (
        <div>
            <Popup open={store.store.loggedIn} position="center center">
                <div className={'advertisement'}>Chưa có tài khoản? <a href="" className={'text-decoration-none'}>Đăng ký ngay</a></div>
            </Popup>
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
                            listPost
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
