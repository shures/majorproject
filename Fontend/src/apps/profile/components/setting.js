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
            status:'Switch Account'
        };
        this.handleInput= this.handleInput.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
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
                                <option value="0">Choose Category</option>
                                <option value="1">Computer</option>
                                <option value="2">Science</option>
                                <option value="3">Sports</option>
                                <option value="4">Education</option>
                                <option value="5">Doctory</option>
                                <option value="6">Biology</option>
                                <option value="7">Music</option>
                                <option value="8">Social</option>
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