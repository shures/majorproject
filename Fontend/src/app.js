import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {Index} from './apps/account/components/index';
import {Login} from './apps/account/components/login';
import {SignUp} from './apps/account/components/signUp';
import {MyProfile} from "./apps/profile/components/myprofile";
import {Trending} from  "./apps/trending/component/trending"
import {BrowserRouter, Route,Switch} from "react-router-dom";
import {Browse} from "./apps/browse/component/browse";
import {PostOpen} from "./apps/common/components/post";
import {Follow} from "./apps/home/components/follow";
import {Video} from "./apps/test/video";
import {Canvas} from "./apps/test/thumb";
import {UserProfile} from "./apps/profile/components/userprofile";
import {VerifyAccount} from "./apps/account/components/verifyaccount";
import {Setting} from "./apps/profile/components/setting";
import {Post} from "./apps/trending/component/new";
import {Sugg} from "./apps/sugg/components/sugg";

class App extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={Index}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/verifyaccount" component={VerifyAccount}/>
                <Route exact path="/profile" component={MyProfile}/>
                <Route exact path="/trending" component={Trending}/>
                <Route exact path="/browse" component={Browse}/>
                <Route exact path="/post" component={PostOpen}/>
                <Route exact path="/follow" component={Follow}/>
                <Route exact path="/abc" component={Post}/>
                <Route exact path="/video" component={Video}/>
                <Route exact path="/canvas" component={Canvas}/>
                <Route exact path="/userprofile" component={UserProfile}/>
                <Route exact path="/setting" component={Setting}/>
                <Route exact path="/sugg" component={Sugg}/>
                <Route exact path="/:username" component={UserProfile}/>
            </Switch>
        );
    }
}
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app'));