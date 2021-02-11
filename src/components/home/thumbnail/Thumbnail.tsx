import React from 'react';
import {Col, Container, Row} from "reactstrap";

function Home (props: any) {
    return (
        <div>
            <div className="top-news">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 tn-left">
                            <div className="row tn-slider">
                                <div className="col-md-6">
                                    <div className="tn-img">
                                        <img src="https://drscdn.500px.org/photo/1028315704/q%3D80_m%3D2000/v2?sig=09fea4699e386edad1ee5aa735a14980531721193e5e1bdb8a0e56d4b903a17d"/>
                                        <div className="tn-title">
                                            <a href="">Lorem ipsum dolor sit amet</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="tn-img">
                                        <img src="https://drscdn.500px.org/photo/1028315704/q%3D80_m%3D2000/v2?sig=09fea4699e386edad1ee5aa735a14980531721193e5e1bdb8a0e56d4b903a17d"/>
                                        <div className="tn-title">
                                            <a href="">Integer hendrerit elit eget purus sodales maximus</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 tn-right">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="tn-img">
                                        <img src="../../../assets/img/news-350x223-1.jpg"/>
                                        <div className="tn-title">
                                            <a href="">Lorem ipsum dolor sit</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="tn-img">
                                        <img src="../../../assets/img/news-350x223-2.jpg"/>
                                        <div className="tn-title">
                                            <a href="">Lorem ipsum dolor sit</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="tn-img">
                                        <img src="../../../assets/img/news-350x223-3.jpg"/>
                                        <div className="tn-title">
                                            <a href="">Lorem ipsum dolor sit</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="tn-img">
                                        <img src="../../../assets/img/news-350x223-4.jpg"/>
                                        <div className="tn-title">
                                            <a href="">Lorem ipsum dolor sit</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;
