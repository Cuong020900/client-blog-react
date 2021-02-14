import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MDEditor from '@uiw/react-md-editor';
import React, {useEffect, useState} from 'react';
import {Col, Row} from "reactstrap";
import '../../assets/css/post.css'
import axios from "axios";
import QueryString from 'query-string'
import Avatar from "react-avatar";

function Post (props: any) {
    const [title, setTitle] = useState('Không có title')
    const [content, setContent] = useState("Không có nội dung")
    const [userInfo, setUserInfo] = useState("Trần Quốc Cường")

    useEffect(() => {
        let postId = props.location.search;
        postId = QueryString.parse(postId)
        axios.get('http://localhost:3000/posts/' + postId.id)
            .then(res => {
                setTitle(res.data.post.title)
                setContent(res.data.post.content)
                setUserInfo(res.data.post.username)
            })
            .catch(e => console.error(e))
    }, [])

    return (
        <div>
            <Row>
                {/*content*/}
                <Col className={'col-md-1 text-left'}>
                    <Avatar githubHandle="sitebase" size="50" round={true} className={'social-sharing-avt'} />
                    <div data-v-1b6678dc=""
                         className="mt-3 social-sharing mb-2 social-sharing--horizontal social-sharing--small"><a
                        data-v-1b6678dc="" tooltip-placement="right" rel="noopener" className="link link--muted"
                        data-tippy="" data-original-title="Share a link to this page on Facebook"><i data-v-1b6678dc=""
                                                                                                     aria-hidden="true"
                                                                                                     className="fa fa-facebook"></i></a>
                        <a data-v-1b6678dc="" tooltip-placement="right" rel="noopener" className="link link--muted"
                           data-tippy="" data-original-title="Share a link to this page on Twitter"><i
                            data-v-1b6678dc="" aria-hidden="true" className="fa fa-twitter"></i></a>
                        </div>
                </Col>
                {/*post*/}
                <Col className={'col-md-8 text-left'}>
                    {/*USER INFO*/}
                    <div className={'ml-5'}><Avatar githubHandle="sitebase" size="50" round={true} /> {userInfo}</div>
                    {/*Title*/}
                    <div className={'mt-3 font-weight-bolder'}>
                        <h2>{title}</h2>
                    </div>
                    {/*tags*/}
                    <div>
                        <Row className={'ml-2 mb-5'}>
                            <span className={'mb-0 tags'}>#vscode</span>
                            <span className={'mb-0 tags'}>#javascript</span>
                        </Row>
                    </div>
                    {/*Content*/}
                    <MDEditor.Markdown source={content}></MDEditor.Markdown>
                </Col>

                {/*index*/}
                <Col className={'col-md-3'}>
                    {/*table of content*/}
                    <div>
                        <div className="post-index hidden-sm-down mt-5">
                            <div className="section-title-line"><h4 className="text-uppercase">
                                Table of contents
                            </h4>
                                <hr className="filler-line" />
                            </div>
                            <ul className="content-outline list-unstyled text-left post-index-child">
                                <li className="content-outline__item content-outline__item--level-2"><a
                                    href="#_1-bean-va-applicationcontext-la-gi-0" className="link link-active index">1. Bean và
                                    ApplicationContext là gì?</a></li>
                                <li className="content-outline__item content-outline__item--level-3 child-path"><a
                                    href="#_11-bean-la-gi-1" className="link">1.1. Bean là gì?</a></li>
                                <li className="content-outline__item content-outline__item--level-3 child-path"><a
                                    href="#_12-applicationcontext-la-gi-2" className="link">1.2. ApplicationContext là
                                    gì?</a></li>
                                <li className="content-outline__item content-outline__item--level-3 child-path"><a
                                    href="#_13-cach-lay-bean-ra-tu-context-3" className="link">1.3. Cách lấy bean ra từ
                                    Context</a></li>
                                <li className="content-outline__item content-outline__item--level-2"><a
                                    href="#_2-ki-thuat-inject-bean-vao-bean-khac-4" className="link index">2. Kĩ thuật inject
                                    bean vào bean khác</a></li>
                                <li className="content-outline__item content-outline__item--level-3 child-path"><a
                                    href="#_21-su-dung-autowired-5" className="link">2.1. Sử dụng @Autowired</a></li>
                                <li className="content-outline__item content-outline__item--level-3 child-path"><a
                                    href="#_22-inject-qua-constructor-hoac-setter-6" className="link">2.2. Inject qua
                                    constructor hoặc setter</a></li>
                                <li className="content-outline__item content-outline__item--level-2"><a
                                    href="#_3-khi-spring-boot-khong-biet-chon-bean-nao-7" className="link index">3. Khi Spring
                                    Boot không biết chọn bean nào?</a></li>
                                <li className="content-outline__item content-outline__item--level-3 child-path"><a
                                    href="#_31-khi-tim-thay-nhieu-bean-phu-hop-8" className="link">3.1. Khi tìm thấy
                                    nhiều bean phù hợp</a></li>
                                <li className="content-outline__item content-outline__item--level-3 child-path"><a
                                    href="#_32-giai-phap-9" className="link">3.2. Giải pháp</a></li>
                            </ul>
                        </div>
                    </div>
                    {/*series post*/}
                    <div></div>
                    {/*suggested organization*/}
                    <div></div>
                </Col>
            </Row>
        </div>
    );
}

export default Post;
