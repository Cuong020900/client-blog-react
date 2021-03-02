import React, { useEffect, useState } from 'react';
import '../../../assets/css/home.css'
import {Col, Container, Row} from "reactstrap";
import '../../../assets/css/blog.css'
import axios from "axios";
import PaginationComponent from "react-reactstrap-pagination";
import PostOverview from "./PostOverview";

function UserPosts (props: any) {

    const [listPost, setListPost] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [curPageData, setCurPageData] = useState([])
    const PAGE_COUNT = 5

    useEffect(() => {
        let listPostTemp: any[] = []
        axios.get('http://localhost:3000/posts')
            .then(res => {                res.data.data.forEach((e: any) => {
                listPostTemp.push(PostOverview(e.username, e.title, e.view, e.id))
            })
                // @ts-ignore
                setListPost(listPostTemp)
            })
    }, [])

    useEffect(() => {
        setPageData()
    }, [listPost, activePage])

    const handlePageChange = (pageNumber: number) => {
        setActivePage(pageNumber)
    }
    const setPageData = () => {
        let tCurPageData = listPost.slice(PAGE_COUNT*(activePage - 1), PAGE_COUNT*activePage)
        setCurPageData(tCurPageData)
    }

    return (
        <div>
            <Container>
                <Row className={'mt-3'}>
                    <Col>
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
                </Row>
            </Container>
        </div>

    );
}

export default UserPosts;
