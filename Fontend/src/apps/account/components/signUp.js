import React from 'react';
import {Sitelink} from "./sitelink";
import '../css/signUp.css'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'


function checkEmailValidation(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function checkPhoneValidation(phone) {
    return true
}
export class SignUp extends React.Component {
    render() {
        return (
            <div>
                <SignUpBox/>
                <Sitelink/>
            </div>
        )
    }
}

class SignUpBox extends React.Component {
    constructor() {
        super();
        this.state = {
            fullName: "",
            email: '',
            username: '',
            password1: '',
            password2:'',
            error:[],
            redirect:false,
            serverReply:'',
            status:'Sign Up'
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
    }
    checkValidation(){
        let error = this.state.error;
        this.setState({error:[]});

        let email = this.state.email;
        let username = this.state.username;
        let fullName = this.state.fullName;
        let password1 = this.state.password1;
        let password2 = this.state.password2;

        if (email.length === 10 && !isNaN(email)) {
            if (! checkPhoneValidation(email)) {
                error.push("* phone number is not valid !")
            }
        } else if (!checkEmailValidation(email)) {
            error.push("* email or phone number is not validate!")
        }

        if (fullName.length < 5 || fullName.length > 20) {
            error.push("*full name must be between 5 and 20 in length!")
        }

        if (username.length < 5 || username.length > 20) {
            error.push("*username must be between 5 and 20 in length!")
        }else{
            if(username.indexOf(' ') >= 0){
                error.push("*username must be white space free !!")
            }
        }

        if (password1 !== password2) {
            error.push("*password not matching !")
        } else {
            if (password1.length < 8 || password1.length > 30) {
                error.push("*password length should be <8 characters !")
            }
        }
        this.setState({error: error});
    }
    handleSignUp(){
        //this.setState({error:[]},()=>this.checkValidation());
        this.setState({error:[]},()=>{
            this.checkValidation();
            if(this.state.error.length<1){
                this.setState({"status":"Wait ..."});
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/account/signUp',
                data: {email:this.state.email,username:this.state.username,fullName:this.state.fullName,password:this.state.password1}
            }).then((response) => {
                this.setState({"status":"Sign Up"});
                if(response.data.hasOwnProperty("error")){
                    this.setState({error:response.data.error})
                }else if(response.data.hasOwnProperty("email")){
                    sessionStorage["email"] =response.data.email;
                    this.setState({redirect:true})
                }
            });
        }
        });
    }
    handleInput(event) {
        let name = event.target.name;
        let value = event.target.value;
        if(name==="email"){
            this.setState({email:value})
        }else if(name==="fullName"){
            this.setState({fullName:value})
        }else if(name==="username"){
            this.setState({username:value})
        }else if(name==="password1"){
            this.setState({password1:value})
        }else if(name==="password2"){
            this.setState({password2:value})
        }else{
            alert("error")
        }

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/verifyaccount"/>
        }
        return (
            <div id="signUp">
                <div id="left">
                    <div id="app_name">Tasbiralaya</div>
                    <div className="input">
                        <input type="text" name="email" placeholder="Email or Phone Number" onChange={this.handleInput} value={this.state.email}/>
                    </div>
                    <div className="input">
                        <input type="text" name="fullName" placeholder="Full Name" onChange={this.handleInput} value={this.state.fullName}/>
                    </div>
                    <div className="input">
                        <input type="text" name="username" placeholder="Username" onChange={this.handleInput} value={this.state.username}/>
                    </div>
                    <div className="input">
                        <input type="password" name="password1" placeholder="Password" onChange={this.handleInput} value={this.state.password1}/>
                    </div>
                    <div className="input">
                        <input type="password" name="password2" placeholder="Password again" onChange={this.handleInput} value={this.state.password2}/>
                    </div>
                    <input type="submit" value={this.state.status} onClick={this.handleSignUp}/>
                    <span id="terms">By signing up, you agree to our Terms,<br/> Data Policy and Cookies Policy.</span>
                    <div id="link">
                        have a account ? <Link to="/login"> Login here>></Link>
                    </div>
                    <div id="error_message">
                        {this.state.error.map((item)=>{
                            return <span>{item}</span>
                        })}
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

