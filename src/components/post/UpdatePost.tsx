import React, { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import {Button, Input} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRemoveFormat, faTrash, faUpload} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";
import QueryString from 'query-string'

function UpdatePost(props: any) {
    const [value, setValue] = React.useState("*** Hello World ***");
    const [title, setTitle] = React.useState("Hello world!!!");
    let [updateSuccess, setUpdateSuccess] = React.useState(false)
    const [id, setId] = useState(0)

    useEffect(() => {
        let postId = props.location.search;
        postId = QueryString.parse(postId)
        setId(id => postId.id)
        axios.get('http://localhost:3000/posts/' + postId.id)
        .then(res => {
            setTitle(res.data.post.title)
            setValue(res.data.post.content)
        })
        .catch(e => console.error(e))
    }, [])

    const updatePost = () => {
        let postData = {
            title: title,
            content: value
        }
        axios.put(`http://localhost:3000/posts/${id}`, {post: postData})
            .then(res => {
                toast.success('Sửa bài viết thành công')
                setUpdateSuccess(true)
            })
            .catch(err => {
                toast.error('Có lỗi trong lúc sửa bài viết')
                console.error(err)
            })

    }

    const deletePost = () => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(res => {
                toast.success('Xoá bài viết thành công')
                setUpdateSuccess(true)
            })
            .catch(err => {
                toast.error('Có lỗi trong lúc xoá bài viết')
                console.error(err)
            })

    }

    if (updateSuccess) {
        return (
            <Redirect to={'/'} />
        )
    }
    return (
        <div className={'text-left'}>

            Title:
            <Input className={'mb-4'} placeholder={'Nhập tiêu đề'}
                   value={title}
                   onChange={e => {
                       setTitle(e.target.value)
                   }}
            />

            Content:
            <MDEditor
                value={value}
                height={500}
                // @ts-ignore
                onChange={setValue}
            />
            <div className={'text-right'}>
            <Button className={'mt-3 btn-danger mb-5'}
                        onClick={deletePost}
                >
                    <FontAwesomeIcon icon={faTrash}/>
                    <span> </span>
                    Xoá Post</Button>
                <Button className={'mt-3 ml-3 btn-success mb-5'}
                        onClick={updatePost}
                >
                    <FontAwesomeIcon icon={faUpload}/>
                    <span> </span>
                    Update Post</Button>
                    
            </div>
        </div>

    );
}

export default UpdatePost;
