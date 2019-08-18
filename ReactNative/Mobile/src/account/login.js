import React, {Component} from 'react';
import {View, Text, TextInput, TouchableHighlight} from 'react-native';

export class Login extends Component{
    render(){
        return(
           <View style={{flex:1,alignItems:'center',paddingTop:40}}>
                <View style={{flex:1,alignItems:'flex-start',width:'70%'}}>
                    <View style={{height:80,width:80,backgroundColor:'#22addc',borderRadius:80,justifyContent:"center",alignItems:'center'}}>
                        <Text style={{color:'white'}}>Logo</Text>
                    </View>
                    <Text style={{color:'black',fontSize:22,marginTop:20,marginBottom:20}}>Tasbiralaya</Text>
                    <TextInput
                        style={{height: 40,borderBottomColor:'#a0dff4',borderBottomWidth:1,width:'100%'}}
                        placeholder="Username"
                        placeholderTextColor='#22addc'
                        onChangeText={(username) => this.setState({username})}
                    />
                    <TextInput
                        style={{height: 40,borderBottomColor:'#a0dff4',borderBottomWidth:1,width:'100%',marginTop:20}}
                        placeholder="Password"
                        placeholderTextColor='#22addc'
                        onChangeText={(password) => this.setState({password})}
                    />
                    <TouchableHighlight onPress={this.login} style={{alignItems:'center',width:'60%',paddingTop:10,paddingBottom:10,marginTop:30,borderRadius:25,backgroundColor:'#22addc'}}>
                        <Text style={{color:'white'}}>Login</Text>
                    </TouchableHighlight>
                    <View style={{marginTop:20,flexDirection:'row'}}>
                        <Text>Don't have an account ? </Text>
                        <Text onPress={()=>this.props.navigation.navigate("Signup")} style={{color:'black'}}>sign up</Text>
                    </View>
                    <Text style={{color:'black',marginTop:10}}>forget password</Text>
                </View>
            </View>
        )
    }
}