import React from 'react'
import '../css/tranding.css'
import axios from "axios";
export class Tranding extends React.Component {
    constructor() {
        super();
        this.state={
            posts:[]
        }
    }
    componentWillMount() {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/app/trending",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                this.setState({posts:res.data.posts})
            }
        })
    }
    render() {
        return (<div id="tn">
            <div id="head">
                <span>Trending For You!</span>
            </div>
            <div id="content">
                {this.state.posts.map((item,index)=>{
                    return <Item item={item} key={index}/>
                })}
            </div>
            {this.state.posts.length<0 ? <div id="noData">You have no trending Yet</div>: <div id="seeAll">See all the Trendings</div>}
        </div>)
    }
}

class Item extends React.Component{
    constructor(){
        super();
    }
    render() {
        return (
            <div className="item">
                <div id="img">
                    <img src={"http://127.0.0.1:8000/media/" + this.props.item.content}/>
                </div>
                <div id="pack">
                    <div id="username">{this.props.item.username}</div>
                    <div id="dis">{this.props.item.caption}</div>
                    <div id="time">{this.props.item.date}</div>
                </div>
            </div>
        );
    }
}
