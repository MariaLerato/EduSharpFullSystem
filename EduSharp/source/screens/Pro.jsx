import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions, ScrollView,
  ImageBackground,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Checkbox, Snackbar, TextInput } from "react-native-paper";
import { Icon, Input, Avatar, Button } from "react-native-elements";
import Styles from "../style/signinScreen";
import { COLORS, SIZES, FONTS } from "../constants";
import { db, auth, firestore } from "../BackendFirebase/configue/Firebase";
import firebase from "firebase";

import ProfileHome from "../components/ProfileHome";
import EditProfile from "../components/EditProfile";
import EducProfile from "../components/EducProfile";
// import { Button } from "react-native-elements/dist/buttons/Button";

// import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { log } from "react-native-reanimated";
// import * as ImagePicker from "expo-image-picker";


const imagesize = 100
const imageradius = imagesize / 2;
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
const row1Height = height * 0.3;

const row2Height = height * 0.7;
const Stack = createNativeStackNavigator();

const Pro = ({ navigation }) => {
  const [name, setName] = useState();
  const [grade, setGrade] = useState([]);
  const [email, setemail] = useState({});
  const [url, seturl] = useState();
  const db = firebase.firestore();

  const [stream, setStream] = useState('');
  const [schoolName, setschoolName] = useState("");
  const [subject, setSubject] = useState("");
  const [role, setRole] = useState('')
  const userId = auth.currentUser.uid;
  const [profileuri, setprofileuri] = useState('');


  const GetAcademicData = async () => {
    await firestore.collection('education').doc(`${auth.currentUser.uid}`).collection('subject').get().then((res) => {
      console.log(res, "======");

    }).catch((err) => {
      console.log(err);
      setloading(false);
    })

    await firestore.collection('education').doc(`${auth.currentUser.uid}`).get().then((res) => {
      console.log(res.data(), "======");
      setGrade(res.data().grade ? res.data().grade : null)
      setStream(res.data().stream ? res.data().stream : null)
      setschoolName(res.data().schoolName ? res.data().schoolName : null)
      setRole(res.data().role ? res.data().role : null)
    }).catch((err) => {
      console.log(err);
      setloading(false);
    })

  }

  const getProfile = async () => {
    await firestore.collection("users").doc(auth.currentUser.uid).get().then(async (documentSnapshot) => {
      setName(documentSnapshot.data().name);
      documentSnapshot.data().uri ? setprofileuri(documentSnapshot.data().uri) : setprofileuri("https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")
      documentSnapshot.data().location ? setLocation(documentSnapshot.data().location) : setLocation("Not updatet Yet!")
      documentSnapshot.data().phonenumber ? setPhone(documentSnapshot.data().phonenumber) : setPhone("Not Updated Yet!")
    }).
      catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      })
  }

  useEffect(() => {
    GetAcademicData();
    getProfile();
  }, [])


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

      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.row1}></ImageBackground>
      <View style={[styles.row2, { backgroundColor: COLORS.AppBackgroundColor }]}>
        <View style={styles.imgContainer}>
          <Image source={{ uri: profileuri }} style={{ height: 65, width: 65, borderRadius: 45 }} />
        </View>

        <Text
          style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
        > {name}
        </Text>
        <Text
          style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
        > {grade}-{role}
        </Text>

        
      </View>
      <View />

      <View style={{marginTop:65,padding:25, backgroundColor:COLORS.White, elevation:25, marginHorizontal:20, borderRadius:12}}>
      <Text
          style={{ fontSize: 20, fontWeight: "bold",}}
        > {schoolName}
        </Text>
        <Text
          style={{ fontSize: 20, fontWeight: "bold",  }}
        > {stream}
        </Text>

        <Text
          style={{ fontSize: 20, fontWeight: "bold",  }}
        > {name}
        </Text>
        <Text
          style={{ fontSize: 20, fontWeight: "bold",  }}
        > {grade}-{role}
        </Text>
      </View>

      <TouchableOpacity style={{ marginHorizontal: 15, marginTop: 20 }} onPressIn={() => { }} onPress={() => navigation.navigate('test')} >
        <View style={[styles.boxcontainer, { width: '100%' }]}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ justifyContent: "flex-start", flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="person" size={28} style={{ color: COLORS.secondary, }} />
              <Text style={styles.boxText}>Personal Information</Text>
            </View>
            <Icon name="arrow-forward-ios" size={20} style={{ color: '#4B7BE8', paddingLeft: 90 }} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => navigation.navigate('switch')} >
        <View style={[styles.boxcontainer, { width: '100%' }]}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ justifyContent: "flex-start", flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="book" size={28} style={{ color: COLORS.secondary, }} />
              <Text style={styles.boxText}>Educational Information</Text>
            </View>
            <View style={{ widht: 15 }}>
              <Icon name="arrow-forward-ios" size={20} style={{ color: '#4B7BE8', paddingLeft: 90 }} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ bottom: 20, width: '100%', justifyContent: 'center', position: 'absolute', alignContent: 'center', paddingHorizontal: 20 }}>

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
  )
};




const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  row1: {
    height: 140,
  },
  row2: {
    backgroundColor: "white",
    height: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: "center",
  },
  imgContainer: {
    width: 65,
    height: 65,
    marginTop: -35,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "white",
    overflow: 'hidden'

  },
  usernames: {
    alignItems: "center",
  },
  image: {
    width: '60%',
    height: '60%'
  },
  innerBottom: {
    paddingHorizontal: 15,
    top: 50,
  },

  bottomView: {
    backgroundColor: "#fff",
    bottom: 40,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
  elevated: {
    paddingHorizontal: 20,
    top: -120
  },
  boxcontainer: {
    height: 65,
    width: '100%',
    elevation: 15,
    justifyContent: 'space-between',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    flexDirection: "row",
    marginVertical: 10
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
    fontSize: 20,
  },
});

export default Pro;

