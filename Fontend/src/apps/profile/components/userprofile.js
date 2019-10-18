import React from 'react';
import {Header} from "../../home/components/header";
import './../css/userProfile.css'
import axios from "axios";

function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            user_exists: null,
            loading: true,
            user: null,
            followed: false,

            addr:'',
            quote1:'',
            quote2:'',
            quote3:'',
            site:'',
            profilePic:'',
            name:'',
            username:''

        };
        this.follow = this.follow.bind(this);
        this.isProfilePic = this.isProfilePic.bind(this);
    }

    follow() {
        axios({
            method: 'post',
            url: "http://127.0.0.1:8000/app/follow",
            data: {local_id: sessionStorage["id"], remote_id: this.state.user.id[0]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        })
        .then(res => {
            if (res.data.data === true) {
                this.setState({followed: true})
            } else {
                this.setState({followed: false})
            }
        });

    }

    componentDidMount() {
        axios({
            method: 'get',
            url: "http://127.0.0.1:8000/" + this.props.match.params.username,
            params: {},
        }).then(res => {
            this.setState({loading: false});
            if (isEmpty(res.data.data)) {
                this.setState({user_exists: false})
            } else {
                console.log(res.data.data);
                this.setState({user_exists: true, user: res.data.data});
                axios({
                    method: 'post',
                    url: "http://127.0.0.1:8000/app/isFollowing",
                    data: {local_id: sessionStorage["id"], remote_id: res.data.data["id"][0]},
                    headers: {Authorization: "Token " + sessionStorage["token"]}
                }).then(res => {
                    this.setState({followed: res.data.data})
                });
            }
            this.setState({
                addr: res.data.data["addr"],
                quote1: res.data.data["quote1"],
                quote2: res.data.data["quote2"],
                quote3: res.data.data["quote3"],
                site: res.data.data["site"],
                profilePic: res.data.data["profilePic"],
                name: res.data.data["name"],
                username: res.data.data["username"]
            })
        });
    }

    isProfilePic() {
        if (this.state.profilePic === "") {
            return <img src={require('./../images/add-user.png')}/>
        } else {
            return <img src={"http://127.0.0.1:8000/media/" + this.state.profilePic}/>
        }

    }
    render() {
        if (this.state.loading === true) {
            return (
                <div>Loading</div>
            )
        } else {
            return (
                this.state.user_exists ?
                    <div>
                        <Header/>
                        <div id="userProfile">
                            <div id="about">
                                <div id="image">
                                    {this.isProfilePic()}
                                </div>
                                <div id="detail">
                                    <div id="foo">
                                        <span>{this.state.username}</span>
                                        <div onClick={this.follow}>{this.state.followed ? <span style={{color:'darkgreen'}}>Following</span> : <span>Follow</span>}</div>
                                    </div>
                                    <div id="activity">
                                        <div id="foo">
                                            <span>posts</span>
                                            <span>125</span>
                                        </div>
                                        <div id="foo">
                                            <span>following</span>
                                            <span>1254</span>
                                        </div>
                                        <div id="foo">
                                            <span>flowers</span>
                                            <span>12</span>
                                        </div>
                                    </div>
                                    <div id="name">
                                        <span>{this.state.name}</span>
                                        <span>{this.state.addr}</span>
                                    </div>
                                    <div id="more">
                                        <span>{this.state.quote1}</span>
                                        <span>{this.state.quote2}</span>
                                        <span>{this.state.quote3}</span>
                                    </div>
                                    <div id="blue">
                                        <span>{this.state.site}</span>
                                    </div>
                                </div>
                            </div>
                            <div id="menu">
                                <span>Posts</span>
                                <span>Tags</span>
                                <span>Posts</span>
                            </div>
                            <div id="gridView">
                                <div id="post">
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
                                                        <img
                                                            src={require("./../images/001-heart.png")}/><span>125</span>
                                                    </div>
                                                    <div className="pack">
                                                        <img
                                                            src={require("./../images/003-comment-in-circular-button.png")}/><span>124</span>
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
                                                        <img
                                                            src={require("./../images/001-heart.png")}/><span>125</span>
                                                    </div>
                                                    <div className="pack">
                                                        <img
                                                            src={require("./../images/003-comment-in-circular-button.png")}/><span>124</span>
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
                                                        <img
                                                            src={require("./../images/001-heart.png")}/><span>125</span>
                                                    </div>
                                                    <div className="pack">
                                                        <img
                                                            src={require("./../images/003-comment-in-circular-button.png")}/><span>124</span>
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
                                                        <img
                                                            src={require("./../images/001-heart.png")}/><span>125</span>
                                                    </div>
                                                    <div className="pack">
                                                        <img
                                                            src={require("./../images/003-comment-in-circular-button.png")}/><span>124</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <img src={require("./../images/box.jpg")}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null
            )
        }
    }
}