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
            followingCss:null,
            profilePic:''
        };
        this.switchOption=this.switchOption.bind(this);
        this.isProfilePic = this.isProfilePic.bind(this);
    }
    componentWillMount() {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/myprofile/getProfile",
            data: {userId:sessionStorage["id"],from:'userProfile'},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({addr:res.data.data["addr"][0],profilePic:res.data.data["profilePic"]})
            }
        })
    }

    isProfilePic() {
        if (this.state.profilePic === "") {
            return <img src={require('./../../common/images/add-user.png')}/>
        } else {
            return <img src={"http://127.0.0.1:8000/media/" + this.state.profilePic}/>
        }

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
                        <div id="img">
                            {this.isProfilePic()}
                        </div>
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
            data:[],
            message:'Please wait ! Getting Follower History ...',
        };
    }
    componentDidMount() {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/app/get_follower",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if (res.status === 200) {
                if(res.data.data.length<1){
                    this.setState({message:"You don't have any history of followers"})
                }
                this.setState({data: res.data.data});
            }
        })
    }

    render(){
        if(this.state.data.length<1){
            return <div id="follow_message">
                <span>{this.state.message}</span>
            </div>
        }else{
            return(
            <div id="follower">
                {this.state.data.map((item,index)=>{
                    return <FollowerItem key={index} item={item}/>
                })}
            </div>
        )
        }
    }
}

class FollowerItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: this.props.item.id,
        };
    }
    render(){
        return <div className="item">
                        <img src={"http://127.0.0.1:8000/media/"+this.props.item.pp}/>
                        <div id="pack">
                            <div id="username">{this.props.item.username}</div>
                            <div id="foo">{this.props.item.name}</div>
                        </div>
                        <div id="more">
                            <span>Following to You</span>
                        </div>
                    </div>
    }
}

class Following extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],
            message:'Please wait ! Getting Follower History ...'
        };
    }
    componentDidMount() {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/app/get_following",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if (res.status === 200) {
                if(res.data.data.length<1){
                    this.setState({message:"You don't have any history of following"})
                }
                this.setState({data: res.data.data});
            }
        })
    }
    render(){
        if(this.state.data.length<1){
            return <div id="follow_message">
                <span>{this.state.message}</span>
            </div>
        }else{
            return(
            <div id="following">
                {this.state.data.map((item,index)=>{
                    return  <FollowingItem  key={index} item={item}/>
                })}
            </div>
        )
        }
    }
}
class FollowingItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.item.id
        }
    }
    render(){
        return(
            <div className="item">
                    <img src={"http://127.0.0.1:8000/media/"+this.props.item.pp}/>
                    <div id="pack">
                        <div id="username">{this.props.item.username}</div>
                        <div id="foo">{this.props.item.name}</div>
                    </div>
                    <div id="more">
                        <span>You are Following</span>
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