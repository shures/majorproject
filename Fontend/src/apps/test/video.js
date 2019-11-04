import React from 'react';
import video from  './test.mp4'
import axios from "axios";

export class Video extends React.Component {
    constructor() {
        super();
        this.state={
            loaded:''
        };
        this.onChanged=this.onChanged.bind(this);
        this.generateThumbnails = this.generateThumbnails.bind(this);
        this.uploadVideoPost = this.uploadVideoPost.bind(this);
    }
    uploadVideoPost(){
        const data = new FormData();
        data.append('file', this.state.videoPost.file, this.state.videoPost.file.name);
        axios({
              method: 'post',
              url: sessionStorage["ip"]+'/app/fileupload',
              data:data,
              headers: {Authorization: "Token " + sessionStorage["token"]},
              onUploadProgress: (ProgressEvent) => {
                    let loaded = Math.round(ProgressEvent.loaded / ProgressEvent.total*100)+"%";
                    this.setState({loaded:loaded});
                },
            }).then(res => {

            })
    }
    generateThumbnails(){
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        let img = document.getElementById("scream");
        let file = ctx.drawImage(img,0,0,c.width,c.height);
    }
    render() {
        return (
            <div id="video">
                {this.state.video ?
                 <video id="scream" controls>
                    <source src={require('./test.mp4')}/>
                </video> : null}
                <div id="gen" onClick={this.generateThumbnails}><span>{this.state.loaded} Click to generate Thumbnail</span></div>
                <canvas id="myCanvas"></canvas>
                <div id="upload" onClick={this.uploadVideoPost}>Upload now {this.state.loaded}</div>
            </div>
        )
    }
}