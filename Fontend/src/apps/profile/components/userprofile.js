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
            follower:'',
            post:'',
            followedd:'',
            addr:'',
            quote1:'',
            quote2:'',
            quote3:'',
            site:'',
            profilePic:'',
            name:'',
            username:'',
            fn:''

        };
        this.follow = this.follow.bind(this);
        this.isProfilePic = this.isProfilePic.bind(this);
    }

    follow() {
        axios({
            method: 'post',
            url: sessionStorage["ip"]+"/app/follow",
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
            url: sessionStorage["ip"]+"/" + this.props.match.params.username,
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
                    url: sessionStorage["ip"]+"/app/isFollowing",
                    data: {local_id: sessionStorage["id"], remote_id: res.data.data["id"][0]},
                    headers: {Authorization: "Token " + sessionStorage["token"]}
                }).then(res => {
                    this.setState({followed: res.data.data})
                });
            }
            console.log(res.data.data)
            this.setState({
                addr: res.data.data["addr"],
                quote1: res.data.data["quote1"],
                quote2: res.data.data["quote2"],
                quote3: res.data.data["quote3"],
                site: res.data.data["site"],
                profilePic: res.data.data["profilePic"],
                name: res.data.data["name"],
                username: res.data.data["username"],
                follower: res.data.data["follower"],
                followedd:res.data.data["followed"],
                post:res.data.data["post"],
                fn:res.data.data["fn"]
            })
        });
    }

    isProfilePic() {
        if (this.state.profilePic === "") {
            return <img src={require('./../images/add-user.png')}/>
        } else {
            return <img src={sessionStorage["ip"]+"/media/" + this.state.profilePic}/>
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
                                    <div id="img">
                                        {this.isProfilePic()}
                                    </div>
                                </div>
                                <div id="detail">
                                    <div id="foo">
                                        <span>{this.state.username}</span><br/>
                                        <div onClick={this.follow}>{this.state.followed ? <span style={{color:'darkgreen'}}>Following</span> : <span>Follow</span>}</div>
                                    </div>
                                    <div id="activity">
                                        <span style={{color:'green',fontSize:20}}>{this.state.fn}</span>
                                        <div id="foo">
                                            <span>posts</span>
                                            <span>{this.state.post}</span>
                                        </div>
                                        <div id="foo">
                                            <span>following</span>
                                            <span>{this.state.followedd}</span>
                                        </div>
                                        <div id="foo">
                                            <span>flowers</span>
                                            <span>{this.state.follower}</span>
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
                            <Collection/>
                        </div>
                    </div> : null
            )
        }
    }
}
class Collection extends React.Component {
    constructor() {
        super();
        this.state = {
            post:true,
            profile:false,
            saved:false,
            others:false,
            postContent:[],
            savedContent:[],
            isPostImage: 'false',
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        axios({
                method: 'post',
                data:{userId:sessionStorage["id"]},
                url: sessionStorage["ip"]+"/app/getMyPost",
                headers: {Authorization: "Token " + sessionStorage["token"]}
            })
            .then(res => {
                this.setState({postContent:res.data.data});
                console.log(res.data.data)
            });
    }
    handleClick(para){
        if(para==="post"){
            this.setState({post:true});
            this.setState({profile:false});
        }
        if(para==="profile"){
            this.setState({post:false});
            this.setState({profile:true});
        }

    }
    render() {
        return (
            <div id="collection">
                <div id="menu">
                        <div>
                            <span onClick={()=>{this.handleClick("post")}}>Post</span>
                        </div>
                        <div>
                            <span onClick={()=>{this.handleClick("profile")}}>Profile</span>
                        </div>
                        <div>
                            <span>Others</span>
                        </div>
                    </div>
                {this.state.post ? <div id="content">
                    {this.state.postContent.map((item)=>{
                        return <div className="item">
                        <div id="img">
                            <img src={sessionStorage["ip"]+"/media/" + item.content}/>
                        </div>
                        <div id="pack">
                             <span>{item.caption}</span><br/>
                             <span>{item.likeCount} likes</span><br/>
                            <span>{item.commentCount} Comments</span><br/>
                        </div>
                    </div>
                    })}
                </div> :null}
                {this.state.profile ? <div id="content">
                    <span>No photos are available at the moment !!!</span>
                </div> :null}
            </div>
        )
    }
}