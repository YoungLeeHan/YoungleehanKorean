import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import {UploadButtonDiv, UploadDiv, UploadForm} from "../../styles/pages/UploadCSS";
import axios from "axios";


function Upload(props) {
    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("");
    const navigate = useNavigate();


    const onSubmit =(e) => {
        e.preventDefault();

        if(Title === "" || Content ===""){
            return alert("Please fill in all fields");
        }

        let body = {
            title:Title,
            content: Content,
        }

        axios.post("/api/post/submit", body).then((response) => {
            if(response.data.success){
                alert("Submit Completed")
                navigate("/")
            }else {
                alert("Submit failed")
            }
        }).catch((err)=> {
            console.log(err);
        })
    };


    return(
        <UploadDiv>
            <UploadForm>
                <label htmlFor="title">Title</label>
                <input
                    id = "title"
                    type="text"
                    value={Title}
                    onChange={(event) => {
                        setTitle(event.currentTarget.value);
                    }}/>
                <label htmlFor="content">Content</label>
                <textarea
                    value={Content}
                    onChange={(event) => {
                        setContent(event.currentTarget.value);
                    }}/>
                <UploadButtonDiv>
                    <button
                        onClick={(e)=>{
                            onSubmit(e);
                        }}> Submit
                    </button>
                </UploadButtonDiv>
            </UploadForm>
        </UploadDiv>
    );
}

export default Upload;