import React from 'react'
import {View,Text,SafeAreaView,Image,StyleSheet,StatusBar,Dimensions,TextInput} from 'react-native'
import { Icon,Input } from 'react-native-elements'
const cardWidth = Dimensions.get('screen').width * .25
const cardHeight = Dimensions.get('screen').height * .1
const Profile = () =>{
    
    return(
        <View >
            <View style={styles.Profile}>
                    <Image source = {require('../../assets/first.jpg')} style= {styles.Image}></Image>
                   <View style={styles.Container}>
                        <View style={styles.PicContainer}>
                                <Image source = {require('../../assets/Second.png')} style={styles.Pic} ></Image>
                                <View style={styles.Name}>
                                    <Text style={styles.Username}>UserName</Text>
                                    <Text style={styles.Status}>Learner</Text>
                                </View>
                        </View>
                        <View style={styles.UserProfile}>
                            <View style={styles.circle}>
                            <Icon name="user" type="font-awesome" size={25} color={'black'} style={styles.ProfileIcon} />
                            </View>
                          
                        </View>
                   </View>
            </View>
           
        </View>
    )
}
    const styles = StyleSheet.create({
        Image:{
            width: '100%',
        height: 280, 
        alignSelf: 'center',
      
        },
        Personal:{

        },
        Container:{
            width: '100%',
            backgroundColor:'white',
            height:'100%',
            marginTop:'-12%',
            borderTopEndRadius:30,
            borderTopStartRadius:30,
        },

        Profile:{
            margin:'0%',
            padding:'0%',
            width: '100%',
            alignSelf: 'center',

        },
        Pic:{
            width:63,
            height:110,borderRadius:12,
            marginTop:'-5%',
            marginLeft:'2%'
        },
        PicContainer:{
            display:'flex',
            flexDirection:'row',
            margin:'4%',
            padding:'4%',
            marginTop:'-20%',
            
        },Name:{
            marginTop:'5%',
            backgroundColor:'white',
            width:'70%',
            borderBottomEndRadius:20,
            borderTopEndRadius:20,
            borderTopStartRadius:0,
            borderBottomStartRadius:0,
            alignSelf: 'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
                elevation: 2,
                width:'80%',
                height: cardHeight,
               
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderColor:'rgba(0,0,0,.2)',
             
            
        },
        Username:{
            paddingLeft:'8%',
            fontSize:22, 
            fontWeight:'500',

        },
        Status:{
            paddingLeft:'10%',
            fontWeight:'600',
            fontSize:18
        },
        UserProfile:{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2,
            width:'90%',
            height: cardHeight,
           
            
            alignItems: 'flex-start',
          
            borderColor:'rgba(0,0,0,.2)',
            alignSelf: 'center',
            display:'flex',
            flexDirection:'row'
        },
        circle:{
            borderRadius:50, 
             shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            elevation: 2,
            width:'20%',
            height:'90%',
            
            margin:'2%',
            justifyContent: 'center',
            alignItems: 'flex-start',
          
            borderColor:'rgba(0,0,0,.1)',
         
        },
        ProfileIcon:{
            width:'90%',
            alignSelf:'center',
            margin:'10%'
        }


    })
export default Profile