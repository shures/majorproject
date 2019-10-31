import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

export class SearchBox extends React.Component{
    constructor(){
        super();
        this.state={
            redirect:{re:false,username:''}
        };
        this.handleItemClick = this.handleItemClick.bind(this);
    }
    handleItemClick(item){
        let redirect = this.state.redirect;
        redirect["re"] = true;
        redirect["username"] =item.username;
        this.setState({redirect:redirect})
    }
    render() {
        if (this.state.redirect.re) {
            return <Redirect to={this.state.redirect.username}/>
        }
        if(this.props.data!==null){
            return (
                <div id="search_box">
                    {this.props.data.map((item,index)=>{
                        return <div onClick={()=>this.handleItemClick(item)} key={index} className="item1">
                                <div id="pack">
                                     <div id="username">{item.username}</div>
                                     <div id="about">{item.fn}</div>
                                </div>
                            </div>
                    })}
                </div>
            );
        }
        else{
            return null;
        }
    }
}



