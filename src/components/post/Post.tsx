import React, {useEffect, useRef, useState} from 'react';
import {Col, Row} from "reactstrap";
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

function Post (props: any) {
    const [title, setTitle] = useState('Không có title')
    const [content, setContent] = useState("Không có nội dung")
    const [content2, setContent2] = useState("Không có nội dung")
    const [userInfo, setUserInfo] = useState("Trần Quốc Cường")
    const [tocHTML, setTocHTML] = useState<any>(null)
    const toc:any[] = [];
    const showdown = new Showdown.Converter({ extensions: [showdownToc({ toc })] });
    let result: any;


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
        axios.get('http://localhost:3000/posts/' + postId.id)
            .then(res => {
                let html = document.createElement('ul');
                html.classList.add("content-outline", "list-unstyled", "text-left", "post-index-child")
                setTitle(res.data.post.title)
                setContent(res.data.post.content)
                setUserInfo(res.data.post.username)
                result = showdown.makeHtml(res.data.post.content)
                toc.forEach(e => {
                    let b = document.createElement("li")
                    b.classList.add("content-outline__item", "content-outline__item--level-2")
                    let link = document.createElement("a")
                    link.classList.add("link", "link-active", "index")
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
                        case 4:
                        {
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
            })
            .catch(e => console.error(e))

        // active content
        document.addEventListener("scroll", onscrollHandle)
    }, [])

    let onscrollHandle = () => {
        
    }

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
                <Col className={'col-md-8 text-left content-area'}>
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
                    <MDEditor.Markdown allowDangerousHtml={true} source={content2}></MDEditor.Markdown>
                    {/*<MarkdownView*/}
                    {/*    markdown={content}*/}
                    {/*    options={{ tables: true, emoji: true }}*/}
                    {/*/>*/}
                    {/*<div dangerouslySetInnerHTML={{ __html: content2 }} />*/}

                </Col>

                {/*index*/}
                <Col className={`col-md-3`} >
                    {/*table of content*/}
                    <div className={`sidebar-wrapper`} ref={ref} >
                        <div className={`sticky-sidebar post-index hidden-sm-down mt-5 ${isSticky ? 'sticky-tt' : ''}`}>
                            <div className="section-title-line"><h4 className="text-uppercase">
                                Table of contents
                            </h4>
                                <hr className="filler-line" />
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: tocHTML }} />
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
