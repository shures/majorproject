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
            profilePic:'',
            follower:'',
            followed:'',
            post:''
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
            return <img src={sessionStorage["ip"]+"/media/" + this.state.profilePic}/>
        }

    }

    componentWillMount() {
        axios({
            method: "post",
            url: sessionStorage["ip"]+"/myprofile/getProfile",
            data: {userId:sessionStorage["id"],from:'userProfile'},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                console.log(res.data.data["follower"]);
                this.setState({addr:res.data.data["addr"][0],quote1:res.data.data["quote1"][0],quote2:res.data.data["quote2"][0],quote3:res.data.data["quote3"][0],site:res.data.data["site"][0],profilePic:res.data.data["profilePic"],follower:res.data.data["follower"],followed:res.data.data["followed"],post:res.data.data["post"]})
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
                                    <span>{this.state.post}</span>
                                </div>
                                <div id="followers">
                                    <span>Follower</span>
                                    <span>{this.state.follower}</span>
                                </div>
                                <div id="following">
                                    <span>Following</span>
                                    <span>{this.state.followed}</span>
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
            url: sessionStorage["ip"]+"/myprofile/getProfile",
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
            url: sessionStorage["ip"]+"/myprofile/editProfile",
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
                        <div id="block1">
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
            url: sessionStorage["ip"]+"/myprofile/uploadPP",
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
            post:true,
            profile:false,
            saved:false,
            others:false,
            postContent:[],
            savedContent:[],
            isPostImage: 'false',
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        axios({
                method: 'post',
                data:{userId:sessionStorage["id"]},
                url: sessionStorage["ip"]+"/app/getMyPost",
                headers: {Authorization: "Token " + sessionStorage["token"]}
            })
            .then(res => {
                this.setState({postContent:res.data.data});
                console.log(res.data.data)
            });
        axios({
                method: 'post',
                data:{userId:sessionStorage["id"]},
                url: sessionStorage["ip"]+"/app/getMySaved",
                headers: {Authorization: "Token " + sessionStorage["token"]}
            })
            .then(res => {
                this.setState({savedContent:res.data.data});
                //console.log(res.data.data)
            });
    }
    handleClick(para){
        if(para==="post"){
            this.setState({post:true});
            this.setState({saved:false});
            this.setState({profile:false});
        }
        if(para==="saved"){
            this.setState({saved:true});
            this.setState({post:false})
            this.setState({profile:false});
        }
        if(para==="profile"){
            this.setState({saved:false});
            this.setState({post:false});
            this.setState({profile:true});
        }

    }
    render() {
        return (
            <div id="collection">
                <div id="menu">
                        <div>
                            <span onClick={()=>{this.handleClick("post")}}>Post</span>
                        </div>
                        <div>
                            <span onClick={()=>{this.handleClick("saved")}}>Saved</span>
                        </div>
                        <div>
                            <span onClick={()=>{this.handleClick("profile")}}>Profile</span>
                        </div>
                        <div>
                            <span>Others</span>
                        </div>
                    </div>
                {this.state.post ? <div id="content">
                    {this.state.postContent.map((item)=>{
                        return <div className="item">
                        <div id="img">
                            <img src={sessionStorage["ip"]+"/media/" + item.content}/>
                        </div>
                        <div id="pack">
                             <span>{item.caption}</span><br/>
                             <span>{item.likeCount} likes</span><br/>
                            <span>{item.commentCount} Comments</span><br/>
                        </div>
                    </div>
                    })}
                </div> :null}
                {this.state.saved ? <div id="content">
                    {this.state.savedContent.map((item)=>{
                        return <div className="item">
                        <div id="img">
                            <img src={sessionStorage["ip"]+"/media/" + item.content}/>
                        </div>
                        <div id="pack">
                             <span>{item.caption}</span><br/>
                             <span>{item.likeCount} likes</span><br/>
                            <span>{item.commentCount} Comments</span><br/>
                        </div>
                    </div>
                    })}
                </div> :null}
                {this.state.profile ? <div id="content">
                    <span>No photos are available at the moment !!!</span>
                </div> :null}
            </div>
        )
    }
}

const optionSelect = {
    borderBottom: '2px solid rgba(0,0,0,0.7)',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)'
}