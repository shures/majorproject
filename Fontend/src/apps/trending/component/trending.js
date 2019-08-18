import React from 'react';
import './../css/trending.css';
import {Header} from "../../home/components/header";

export class Trending extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="trending">
                    <div className="row">
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
                                    Beautiful girl
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
                            <img src={require("./../images/dog.jpg")}/>
                        </div>
                    </div>
                    <div className="row">
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
                            <img src={require("./../images/box.jpg")}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}