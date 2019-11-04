import React from 'react'
import '../css/sugg.css'
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
export class Sugg extends React.Component {
    constructor(props) {
        super(props);
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
                this.setState({users:res.data.data});
                console.log(res.data)
            }
        })
    }
    render() {
        return (
            <div id="sugg">
                <div id="head">
                    <span>Suggestions for you</span>
                    {this.state.users.length<1 ? null: <Link to="/sugg"><span>See all</span></Link>}
                </div>
                <div id="content">
                    {this.state.users.length<1 ? <div id="noData">Your account is currently business page, and there will be no any suggestions for you</div>:null}
                    {this.state.users.map((item,index)=>{
                        return <Item key={index} item = {item}/>
                    })}
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
        return(
            <div className="item" onClick={()=>{this.gotoProfile(this.props.item.username)}}>
                <img src={sessionStorage["ip"]+"/media/" + this.props.item.pp}/>
                <div id="pack">
                    <div id="username">{this.props.item.username}</div>
                    <div id="foo">{this.props.item.name}</div>
                    <div id="addr">{this.props.item.addr}</div>
                </div>
            </div>
        )
}
}