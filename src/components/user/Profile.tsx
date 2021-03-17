import React, {useContext, useEffect, useState} from 'react';
import '../../assets/css/home.css'
import '../../assets/css/blog.css'
import {Col, Row } from 'reactstrap';
import {
    BrowserRouter as Router, Link, Route, Switch
} from 'react-router-dom';
import HomeContent from '../home/HomeContent';
import Avatar from "react-avatar";
import { PieChart } from 'react-minimal-pie-chart';
import UserPosts from "../home/components/UserPosts";
import Post from "../post/Post";
import { StoreContext } from '../../utils/store';
import QueryString from 'query-string'
import axios from "axios";

function Profile(props: any) {

    // chart
    const [selected, setSelected] = useState<number | undefined>(0);
    const [hovered, setHovered] = useState<number | undefined>(undefined);
    const [userId, setUserId] = useState(0)
    const [name, setName] = useState("Trần Cường")
    const [avt, setAvt] = useState("Trần Cường")
    const [userName, setUserName] = useState("CuongUET")

    const mockData = [
        { title: 'One', value: 10, color: '#E38627' },
        { title: 'Two', value: 65, color: '#C13C37' },
        { title: 'Three', value: 20, color: '#6A2135' },
    ]
    const data = mockData.map((entry: any, i: any) => {
        if (hovered === i) {
            return {
                ...entry,
                color: 'grey',
            };
        }
        return entry;
    });

    useEffect(() => {
        let tUserId = props.location.search;
        tUserId = QueryString.parse(tUserId)
        setUserId(id => tUserId.id)

        axios.get(`http://localhost:3000/user-info-by-id?id=${tUserId.id}`)
            .then(res => {
                setName(res.data.user.name)
                setUserName(res.data.user.username)
                setAvt(res.data.user.avatar)
            })
            .catch(() => {
                window.location.href = "/"
            })

    }, [])

    const lineWidth = 60;

    let store = useContext(StoreContext);

    return (
        <div>
            <Row className={'align-items-center d-flex profile-header'}>
                {/*avatar*/}
                <Col className={'col-md-1 mb-5 mt-5'}>
                    <Avatar src={avt} size="80" round={true} />
                </Col>
                <Col className={'col-md-10 text-left'}>
                    {/*name*/}
                    <h2 className={'pb-0 mb-0'}>{name}</h2>
                    {/*username*/}
                    <h4 className={'text-secondary'}>@{userName}</h4>
                </Col>
            </Row>
            {/*nav bar*/}
            <Row>
                <div className=" mt-3 nav-scroller py-1 mb-2 w-100">
                    <nav className="nav d-flex justify-content-start">
                        <Link className="p-2 link-secondary" to={`/profile?id=${userId}`}>Series</Link>
                        <Link className="p-2 link-secondary" to={`/profile/user-post?id=${userId}`}>Post</Link>
                        <Link className="p-2 link-secondary" to="#">Questions</Link>
                        <Link className="p-2 link-secondary" to="#">Answers</Link>
                        <Link className="p-2 link-secondary" to="#">Clips</Link>
                        <Link className="p-2 link-secondary" to="#">Followings</Link>
                        <Link className="p-2 link-secondary" to="#">Followers</Link>
                        <Link className="p-2 link-secondary" to="#">Tags</Link>
                        <Link className="p-2 link-secondary" to="#">Reputations</Link>
                        <Link className="p-2 link-secondary" to="#">Communication</Link>
                    </nav>
                </div>
            </Row>
            {/*body*/}
            <Row>
                <Col className={'col-md-9'}>
                    <Switch>
                        <Route path={`/profile/user-post`} component={UserPosts}>
                        </Route>
                        <Route path={`/profile`} component={UserPosts}>
                        </Route>
                    </Switch>
                </Col>

                {/*// sidebar*/}
                <Col className={'col-md-3'}>
                    <div className={'sidebar-box'}>
                        <div className="profile-stats d-flex flex-column text-left">
                            <div className={'d-flex mb-2 justify-content-between'}>
                                <span className="link-secondary">Total post views</span>
                                <span>137</span>
                            </div>
                            <div className={'d-flex mb-2 justify-content-between'}>
                                <span className="link-secondary">Reputations</span>
                                <span>153</span>
                            </div>
                            <div className={'d-flex mb-2 justify-content-between'}>
                                <span className="link-secondary">Following tags</span>
                                <span>11</span>
                            </div>
                            <div className={'d-flex mb-2 justify-content-between'}>
                                <span className="link-secondary">Following users</span>
                                <span>7</span>
                            </div>
                            <div className={'d-flex mb-2 justify-content-between'}>
                                <span className="link-secondary">Followers</span>
                                <span>13</span>
                            </div>
                            <div className={'d-flex mb-2 justify-content-between'}>
                                <span className="link-secondary">Posts</span>
                                <span>17</span>
                            </div>
                            <div className={'d-flex mb-2 justify-content-between'}>
                                <span className="link-secondary">Clips</span>
                                <span>17</span>
                            </div>
                            <div className={'d-flex mb-2 justify-content-between'}>
                                <span className="link-secondary">Total questions</span>
                                <span>3</span>
                            </div>
                            <div className={'d-flex mb-2 justify-content-between'}>
                                <span className="link-secondary">Total answers</span>
                                <span>52</span>
                            </div>
                        </div>
                    </div>
                    <div className={'sidebar-skill'}>
                        <div className={'skill-header mt-4 mb-3 d-flex'}>
                            <span>TECHNICAL SKILL</span>
                            <div className={'right-divider'}></div>
                        </div>
                        <div className={'skill-body text-left'}>
                            <div className={'skill'}>JavaScript</div>
                            <div className={'skill'}>PHP</div>
                            <div className={'skill'}>HTML</div>
                            <div className={'skill'}>Node.js</div>
                            <div className={'skill'}>MongoDB</div>
                            <div className={'skill'}>TypeScript</div>
                            <div className={'skill'}>Java</div>
                            <div className={'skill'}>MySQL</div>
                        </div>
                    </div>
                    <div className={'sidebar-organization'}>
                        <div className={'organization-header mt-4 mb-3 d-flex'}>
                            <span>ORGANIZATION</span>
                            <div className={'right-divider'}></div>
                        </div>
                    </div>
                    <div className={'sidebar-tendency'}>
                        <div className={'tendency-header mt-4 mb-3 d-flex'}>
                            <span>POSTS TENDENCY</span>
                            <div className={'right-divider'}></div>
                        </div>
                        <div className={'chart-tendency'}>
                            <PieChart
                                style={{
                                    fontFamily:
                                        '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                                    fontSize: '8px',
                                }}
                                data={data}
                                radius={PieChart.defaultProps.radius - 6}
                                lineWidth={60}
                                segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                                segmentsShift={(index) => (index === selected ? 6 : 1)}
                                animate
                                label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                                labelPosition={100 - lineWidth / 2}
                                labelStyle={{
                                    fill: '#fff',
                                    opacity: 0.75,
                                    pointerEvents: 'none',
                                }}
                                onClick={(_, index) => {
                                    setSelected(index === selected ? undefined : index);
                                }}
                                onMouseOver={(_, index) => {
                                    setHovered(index);
                                }}
                                onMouseOut={() => {
                                    setHovered(undefined);
                                }}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;
