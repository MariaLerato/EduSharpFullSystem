import React, { useState, useEffect } from "react";
import {Text, View, FlatList, Image, TouchableOpacity, Linking, StyleSheet, ScrollView} from 'react-native';
import { Icon, Input, Avatar, Button } from "react-native-elements";

import firebase from "firebase";

const Videos=()=>{

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
            <Text style={{fontSize:18, fontWeight:'bold'}}>My Videos</Text>
             
           {materials.map((element) =>(
               <>
               <View style={{height: 230,
        width: 210,
        backgroundColor: 'white',
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop:20}}>
            <TouchableOpacity onPress={() => {Linking.openURL(element.downloadUrl)}} >
               <Avatar size={50} source={{uri: element.downloadUrl}} style={{height: 190,
        width: 210}}></Avatar>
               </TouchableOpacity>
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

export default Videos

