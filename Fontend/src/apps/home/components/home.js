import React from 'react'
import {Post} from './post'
import {Hom_nf} from './hom_nf'
import {Header} from './header'
import {Tranding} from './tranding'
import {User} from './user'
import {Sugg }from './sugg'
import '../css/home.css';
import '../css/videoUploadPost.css'
import '../css/imageUploadPost.css'
import axios from "axios";
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUploadPost:{data:false,url:'',file:''},
            imageUploadPost : {data:false,url:'',file:''},
            posts:[],

        };
        this.showUploadBox = this.showUploadBox.bind(this);
        this.handleUpload=this.handleUpload.bind(this);
        this.closeUploadBox = this.closeUploadBox.bind(this);
    }
    closeUploadBox(data){
        if(data==="video"){
            let videoUploadPost = this.state.videoUploadPost;
            videoUploadPost["data"]=false;
            this.setState({videoUploadPost:videoUploadPost})
        }else if(data==="image"){
            let imageUploadPost = this.state.videoUploadPost;
            imageUploadPost["data"]=false;
            this.setState({imageUploadPost:imageUploadPost})
        }
    }
    showUploadBox(file,url){
        console.log("file got");
        let dotPosition = file.name.lastIndexOf('.');
        let extension = file.name.substr(dotPosition+1);
        if (extension === "mp4") {
            let videoUploadPost = this.state.videoUploadPost;
            videoUploadPost["data"] = true;
            videoUploadPost["url"] = url;
            videoUploadPost["file"] = file;
            this.setState({videoUploadPost: videoUploadPost})
        }else if(extension==="jpg" || extension==="png"){
            let imageUploadPost = this.state.imageUploadPost;
            imageUploadPost["data"] = true;
            imageUploadPost["url"] = url;
            imageUploadPost["file"] = file;
            this.setState({imageUploadPost: imageUploadPost})
        }else{
            alert("invalid format !!!")
        }
    }

    handleUpload(){
        const data = new FormData();
        let fileUpload = this.state.fileUpload;
        fileUpload["progress"]=true;
        this.setState({fileUpload:fileUpload});
        data.append('file', this.state.fileUpload.selectedFile, this.state.fileUpload.selectedFile.name);
        axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/app/fileupload',
              data:data,
              headers: {Authorization: "Token " + sessionStorage["token"]},
              onUploadProgress: (ProgressEvent) => {
                    fileUpload["loaded"] = Math.round(ProgressEvent.loaded / ProgressEvent.total*100)+"%";
                    this.setState({fileUpload:fileUpload});
                },
            }).then(res => {
                alert("hey");
                console.log(res.data);
                fileUpload["showUploadBox"] = false;
                this.setState({fileUpload:fileUpload});
            })
    }
    componentDidMount() {
        axios({
                method: 'post',
                data:{userId:sessionStorage["id"]},
                url: "http://127.0.0.1:8000/app/getPost",
                headers: {Authorization: "Token " + sessionStorage["token"]}
            })
            .then(res => {
                this.setState({posts:res.data.posts});
                console.log(res.data.posts.comments)
            });
    }
    render() {
        return (
            <div id="home">
                <Header showUploadBox = {this.showUploadBox} />
                <div id="container">
                    <div id="posts">
                        {this.state.posts.map((item)=>{
                        if(this.state.posts.length>0){
                            return <Post post={item}/>
                        }
                    })}
                    {/*<Post post=""/>*/}
                    </div>
                    <div id="right">
                        <Tranding/>
                        {/*<Hom_nf file={this.state.fileUpload}/>*/}
                    </div>
                     <div id="left">
                        <User showUploadBox = {this.showUploadBox} hey={"i love you"}/>
                        <Sugg/>
                    </div>
                </div>
                {this.state.imageUploadPost.data ? <ImageUploadPost closeUploadBox={this.closeUploadBox} imageUploadPost = {this.state.imageUploadPost}/> : null }
                {this.state.videoUploadPost.data ? <VideoUploadPost closeUploadBox={this.closeUploadBox} videoUploadPost = {this.state.videoUploadPost}/> : null }
            </div>
        )
    }
}
class VideoUploadPost extends React.Component{
    constructor() {
        super();
        this.state={
            thumb:'',
            caption:'',
            loaded:'',
            uploadState:'Upload',
            cancelOrClose:'close',
            disabled:false
        };
        this.generateThumbnails = this.generateThumbnails.bind(this);
        this.uploadVideoPost = this.uploadVideoPost.bind(this);
        this.handleCaptionInput= this.handleCaptionInput.bind(this);
    }
    uploadVideoPost(){
        this.setState({uploadState:'Uploading ...',cancelOrClose:"cancel",disabled:true});
        const data = new FormData();
        data.set("thumb",this.state.thumb);
        data.set("caption",this.state.caption);
        data.set("userId",sessionStorage["id"]);
        data.append('file', this.props.videoUploadPost.file, this.props.videoUploadPost.file.name);
        axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/app/fileupload',
              data:data,
              headers: {Authorization: "Token " + sessionStorage["token"]},
              onUploadProgress: (ProgressEvent) => {
                    let loaded = Math.round(ProgressEvent.loaded / ProgressEvent.total*100)+"%";
                    this.setState({loaded:loaded});
                },
            }).then(res => {
                    this.setState({uploadState:'Uploaded Successfully !!',cancelOrClose:"close"});
                    setTimeout(()=>this.props.closeUploadBox("video"),3000);
            })
    }
    handleCaptionInput(event){
        this.setState({caption:event.target.value})
    }
    generateThumbnails(){
        let c = document.getElementById("myCanvas");
        c.style.display = "block";
        let ctx = c.getContext("2d");
        let img = document.getElementById("scream");
        c.height = img.videoHeight;
        c.width = img.videoWidth;
        ctx.drawImage(img,0,0,c.width,c.height);
        let url  = c.toDataURL("image/png").replace("data:image/png;base64,", "");
        this.setState({thumb:url});
    }
    render() {
        return (
            <div className="shadow">
                <div id="videoUploadPost">
                    <video id="scream" controls>
                        <source src={this.props.videoUploadPost.url}/>
                    </video>
                    <div style={{width:`${this.state.loaded}`}} id="progressBar">

                    </div>
                    <div id="block">
                        <canvas id="myCanvas"></canvas>
                        <div id="gen" onClick={this.generateThumbnails}>Click here to generate Thumbnails</div>
                        <div id="caption">
                            <input type="text" value={this.state.caption} onChange={this.handleCaptionInput} placeholder="Add Captions ..."/>
                        </div>
                        <div id="uploadAction">
                            <button disabled={this.state.disabled} onClick={this.uploadVideoPost}>{this.state.uploadState}</button>
                            <span onClick={()=>this.props.closeUploadBox("video")}>{this.state.cancelOrClose}</span>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

class ImageUploadPost extends React.Component{
    constructor() {
        super();
        this.state={
            caption:'',
            loaded:'',
            uploadState:'Upload',
            cancelOrClose:'close',
            disabled:false
        };
        this.uploadImagePost = this.uploadImagePost.bind(this);
        this.handleCaptionInput= this.handleCaptionInput.bind(this);
    }
    uploadImagePost(){
        this.setState({uploadState:'Uploading ...',cancelOrClose:"cancel",disabled:true});
        const data = new FormData();
        data.set("caption",this.state.caption);
        data.set("userId",sessionStorage["id"]);
        data.append('file', this.props.imageUploadPost.file, this.props.imageUploadPost.file.name);
        axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/app/fileupload',
              data:data,
              headers: {Authorization: "Token " + sessionStorage["token"]},
              onUploadProgress: (ProgressEvent) => {
                    let loaded = Math.round(ProgressEvent.loaded / ProgressEvent.total*100)+"%";
                    this.setState({loaded:loaded});
                },
            }).then(res => {
                    this.setState({uploadState:'Uploaded Successfully !!',cancelOrClose:"close"});
                    setTimeout(()=>this.props.closeUploadBox("image"),3000);
            })
    }
    handleCaptionInput(event){
        this.setState({caption:event.target.value})
    }
    render(){
        return(
            <div className="shadow">
                <div id="imageUploadPost">
                    <div id="image">
                        <img src={this.props.imageUploadPost.url}/>
                    </div>
                    <div style={{width:`${this.state.loaded}`}} id="progressBar">

                    </div>
                    <div id="block1">
                        <div id="caption">
                            <input type="text" value={this.state.caption} onChange={this.handleCaptionInput} placeholder="Add Captions ..."/>
                        </div>
                        <div id="uploadAction">
                            <button disabled={this.state.disabled} onClick={this.uploadImagePost}>{this.state.uploadState}</button>
                            <span onClick={()=>{this.props.closeUploadBox("image")}}>{this.state.cancelOrClose}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}










