import React from 'react';
import '../../assets/css/home.css'
import {Col, Container, Row} from "reactstrap";
import '../../assets/css/blog.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import HomeContent from "./HomeContent";
import Post from "../post/Post";
import CreatePost from "../post/CreatePost";
import Login from '../login/Login';

function Home(props: any) {
    return (
        <Router>
            <Container className={'home'}>
                <header className="blog-header py-3">
                    <Row className="row flex-nowrap justify-content-between align-items-center">
                        <Col className="col-4 pt-1 text-left">
                            <a className="link-secondary" href="#">Subscribe</a>
                        </Col>
                        <Col className="col-4 text-center">
                            <a className="blog-header-logo text-dark" href="#">Viblo Pha ke</a>
                        </Col>
                        <Col className="col-4 d-flex justify-content-end align-items-center">
                            <a className="link-secondary" href="#" aria-label="Search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                     stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                     stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24">
                                    <title>Search</title>
                                    <circle cx="10.5" cy="10.5" r="7.5"/>
                                    <path d="M21 21l-5.2-5.2"/>
                                </svg>
                            </a>
                            <Link className="p-2 link-secondary btn btn-sm btn-outline-secondary" to="/signup">Sign up</Link>
                        </Col>
                    </Row>
                </header>

                <div className="nav-scroller py-1 mb-2">
                    <nav className="nav d-flex justify-content-between">
                        <Link className="p-2 link-secondary" to="/home">Home</Link>
                        <Link className="p-2 link-secondary" to="/post">Post</Link>
                        <Link className="p-2 link-secondary" to="/create-post">Create Post</Link>
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
                        <Route path="/post">
                            <Post />
                        </Route>
                        <Route path="/signup">
                            <Login />
                        </Route>
                        <Route path="/create-post">
                            <CreatePost />
                        </Route>
                        <Route path="/home">
                            <HomeContent />
                        </Route>
                        <Route path="/">
                            <HomeContent />
                        </Route>
                    </Switch>
                </div>
            </Container>
            <footer className="blog-footer mt-5">
                <p>Blog built for <a href="https://getbootstrap.com/">Money Forward</a> by <a
                    href="https://twitter.com/mdo">@cuongtq</a>.</p>
            </footer>
        </Router>

    );
}

export default Home;
