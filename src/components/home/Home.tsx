import React, { useContext, useState } from 'react';
import '../../assets/css/home.css'
import { Col, Container, Row, Popover, PopoverHeader, PopoverBody, Button } from "reactstrap";
import '../../assets/css/blog.css'
import {
    Switch,
    Route,
    Link
} from 'react-router-dom';
import HomeContent from "./HomeContent";
import Post from "../post/Post";
import CreatePost from "../post/CreatePost";
import Login from '../login/Login';
import Signup from "../login/Signup";
import { StoreContext } from "../../utils/store";
import Profile from "../user/Profile";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBuilding, faCog, faHistory, faPen, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import UpdatePost from '../post/UpdatePost';

function Home(props: any) {
    let store = useContext(StoreContext);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    document.body.addEventListener('click', () => setPopoverOpen(false), true)

    return (
        <div>
            <Container className={'home'}>
                <header className="blog-header py-3 sticky-inner">
                    <Row className="row flex-nowrap justify-content-between align-items-center">
                        <Col className="col-4 pt-1 text-left">
                            <a className="link-secondary" href="#">Subscribe</a>
                        </Col>
                        <Col className="col-4 text-center">
                            <Link className="blog-header-logo text-dark" to="/">Viblo Pha ke</Link>
                        </Col>
                        <Col className="col-4 d-flex justify-content-end align-items-center">
                            <a className="link-secondary" href="#" aria-label="Search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24">
                                    <title>Search</title>
                                    <circle cx="10.5" cy="10.5" r="7.5" />
                                    <path d="M21 21l-5.2-5.2" />
                                </svg>
                            </a>
                            {
                                store.store.loggedIn &&
                                <div>
                                    <div id={'profile-menu'}>
                                        <Avatar src={store.store.avatar} size="50" round={true} onClick={toggle} />
                                    </div>
                                    <Popover placement="bottom" isOpen={popoverOpen} target="profile-menu" className={'popover'} toggle={toggle}>
                                        <PopoverHeader className={'popover-header'}>
                                            <div className={'popover-avt mr-3'}>
                                                <Avatar src={store.store.avatar} size="50" round={true} onClick={toggle} />
                                            </div>
                                            <div className={'popover-username'}>
                                                <h6 className={'text-primary pb-0'}>{store.store.name}</h6>
                                                <span className={'text-secondary'}><span className="text-danger"></span>{store.store.username}</span>
                                            </div>
                                            <div className={'popover-edit text-center align-items-center'}>
                                                <Button size={'sm'} color={'primary'}>Edit</Button>
                                            </div>
                                        </PopoverHeader>
                                        <PopoverBody className={'popover-body d-flex flex-column p-0'}>
                                            <div className={'item'}>
                                                <Link className="p-0 text-decoration-none text-secondary" to="/create-post">
                                                    <FontAwesomeIcon size={'sm'} icon={faPen}></FontAwesomeIcon>
                                                    <span className={'ml-2'}>Create Post</span>
                                                </Link>
                                            </div>
                                            <div className={'item'}>
                                                <Link className="p-0 text-decoration-none text-secondary" to="/profile">
                                                    <FontAwesomeIcon size={'sm'} icon={faUser}></FontAwesomeIcon>
                                                    <span className={'ml-2'}>Profile</span>
                                                </Link>
                                            </div>
                                            <div className={'item'}>
                                                <Link className="p-0 text-decoration-none text-secondary" to="/profile">
                                                    <FontAwesomeIcon size={'sm'} icon={faBook}></FontAwesomeIcon>
                                                    <span className={'ml-2'}>My Contents</span>
                                                </Link>
                                            </div>
                                            <div className={'item'}>
                                                <Link className="p-0 text-decoration-none text-secondary" to="/profile">
                                                    <FontAwesomeIcon size={'sm'} icon={faHistory}></FontAwesomeIcon>
                                                    <span className={'ml-2'}>My Activities</span>
                                                </Link>
                                            </div>
                                            <div className={'item'}>
                                                <Link className="p-0 text-decoration-none text-secondary" to="/profile">
                                                    <FontAwesomeIcon size={'sm'} icon={faBuilding}></FontAwesomeIcon>
                                                    <span className={'ml-2'}>Organizations</span>
                                                </Link>
                                            </div>
                                            <div className={'item'}>
                                                <Link className="p-0 text-decoration-none text-secondary" to="/profile">
                                                    <FontAwesomeIcon size={'sm'} icon={faCog}></FontAwesomeIcon>
                                                    <span className={'ml-2'}>Preferences</span>
                                                </Link>
                                            </div>
                                            <div className={'popover-divider'}></div>
                                            <div className={'item'}>
                                                <Link className="p-0 text-decoration-none text-secondary" to="/"
                                                    onClick={() => {
                                                        localStorage.removeItem("jwt")
                                                        store.store.setLoggedIn(false)
                                                    }
                                                    }>
                                                    <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
                                                    <span className={'ml-2'}>Sign out</span>
                                                </Link>
                                            </div>
                                        </PopoverBody>
                                    </Popover>
                                </div>
                            }
                            {
                                !store.store.loggedIn &&
                                <div>
                                    <Link className="p-2 link-secondary btn btn-sm btn-outline-secondary" to="/sign-up">Sign
                                        up</Link>
                                    <Link className="p-2 link-secondary btn btn-sm btn-outline-secondary ml-2"
                                        to="/sign-in">Sign in</Link>
                                </div>

                            }
                        </Col>
                    </Row>
                </header>

                <div className="nav-scroller py-1 mb-2">
                    <nav className="nav d-flex justify-content-between">
                        <Link className="p-2 link-secondary" to="/home">Home</Link>
                        <a className="p-2 link-secondary" href="#">U.S.</a>
                        <a className="p-2 link-secondary" href="#">Technology</a>
                        <a className="p-2 link-secondary" href="#">Design</a>
                        <a className="p-2 link-secondary" href="#">Culture</a>
                        <a className="p-2 link-secondary" href="#">Business</a>
                        <a className="p-2 link-secondary" href="#">Politics</a>
                        <a className="p-2 link-secondary" href="#">Opinion</a>
                        <a className="p-2 link-secondary" href="#">Science</a>
                        <a className="p-2 link-secondary" href="#">Health</a>
                        <a className="p-2 link-secondary" href="#">Style</a>
                        <a className="p-2 link-secondary" href="#">Travel</a>
                    </nav>
                </div>

                <div>
                    <Switch>
                        <Route exact path="/post" component={Post}>
                            {/*<Post />*/}
                        </Route>
                        <Route path="/sign-in">
                            <Login />
                        </Route>
                        <Route path="/sign-up">
                            <Signup />
                        </Route>
                        <Route path="/create-post">
                            <CreatePost />
                        </Route>
                        <Route path="/home" component={HomeContent}>
                            {/*<HomeContent />*/}
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/edit-post" component={UpdatePost}>
                        </Route>
                        <Route exact path="/">
                            <HomeContent />
                        </Route>
                        <Route path="/">
                            Sorry! Currently does not have this function
                        </Route>
                    </Switch>
                </div>
            </Container>
            <footer className="blog-footer mt-5">
                <p>Blog built for <a href="https://getbootstrap.com/">Money Forward</a> by <a
                    href="https://twitter.com/mdo">@cuongtq</a>.</p>
            </footer>
        </div>

    );
}

export default Home;
