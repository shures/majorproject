import React from 'react';
import './../css/shadow.css'
import './../css/postup.css'
export class PostOpen extends React.Component{
    render(){
        return(
            <div className="shadow">
               <div id="postUp">
                   <div id="img">
                       <img src={require('../images/coding.jpg')}/>
                   </div>
                   <div id="foo">
                       <div id="head">
                            <img src={require('../images/coding.jpg')}/>
                            <span>coding.engineer</span>
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
                                   <span>127 likes</span><span>18 Comments</span>
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