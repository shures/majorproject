import React,{Component} from "react";
import {Image, ScrollView, Text, View} from "react-native";

export default class Notification extends Component{
    render() {
        return (
            <View>
                <View style={{height:50,backgroundColor:'white',flexDirection:'row',justifyContent: 'space-between',alignItems:'center',elevation:3}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image
                            style={{width:30,height:30,marginLeft:10}}
                            source={{uri: 'http://pluspng.com/img-png/instagram-png-instagram-png-file-512.png'}}/>
                        <Text style={{marginLeft:10,fontSize:18,color:'black',fontWeight:'bold'}}>Notifications</Text>
                    </View>
                    <Image
                        style={{width:30,height:30,marginRight:10}}
                        source={{uri:'https://pngimage.net/wp-content/uploads/2018/06/messaging-icon-png.png'}}/>
                </View>
                <ScrollView style={{marginTop:10}}>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <View style={{marginLeft:10,borderWidth:2,borderColor:'darkgreen',borderRadius:35,padding:2}}>
                             <Image
                            style={{width:35,height:35,borderRadius:35}}
                            source={{uri: 'https://infobharti.files.wordpress.com/2016/07/deepika-padukone-most-followed-bollywood-actress-on-instagram.jpg'}}/>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:15,color:'black',fontWeight:'bold'}}>Shures Nepali</Text>
                            <Text style={{fontSize:13,color:'darkgreen'}}>5 hrs</Text>
                        </View>
                        <Text style={{marginRight:45}}>hello how are you hehahaha how thisfjdsakfdsj</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


