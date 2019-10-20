import React from 'react';
import './../css/trending.css';
import {Header} from "../../home/components/header";
import axios from "axios";

export class Trending extends React.Component {
    constructor() {
        super();
        this.state = {
            posts:[]
        }
    }
    componentWillMount() {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/app/trending",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){

            }
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="trending">
                    <div id="title"><img src={require("./../images/trending.png")}/> <span>Trending</span></div>
                    <div id="container">
                        <div className="item">
                            <div id="hover">
                                <div id="username">
                                    <b>shures_nepali</b>
                                </div>
                                <div id="caption">
                                    Beautiful girl in sari for the first time ...
                                </div>
                                <div id="status">
                                    <div className="pack">
                                        <img src={require("./../images/001-heart.png")}/><span>125</span>
                                    </div>
                                    <div className="pack">
                                        <img src={require("./../images/003-comment-in-circular-button.png")}/><span>124</span>
                                    </div>
                                </div>
                            </div>
                            <img src={require("./../images/girl.jpg")}/>
                        </div>
                        <div className="item">
                            <div id="hover">
                                <img src={require("./../images/004-triangle.png")}/>
                                <div id="username">
                                        <b>shures_nepali</b>
                                    </div>
                                    <div id="caption">
                                        Beautiful girl in sari
                                    </div>
                                    <div id="status">
                                        <div className="pack">
                                            <img src={require("./../images/001-heart.png")}/><span>125</span>
                                        </div>
                                        <div className="pack">
                                            <img src={require("./../images/003-comment-in-circular-button.png")}/><span>124</span>
                                        </div>
                                    </div>
                            </div>
                            <img src={require("./../images/coding.jpg")}/>
                        </div>
                        <div className="item">
                            <div id="hover">
                                <div id="username">
                                    <b>shures_nepali</b>
                                </div>
                                <div id="caption">
                                    Beautiful girl in sari for the first time ...
                                </div>
                                <div id="status">
                                    <div className="pack">
                                        <img src={require("./../images/001-heart.png")}/><span>125</span>
                                    </div>
                                    <div className="pack">
                                        <img src={require("./../images/003-comment-in-circular-button.png")}/><span>124</span>
                                    </div>
                                </div>
                            </div>
                            <img src={require("./../images/girl.jpg")}/>
                        </div>
                        <div className="item">
                            <div id="hover">
                                <div id="username">
                                    <b>shures_nepali</b>
                                </div>
                                <div id="caption">
                                    Beautiful girl in sari for the first time ...
                                </div>
                                <div id="status">
                                    <div className="pack">
                                        <img src={require("./../images/001-heart.png")}/><span>125</span>
                                    </div>
                                    <div className="pack">
                                        <img src={require("./../images/003-comment-in-circular-button.png")}/><span>124</span>
                                    </div>
                                </div>
                            </div>
                            <img src={require("./../images/girl.jpg")}/>
                        </div>
                        <div className="item">
                            <div id="hover">
                                <img src={require("./../images/004-triangle.png")}/>
                                <div id="username">
                                        <b>shures_nepali</b>
                                    </div>
                                    <div id="caption">
                                        Beautiful girl in sari
                                    </div>
                                    <div id="status">
                                        <div className="pack">
                                            <img src={require("./../images/001-heart.png")}/><span>125</span>
                                        </div>
                                        <div className="pack">
                                            <img src={require("./../images/003-comment-in-circular-button.png")}/><span>124</span>
                                        </div>
                                    </div>
                            </div>
                            <img src={require("./../images/coding.jpg")}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}