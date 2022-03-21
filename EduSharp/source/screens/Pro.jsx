import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions, ScrollView,
  ImageBackground
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Checkbox, Snackbar, TextInput } from "react-native-paper";
import { Icon, Input, Avatar, Button } from "react-native-elements";
import Styles from "../style/signinScreen";
import { COLORS, SIZES, FONTS } from "../constants";
import { db,auth } from "../BackendFirebase/configue/Firebase";
import firebase from "firebase";

import ProfileHome from "../components/ProfileHome";
import EditProfile from "../components/EditProfile";
import EducProfile from "../components/EducProfile";
// import { Button } from "react-native-elements/dist/buttons/Button";

// import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import * as ImagePicker from "expo-image-picker";


const imagesize=100
const imageradius=imagesize/2;
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
const row1Height = height * 0.3;

const row2Height = height * 0.7;
const Stack = createNativeStackNavigator();

const Pro = ({navigation}) => {
  const [name, setName] = useState({});
  const [grade, setGrade] = useState([]);
  const [email, setemail] = useState({});
 const [url,seturl] = useState();
 const db = firebase.firestore();

 
  const userId = auth.currentUser.uid;
 

  useEffect(()=>{
    let item = [];
    db.collection('users').doc(userId).get().then((res)=>{setName({...res.data(), id: res.id })} )
  
  },[])



  // useEffect(()=>{
  //   let item = [];
  //   db.collection('books').doc(userId).get().then((res)=>{setGrade({...res.data(), id: res.id })} )
  
  // },[])
  // console.log(grade,'testinggrade')

  const getPost = async () => {
    await db.collection("education").get().then(async (querySnapshot) => {
        console.log('Total users: ', querySnapshot.grade);
        const data = [];
        await querySnapshot.forEach(async (documentSnapshot) => {

            console.log('====================================');
            console.log(documentSnapshot.data().userId);
            console.log('====================================');

            // await firestore.collection("users").doc(documentSnapshot.data().userID).get().then(async (res) => {


            //   await firestore.collection("likes").where('postKey', '==', documentSnapshot.id).get().then(async (reslikes) => {

            //       await firestore.collection("comments").where('postKey', '==', documentSnapshot.id).get().then(async (rescomments) => {

            //           console.log(reslikes.size, rescomments.size, "==>>==>");
                      let dataset = {
            //               key: documentSnapshot.id,
            //               likes: reslikes.size,
            //               comments: rescomments.size,
            //               createdAt: documentSnapshot.data().createdAt,
            //               description: documentSnapshot.data().description,
            //               grade: documentSnapshot.data().grade,
            //               downloadUrl: documentSnapshot.data().downloadUrl,
                          grade: documentSnapshot.data().grade,
                          subject: documentSnapshot.data().subject,
            //               topic: documentSnapshot.data().topic,
            //               userID: documentSnapshot.data().userID,
            //               email: res.data().email,
            //               location: res.data().location,
            //               name: res.data().name,
            //               image: res.data().profileUrl ? res.data().profileUrl : null,
            //               phonenumber: res.data().phonenumber,
                      }
                      data.push(dataset);
                  // })

              // })
              // if (userId){
              //   const item = data.filter(function(e){
              //     const item2 = e.userId ? e.userId:""
              //     return item2.indexOf(userId)>-1
              //   })
              //   setGrade(item);


              // }

              setGrade(data);

          });

          console.log(userId,'stringgggggggggg==========');



      }).catch(err => {
          console.log('====================================');
          console.log(err, "==>>==>");
          console.log('====================================');
      });
  // })
}



  useEffect(()=>{

    getPost()
//     let item = [];
// db.collection('education')
// .get()
// .then((res)=>{res.foreach(action=> item.push({...action.data, id: action.id})
// )})
// setGrade(item);
  },[])


// console.log(grade,'Testing')


const userName = name.name
const userPhonenumber = name.phonenumber
const userLocation = name.location
 const userEmail = name.email
const userGrade = name.grade
const userSubject = name.subject

  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }


    setSelectedImage({ localUri: pickerResult.uri });
  };

  const Logout = () => {
    auth.signOut();
    navigation.navigate("SignInScreen");
alert('Succesfully Logged Out')
  };

  const backgroundImg = {
    uri: "https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };
  const backgroundImg2 = {
    uri: "https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };

  const profilimg = { uri: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }
  return (

    <View style={styles.container}>

     
    {/* <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.row1}></ImageBackground> */}
    <View style={styles.row2}>
      <View style={styles.imgContainer}>
          {/* <Avatar      source={profilimg}  style={styles.image} rounded/>
          <Button   icon={{ name: "camera", type: "font-awesome", size: 15, color: "black" }} containerStyle={{position:'absolute',bottom:-10,right:0}}/> */}

            {/* <Button   icon={{ name: "camera", type: "font-awesome", size: 15, color: "black" }} containerStyle={{position:'absolute',bottom:-10,right:0}}/> */}
        </View>

        <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              {userName}

            </Text>

            {grade.map(element=>
  <Text style={{ fontSize: 16, textAlign: "center" }}>
  {" "}
  Grade({element.grade})
</Text>
  )}
           

            {grade.map(element=>

    userId==element.userId?(
      <Text style={{ fontSize: 16, textAlign: "center" }}>
      Grade({element.grade})
    </Text>
    ):(<></>)
 
  )}
            
            <TouchableOpacity onPress={()=>navigation.navigate('test', {userName:userName, userLocation:userLocation, userEmail:userEmail, userPhonenumber:userPhonenumber})} >

           <View style={styles.boxcontainer}>

              <Icon name="person" size={22} style={{ color: COLORS.secondary, marginTop: 14, }} />

              <Text style={styles.boxText}>Personal Information</Text>

              <Icon name="arrow-forward-ios" size={20} style={{ color: '#4B7BE8', marginTop: 14, paddingLeft: 90 }} />
            </View> 

            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('switch', {userSubject:userSubject, userGrade:userGrade})} >

            <View style={styles.boxcontainer}>
              <Icon name="book" size={22} style={{ color: COLORS.secondary, marginTop: 14, }} />




                <Text style={styles.boxText}>Educational Information</Text>
                <Icon name="arrow-forward-ios" size={20} style={{ color: '#4B7BE8', marginTop: 14, paddingLeft: 70 }} />

              </View> 
              </TouchableOpacity>

              
              
              <View style={{bottom:20,position:'absolute', alignContent:'center', paddingHorizontal:20}}>
             
              <TouchableOpacity onPress={Logout} >

              <Icon
                name="logout"
                size={25}
                color="red"
              />

              </TouchableOpacity>
            {/* </View>  */}
             
      
  


          </View>
        </View>

        

       
      
     
     <View/>

    </View>
      )
};



      
const styles = StyleSheet.create({
  container: {
  flex: 1
},
row1: {
  height: row1Height,
},
row2: {
  backgroundColor: "white",
  height:20,
flex: 1,
borderTopRightRadius: 30,
borderTopLeftRadius: 30,
alignItems: "center",
},
imgContainer: {
  width: imagesize,
height: imagesize,
marginTop: -50,
borderRadius: imageradius,
borderWidth: 2,
borderColor: "white",
overflow: 'hidden'

},
usernames: {
  alignItems: "center",
},
image: {
  width: '100%',
height: '100%'
},
innerBottom: {
  paddingHorizontal: 15,
top: 50,
},

bottomView: {
  flex: 1.5,
backgroundColor: "#fff",
bottom: 40,
borderTopStartRadius: 40,
borderTopEndRadius: 40,
},
elevated: {
  paddingHorizontal: 20,
  top:-120
},
boxcontainer: {
  width: width / 1.1,
height: height / 12.3,
elevation: 15,
borderRadius: 10,
backgroundColor: "#fff",
marginTop: 20,
paddingHorizontal: 20,
flexDirection: "row",
},
logOut: {
  paddingTop: 130,
},
containerStyle: {
  width: 300,
marginVertical: 10,
borderColor: "gray",
elevation: 12,
},
buttonStyle: {
  backgroundColor: "white",
borderColor: "transparent",
borderWidth: 0,
borderRadius: 10,
borderWidth: 1,
borderColor: "rgba(0,0,0,.2)",
},

boxText: {
  fontSize: 16,
marginTop: 15,
},
});

  export default Pro;
  
