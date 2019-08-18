import React ,{Component} from 'react';
import './../css/browse.css';
import './../../common/css/shadow.css'
import {Header} from "../../home/components/header";

export class Browse extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                <div id="browse">
                    <div id="head">

                    </div>
                    <div id="content">
                        <div className="row">
                            <div id="title">
                                <img src={require('./../images/large.jpg')}/>
                                <span>bikelover</span>
                                <span>Radilas</span>
                            </div>
                            <div className="innerRow">
                                <div className="item">
                                    <img src={require('./../images/large.jpg')}/>
                                    <div id="title">
                                        #NepalsReality
                                    </div>
                                </div>
                                <div className="item">
                                    <img src={require('./../images/animal-people-hug-wallpaper-3.jpg')}/>
                                    <div id="title">
                                        #NepalsReality
                                    </div>
                                </div>
                                <div className="item">
                                    <img src={require('./../images/wp2918252.jpg')}/>
                                    <div id="title">
                                        #NepalsReality
                                    </div>
                                </div>
                                <div className="item">
                                    <img src={require('./../images/katrina.jpeg')}/>
                                    <div id="title">
                                        #NepalsReality
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div id="title">
                                <img src={require('./../images/large.jpg')}/>
                                <span>bikelover</span>
                                <span>Radilas Human</span>
                            </div>
                            <div className="innerRow">
                                <div className="item">
                                    <img src={require('./../images/my.JPG')}/>
                                    <div id="title">
                                        #NepalsReality
                                    </div>
                                </div>
                                <div className="item">
                                    <img src={require('./../images/roundhouse-kick-face.jpg')}/>
                                    <div id="title">
                                        #NepalsReality
                                    </div>
                                </div>
                                <div className="item">
                                    <img src={require('./../images/smartgirl.jpg')}/>
                                    <div id="title">
                                        #NepalsReality
                                    </div>
                                </div>
                                <div className="item">
                                    <img src={require('./../images/boxing-wallpapers-hd-2016-best-high-resolution-desktop-android.jpg')}/>
                                    <div id="title">
                                        #NepalsReality
                                    </div>
                                </div>
                            </div>
                            <div className="innerRow">
                                <div className="item">
                                    <img src={require('./../images/roundhouse-kick-face.jpg')}/>
                                    <div id="title">
                                        #NepalsReality
                                    </div>
                                </div>
                                <div className="item">
                                    <img src={require('./../images/my.JPG')}/>
                                    <div id="title">
                                        #NepalsReality
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}