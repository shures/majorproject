import React from 'react'
import './../css/verifyaccount.css'
import {Link, Redirect} from 'react-router-dom'
import axios from "axios";
export class VerifyAccount extends React.Component {
    constructor(){
        super();
        this.state={
            code:'',
            error:'',
            success:false,
            status:'Submit'
        };
        this.getEmail = this.getEmail.bind(this);
        this.checkCode = this.checkCode.bind(this);
        this.handleInput =  this.handleInput.bind(this);
    }
    handleInput(event){
        this.setState({code:event.target.value})
    }

    checkCode() {
        if(this.state.code.length===4 && !isNaN(this.state.code.length)){
            this.setState({status:'wait ...'});
            axios({
            method: 'post',
            url: sessionStorage["ip"]+'/account/verifyAccount',
            data: {
                email:sessionStorage["email"],
                code:this.state.code
            }
        }).then((response) => {
            this.setState({status:'submit'});
              if(response.data.hasOwnProperty("success")){
                    this.setState({success:true})
                }else if(response.data.hasOwnProperty("fail")){
                    this.setState({error:'* code din not matched !!'});
                }
        });
        }else{
            this.setState({error:'please provide valid 4 digit code !!'})
        }
    }
    getEmail(){
        let email = sessionStorage["email"];
        if(email.length===10 && !isNaN(email)){
            return <b>
                phone {email}
            </b>
        }
        else{
            return <b>
                email {email}
            </b>
        }
    }
    render() {
        if(this.state.success===true){
            return <div id="success">
                Congratulations !! <br/>You are successfully signed up your account <br/>
                <Link to="/login"> Login here to Login</Link>
            </div>
        }
        return (
            <div id="block">
                <div id="foo">
                    <div id="app_name">Tashbiralaya</div>
                    <div id="info">Please put the 6-digit verification code <br/> We have sent to your {this.getEmail()}</div>
                </div>
                <div id="input">
                    <input type="text" placeholder="####" maxLength="4" onChange={this.handleInput} value={this.state.code}/>
                </div>
                <span id="terms">By signing up, you agree to our Terms,<br/> Data Policy and Cookies Policy.</span>
                <div id="error">
                    {this.state.error}
                </div>
                <input type="submit" value={this.state.status} onClick={this.checkCode}/>
                <div id="sign_in_link">
                    haven't you got ? <a href="/">Resent the code>></a>
                </div>
            </div>
        )
    }
}