import React, { useContext, useState } from "react";
import '../../../assets/css/comment.css'
import { Card, CardBody, CardHeader, Collapse, UncontrolledCollapse } from "reactstrap";
//@ts-ignore
import ReactStars from "react-rating-stars-component";
import CreateCommentBox from "./CreateCommentBox";

function Comment(id = 0, content = '', author = '', star = 5, child: any = []) {
    let childCmt: any = []
    child.forEach((cmt: any) => {
        childCmt.push(Comment(cmt.id, cmt.content, cmt.username, cmt.star, cmt?.child ?? []))
    })

    return (
        <div className={'mt-5 text-left'} key={id}>
            <Card>
                <CardHeader>
                    <ReactStars
                        value={star}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        edit={false}
                    />
                    {author}
                </CardHeader>
                <CardBody>
                    {content}
                    <br />
                    <span className={'more-cmt'} id={`toggler${id}`}>more...</span>
                    <span className={'more-cmt'} id={`toggler-rep-${id}`}>&nbsp;&nbsp;&nbsp;&nbsp;reply</span>
                    <UncontrolledCollapse
                        toggler={`#toggler-rep-${id}`}
                    >
                        <CreateCommentBox parentId={id}></CreateCommentBox>
                    </UncontrolledCollapse>
                    <UncontrolledCollapse
                        toggler={`#toggler${id}`}
                    >
                        {childCmt}
                    </UncontrolledCollapse>
                </CardBody>
            </Card>
        </div>
    );
}

export default Comment;
