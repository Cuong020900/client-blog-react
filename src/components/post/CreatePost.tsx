import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

function CreatePost(props: any) {
    const [value, setValue] = React.useState("**Hello world!!!**");
    const [title, setTitle] = React.useState("Hello world!!!");
    let [createSuccess, setCreateSuccess] = React.useState(false)
    const [tags, setTags] = React.useState(["JavaScript"])

    const createPost = () => {
        let postData = {
            title: title,
            content: value
        }
        axios.post('http://localhost:3000/posts', { post: postData, tags: tags })
            .then(res => {
                toast.success('Tạo bài viết thành công')
                setCreateSuccess(true)
            })
            .catch(err => {
                toast.success('Có lỗi trong lúc tạo bài viết')
                console.error(err)
            })

    }

    if (createSuccess) {
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

            Tags:
            <ReactTagInput
                tags={tags}
                // @ts-ignore
                onChange={(newTags: string) => setTags(newTags)}
            />

            Content:
            <MDEditor
                value={value}
                height={500}
                // @ts-ignore
                onChange={setValue}
            />
            <div className={'text-right'}>
                <Button className={'mt-3 btn-success mb-5'}
                    onClick={createPost}
                >
                    <FontAwesomeIcon icon={faUpload} />
                    <span> </span>
                    Tạo Post</Button>
            </div>
        </div>

    );
}

export default CreatePost;
