import React, {Component} from 'react';
import {Header} from "../../home/components/header";
import '../css/myProfile.css';
import axios from "axios";
import {Link} from "react-router-dom";

export class MyProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            loadUploadPP: false,
            loadEditProfile:false,
            addr:'',
            quote1:'',
            quote2:'',
            quote3:'',
            site:'',
            profilePic:''
        };
        this.loadUploadPP = this.loadUploadPP.bind(this);
        this.loadEditProfile = this.loadEditProfile.bind(this);
        this.isProfilePic = this.isProfilePic.bind(this);
    }

    loadEditProfile() {
        this.setState({loadEditProfile:!this.state.loadEditProfile})
    }

    loadUploadPP() {
        this.setState({loadUploadPP: !this.state.loadUploadPP});
    }

    isProfilePic() {
        if (this.state.profilePic === "") {
            return <img src={require('./../images/add-user.png')}/>
        } else {
            return <img src={"http://127.0.0.1:8000/media/" + this.state.profilePic}/>
        }

    }

    componentWillMount() {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/myprofile/getProfile",
            data: {userId:sessionStorage["id"],from:'userProfile'},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({addr:res.data.data["addr"][0],quote1:res.data.data["quote1"][0],quote2:res.data.data["quote2"][0],quote3:res.data.data["quote3"][0],site:res.data.data["site"][0],profilePic:res.data.data["profilePic"]})
            }
        })
    }
    render() {
        return (
            <div>
                <Header/>
                <div id="myProfile">
                    <div id="about">
                        <div id="image">
                            <div id="img">
                                <div id="img1">
                                    {this.isProfilePic()}
                                </div>
                            </div>
                            <div id="foo">
                                <span onClick={this.loadUploadPP}>Upload Profile</span>
                                <span onClick={this.loadEditProfile}>Edit Profile</span>
                                <Link to="/setting"><span>Setting</span></Link>
                            </div>
                        </div>
                        <div id="detail">
                            <div id="pack">
                                <span id="username">{sessionStorage["username"]}</span>
                                <span id="name">{sessionStorage["fn"]}</span>
                                <span id="addr">{this.state.addr}</span>
                            </div>
                            <div id="activity">
                                <div id="post">
                                    <span>Post</span>
                                    <span>125</span>
                                </div>
                                <div id="followers">
                                    <span>Follower</span>
                                    <span>526</span>
                                </div>
                                <div id="following">
                                    <span>Following</span>
                                    <span>1024</span>
                                </div>
                            </div>
                            <div id="more">
                                <span>{this.state.quote1}</span>
                                <span>{this.state.quote2}</span>
                                <span>{this.state.quote3}</span>
                            </div>
                            <div id="blue">
                                <span>{this.state.site}</span>
                            </div>
                        </div>
                    </div>
                    <div id="menu">
                        <div>
                            <span>Post</span>
                        </div>
                        <div>
                            <span>Photos</span>
                        </div>
                        <div>
                            <span>Tags</span>
                        </div>
                        <div>
                            <span>Saved</span>
                        </div>
                    </div>
                    <Collection/>
                </div>
                {this.state.loadUploadPP ? <LoadUploadPP loadUploadPP={this.loadUploadPP}/> : null}
                {this.state.loadEditProfile ? <EditProfile loadEditProfile={this.loadEditProfile}/> : null}
            </div>
        )
    }
}
class EditProfile extends React.Component{
    constructor(){
        super();
        this.state={
            addr:'',
            quote1:'',
            quote2:'',
            quote3:'',
            site:'',
            uploadProfileEdit:'Upload'
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
    }

    componentWillMount() {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/myprofile/getProfile",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({addr:res.data.data["addr"][0],quote1:res.data.data["quote1"][0],quote2:res.data.data["quote2"][0],quote3:res.data.data["quote3"][0],site:res.data.data["site"][0]})
            }
        })
    }

    handleEditProfile(){
        this.setState({uploadProfileEdit:'Uploading ...'});
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/myprofile/editProfile",
            data: {userId:sessionStorage["id"], addr:this.state.addr,quote1:this.state.quote1,quote2:this.state.quote2,quote3:this.state.quote3,site:this.state.site},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({uploadProfileEdit:'Uploaded Successfully !',addr:'',quote1:'',quote2:'',quote3:'',site:''});
            }
        })
    }
    handleInput(event){
        let name = event.target.name;
        let value = event.target.value;
        if(name==="addr"){
            this.setState({addr:value})
        }else if(name==="quote1"){
            this.setState({quote1:value})
        }else if(name==="quote2"){
            this.setState({quote2:value})
        }else if(name==="quote3"){
            this.setState({quote3:value})
        }else if(name==="site"){
            this.setState({site:value})
        }else{
            alert("error")
        }

    }
    render() {
        return (
            <div className="shadow">
                    <div id="editProfile">
                        <div id="head">
                            <div id="image">
                                <img src={require("./../images/girl.jpg")}/>
                            </div>
                            <span>shuresnepali</span>
                        </div>
                        <div id="block">
                            <input type="text" name="addr" value={this.state.addr} onChange={this.handleInput} placeholder="Give your address ..."/>
                            <input type="text" name="quote1" value={this.state.quote1} onChange={this.handleInput} placeholder="Write your quote 1 ..."/>
                            <input type="text" name="quote2" value={this.state.quote2} onChange={this.handleInput} placeholder="Write your quote 2 ..."/>
                            <input type="text" name="quote3" value={this.state.quote3} onChange={this.handleInput} placeholder="write your quote 3 ..."/>
                            <input type="text" name="site" value={this.state.site} onChange={this.handleInput}  placeholder="Name of your email or website ..."/>
                        </div>
                        <div id="actions">
                            <span onClick={this.handleEditProfile}>{this.state.uploadProfileEdit}</span>
                            <span onClick={this.props.loadEditProfile}>Cancel</span>
                        </div>
                    </div>
                </div>
        )
    }
}

class LoadUploadPP extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded:"",
            localImg:false,
            url:'',
            file:'',
            uploadState:"Upload Now",
            cancelOrClose:"Close"
        };
        this.clickFileInput = React.createRef();
        this.handleFileInputClick = this.handleFileInputClick.bind(this)
        this.handleUploadChange = this.handleUploadChange.bind(this)
    }

    handleFileInputClick() {
        this.clickFileInput.current.click();
    }

    handleUploadChange(event) {
        this.setState({uploadState:"Uploading ...",cancelOrClose:'Cancel'});
        let file = event.target.files[0];
        let url = URL.createObjectURL(file);
        this.setState({url:url,file:file},()=>{
            this.setState({localImg:true})
        });
        const data = new FormData();
        data.append('file',file, file.name);
        data.set("userId",sessionStorage["id"]);
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/myprofile/uploadPP",
            data: data,
            headers: {Authorization: "Token " + sessionStorage["token"]},
            onUploadProgress: (ProgressEvent) => {
                this.setState({
                    loaded:Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + "%",
                });
                document.getElementById("progressBarPP").style.width = this.state.loaded
            },
        }).then(res => {
            if(res.status===200){
                this.setState({uploadState:"Upload success !!!",cancelOrClose:"Close"});
            }
        })
    }
    render() {
        return (
            <div className="shadow">
                <div id="uploadPP">
                    <div id="head">
                        <div id="image">
                            {this.state.localImg ? null : <img src={require('./../images/girl.jpg')}/>}
                            {this.state.localImg ? <img alt="could not load" src={this.state.url}/> : null}
                        </div>
                    </div>
                    <input type="file" style={{display: "none"}} name="file" ref={this.clickFileInput} onChange={this.handleUploadChange}/>
                    <div className="item" onClick={this.handleFileInputClick}>{this.state.uploadState}</div>
                    <div className="item">Remove</div>
                    <div className="item" onClick={this.props.loadUploadPP}>{this.state.cancelOrClose}</div>
                    <div id="progressBarPP">

                    </div>
                </div>
            </div>
        )
    }
}

class Collection extends React.Component {
    constructor() {
        super();
        this.state = {
            photos: [[require('./../images/smartgirl.jpg'), require('./../images/large.jpg'), require('./../images/girl.jpg'), require('./../images/coding.jpg')], [require('./../images/large.jpg'), require('./../images/smartgirl.jpg'), require('./../images/coding.jpg'), require('./../images/girl.jpg')]]
        }
    }

    render() {
        return (
            <div id="collection">
                <div className="column">
                    <div className="item">
                        <img src={require('./../images/smartgirl.jpg')}/>
                    </div>
                    <div className="item">
                        <img src={require('./../images/coding.jpg')}/>
                    </div>
                </div>
                <div className="column">
                    <div className="item">
                        <img src={require('./../images/girl.jpg')}/>
                    </div>
                    <div className="item">
                        <img src={require('./../images/smartgirl.jpg')}/>
                    </div>
                </div>
                <div className="column">
                    <div className="item">
                        <img src={require('./../images/coding.jpg')}/>
                    </div>
                    <div className="item">
                        <img src={require('./../images/girl.jpg')}/>
                    </div>
                </div>
            </div>
        )
    }
}

const optionSelect = {
    borderBottom: '2px solid rgba(0,0,0,0.7)',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)'
}