import {Image, ScrollView, Text, TextInput, View} from "react-native";
import React,{Component} from "react";

export default class Search extends Component{
    render() {
        return (
            <View>
                <View style={{height:50,flexDirection:'row', elevation:4, backgroundColor: 'white',alignItems:'center'}}>
                    <Image source={require('./../assets/icons/logo.png')} style={{height:25,width:25,marginLeft:10,}}/>
                    <TextInput
                        style={{height:50,flex:1,paddingLeft:10}}
                        placeholder="Search"
                        onChangeText={(username) => this.setState({username})}
                    />
                </View>
                <ScrollView style={{marginTop:10}}>
                    <View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={{marginLeft:10,borderWidth:2,borderColor:'darkgreen',borderRadius:35,padding:2}}>
                                 <Image
                                style={{width:35,height:35,borderRadius:35}}
                                source={{uri: 'https://infobharti.files.wordpress.com/2016/07/deepika-padukone-most-followed-bollywood-actress-on-instagram.jpg'}}/>
                            </View>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontSize:15,color:'black',fontWeight:'bold'}}>Shures Nepali</Text>
                                <Text style={{fontSize:13,color:'darkgreen'}}>Dhading, Neapl</Text>
                            </View>
                            <Image
                                style={{width:28,height:25,position:'absolute',right:10}}
                                source={{uri: 'https://cdn2.iconfinder.com/data/icons/bold-ui/100/more-512.png'}}/>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <View style={{marginLeft:10,borderWidth:2,borderColor:'darkgreen',borderRadius:35,padding:2}}>
                                 <Image
                                style={{width:35,height:35,borderRadius:35}}
                                source={{uri: 'https://infobharti.files.wordpress.com/2016/07/deepika-padukone-most-followed-bollywood-actress-on-instagram.jpg'}}/>
                            </View>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontSize:15,color:'black',fontWeight:'bold'}}>Shures Nepali</Text>
                                <Text style={{fontSize:13,color:'darkgreen'}}>Dhading, Neapl</Text>
                            </View>
                            <Image
                                style={{width:28,height:25,position:'absolute',right:10}}
                                source={{uri: 'https://cdn2.iconfinder.com/data/icons/bold-ui/100/more-512.png'}}/>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <View style={{marginLeft:10,borderWidth:2,borderColor:'darkgreen',borderRadius:35,padding:2}}>
                                 <Image
                                style={{width:35,height:35,borderRadius:35}}
                                source={{uri: 'https://infobharti.files.wordpress.com/2016/07/deepika-padukone-most-followed-bollywood-actress-on-instagram.jpg'}}/>
                            </View>
                            <View style={{marginLeft:10}}>
                                <Text style={{fontSize:15,color:'black',fontWeight:'bold'}}>Shures Nepali</Text>
                                <Text style={{fontSize:13,color:'darkgreen'}}>Dhading, Neapl</Text>
                            </View>
                            <Image
                                style={{width:28,height:25,position:'absolute',right:10}}
                                source={{uri: 'https://cdn2.iconfinder.com/data/icons/bold-ui/100/more-512.png'}}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}