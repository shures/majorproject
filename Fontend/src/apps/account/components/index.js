import React, { Component } from 'react';
import {Sitelink} from "./sitelink";
import '../css/index.css'
import {Home} from "../../home/components/home";

export class Index extends Component{
    constructor(){
        super();

    }
    render(){
        if(sessionStorage["token"]){
            return <Home/>
        }
        return(
            <div id="index" style={{padding:'20%'}}>
                <div>this is index  </div>
                <Sitelink to="/login">Login</Sitelink><br/>
                <Sitelink to="/signup">heyman</Sitelink>
                <Sitelink/>
            </div>
        );
    }
}