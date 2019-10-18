import React, { Component } from 'react';
import '../css/index.css'
import {Home} from "../../home/components/home";
import {Link} from "react-router-dom";
export class Index extends Component{
    constructor(){
        super();
    }
    render(){
        if(sessionStorage["token"]){
            return <Home/>
        }
        return(
            <div>
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
                <span id="title"><strong>The Nepali Social Media app</strong></span>
                <span id="dis">Enjoy with chat photo upload and sharing with your <br/>friends and family.</span>
                <div id="action">
                    <div><Link to="/login">Login With Gmail</Link></div>
                    <div><Link to="/signup">Sign Up Now</Link></div>
                </div>
            </div>
            <div id="design">
                <div>
                    <img src={require('../icons/mobile.png')}/>
                    <div>
                        <span id="top"> Get on your phone</span><br/><br/><br/>
                        <span>You’re one step away from the shiny and new Nepali Trending Social App</span>
                        <div>
                            <img src={require('../icons/exploration.png')}/>
                            <span>Explore</span>
                        </div>
                        <div>
                           <img src={require('../icons/resume.png')}/>
                            <span>Personalize</span>
                        </div>
                        <div>
                            <img src={require('../icons/updated.png')}/>
                            <span>Get Updated Anytime Anywhere</span>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div id="top">
                    <div id="block1">
                        <div class="title">Support Us</div>
                        <div class="item">
                            <span>Membership</span>
                        </div>
                        <div class="item">
                            <span>Involvement</span>
                        </div>
                        <div class="title">
                            Earn With Us
                        </div>
                        <div class="item">
                            <span>Engagement</span>
                        </div>
                        <div class="item">
                            <span>Payment</span>
                        </div>
                    </div>
                    <div id="block2">
                        <div class="title">Customer Care and Help</div>
                        <div class=".item">
                            <span>Know more about us</span>
                        </div>
                        <div class="item">
                            <span>Who is what ?</span>
                        </div>
                        <div class="item">
                            <span>Stay with us</span>
                        </div>
                    </div>
                    <div id="block3">
                        <div id="question">
                            Do you need any help Write Now ?
                        </div>
                        <div id="answer">
                            Please verify your queries before sending us any message following are the policies.
                        </div>
                    </div>
                </div>
                <div id="bottom">
                    <span>All right Reserved @2020</span>
                </div>
            </footer>
        </div>
        );
    }
}