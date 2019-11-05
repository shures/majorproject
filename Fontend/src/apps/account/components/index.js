import React, { Component } from 'react';
import '../css/index.css'
import {Home} from "../../home/components/home";
import {Link} from "react-router-dom";
export class Index extends Component{
    constructor(){
        super();
    }
    componentDidMount() {
        sessionStorage["ip"] = "http://192.168.1.106:8000"
    }
    render(){
        if(sessionStorage["token"]){
            return <Home/>
        }
        return(
            <div>
            <div id="appName">Tasbiralaya</div>
            <div id="header">
                <div id="icon">
                     <img src={require('../icons/talk.png')}/><span>NepTrend</span>
                </div>
                <div id="menu">
                    <span>Support</span>
                    <span>Community</span>
                    <span>Developers</span>
                    <span>Join Us</span>
                    <span>Contact us</span>
                    <span>Help</span>
                </div>
                <div id="download">DOWNLOAD</div>
            </div>
            <div id="motto">
                <span id="title">The Nepali Social Media app</span>
                <span id="dis">Enjoy with chat photo upload and sharing with your <br/>friends and family.</span>
                <img src={require('../images/camera1.png')}/>
                <div id="action">
                    <div><Link to="/login">Login With Gmail</Link></div>
                    <div><Link to="/signup">Sign Up Now</Link></div>
                </div>
            </div>
        </div>
        );
    }
}