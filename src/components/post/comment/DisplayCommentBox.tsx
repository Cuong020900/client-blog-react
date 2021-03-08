import axios from "axios";
import { useEffect, useState } from "react";
import Comment from './Comment'
function DisplayCommentBox (props: any) {
    const [listComment, setListComment] = useState<any>(null)

    useEffect(() => {
        getComments()
    }, [props.postId])

    const getComments = () => {
        axios.get(`http://localhost:3000/comments/${props.postId}`)
            .then(res => {
                let data = res.data.data
                let tListCmt: JSX.Element[] = []
                formatListComment(data)

                data.forEach((cmt:any) => {
                    if (!!!cmt.pid){
                        tListCmt.push(Comment(cmt.id, cmt.content, cmt.username, cmt.star, cmt?.child ?? []))
                    }
                })
                setListComment(() => tListCmt)
            })
            .catch(err => {
                console.error(err)
            })
    }

    const formatListComment = (tListComment: Array<any>) => {
        // list comment dang
        // {
        //     "id": 1,
        //     "post_id": 1,
        //     "content": "Bai viet kha hay",
        //     "cuid": 1,
        //     "created_at": "2021-03-08T21:26:12.000Z",
        //     "updated_at": "2021-03-08T21:26:23.000Z",
        //     "pid": null,
        //     "star": 5,
        //     "username": "cuong@gmail.com",
        //     "avatar": "https://i.gadgets360cdn.com/large/tom_and_jerry_paris_crop_1605590371930.jpg?downsize=950:*&output-quality=80"
        // },
        // {
        //     "id": 2,
        //     "post_id": 1,
        //     "content": "ong noi chuan qua!!",
        //     "cuid": 1,
        //     "created_at": "2021-03-08T14:34:27.253Z",
        //     "updated_at": "2021-03-08T14:34:27.253Z",
        //     "pid": 1,
        //     "star": 5,
        //     "username": "cuong@gmail.com",
        //     "avatar": "https://i.gadgets360cdn.com/large/tom_and_jerry_paris_crop_1605590371930.jpg?downsize=950:*&output-quality=80"
        // }

        // can format theo cha va con

        for (let i = 0, len = tListComment.length; i < len; i++) {
            let parentId = tListComment[i].pid
            if (parentId) {
                let parent = tListComment.find((x) => +x.id === +parentId)
                parent.child = [...parent?.child ?? [], tListComment[i]]
            }
        }
    }

    return (
        <div>
            {
                listComment
            }
        </div>
    );
}

export default DisplayCommentBox;
