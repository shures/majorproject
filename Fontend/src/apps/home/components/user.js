import React from 'react'
import '../css/user.css'
import axios from 'axios'

export class User extends React.Component {
    constructor() {
        super();
        this.state = {
            url: require('./../images/user.png')
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: "http://127.0.0.1:8000/home/getUserDetail",
            headers: {Authorization: "Token " + sessionStorage["token"]}
        })
            .then(res => {
                this.setState({url: "http://127.0.0.1:8000/media/" + res.data.file_name})
            });
    }

    render() {
        return (<div id="user">
            <div id="image1">
                <img src={require('./../images/girl.jpg')}/>
            </div>
            <div id="foo">
                <span>Shuresnepali</span>
                <span>Shures Nepali</span>
                <span>Upload Post</span>
                <span>More</span>
            </div>
        </div>)
    }
}