import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, Text, View} from "react-native";
const deviceWidth = Dimensions.get('window').width/3-3;
export default class Profile extends Component{
    render(){
        return(
            <View>
                <View style={{height:50,flexDirection:'row', elevation:4, backgroundColor: '#eaecee', alignItems: 'center',paddingLeft:20}}>
                    <Text style={{color:'black',fontWeight:'bold',fontSize:18}}>shures nepali</Text>
                </View>
                <ScrollView>
                    <View style={{flexDirection:'row',flex:1,alignItems:'center',justifyContent:'flex-start',paddingLeft:20,paddingRight:50,marginTop:30}}>
                        <View style={{borderWidth:3,borderColor:'red',borderRadius:80,padding:4}}>
                            <Image source={require('./../assets/images/girl.jpg')} style={{height:80,width:80,borderRadius:80}} />
                        </View>
                        <View style={{marginLeft:30}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'black',fontWeight: 'bold',fontSize:16}}>Posts </Text>
                                <Text> 125</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'black',fontWeight: 'bold',fontSize:16,}}>Followers </Text>
                                <Text> 36</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'black',fontWeight: 'bold',fontSize:16}}>Following </Text>
                                <Text> 500</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingLeft:20,marginTop:10}}>
                        <Text style={{color:'black',fontSize:18,fontWeight:'bold'}}>shures.nepali</Text>
                        <Text style={{color:'black',marginTop:10}}>What you say reflects who you are</Text>
                        <Text style={{color:'black'}}>Animal is my friends</Text>
                        <Text style={{color:'red'}}>www.shuresnepali@gmail.com</Text>
                        <Text>Living in Jomsom, Mustang</Text>
                    </View>
                    <View style={{marginTop:20,flexDirection:'row',flexWrap:'wrap',paddingBottom:80}}>
                        <Image source={require('./../assets/images/girl.jpg')} style={{height:deviceWidth,width:deviceWidth,marginTop:2,marginLeft:1,borderRadius:2}}/>
                        <Image source={require('./../assets/images/girl.jpg')} style={{height:deviceWidth,width:deviceWidth,marginTop:2,marginLeft:1,borderRadius:2}}/>
                        <Image source={require('./../assets/images/girl.jpg')} style={{height:deviceWidth,width:deviceWidth,marginTop:2,marginLeft:1,borderRadius:2}}/>
                        <Image source={require('./../assets/images/girl.jpg')} style={{height:deviceWidth,width:deviceWidth,marginTop:2,marginLeft:1,borderRadius:2}}/>
                        <Image source={require('./../assets/images/girl.jpg')} style={{height:deviceWidth,width:deviceWidth,marginTop:2,marginLeft:1,borderRadius:2}}/>
                        <Image source={require('./../assets/images/girl.jpg')} style={{height:deviceWidth,width:deviceWidth,marginTop:2,marginLeft:1,borderRadius:2}}/>
                        <Image source={require('./../assets/images/girl.jpg')} style={{height:deviceWidth,width:deviceWidth,marginTop:2,marginLeft:1,borderRadius:2}}/>
                        <Image source={require('./../assets/images/girl.jpg')} style={{height:deviceWidth,width:deviceWidth,marginTop:2,marginLeft:1,borderRadius:2}}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}