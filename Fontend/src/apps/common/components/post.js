import React from 'react';
import './../css/shadow.css'
import './../css/postup.css'
import axios from "axios";
export class PostOpen extends React.Component{
    constructor(){
        super();
        this.state={
            isImage: false,
            post:''
        };
    }
    componentDidMount() {
        axios({
                method: 'post',
                data:{userId:sessionStorage["id"],postId:this.props.id},
                url: "http://127.0.0.1:8000/app/getPostItem",
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
            });
    }
    render(){
        return(
            <div className="shadow">
               <div id="postUp">
                   <div id="img">
                    {/*{this.state.isImage ? <div id="imagePost" >*/}
                    {/*        <img src={"http://127.0.0.1:8000/media/" + this.state.post.content}/>*/}
                    {/*    </div> :*/}
                    {/*    <div id="videoPost">*/}
                    {/*        <video onClick={this.playPauseVideo} loop*/}
                    {/*               poster={"http://127.0.0.1:8000/media/thumbnails/" + this.state.post.content.replace("mp4", "png")}*/}
                    {/*               preload="none">*/}
                    {/*            <source src={"http://127.0.0.1:8000/media/" + this.state.post.content}/>*/}
                    {/*        </video>*/}
                    {/*    </div>}*/}
                   </div>
                   <div id="foo">
                       <div id="head">
                            <img src={require('../images/coding.jpg')}/>
                            <span>{this.state.post.username}</span>
                            <b>Following</b>
                       </div>
                       <div id="comment">
                            <div id="list">
                                <div className="item">
                                    <div id="pack">
                                        <span>nabin tamang</span><span>you looking great today you looking great today you looking great today</span>
                                    </div>
                                    <div id="comment_like"><img src=""/></div>
                                </div>
                                <div className="item">
                                    <div id="pack">
                                        <span>manish tamang</span><span>sometime different</span>
                                    </div>
                                    <div id="comment_like"><img src=""/></div>
                                </div>
                                <div className="item">
                                    <div id="pack">
                                        <span>heart_king</span><span>I love you</span>
                                    </div>
                                    <div id="comment_like"><img src=""/></div>
                                </div>
                            </div>
                        </div>
                       <div id="down">
                           <div id="action">
                               <div id="foo">
                                    <img src={require("../../home/images/002-heart-1.png")} />
                                    <img src={require("../../home/images/003-comment.png")} />
                                    <img src={require("../../home/images/004-share.png")} />
                                    <img src={require("../../home/images/005-money.png")} />
                                </div>
                               <div id="status">
                                   <span>{this.state.post.likeCount} likes</span><span>{this.state.post.commentCount} comments</span>
                               </div>
                           </div>
                            <div id="add_comment">
                                <input type="text" placeholder="Add a Comment..."/>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
        )
    }
}