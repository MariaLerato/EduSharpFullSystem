import React, { useState, useEffect } from "react";
import {Text, View, FlatList, Image, TouchableOpacity, Linking, StyleSheet, ScrollView} from 'react-native';
import { Icon, Input, Avatar, Button } from "react-native-elements";
import Video from 'react-native-video';

import firebase from "firebase";

const Downloads=()=>{

    const [materials, setmaterials] =  useState([]);

    const db = firebase.firestore();

    

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
            <Text style={{fontSize:18, fontWeight:'bold'}}>My Downloads</Text>
             
           {materials.map((element) =>(
               <>
               <View style={{height: 200,
        width: 190,
        backgroundColor: 'white',
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop:20}}>
            <TouchableOpacity onPress={() => {Linking.openURL(element.downloadUrl)}} >
               <Avatar size={50} source={{uri: element.downloadUrl}} style={{height: 160,
        width: 190}}></Avatar>
               </TouchableOpacity>
{/* 
               <TouchableOpacity onPress={() => {Linking.openURL(element.downloadUrl)}} >
               <Video  source={{uri: element.downloadUrl}}
               
               style={{height: 120,
        width: 150}} 
        onBuffer={this.Buffer}
        onError={this.videoError}
        />
               </TouchableOpacity> */}


                <View>
                <Text style={{paddingHorizontal:10, color:'#4B7BE8', fontWeight:'bold'}}>Subject: {element.subject}</Text>
                <Text style={{paddingHorizontal:10, color:'#4B7BE8', fontWeight:'bold'}}>Grade: {element.grade}</Text>

                </View>
            </View>
               


            </>

           ))}
           </ScrollView>
    </View>
    )
}

export default Downloads

