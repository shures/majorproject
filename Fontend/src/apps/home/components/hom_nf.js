import React from 'react'
import '../css/nf.css'
import axios from "axios";
export class Hom_nf extends React.Component {
    constructor(props){
        super(props);
        this.state={
            caption:''
        };
        this.loadUploadStatus = this.loadUploadStatus.bind(this);
        this.uploadPost = this.uploadPost.bind(this);
        this.handleCaptionInput = this.handleCaptionInput.bind(this);

    }
    handleCaptionInput(event){
        this.setState({caption:event.target.value})
    }
    uploadPost(){
        let data = {caption:this.state.caption,user_id:sessionStorage["id"],fileName:this.props.file.selectedFile.name};
        axios({
                method: 'post',
                url: sessionStorage["ip"]+"/app/postUpload",
                data:data,
                headers: {Authorization: "Token " + sessionStorage["token"]}
            })
            .then(res => {

            });
    }
    loadUploadStatus(){
        if(this.props.file.loaded==='100%'){
            return (<span>Uploaded !!</span>)
        }else{
            return (<span>Uploading {this.props.file.loaded} ...</span>)
        }
    }
    render() {
        const progress = {
              width: this.props.file.loaded
        };
        return (
            <div id="cnf">
                <div id="head">Notifications</div>
                <div id="content">
                    {this.props.file.progress ?
                    <div className="item">
                        <div className="image">
                            <img src={require('./../images/large.jpg')}/>
                            <div id="pack">
                                <div id="title">{this.loadUploadStatus()}</div>
                                <div id="progress_bar">
                                    <div id="progress" style={progress}>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="caption">
                            <input type="text" placeholder="Add a Caption" value={this.state.caption} onChange={this.handleCaptionInput}/>
                        </div>
                        <div id="update" onClick={this.uploadPost}>
                            Post Now
                        </div>
                    </div> : null}
                    <div className="item" id="upload_progress" >
                        <img src={require('./../images/large.jpg')}/>
                        <div id="pack">
                            <span>alone_boy liked your post</span>
                            <span>22 min</span>
                        </div>
                    </div>
                    <div className="item" id="upload_progress" >
                        <img src={require('./../images/large.jpg')}/>
                        <div id="pack">
                            <span>alone_boy liked your post</span>
                            <span>22 min</span>
                        </div>
                    </div>
                    <div className="item" id="upload_progress" >
                        <img src={require('./../images/large.jpg')}/>
                        <div id="pack">
                            <span>alone_boy liked your post</span>
                            <span>22 min</span>
                        </div>
                    </div>
                    <div className="item" id="upload_progress" >
                        <img src={require('./../images/large.jpg')}/>
                        <div id="pack">
                            <span>alone_boy liked your post</span>
                            <span>22 min</span>
                        </div>
                    </div>
                    <div className="item" id="upload_progress" >
                        <img src={require('./../images/large.jpg')}/>
                        <div id="pack">
                            <span>alone_boy liked your post</span>
                            <span>22 min</span>
                        </div>
                    </div>
                </div>
            </div>)
    }
}
