import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Checkbox, Snackbar, TextInput } from "react-native-paper";
import { Icon, Input, Avatar } from "react-native-elements";
import Styles from "../style/signinScreen";
import { COLORS, SIZES, FONTS } from "../constants";
import { db,auth } from "../BackendFirebase/configue/Firebase";
import firebase from "firebase";

import ProfileHome from "../components/ProfileHome";
import EditProfile from "../components/EditProfile";
import EducProfile from "../components/EducProfile";
import { Button } from "react-native-elements/dist/buttons/Button";
const imagesize=100
const imageradius=imagesize/2
const height = Dimensions.get("screen").height;
const row1Height = height * 0.3;
const row2Height = height * 0.7;
const Stack = createNativeStackNavigator();

const Pro = ({navigation}) => {
  const [name, setName] = useState({});
  
  const [email, setemail] = useState({});
 const [url,seturl] = useState();
 const db = firebase.firestore();

 
  const userId = auth.currentUser.uid;
  const updateUser = () => {
      db.ref('/users/' + userId).update({
          name: name,
          email: email,

      });
  };

  useEffect(()=>{
    let item = [];
    db.collection('users').doc(userId).get().then((res)=>{setName({...res.data(), id: res.id })} )
    console.log(name,'thap')
  
  },[])

const userName = name.name
const userPhonenumber = name.phonenumber
const userLocation = name.location
 const userEmail = name.email

  const LocationArray = ["Home", "Profile", "Education"];
  const [location, setLocation] = useState("Education");
  const backgroundImg = {
    uri: "https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };
  const backgroundImg2 = {
    uri: "https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };

  const profilimg={uri:'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.row1}></ImageBackground>
      <View style={styles.row2}>
        <View style={styles.imgContainer}>
            <Avatar      source={profilimg}  style={styles.image} rounded/>
            <Button   icon={{ name: "camera", type: "font-awesome", size: 15, color: "black" }} containerStyle={{position:'absolute',bottom:-10,right:0}}/>
        </View>
        <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
            {userName} 
            </Text>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              {" "}
              Learner: Grade(0)
            </Text>
        </View>
       <View style={styles.elevated}>
        <TouchableOpacity onPress={()=>navigation.navigate('profile', {userName:userName, userLocation:userLocation, userEmail:userEmail, userPhonenumber:userPhonenumber})} >
            <View style={styles.boxcontainer}>
            <Icon name="person" size={22} style={{ color: COLORS.secondary, marginTop: 14,  }} />

              <Text style={styles.boxText}>Personal Information</Text>
              <Icon name="arrow-forward-ios" size={20} style={{ color: COLORS.gray, marginTop: 14, paddingLeft: 90 }} />

            </View>

            </TouchableOpacity>


            <TouchableOpacity onPress={()=>navigation.navigate('education')} >
            <View style={styles.boxcontainer}>
            <Icon name="book" size={22} style={{ color: COLORS.secondary, marginTop: 14,  }} />

              <Text style={styles.boxText}>Educational Information</Text>
              <Icon name="arrow-forward-ios" size={20} style={{ color: COLORS.gray, marginTop: 14, paddingLeft: 70 }} />

            </View>

            </TouchableOpacity>

           
              </View>
              <View style={{bottom:20, position:'absolute', alignContent:'center', paddingHorizontal:20}}>
              <Icon
                name="logout"
                size={25}
                color="red"
                onPress={navigation.goBack}
              />
            </View>
             
      
    </View>
  );
};
const { width} = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  row1: {
    height: row1Height,
  },
  row2: {
    backgroundColor: "white",
    flex: 1,
    marginTop: -80,
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
    overflow:'hidden'
    
  },
  usernames: {
    alignItems: "center",
  },
  image:{
      width:'100%',
      height:'100%'
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
  elevated:{
paddingHorizontal:20,
top:-280
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

{
  /* <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HotelsView" component={HotelsView} /> 
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator> */
}


