import React from 'react';
import '../../../assets/css/card.css'
import {Link} from "react-router-dom";

function PostOverview (username = 'Trần Quốc Cường', title: string = 'Không có tiêu đề', postId = -1, setReloadPost: any = null) {
    return (
        <div className="item text-left">
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="post-card__title word-break mb-05"
                    ><Link
                        to={"/post?id=" + postId}
                        onClick={() => {setReloadPost(postId)}}
                        className="text-dark size-medium"><span>{title}</span></Link>
                    </div>
                    <div className="post-card__author"><a className="text-primary">
                        {username}
                    </a></div>
                    <span title="3 min read"
                          className="text-muted post-reading_time text-muted post-card__time">
                                3 min read</span>
                </div>
            </div>
        </div>
    );
}

export default PostOverview;
