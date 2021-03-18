import React, { useEffect, useState } from 'react';
import '../../../assets/css/home.css'
import {Col, Container, Row} from "reactstrap";
import '../../../assets/css/blog.css'
import axios from "axios";
import PaginationComponent from "react-reactstrap-pagination";
import PostOverview from "./PostOverview";
import QueryString from 'query-string'

function UserClips (props: any) {

    const [listPost, setListPost] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [curPageData, setCurPageData] = useState([])
    const PAGE_COUNT = 5
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        let tUserId = props.location.search;
        tUserId = QueryString.parse(tUserId)
        setUserId(id => tUserId.id)
        let listPostTemp: any[] = []
        axios.get(`http://localhost:3000/my-clips`)
            .then(res => {                res.data.data.forEach((e: any) => {
                listPostTemp.push(PostOverview(e.username, e.tags, e.title, e.view, e.cmt_count, e.avatar, e.id))
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

export default UserClips;
