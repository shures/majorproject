import React, { Component } from 'react';
import { View, Image,Text,ScrollView} from 'react-native';
export default class Posts extends Component{
    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <View style={{height:50,backgroundColor:'white',flexDirection:'row',justifyContent: 'space-between',alignItems:'center',elevation:3}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image
                            style={{width:30,height:30,marginLeft:10}}
                            source={require('./../assets/icons/015-photo-camera.png')}/>
                        <Text style={{marginLeft:10,fontSize:18,color:'black',fontWeight:'bold'}}>Tasbiralayaa</Text>
                    </View>
                    <Image
                        style={{width:30,height:30,marginRight:10}}
                        source={require('./../assets/icons/012-picture.png')}/>
                </View>
                <ScrollView>
                    <Post/>
                    <Post/>
                </ScrollView>
            </View>
        );
    }
}

class Post extends React.Component{
    render(){
        return(
            <View style={{marginTop:15,borderBottomWidth:1,borderBottomColor:'rgba(0,0,0,0.1)',paddingBottom:10}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{marginLeft:10,borderWidth:2,borderColor:'red',borderRadius:35,padding:2}}>
                         <Image
                        style={{width:35,height:35,borderRadius:35}}
                        source={require('./../assets/images/girl.jpg')}/>
                    </View>
                    <View style={{marginLeft:10}}>
                        <Text style={{fontSize:15,color:'black',fontWeight:'bold'}}>Shures Nepali</Text>
                        <Text style={{fontSize:13,color:'rgba(0,0,0,0.8)'}}>Dhading, Neapl</Text>
                    </View>
                    <Image
                        style={{width:28,height:25,position:'absolute',right:10}}
                        source={require('./../assets/icons/005-energy-saving.png')}/>
                </View>
                <View style={{marginTop:10,fontSize:14,marginLeft:10,textAlign:'left',marginRight:10}}>
                    <Text style={{color:'black'}}>Live Photo view of pashupati area from distance.</Text>
                    <Text style={{color:'red'}}>#RamailoPal</Text>
                </View>
                <View>
                    <Image
                        style={{width:'100%',height:300,marginTop:10}}
                        source={require('./../assets/images/girl.jpg')}/>
                </View>
                <View style={{marginTop:10,flex:1,marginLeft:10,flexDirection:'row'}}>
                    <Image
                        style={{width:30,height:30}}
                        source={require('./../assets/icons/001-heart-1.png')}/>
                    <Image
                        style={{width:30,height:30,marginLeft:20}}
                        source={require('./../assets/icons/004-connections.png')}/>
                    <Image
                        style={{width:30,height:30,marginLeft:20}}
                        source={require('./../assets/icons/008-musica-searcher.png')}/>
                    <Image
                        style={{width:30,height:30,marginLeft:20}}
                        source={require('./../assets/icons/005-energy-saving.png')}/>
                </View>
                <View style={{marginTop:10,marginLeft:10}}>
                    <Text style={{color:'black',fontSize:13,fontWeight:'bold'}}>256 likes</Text>
                    <Text style={{color:'red',fontSize:13}}>View all 212 Comments</Text>
                </View>
                <View style={{borderTopWidth:1,borderTopColor:'rgba(0,0,0,0.1)',marginTop:8,marginLeft:10,paddingTop:8}}>
                    <View style={{flexDirection:'row'}}>
                       <View style={{flexDirection:'row',width:'90%',flexWrap:'wrap'}}>
                            <Text style={{color:'black',fontWeight:'bold'}}>aashis_ranaa</Text>
                            <Text style={{marginRight:10}}>say something </Text>
                        </View>
                        <Image source={require('./../assets/icons/001-heart-1.png')} style={{height:15,width:15,marginRight:10}}/>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'row',width:'90%',flexWrap:'wrap'}}>
                            <Text style={{color:'black',fontWeight:'bold'}}>smaitasa_ma</Text>
                            <Text style={{marginRight:10}}>say somethin i love you but it'st not jkfsaldjk </Text>
                        </View>
                        <Image source={require('./../assets/icons/001-heart-1.png')} style={{height:15,width:15,marginRight:10}}/>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',width:'90%',flexWrap:'wrap'}}>
                            <Text style={{color:'black',fontWeight:'bold'}}>kaliketi</Text>
                            <Text style={{marginRight:10}}>hello how are you all</Text>
                        </View>
                        <Image source={require('./../assets/icons/001-heart-1.png')} style={{height:15,width:15,marginRight:10}}/>
                    </View>
                </View>
            </View>
        )
    }
}