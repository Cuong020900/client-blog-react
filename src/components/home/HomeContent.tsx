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
import PaginationComponent from "react-reactstrap-pagination";
import {
    Link
} from 'react-router-dom';
function HomeContent(props: any) {

    const [listPost, setListPost] = useState([])
    const [listPostTrending, setListPostTrending] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [curPageData, setCurPageData] = useState([])
    const PAGE_COUNT = 10

    useEffect(() => {
        let listPostTemp: any[] = []
        axios.get('http://localhost:3000/posts')
            .then(res => {
                    res.data.data.forEach((e: any) => {
                    listPostTemp.push(PostOverview(e.name, e.tags, e.title, e.view, e.cmt_count, e.avatar, e.id))
                })
                // @ts-ignore
                setListPost(listPostTemp)
            })

        let tListPostTrending: any[] = []
        axios.get('http://localhost:3000/top-trending')
            .then(res => {
                res.data.data.forEach((e: any) => {
                    tListPostTrending.push(Trending(e.username, e.title, e.view, e.id))
                })
                // @ts-ignore
                setListPostTrending(tListPostTrending)
            })
    }, [])

    useEffect(() => {
        setPageData()
    }, [listPost, activePage])

    const store = useContext(StoreContext)
    const handlePageChange = (pageNumber: number) => {
        setActivePage(pageNumber)
    }
    const setPageData = () => {
        let tCurPageData = listPost.slice(PAGE_COUNT*(activePage - 1), PAGE_COUNT*activePage)
        setCurPageData(tCurPageData)
    }

    return (
        <div>
            <Popup open={!store.store.loggedIn} position="center center">
                <div className="mb-5">
                    <img alt="VSS 2021" src="https://images.viblo.asia/full/0d3d50a8-e5fd-4a51-84c9-9751bf74246a.gif" width="100%" height="200px" />
                </div>
                <div className={'advertisement'}>Don't have an account? 
                    <Link className="p-2 link-secondary" to="/sign-up">Sign up now</Link>
                </div>
            </Popup>
            <Container>
                <Row>
                    <Col className={'col-md-9'} >
                        <h4 className={'text-secondary font-weight-bold text-left'}>List of posts - Danh sách bài viết</h4>
                    </Col>
                    <Col className={'col-md-3'}>
                        <h4 className={'text-primary font-weight-bold decoration'}>Top Trending</h4>
                    </Col>
                </Row>
                <Row className={'mt-3'}>
                    <Col className={'col-md-9'}>
                        {
                            curPageData
                        }
                        <div className={'pagination mt-3'}>
                            <PaginationComponent
                                totalItems={listPost.length}
                                pageSize={PAGE_COUNT}
                                onSelect={handlePageChange}
                            />
                        </div>
                    </Col>
                    <Col className={'col-md-3 trending'}>
                        {listPostTrending}
                    </Col>

                </Row>
            </Container>
        </div>

    );
}

export default HomeContent;
