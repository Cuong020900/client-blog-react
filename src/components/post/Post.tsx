import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Container, Popover, PopoverBody, Row } from "reactstrap";
import '../../assets/css/post.css'
import '../../assets/css/sticky.css'
import axios from "axios";
import QueryString from 'query-string'
import Avatar from "react-avatar";
import "easymde/dist/easymde.min.css";
import MarkdownView from "react-showdown";
// @ts-ignore
import Showdown from "showdown";
import showdownToc from "showdown-toc";
import MDEditor from '@uiw/react-md-editor';
import PostOverview from "../home/components/PostOverview";
import PostRelated from "./related/PostRelated";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEllipsisH, faFlag } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../utils/store';

function Post(props: any) {
    const [title, setTitle] = useState('Không có title')
    const [content, setContent] = useState("Không có nội dung")
    const [content2, setContent2] = useState("Không có nội dung")
    const [userInfo, setUserInfo] = useState("Trần Quốc Cường")
    const [userAvt, setUserAvt] = useState("")
    const [tocHTML, setTocHTML] = useState<any>(null)
    const [id, setId] = useState(0)
    const [cuid, setCuid] = useState(0)
    const [reloadPost, setReloadPost] = useState(0)
    const toc: any[] = [];
    const showdown = new Showdown.Converter({ extensions: [showdownToc({ toc })] });
    let result: any;

    let store = useContext(StoreContext);

    // popover edit
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggleEdit = () => setPopoverOpen(!popoverOpen);

    document.body.addEventListener('click', () => setPopoverOpen(false), true)

    const [listRelatedPost, setListRelatedPost] = useState<any>([])

    // sticky
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {
        if (ref.current) {
            // @ts-ignore
            setSticky(ref.current.getBoundingClientRect().top <= 0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);
    // end sticky

    useEffect(() => {
        let postId = props.location.search;
        postId = QueryString.parse(postId)
        setId(id => postId.id)
        axios.get('http://localhost:3000/posts/' + postId.id)
            .then(res => {
                let html = document.createElement('ul');
                html.classList.add("content-outline", "list-unstyled", "text-left", "post-index-child")
                setTitle(res.data.post.title)
                setContent(res.data.post.content)
                setUserAvt(res.data.post.avatar)
                setUserInfo(res.data.post.username)
                setCuid(res.data.post.cuid)
                result = showdown.makeHtml(res.data.post.content)
                toc.forEach(e => {
                    let b = document.createElement("li")
                    b.classList.add("content-outline__item", "content-outline__item--level-2")
                    let link = document.createElement("a")
                    link.classList.add("link", "index")
                    link.innerText = e.text
                    link.href = '#' + e.anchor
                    switch (e.level) {
                        case 2: {
                            b.classList.add("child-path-lv-2")
                            break
                        }
                        case 3: {
                            b.classList.add("child-path-lv-3")
                            break
                        }
                        case 4: {
                            b.classList.add("child-path-lv-4")
                            break
                        }
                        default:
                            break

                    }
                    b.appendChild(link)

                    html.appendChild(b)
                })
                setContent2(result)
                setTocHTML(html.outerHTML)

                // related post
                let listPostTemp: any[] = []
                let count = 0
                res.data.related.forEach((e: any) => {
                    if (count++ < 4) {
                        listPostTemp.push(PostRelated(e.username, e.title, e.id, setReloadPost))
                    }
                })
                setListRelatedPost(listPostTemp)

            })
            .catch(e => console.error(e))

    }, [reloadPost])

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    // @ts-ignore
    return (
        <div>
            <Row>
                {/*content*/}
                <Col className={'col-md-1 text-left'}>
                    <Avatar src={store.store.avatar} size="50" round={true} className={'social-sharing-avt'} />
                    <div data-v-1b6678dc=""
                        className="mt-4 social-sharing mb-2 social-sharing--horizontal social-sharing--small"><a
                            onClick={e => {
                                window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURI(window.location.href)}`, '_blank')
                            }}
                            data-v-1b6678dc="" tooltip-placement="right" rel="noopener" className="link link--muted"
                            data-tippy="" data-original-title="Share a link to this page on Facebook"><i data-v-1b6678dc=""
                                aria-hidden="true"
                                className="fa fa-facebook"></i></a>

                        <a data-v-1b6678dc="" tooltip-placement="right" rel="noopener" className="link link--muted"
                            onClick={e => {
                                window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURI(window.location.href)}`, '_blank')
                            }}
                            data-tippy="" data-original-title="Share a link to this page on Twitter"><i
                                data-v-1b6678dc="" aria-hidden="true" className="fa fa-twitter"></i></a>
                    </div>
                </Col>
                {/*post*/}
                <Col className={'col-md-8 text-left content-area'}>
                    {/*USER INFO*/}
                    <div className={'mb-5'}><Avatar src={userAvt} size="50" round={true} /> {userInfo}</div>
                    {/*Title*/}
                    <div className={'mt-3 font-weight-bolder'}>
                        <h2>{title}</h2>
                    </div>
                    {/*tags*/}
                    <div>
                        <Row className={'ml-2 mb-5'}>
                            <Col className={'col-md-10'}>
                                <span className={'mb-0 tags'}>#vscode</span>
                                <span className={'mb-0 tags'}>#javascript</span>
                            </Col>
                            <Col className={'col-md-2'}>
                                <FontAwesomeIcon id='post-action-menu' size="2x" className={'text-secondary'} icon={faEllipsisH} onClick={toggleEdit}></FontAwesomeIcon>
                                <Popover placement="bottom" isOpen={popoverOpen} target="post-action-menu" className={'popover'} toggle={toggle}>
                                    <PopoverBody className={'p-0'}>
                                        <div className={'item'}>
                                            <Link className="p-0 text-decoration-none text-secondary" to={`/report-post?id=${id}`}>
                                                <FontAwesomeIcon size={'sm'} icon={faFlag}></FontAwesomeIcon>
                                                <span className={'ml-2'}>Report</span>
                                            </Link>
                                        </div>
                                        {
                                            +cuid === +store.store.userId && (
                                                <div className={'item'}>
                                                    <Link className="p-0 text-decoration-none text-secondary" to={`/edit-post?id=${id}`}>
                                                        <FontAwesomeIcon size={'sm'} icon={faEdit}></FontAwesomeIcon>
                                                        <span className={'ml-2'}>Edit</span>
                                                    </Link>
                                                </div>
                                            )
                                        }

                                    </PopoverBody>
                                </Popover>
                            </Col>
                        </Row>
                    </div>
                    {/*Content*/}
                    <MDEditor.Markdown className={'content-markdown'} allowDangerousHtml={true}
                        source={content2}></MDEditor.Markdown>
                    {/*<MarkdownView*/}
                    {/*    markdown={content}*/}
                    {/*    options={{ tables: true, emoji: true }}*/}
                    {/*/>*/}
                    {/*<div dangerouslySetInnerHTML={{ __html: content2 }} />*/}

                </Col>

                {/*index*/}
                <Col className={`col-md-3`}>
                    {/*table of content*/}
                    <div className={`sidebar-wrapper`} ref={ref}>
                        <div className={`sticky-sidebar post-index hidden-sm-down mt-5 ${isSticky ? 'sticky-tt' : ''}`}>
                            <div className="section-title-line">
                                <div className="mytextdiv">
                                    <div className="text-uppercase mytexttitle">
                                        Table of contents
                                    </div>
                                    <div className="divider"></div>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: tocHTML }} />

                            {/*series post*/}
                            <div className="section-title">
                                {/*<h4 className="text-uppercase size-13">*/}
                                {/*Suggested Organizations*/}
                                {/*</h4>*/}
                                <div className="mytextdiv mb-3">
                                    <div className="text-uppercase mytexttitle">
                                        Suggested Organizations
                                    </div>
                                    <div className="divider"></div>
                                </div>

                                <div className="user-list-container">
                                    <div className="organization-container">
                                        <div className="sidebar__organization">
                                            <div className="sidebar__organization__row"><a href="/o/php-education-team"
                                                className="d-flex"><img
                                                    width={40}
                                                    height={40}
                                                    data-v-5e990434=""
                                                    src="https://images.viblo.asia/thumbnail/007f6014-5780-4452-828c-f6f6382fdcdd.png"
                                                    srcSet="https://images.viblo.asia/thumbnail-retina/007f6014-5780-4452-828c-f6f6382fdcdd.png  2x"
                                                    alt="Avatar"
                                                    className="avatar avatar--xl avatar--rect avatar--ognzt" /></a>
                                                <div className="d-flex flex-column justify-content-center"><a
                                                    href="/o/php-education-team" className="word-break">
                                                    PHP Education Team
                                                </a>
                                                    <div className="stats text-nowrap"><span
                                                        className="stats-item text-muted" data-tippy=""
                                                        data-original-title="Posts: 7"><i aria-hidden="true"
                                                            className="stats-item__icon fa fa-pencil"></i>
        7
    </span><span className="stats-item text-muted" data-tippy="" data-original-title="Members: 41"><i aria-hidden="true"
                                                            className="stats-item__icon fa fa-users"></i>
        41
    </span><span className="stats-item text-muted" data-tippy="" data-original-title="Followers: 241"><i
                                                            aria-hidden="true"
                                                            className="stats-item__icon fa fa-user-plus"></i>
        241
    </span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="organization-container">
                                        <div className="sidebar__organization">
                                            <div className="sidebar__organization__row"><a
                                                href="/o/sun-cyber-security-team" className="d-flex"><img
                                                    width={40}
                                                    height={40}
                                                    data-v-5e990434=""
                                                    src="https://images.viblo.asia/thumbnail/6fba9e20-cbb1-4b63-aa36-c0e5664d19d1.png"
                                                    srcSet="https://images.viblo.asia/thumbnail-retina/6fba9e20-cbb1-4b63-aa36-c0e5664d19d1.png  2x"
                                                    alt="Avatar"
                                                    className="avatar avatar--xl avatar--rect avatar--ognzt" /></a>
                                                <div className="d-flex flex-column justify-content-center"><a
                                                    href="/o/sun-cyber-security-team" className="word-break">
                                                    Sun* Cyber Security Team
                                                </a>
                                                    <div className="stats text-nowrap"><span
                                                        className="stats-item text-muted" data-tippy=""
                                                        data-original-title="Posts: 139"><i aria-hidden="true"
                                                            className="stats-item__icon fa fa-pencil"></i>
        139
    </span><span className="stats-item text-muted" data-tippy="" data-original-title="Members: 10"><i aria-hidden="true"
                                                            className="stats-item__icon fa fa-users"></i>
        10
    </span><span className="stats-item text-muted" data-tippy="" data-original-title="Followers: 196"><i
                                                            aria-hidden="true"
                                                            className="stats-item__icon fa fa-user-plus"></i>
        196
    </span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="organization-container">
                                        <div className="sidebar__organization">
                                            <div className="sidebar__organization__row"><a href="/o/acb-developer"
                                                className="d-flex"><img
                                                    width={40}
                                                    height={40}
                                                    data-v-5e990434=""
                                                    src="https://images.viblo.asia/thumbnail/041f2205-6a99-4204-ba36-2863efc8e0e7.png"
                                                    srcSet="https://images.viblo.asia/thumbnail-retina/041f2205-6a99-4204-ba36-2863efc8e0e7.png  2x"
                                                    alt="Avatar"
                                                    className="avatar avatar--xl avatar--rect avatar--ognzt" /></a>
                                                <div className="d-flex flex-column justify-content-center"><a
                                                    href="/o/acb-developer" className="word-break">
                                                    ACB Developer
                                                </a>
                                                    <div className="stats text-nowrap"><span
                                                        className="stats-item text-muted" data-tippy=""
                                                        data-original-title="Posts: 1"><i aria-hidden="true"
                                                            className="stats-item__icon fa fa-pencil"></i>
        1
    </span><span className="stats-item text-muted" data-tippy="" data-original-title="Members: 4"><i aria-hidden="true"
                                                            className="stats-item__icon fa fa-users"></i>
        4
    </span><span className="stats-item text-muted" data-tippy="" data-original-title="Followers: 16"><i
                                                            aria-hidden="true"
                                                            className="stats-item__icon fa fa-user-plus"></i>
        16
    </span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*suggested orsganization*/}
                            <div></div>
                        </div>
                    </div>
                </Col>


            </Row>
            <Container className={'mt-5'}>
                <Row>
                    <Col className={'col-md-1'} />
                    <Col className={'col-md-11 mt-5'}>
                        <div className="v-ctr-section related-posts-widget pb-2"><h4 className="post-section-title text-left">
                            <strong>More from <span className={'text-primary'}>{userInfo}</span></strong></h4>
                            <div className={'list-related-posts'}>
                                {
                                    listRelatedPost
                                }
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}

export default Post;
