import React,{Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Link} from "react-router-dom";
import '../css/login.css'
import {Sitelink} from "./sitelink";
import axios from 'axios'

function email_validation(email) {
    if(email!==""){
        return true;
    }
}

export class Login extends Component {
    render() {
        return (
            <div>
                <LoginBox/>
                <Sitelink/>
            </div>
        )
    }
}

class LoginBox extends Component {
    constructor() {
        super();
        this.state = {
            email: 'shures.nepali@gmail.com',
            password: 'shures666',
            error_message: '',
            redirect:false
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInput(event) {
        if (event.target.name === "email") {
            this.setState({email: event.target.value})
        } else if (event.target.name === "password") {
            this.setState({password: event.target.value})
        }
    }

    handleLogin(event) {
        alert("clicked");
        if (!email_validation(this.state.email)) {
            this.setState({error_message: "Email is not Valid !!"})
        } else if (this.state.password.length < 8 || this.state.password.length > 30) {
            this.setState({error_message: "Password length should be >8 and <30 "})
        } else {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/account/login',
                data: {email: this.state.email, password: this.state.password}
            }).then((response) => {
                console.log(response.data.error);
                console.log(response.status);
                if(response.status===204){
                    this.setState({error_message:"Please provide both username and password"})
                }
                if(response.status===203){
                    this.setState({error_message:"Please provide valid credentials"})
                }
                if(response.status===200){
                    sessionStorage["token"] = response.data.token;
                    sessionStorage["username"] = response.data.username;
                    sessionStorage["fn"] = response.data.fn;
                    sessionStorage["id"] = response.data.id;
                    this.setState({redirect:true})
                }
            });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/"/>
        }
        return (
            <div id="login">
                <div id="left">
                    <div id="app_name">
                        <span>Tasbiralaya</span>
                    </div>
                    <div className="input">
                        <input type="text" name="email" placeholder="Email or Phone Number" onChange={this.handleInput} value={this.state.email}/>
                    </div>
                    <div className="input">
                        <input type="password" name="password" placeholder="Password" onChange={this.handleInput} value={this.state.password} />
                    </div>
                    <input type="submit" value="Login" onClick={this.handleLogin}/>
                    <span id="terms">By login, you agree to our Terms,<br/> Data Policy and Cookies Policy.</span>
                    <div id="error_message">
                        {this.state.error_message}
                    </div>
                    <div id="link">
                        have't an account ? <Link to="/signup"> Signup  here>></Link>
                    </div>
                    <div id="forget_pass_link">
                        <span>Forget Password ? >></span>
                    </div>
                </div>
                <div id="or">
                    <div id="v_line">
                        <div></div>
                        <span>OR</span>
                        <div></div>
                    </div>
                    <div id="facebook_login">
                        <img src={require('../images/facebook_user_icon.png')}/>
                        <div id="fb_login">
                            <img src={require('../images/fb.png')}/>
                            <span>Sign In with facebook</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}