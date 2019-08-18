import React from 'react';
import {Header} from "./header";
import './../css/follow.css'
import axios from "axios";
export class Follow extends React.Component{
    constructor(){
        super();
        this.state={
            follower:true,
            following:false,
            followerCss:selected,
            followingCss:null
        };
        this.switchOption=this.switchOption.bind(this);
    }
    switchOption(data){
        if(data==="follower"){
            this.setState({follower:true,following:false,followerCss:selected,followingCss:null})
        }else if(data==="following"){
            this.setState({following:true,follower:false,css2:selected,followerCss:null,followingCss:selected})
        }
    }
    render(){
        return(
            <div>
                <Header/>
                <div id="follow">
                    <div id="profile">
                        <img src={require('../images/smartgirl.jpg')}/>
                    </div>
                    <div id="container">
                        <div id="head">
                            <div style={this.state.followerCss} onClick={()=>this.switchOption("follower")}>Followers</div>
                            <div style={this.state.followingCss} onClick={()=>this.switchOption("following")}>Following</div>
                        </div>
                        {this.state.follower ? <Follower/> : null}
                        {this.state.following ? <Following/> : null}
                    </div>
                </div>
            </div>
        )
    }
}
class Follower extends React.Component{
    constructor(){
        super();
        this.state={

        }

    }
    componentDidMount() {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/app/getFollowers",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if (res.status === 200) {

            }
        })
    }

    render(){
        return(
            <div id="follower">
                <div className="item">
                    <img src={require('../images/katrina.jpeg')}/>
                    <div id="pack">
                        <div id="username">kali.215</div>
                        <div id="foo">hey there ff!!</div>
                    </div>
                    <div id="more">
                        <span>Following</span>
                    </div>
                </div>
                 <div className="item">
                    <img src={require('../images/smartgirl.jpg')}/>
                    <div id="pack">
                        <div id="username">kali.215</div>
                        <div id="foo">hey there ff!!</div>
                    </div>
                    <div id="more">
                        <span>Following</span>
                    </div>
                </div>
                 <div className="item">
                    <img src={require('../images/katrina.jpeg')}/>
                    <div id="pack">
                        <div id="username">kali.215</div>
                        <div id="foo">hey there ff!!</div>
                    </div>
                    <div id="more">
                        <span>Following</span>
                    </div>
                </div>
            </div>
        )
    }
}

class Following extends React.Component{
    render(){
        return(
            <div id="following">
                <div className="item">
                    <img src={require('../images/profile.png')}/>
                    <div id="pack">
                        <div id="username">kali.215</div>
                        <div id="foo">following!</div>
                    </div>
                    <div id="more">
                        <span style={{boxShadow:'0 0 1px 0 darkgreen'}}>Following</span>
                    </div>
                </div>
                 <div className="item">
                    <img src={require('../images/katrina.jpeg')}/>
                    <div id="pack">
                        <div id="username">kali.215</div>
                        <div id="foo">hey there ff!!</div>
                    </div>
                    <div id="more">
                        <span style={{boxShadow:'0 0 1px 0 darkgreen'}}>Following</span>
                    </div>
                </div>
                 <div className="item">
                    <img src={require('../images/smartgirl.jpg')}/>
                    <div id="pack">
                        <div id="username">kali.215</div>
                        <div id="foo">hey there ff!!</div>
                    </div>
                    <div id="more">
                        <span style={{boxShadow:'0 0 1px 0 darkgreen'}}>Following</span>
                    </div>
                </div>
            </div>
        )
    }
}

const selected={
    borderBottom:'2px solid black',
    color:'black',
    fontWeight:'bold'
};