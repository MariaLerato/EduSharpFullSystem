import React, { useState, useEffect } from "react";
import {Text, View, FlatList, Image, TouchableOpacity, Linking, StyleSheet, ScrollView} from 'react-native';
import { Icon, Input, Avatar, Button } from "react-native-elements";
import { Video, AVPlaybackStatus } from 'expo-av';

import firebase from "firebase";

const Videos=()=>{

    const [materials, setmaterials] =  useState([]);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [questionAndAnswers, setquestionAndAnswers] =  useState([]);

    const db = firebase.firestore();


    

    useEffect(() =>{
        let materialinfo = [];
        db.collection("questionAndAnswers")
        .get()
        .then((res)=>{
            res.forEach((action)=>{
                materialinfo.push({...action.data(), id:
                action.id})
            
        })

        setquestionAndAnswers(materialinfo);
        console.log(id)
    });
},[]);

    

    useEffect(() =>{
        let materialinfo = [];
        db.collection("materials")
        .get()
        .then((res)=>{
            res.forEach((action)=>{
                materialinfo.push({...action.data(), id:
                action.id})
            
        })

        setmaterials(materialinfo);
        console.log(id)
    });
},[]);

const backgroundImg = {
    uri: "https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };
    
    return(
        <View>

            <ScrollView>
            <Text style={{fontSize:18, fontWeight:'bold'}}>My Videos</Text>
             
           {materials.map((element) =>(
               <>
               <View style={{height: 290,
        width: '100%',
        backgroundColor: 'white',
        elevation: 15,
        paddingHorizontal:20,
        marginTop:20}}>
            <TouchableOpacity onPress={() => {Linking.openURL(element.downloadUrl)}} >
               {/* <Avatar size={50} source={{uri: element.downloadUrl}} style={{height: 190,
        width: '100%'}}></Avatar> */}
    {/* <Text style={{paddingHorizontal:10, color:'#000', fontWeight:'bold', fontSize:18}}>From Materials</Text> */}

<Video
                ref={video}
                style={{ height: 210, width: '100%', borderRadius: 7, marginTop:20 }}
                source={{uri: element.downloadUrl}}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
               </TouchableOpacity>
                <View>
                <Text style={{paddingHorizontal:10, color:'#000', fontWeight:'bold', fontSize:18}}>Subject: {element.subject}</Text>
                <Text style={{paddingHorizontal:10, color:'#000', fontWeight:'bold', fontSize:18}}>{element.grade}</Text>

                </View>
            </View>
               


            </>

           ))}


               
           </ScrollView>
    </View>
    )
}

export default Videos

