import React, {useState, useEffect} from "react";
import axios from "axios";
import "../../styles/pages/UploadCSS";
import Jumbotron from "../../components/cards/Jumbotron";

export default function List(props) {
    const [Text, setText] = useState("");

    useEffect(() => {

        let body = {
            text: "Hello",
        };

        axios
            .post('/api/post', body)
            .then((response) => {
                // 성공 핸들링
                console.log(response);
                setText(response.data.text)
            })
            .catch((error) => {
                // 에러 핸들링
                console.log(error);
            })
    }, [])

    return(
        // <div>
        //     <h3>List</h3>
        //     <h3>{Text}</h3>
        //     {props.ContentList.map((content, idx) => {
        //         return (<div key = {idx}
        //                      style={{
        //                          width: "100%",
        //                          marginLeft: "1rem",
        //                      }}>
        //             내용: {content}
        //             <hr/>
        //         </div>)
        //     })}
        // </div>

        <>
            <Jumbotron title={"List"} directory={"List"} />
            <div
                style={{ maxWidth: "1170px" }}
                className="container-fluid d-flex flex-column align-items-center"
            >
                <div className="box">
                    <div className="card-wrapper">
                        <div className="card">
                            <div className="UI-UX-review">
                                <div className="text-wrapper">{Text}</div>
                                <p className="p">{}</p>
                                <div className="image-date">
                                    <div className="overlap-group">
                                        <div className="image" />
                                        <div className="black-bg" />
                                        <div className="div">5 July 2023</div>
                                    </div>
                                </div>
                                <div className="read-post">
                                    {/*<img className="vector" alt="Vector" src="vector.svg" />*/}
                                    <div className="text-wrapper-2">Read post</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
