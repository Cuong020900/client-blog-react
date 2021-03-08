import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import React, { useState } from 'react';
//@ts-ignore
import ReactStars from "react-rating-stars-component";
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';

function CreateCommentBox(props: any) {
    const [content, setContent] = useState('');
    const [star, setStar] = useState('5');

    const createComment = () => {
        let dataSend = {
            comment: {
                post_id: props?.postId,
                pid: props?.parentId ?? null,
                star: star,
                content: content
            }
        }

        axios.post('http://localhost:3000/comments', dataSend)
            .then(res => {
                toast.success('Thành công')
                window.location.reload()
            })
            .catch(err => {
                toast.success('Có lỗi')
                console.error(err)
            })
    }
    return (
        <div className={'text-left'}>
            <ReactStars
                count={5}
                onChange={setStar}
                size={24}
                activeColor="#ffd700"
            />
            <MDEditor
                value={content}
                height={200}
                // @ts-ignore
                onChange={setContent}
            />
            <Button className={'mt-3 btn-secondary'}
                        onClick={createComment}
                >
                    <FontAwesomeIcon icon={faUpload}/>
                    <span> </span>
                    Comment</Button>
        </div>
    );
}

export default CreateCommentBox;
