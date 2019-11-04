import React from 'react';
import './../css/shadow.css'
import './../css/postup.css'
import axios from "axios";
export class PostOpen extends React.Component{
    constructor(){
        super();
        this.state={
            isImage: 'false',
            post:null,
            commentInput: '',
            playPauseVideo: false,
            liked: false,
            commented: false,
        };
        this.handleLike = this.handleLike.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleCommentInput = this.handleCommentInput.bind(this);
        this.playPauseVideo = this.playPauseVideo.bind(this);
    }
    componentDidMount() {
        axios({
                method: 'post',
                data:{userId:sessionStorage["id"],postId:this.props.id},
                url: sessionStorage["ip"]+'/app/getPostItem',
                headers: {Authorization: "Token " + sessionStorage["token"]}
            })
            .then(res => {
                let dotPosition = res.data.content.lastIndexOf('.');
                let extension = res.data.content.substr(dotPosition + 1);
                if (extension === "mp4") {
                    this.setState({isImage: false});
                } else if (extension === "jpg" || extension === "png") {
                    this.setState({isImage: true});
                }
                this.setState({post:res.data});
                console.log(res.data)
            });
    }

    playPauseVideo(event) {
        this.state.playPauseVideo ? event.target.pause() : event.target.play();
        this.setState({playPauseVideo: !this.state.playPauseVideo})

    }

    handleCommentInput(event) {
        this.setState({commentInput: event.target.value})
    }

    handleLike() {
        this.setState({isLiked: !this.state.isLiked});
        axios({
            method: 'post',
            data: {userId: sessionStorage["id"], postId: this.state.post.id},
            url: sessionStorage["ip"]+'/app/handleLike',
            headers: {Authorization: "Token " + sessionStorage["token"]}
        })
            .then(res => {

            });
    }

    handleComment(e) {
        if (e.key === "Enter") {
            axios({
                method: 'post',
                data: {userId: sessionStorage["id"], postId: this.state.post.id, comment: this.state.commentInput},
                url: sessionStorage["ip"]+'/app/handleComment',
                headers: {Authorization: "Token " + sessionStorage["token"]}
            })
                .then(res => {

                });
        }
    }



    render(){
        if(this.state.post!==null){
            return(
            <div className="shadow">
               <div id="postUp">
                   <div id="img">
                    {this.state.isImage ? <div id="imagePost" >
                            <img src={sessionStorage["ip"]+'/media/' + this.state.post.content}/>
                        </div> :
                        <div id="videoPost">
                            <video onClick={this.playPauseVideo} loop
                                   poster={sessionStorage["ip"]+'/media/thumbnails/' + this.state.post.content.replace("mp4", "png")}
                                   preload="none">
                                <source src={sessionStorage["ip"]+'/media/' + this.state.post.content}/>
                            </video>
                        </div>}
                        <div id="status">{this.state.post.caption}</div>
                   </div>
                   <div id="foo">
                       <div id="head">
                            <img src={require('../images/coding.jpg')}/>
                            <span>{this.state.post.username}</span>
                            <b>Following</b>
                       </div>
                       <div id="comment">
                            <div id="list">
                                {this.state.post.comments.map((item,index)=>{
                                        return <Comment item={item} key={index}/>
                                })}
                            </div>
                        </div>
                       <div id="down">
                           <div id="action">
                               <div id="foo">
                                    {this.state.post.isLiked ? <img src={require("../../home/images/002-heart-1.png")} onClick={this.handleLike}/> : <img src={require("../../home/images/001-heart.png")} onClick={this.handleLike}/>}
                                    <img src={require("../../home/images/003-comment.png")} onClick={this.handleComment}/>
                                    <img src={require("../../home/images/004-share.png")}/>
                                    <img src={require("../../home/images/005-money.png")}/>
                                </div>
                               <div id="status">
                                   <span>{this.state.post.likeCount} likes</span><span>{this.state.post.commentCount} comments</span>
                               </div>
                           </div>
                            <div id="add_comment">
                                <input type="text"  onKeyPress={this.handleComment} value={this.state.commentInput}
                               onChange={this.handleCommentInput} placeholder="Add a Comment..."/>
                            </div>
                        </div>
                   </div>
                   <img src={require("../../common/images/close.png")} onClick={()=>{this.props.openPost(null)}} />
               </div>
            </div>
        )
        }else{
            return null;
        }
    }
}

class Comment extends React.Component{
    constructor(){
        super();
    }
    render() {
        return(
            <div className="item">
                <div id="pack">
                    <span>{this.props.item.username}</span><span>{this.props.item.comment}</span>
                </div>
                <div id="comment_like"><img src={require("../../common/images/002-heart-1.png")}/></div>
            </div>
        )
    }
}