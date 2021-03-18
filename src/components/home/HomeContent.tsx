import React, { useContext, useEffect, useState } from 'react';
import '../../assets/css/home.css'
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import '../../assets/css/blog.css'
// import Thumbnail from "./thumbnail/Thumbnail";
import PostOverview from "./components/PostOverview";
import Trending from "./components/Trending";
import Popup from "reactjs-popup";
import { StoreContext } from "../../utils/store";
import axios from "axios";
import PaginationComponent from "react-reactstrap-pagination";
import {
    Link
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
function HomeContent(props: any) {

    const [listPost, setListPost] = useState([])
    const [listPostTrending, setListPostTrending] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [curPageData, setCurPageData] = useState([])
    const [searchContent, setSearchContent] = useState("")
    const [searchTag, setSearchTag] = useState("")
    const PAGE_COUNT = 10

    useEffect(() => {
        store.store.showLoading()
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
        store.store.hideLoading()
    }, [])

    useEffect(() => {
        setPageData()
    }, [listPost, activePage])

    const store = useContext(StoreContext)
    const handlePageChange = (pageNumber: number) => {
        setActivePage(pageNumber)
    }
    const setPageData = () => {
        let tCurPageData = listPost.slice(PAGE_COUNT * (activePage - 1), PAGE_COUNT * activePage)
        setCurPageData(tCurPageData)
    }

    const [isShowSearchForm, setIsShowSearchForm] = useState(false)

    const searchPost = async () => {
        store.store.showLoading()

        setIsShowSearchForm(prev => false)
        let listPostTemp: any[] = []
        let dataSend = {
            post: {
                tag: searchTag,
                content: searchContent
            }
        }
        axios.post('http://localhost:3000/find-post', dataSend)
            .then(res => {
                res.data.data.forEach((e: any) => {
                    listPostTemp.push(PostOverview(e.name, e.tags, e.title, e.view, e.cmt_count, e.avatar, e.id))
                })
                // @ts-ignore
                setListPost(listPostTemp)
            })
        store.store.hideLoading()
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
                        <Row>
                            <Col className={'col-md-10'}>
                                <h4 className={'text-secondary font-weight-bold text-left'}>List of posts - Danh sách bài viết</h4>
                            </Col>
                            <Col className={'col-md-2'} onClick={() => setIsShowSearchForm(prev => !prev)}>
                                <a className="link-secondary" href="#" aria-label="Search">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24">
                                        <title>Search</title>
                                        <circle cx="10.5" cy="10.5" r="7.5" />
                                        <path d="M21 21l-5.2-5.2" />
                                    </svg>
                                </a>
                            </Col>
                        </Row>
                        {
                            isShowSearchForm && (
                                <Popup open={isShowSearchForm} position="center center" className={'p-20'}>
                                    <Form className={'w-100 text-left'}>
                                        <FormGroup>
                                            <Label for="postTitle">Post title</Label>
                                            <Input type="text" name="postTitle" onChange={e => setSearchContent(e.target.value)} id="postTitle" placeholder="Post title" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="postTag">Post tag</Label>
                                            <Input type="text" name="postTag" onChange={e => setSearchTag(e.target.value)} id="postTag" placeholder="Post tag" />
                                        </FormGroup>
                                    </Form>
                                    <div className={'text-center'}>
                                        <Button outline color="primary" onClick={searchPost}>
                                            <FontAwesomeIcon size={'sm'} icon={faSearch}></FontAwesomeIcon>
                                            &nbsp;Search</Button>{' '}
                                    </div>
                                </Popup>
                            )
                        }
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
