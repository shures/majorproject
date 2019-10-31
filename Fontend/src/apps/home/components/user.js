import React from 'react'
import '../css/user.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

export class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addr:'',
            profilePic:'',
            hey:"how"
        };
        this.fileInput = React.createRef();
        this.isProfilePic = this.isProfilePic.bind(this);
        this.fileInputClick = this.fileInputClick.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }
    fileInputClick() {
        this.fileInput.current.click();
    }
    handleChange(event){
        let file = event.target.files[0];
        let url = URL.createObjectURL(file);
        this.props.showUploadBox(file,url);
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
                <div id="img">
                    {this.isProfilePic()}
                </div>
            </div>
            <div id="foo">
                <span><Link to="/profile">{sessionStorage["username"]}</Link></span>
                <span>{sessionStorage["fn"]}</span>
                <span onClick={this.fileInputClick}>Upload Post</span>
                <input type="file" ref={this.fileInput} onChange={this.handleChange}/>
                <span>See more</span>
            </div>
        </div>)
    }
}