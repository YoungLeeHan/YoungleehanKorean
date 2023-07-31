import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import axios from "axios";

import moment from "moment";
import "moment/locale/ko";

import { PostDiv, Post, BtnDiv } from "../../styles/PostDetailCSS.js";

function Detail(props) {
    let params = useParams();
    let navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const SetTime = (a, b) => {
        if (a !== b) {
            return moment(b).format("YYYY년 MMMM Do, hh:mm") + "(수정됨)";
        } else {
            return moment(a).format("YYYY년 MMMM Do, hh:mm");
        }
    };

    const DeleteHandler = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            let body = {
                postNum: params.postNum,
            };
            axios
                .post("/api/post/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("게시글이 삭제되었습니다.");
                        navigate("/");
                    }
                })
                .catch((err) => {
                    alert("게시글 삭제에 실패하였습니다.");
                });
        }
    };

    return (
        <PostDiv>
            <Post>
                <h1>{props.PostInfo.title}</h1>
                <div className="author">
                    <Avatar
                        size="40"
                        round={true}
                        src={props.PostInfo.author.photoURL}
                        style={{ border: "1px solid #c6c6c6" }}
                    />
                    <p>{props.PostInfo.author.displayName}</p>
                    <p className="time">
                        {SetTime(
                            props.PostInfo.createdAt,
                            props.PostInfo.updatedAt
                        )}
                    </p>
                </div>
                {props.PostInfo.image ? (
                    <img
                        src={props.PostInfo.image}
                        alt=""
                        style={{ width: "100%", height: "auto" }}
                    />
                ) : null}
                <p>{props.PostInfo.content}</p>
            </Post>
            {user.uid === props.PostInfo.author.uid && (
                <BtnDiv>
                    <Link to={`/edit/${props.PostInfo.postNum}`}>
                        <button className="edit">수정</button>
                    </Link>

                    <button className="delete" onClick={() => DeleteHandler()}>
                        삭제
                    </button>
                </BtnDiv>
            )}
        </PostDiv>
    );
}

export default Detail;
