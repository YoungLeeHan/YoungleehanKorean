import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

function ImageUpload(props) {
    /*
    1. 사용자가 이미지를 업로드
    2. 업로드 한 이미지를 받아서 서버에서 저장
    3. 저장한 이미지의 경로를 다시 클라이언트에게 전송
    4. 경로를 받아서 post model에 저장
    */

    const FileUpload = (e) => {
        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        axios.post("/post/image/upload", formData).then((response) => {
            props.setImage(response.data.filePath);
        });
    };

    return (
        <div>
            <Form.Control
                type="file"
                className="shadow-none"
                accept="image/*"
                onChange={(e) => FileUpload(e)}
            />
        </div>
    );
}

export default ImageUpload;
