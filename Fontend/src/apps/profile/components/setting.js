import React, {Component} from 'react';
import {Header} from "../../home/components/header";
import axios from "axios";
import './../css/setting.css'

export class Setting extends React.Component{
    constructor(){
        super();
        this.state={
            showSwitchToBusiness: true
        }
    }
    render() {
        return(
            <div id="setting">
                <Header/>
                <div id="container">
                    <div id="menu">
                        <div className="item">
                            <span>Log Out</span>
                        </div>
                        <div className="item">
                            <span onClick={()=>{this.setState({showSwitchToBusiness:!this.state.showSwitchToBusiness})}}>Switch to Business App</span>
                        </div>
                        <div className="item">
                            <span>Change Password</span>
                        </div>
                        <div className="item">
                            <span>Privacy</span>
                        </div>
                    </div>
                    {this.state.showSwitchToBusiness ?  <SwitchToBusiness/> : null}
                </div>
            </div>
        )
    }
}
class SwitchToBusiness extends React.Component{
    constructor(){
        super();
        this.state={
            name: "",
            username:"",
            selection: 0,
            status:'Switch Account',
            categories: []
        };
        this.handleInput= this.handleInput.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    componentDidMount() {
         axios({
            method: "post",
            url: "http://127.0.0.1:8000/account/getCategory",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({categories:res.data.data})
            }
        })
    }

    handleInput(event){
        if(event.target.name==="name"){
            this.setState({name:event.target.value})
        }else if(event.target.name==="username"){
            this.setState({username:event.target.value})
        }
    }
    handleSelect(event){
        this.setState({selection:event.target.value});
    }
    handleUpdate(){
         axios({
            method: "post",
            url: "http://127.0.0.1:8000/account/switchToBusiness",
            data: {userId:sessionStorage["id"],"category":this.state.selection,"name":this.state.name,"username":this.state.username},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({status:'Account Switched Successfully',username:"",name:""});
            }
        })
    }
    render(){
        return(
            <div id="placeholder">
                        <div id="head">
                            <span>shuresnepali</span>
                        </div>
                        <div id="block1">
                            <input type="text" value={this.state.username} name="username" onChange={this.handleInput} placeholder="Your Business username"/><br/>
                            <input type="text" value={this.state.name} name="name" onChange={this.handleInput} placeholder="Your Business Name"/><br/>
                            <select onChange={this.handleSelect}>
                               {this.state.categories.map((item,index)=>{
                                    return <option key={index} value={item.id}>{item.category}</option>
                                })}
                            </select>
                        </div><br/>
                        <span>You can't follow anyone</span><br/>
                        <span>You can run ads and earn money</span><br/>
                        <span>Socially engage the people</span><br/>
                        <div id="action1">
                            <input onClick={this.handleUpdate} type="button" value={this.state.status}/>
                        </div>
                    </div>
        )
    }
}