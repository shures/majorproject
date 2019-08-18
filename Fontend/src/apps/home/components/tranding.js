import React from 'react'
import '../css/tranding.css'
export class Tranding extends React.Component {
    render() {
        return (<div id="tn">
            <div id="head">
                <span>Trending For You!</span>
            </div>
            <div id="content">
                <div className="item">
                    <img src={require("../images/katrina.jpeg")} />
                    <div id="pack">
                        <div id="username">NeaplBanda1254</div>
                        <div id="dis">happy new yer to all.....</div>
                        <div id="time">3 min</div>
                    </div>
                </div>
                <div className="item">
                    <img src={require("../images/large.jpg")} />
                    <div id="pack">
                        <div id="username">heart.touching</div>
                        <div id="dis">something diff feelings...</div>
                        <div id="time">small hurt</div>
                    </div>
                </div>
                <div className="item">
                    <img src={require("../images/smartgirl.jpg")} />
                    <div id="pack">
                        <div id="username">small.tourn.np</div>
                        <div id="dis">small town shown in hindi ...</div>
                        <div id="time">5 days ago</div>
                    </div>
                </div>
                <div className="item">
                    <img src={require("../images/katrina.jpeg")} />
                    <div id="pack">
                        <div id="username">NeaplBanda1254</div>
                        <div id="dis">happy new yer to all.....</div>
                        <div id="time">3 min</div>
                    </div>
                </div>
                <div className="item">
                    <img src={require("../images/katrina.jpeg")} />
                    <div id="pack">
                        <div id="username">NeaplBanda1254</div>
                        <div id="dis">happy new yer to all.....</div>
                        <div id="time">3 min</div>
                    </div>
                </div>
                <div className="item">
                    <img src={require("../images/katrina.jpeg")} />
                    <div id="pack">
                        <div id="username">NeaplBanda1254</div>
                        <div id="dis">happy new yer to all.....</div>
                        <div id="time">3 min</div>
                    </div>
                </div>

            </div>
        </div>)
    }
}
