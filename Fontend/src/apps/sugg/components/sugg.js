import React from 'react'
import '../css/sugg.css'
import axios from "axios";
import {Header} from "../../home/components/header";
import {User} from "../../home/components/user";
import {Redirect} from "react-router-dom";

export class Sugg extends React.Component {
    constructor() {
        super();
        this.state={
            users:[]
        }
    }
    componentWillMount() {
        axios({
            method: "post",
            url: sessionStorage["ip"]+"/app/sugg",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({users:res.data.data})
                console.log(res.data)
            }
        })
    }
    render() {
        return (
            <div>
                <Header/>
                <div id="suggestion">
                    <div id="title">Suggested Business Page</div>
                    {this.state.users.map((item,index)=>{
                        return <Item key={index} item = {item}/>
                    })}
                    <div id="title">Suggested Users</div>
                </div>
            </div>
        )
    }
}
class Item extends React.Component{
    constructor(){
        super();
        this.state={
            redirect:{re:false,username:''},
            followed:false
        };
        this.gotoProfile = this.gotoProfile.bind(this);
    }
    follow(id) {
        axios({
            method: 'post',
            url: sessionStorage["ip"]+"/app/follow",
            data: {local_id: sessionStorage["id"], remote_id:id},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        })
        .then(res => {
            if (res.data.data === true) {
                this.setState({followed: true})
            }else{
                this.setState({followed: false})
            }
        });

    }
    gotoProfile(username){
        let redirect = this.state.redirect;
        redirect["re"] = true;
        redirect["username"] =username;
        this.setState({redirect:redirect})
    }
    render() {
          if (this.state.redirect.re) {
            return <Redirect to={this.state.redirect.username}/>
          }
          return (
            <div className="item">
                        <div id="left">
                            <div id="image">
                                <div id="img">
                                    <img src={sessionStorage["ip"]+"/media/" + this.props.item.pp}/>
                                </div>
                            </div>
                            <div id="pack" onClick={()=>{this.gotoProfile(this.props.item.username)}}>
                                <span><b>{this.props.item.username}</b></span>
                                <span>{this.props.item.name}</span>
                                <span>{this.props.item.addr}</span>
                            </div>
                        </div>
                        <div id="right">
                            {this.state.followed ? <span style={{backgroundColor:"#2b8a3e"}} onClick={()=>{this.follow(this.props.item.id)}}>Followed</span> :
                            <span style={{backgroundColor:"#3897f0"}} onClick={()=>{this.follow(this.props.item.id)}}>Follow</span> }
                        </div>
                    </div>
        )
    }
}