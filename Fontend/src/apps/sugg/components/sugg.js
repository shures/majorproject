import React from 'react'
import '../css/sugg.css'
import axios from "axios";
import {Header} from "../../home/components/header";

export class Sugg extends React.Component {
    constructor() {
        super();
        this.state={

        }
    }
    componentWillMount() {
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/app/sugg",
            data: {userId:sessionStorage["id"]},
            headers: {Authorization: "Token " + sessionStorage["token"]},
        }).then(res => {
            if(res.status===200){
                console.log(res.data.data);
            }
        })
    }
    render() {
        return (
            <div>
                <Header/>
                <div id="suggestion">
                    <div id="title">Suggested Business Page</div>
                    <div className="item">
                        <div id="left">
                            <div id="img">
                                <img src={require("../images/girl.jpg")}/>
                            </div>
                            <div id="pack">
                                <span><b>iloveyou_name</b></span>
                                <span>Shures Nepali</span>
                                <span>From Syang Village Mustang</span>
                            </div>
                        </div>
                        <div id="right">
                            <span>Follow</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
