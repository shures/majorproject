import React from 'react'
import '../css/user.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

export class User extends React.Component {
    constructor() {
        super();
        this.state = {
            addr:'',
            profilePic:''
        };
        this.isProfilePic = this.isProfilePic.bind(this);
    }
    componentWillMount() {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/myprofile/getProfile",
            data: {userId:sessionStorage["id"],from:'userProfile'},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({addr:res.data.data["addr"][0],profilePic:res.data.data["profilePic"]})
            }
        })
    }
     isProfilePic() {
        if (this.state.profilePic === "") {
            return <img src={require('./../../common/images/add-user.png')}/>
        } else {
            return <img src={"http://127.0.0.1:8000/media/" + this.state.profilePic}/>
        }

    }

    render() {
        return (<div id="user">
            <div id="image1">
                {this.isProfilePic()}
            </div>
            <div id="foo">
                <span><Link to="/profile">{sessionStorage["username"]}</Link></span>
                <span>{sessionStorage["fn"]}</span>
                <span>Upload Post</span>
                <span>More</span>
            </div>
        </div>)
    }
}