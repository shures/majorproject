import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {Signup} from "./signup";
import {Login} from "./login";
import {AccountVerify} from "./accountverify";

export default createAppContainer(createSwitchNavigator(
    {
        Login:Login,
        Signup:Signup,
        AccountVerify:AccountVerify,
    }, {
        initialRouteName:'Login'
    }))