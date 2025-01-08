import "./style.css"
import React from "react";

import blankLikeButton from "./images/like-icon-0.png"
import filledLikeButton from "./images/pngtree-vector-like-icon-png-image_695769-removebg-preview.png"

interface User {
    id : number;
    username : string;
    fullName : string;
}

function Komentarz(props: {id : number, body: string, postID: number, likes : number, user : User}) {
    const [likeNumber, setLikeNumber] = React.useState<number>(props.likes);
    const [likeState, setLikeState] = React.useState<boolean>(false);
    const [dislikeState, setDislikeState] = React.useState<boolean>(false);
    const [likeImg, setLikeImg] = React.useState(blankLikeButton);
    const [dislikeImg, setDislikeImg] = React.useState(blankLikeButton);

    function handleLike() {
        if(dislikeState)
        {
            setDislikeState(false);
            setLikeState(true);
            setLikeNumber(likeNumber + 2);
            setDislikeImg(blankLikeButton);
            setLikeImg(filledLikeButton);
        } else {
            if(likeState)
            {
                setLikeState(false);
                setLikeNumber(likeNumber - 1);
                setLikeImg(blankLikeButton);
            } else {
                setLikeState(true);
                setLikeNumber(likeNumber + 1);
                setLikeImg(filledLikeButton);
            }
        }
    }

    function handleDislike() {
        if(likeState)
        {
            setLikeState(false);
            setDislikeState(true);
            setLikeNumber(likeNumber - 2);
            setDislikeImg(filledLikeButton);
            setLikeImg(blankLikeButton);
        } else {
            if(dislikeState)
            {
                setDislikeState(false);
                setLikeNumber(likeNumber + 1);
                setDislikeImg(blankLikeButton);
            } else {
                setDislikeState(true);
                setLikeNumber(likeNumber - 1);
                setDislikeImg(filledLikeButton);
            }
        }
    }

    return (
        <div className="rectangle marigin-padding body-color">
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    User: {props.user.username}
                </div>
                <div>
                    {likeNumber} likes
                </div>
            </div>

            <div style={{display: "flex", paddingInline: "10px" }}>
                <div className="rectangle marigin-padding comment-color" style={{width:'100%', textAlign:'left'}}>
                    {props.body}
                </div>
                <div className="marigin-padding">
                    <div>
                        <button onClick={handleLike} className='button-style'>
                            <img src={likeImg} width={50} height={50} className="body-color"/>
                        </button>
                    </div>
                    <div>
                        <button style={{margin: '10px'}} onClick={handleDislike} className='button-style'>
                            <img src={dislikeImg} width={50} height={50} className="body-color rotate"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Komentarz;
