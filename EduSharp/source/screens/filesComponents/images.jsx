import React, { useState, useEffect } from "react";
import {Text, View, FlatList, Image, TouchableOpacity, Linking, StyleSheet, ScrollView} from 'react-native';
import { Icon, Input, Avatar, Button } from "react-native-elements";

import firebase from "firebase";

const Images=()=>{

    const [questionAndAnswers, setquestionAndAnswers] =  useState([]);
    const [lessons, setlessons] =  useState([]);

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
    let lessonsinfo = [];
    db.collection("lessons")
    .get()
    .then((res)=>{
        res.forEach((action)=>{
            lessonsinfo.push({...action.data(), id:
            action.id})
        
    })

    setlessons(lessonsinfo);
    console.log(id)
});
},[]);

const backgroundImg = {
    uri: "https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };
    
    return(
        <View>

            <ScrollView>
            <Text style={{fontSize:18, fontWeight:'bold'}}>My Images</Text>
             
           {questionAndAnswers.map((element) =>(
               <>
               <View style={{height: 280,
        width: '100%',
        backgroundColor: 'white',
        elevation: 15,
        borderRadius: 10,
        marginTop:20}}>
            <TouchableOpacity onPress={() => {Linking.openURL(element.downloadUrl)}} >
               <Avatar size={50} source={{uri: element.downloadUrl}} style={{height: 220, width: '100%'}}></Avatar>
               </TouchableOpacity>
                <View>
                <Text style={{paddingHorizontal:10, color:'#000', fontWeight:'bold', fontSize:18}}>Subject: {element.subject}</Text>
                <Text style={{paddingHorizontal:10, color:'#000', fontWeight:'bold', fontSize:18}}>Grade: {element.grade}</Text>

                </View>
            </View>
               


            </>

           ))}

{lessons.map((element) =>(
               <>
               <View style={{height: 280,
        width: '100%',
        backgroundColor: 'white',
        elevation: 15,
        borderRadius: 10,
        marginTop:20}}>
            <TouchableOpacity onPress={() => {Linking.openURL(element.downloadURL)}} >
               <Avatar size={50} source={{uri: element.downloadURL}} style={{height: 220, width: '100%'}}></Avatar>
               </TouchableOpacity>
                <View>
                <Text style={{paddingHorizontal:10, color:'#000', fontWeight:'bold', fontSize:18}}>Subject: {element.subject}</Text>
                <Text style={{paddingHorizontal:10, color:'#000', fontWeight:'bold', fontSize:18}}>Grade: {element.grade}</Text>

                </View>
            </View>
               


            </>

           ))}
           </ScrollView>
    </View>
    )
}

export default Images

