import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import {Button, Input} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

function CreatePost(props: any) {
    const [value, setValue] = React.useState("**Hello world!!!**");
    const [title, setTitle] = React.useState("");

    const createPost = async () => {
        let result = await axios.post('http://test.aaa', {value: value})
    }

    return (
            <div className={'text-left'}>

                Title:
                <Input className={'mb-4'} placeholder={'Nhập tiêu đề'}/>

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
                        <FontAwesomeIcon  icon={faUpload}/>
                        <span> </span>
                        Tạo Post</Button>
                </div>
            </div>

        );
}

export default CreatePost;
