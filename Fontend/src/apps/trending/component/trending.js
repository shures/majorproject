import React from 'react';
import './../css/trending.css';
import {Header} from "../../home/components/header";
import {PostOpen} from "../../common/components/post";
import axios from "axios";

export class Trending extends React.Component {
    constructor() {
        super();
        this.state = {
            posts:[],
            openPost:false,
            openPostId:0,
        };
        this.openPost = this.openPost.bind(this);
    }
    openPost(id){
        if(id===null){
            this.setState({openPost:false});
        }else{
            this.setState({openPost:true,openPostId:id});
        }
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
            data: {userId: sessionStorage["id"], postId: this.state.postId},
            url: sessionStorage["ip"]+"/app/handleLike",
            headers: {Authorization: "Token " + sessionStorage["token"]}
        })
            .then(res => {

            });
    }

    handleComment(e) {
        if (e.key === "Enter") {
            axios({
                method: 'post',
                data: {userId: sessionStorage["id"], postId: this.state.postId, comment: this.state.commentInput},
                url: sessionStorage["ip"]+"/app/handleComment",
                headers: {Authorization: "Token " + sessionStorage["token"]}
            })
                .then(res => {

                });
        }
    }



    componentWillMount() {
        axios({
            method: "post",
            url: sessionStorage["ip"]+"/app/trending",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({posts:res.data.posts})
            }
        })
    }

    render() {
        return (
            <div id="background">
                <Header/>
                <div id="trending">
                    <div id="title"><img src={require("./../images/trending.png")}/> <span>Trending</span></div>
                    <div id="container">
                        {this.state.posts.map((item,index)=>{
                            return <Item item={item} openPost={this.openPost} key={index}/>
                        })}
                    </div>
                </div>
                {this.state.openPost ? <PostOpen openPost={this.openPost} id={this.state.openPostId}/> : null}
            </div>
        )
    }
}

class Item extends React.Component{
    constructor(){
        super();
        this.state={
            isImage: false,
        };
    }
    componentWillMount() {
         let dotPosition = this.props.item.content.lastIndexOf('.');
        let extension = this.props.item.content.substr(dotPosition + 1);
        if (extension === "mp4") {
            this.setState({isImage: false});
        } else if (extension === "jpg" || extension === "png") {
            this.setState({isImage: true});
        }
    }

    render() {
        return(
            <div className="item" onClick={()=>this.props.openPost(this.props.item.id)}>
                    <div id="hover">
                        <div id="username">
                            <b>{this.props.item.username}</b>
                        </div>
                        <div id="caption" >
                            {this.props.item.caption}
                        </div>
                        <div id="status">
                            <div className="pack">
                                <img src={require("./../images/001-heart.png")}/><span>{this.props.item.likeCount}</span>
                            </div>
                            <div className="pack">
                                <img src={require("./../images/003-comment-in-circular-button.png")}/><span>{this.props.item.commentCount}</span>
                            </div>
                        </div>
                    </div>
                    <div id="content">
                    {this.state.isImage ? <div id="imagePost" >
                            <img src={sessionStorage["ip"]+"/media/" + this.props.item.content}/>
                        </div> :
                        <div id="videoPost">
                            <video onClick={this.playPauseVideo} loop
                                   poster={sessionStorage["ip"]+"/media/thumbnails/" + this.props.item.content.replace("mp4", "png")}
                                   preload="none">
                                <source src={sessionStorage["ip"]+"/media/" + this.props.item.content}/>
                            </video>
                        </div>}
                    </div>
            </div>
        )
    }

}