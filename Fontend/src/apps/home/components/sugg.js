import React from 'react'
import '../css/sugg.css'
export class Sugg extends React.Component {
    render() {
        return (
            <div id="sugg">
                <div id="head">
                    <span>Suggestions for you</span><span>See all</span>
                </div>
                <div id="content">
                    <div className="item">
                        <img src={require('../images/katrina.jpeg')}/>
                        <div id="pack">
                            <div id="username">kali.215</div>
                            <div id="foo">hey there ff!!</div>
                        </div>
                        <div id="more">
                            23 hrs
                        </div>
                    </div>
                    <div className="item">
                        <img src={require('../images/smartgirl.jpg')}/>
                        <div id="pack">
                            <div id="username">shures.npeli</div>
                            <div id="foo">hey there !!</div>
                        </div>
                        <div id="more">
                            23 hrs
                        </div>
                    </div>
                    <div className="item">
                        <img src={require('../images/smartgirl.jpg')}/>
                        <div id="pack">
                            <div id="username">shures.npeli</div>
                            <div id="foo">hey there !!</div>
                        </div>
                        <div id="more">
                            23 hrs
                        </div>
                    </div>
                    <div className="item">
                        <img src={require('../images/large.jpg')}/>
                        <div id="pack">
                            <div id="username">samixya_hjr</div>
                            <div id="foo">hey there ho...!!</div>
                        </div>
                        <div id="more">
                            23 hrs
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}