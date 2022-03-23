import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground, ScrollView,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { TextInput } from "react-native-gesture-handler";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Checkbox, Snackbar, TextInput } from "react-native-paper";
import { Icon, Input, Avatar } from "react-native-elements";
import Styles from "../style/signinScreen";
import { COLORS, SIZES, FONTS } from "../constants";
import { db, auth, firestore } from "../BackendFirebase/configue/Firebase";
import firebase from "firebase";
import { Button } from "react-native-elements/dist/buttons/Button";
import * as ImagePicker from 'expo-image-picker';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ProgressIndicator from './../components/progressIndicator';

const Test = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const userId = auth.currentUser.uid;
  const [loading, setloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileuri, setprofileuri] = useState('');

  const db = firebase.firestore();

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }

  const updateUser = () => {

    db.collection("users")
      .doc(userId)
      .update({
        name: name,
        email: email,
        phonenumber: phonenumber,
        location: location

      })

    //  .then((res) =>{
    //    alert('updated');

    //   }).catch((err) =>{
    //     alert(err)
    // history.push('/switch')
    // })  
  };

  const LocationArray = ["Home", "Profile", "Education"];
  const backgroundImg = {
    uri: "https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };
  const backgroundImg2 = {
    uri: "https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };

  const profilimg = {
    uri: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };

  const getProfile = async () => {
    await firestore.collection("users").doc(auth.currentUser.uid).get().then(async (documentSnapshot) => {
      setName(documentSnapshot.data().name);
      setEmail(documentSnapshot.data().email);
      documentSnapshot.data().uri ? setprofileuri(documentSnapshot.data().uri) : setprofileuri("https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")
      documentSnapshot.data().location ? setLocation(documentSnapshot.data().location) : setLocation("Not updatet Yet!")
      documentSnapshot.data().phonenumber ? setPhone(documentSnapshot.data().phonenumber) : setPhone("Not Updated Yet!")
      documentSnapshot.data().uri ? setprofileuri(documentSnapshot.data().uri) : setprofileuri("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fuser-icon-male-person-symbol-profile-avatar-vector-20787324&psig=AOvVaw126jAt4NuwlphPtyj8tg8p&ust=1648032876955000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPDux4rH2fYCFQAAAAAdAAAAABAD")
    }).
      catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      })
  }

  const GetAcademicData = async () => {
    await firestore.collection('education').doc(`${auth.currentUser.uid}`).collection('subject').get().then((res) => {
      console.log(res, "======");

    }).catch((err) => {
      console.log(err);
      setloading(false);
    })

    await firestore.collection('education').doc(`${auth.currentUser.uid}`).get().then((res) => {
      console.log(res.data(), "======");
      setGrade(res.data().grade? res.data().grade: null)
      setStream(res.data().stream? res.data().stream: null)
      setschoolName(res.data().schoolName? res.data().schoolName: null)
      setRole(res.data().role? res.data().role: null)
    }).catch((err) => {
      console.log(err);
      setloading(false);
    })

  }
  useEffect(() => {
    getProfile();
  }, [])
  return (
    <View style={{height:'100%'}}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {loading ? <View style={{ height: 10 }}><ProgressIndicator /></View> : null}
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }} showsVerticalScrollIndicator={false}>
        <ImageBackground source={backgroundImg2}
          style={{ height: 190 }}>
        </ImageBackground>
        {/*Bottom View*/}

        <View style={styles.bottomView}>
          <View style={{ alignSelf: 'center', top: -100, position: 'absolute' }}>
            <Image source={{ uri: profileuri }}
              style={{ height: 85, width: 85, borderRadius: 60, top: 50, backgroundColor: COLORS.Danger }} />

            {/* <Image source={{ uri: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-600w-193292033.jpg'}}
                style={{height:120,width:120,borderRadius:60,}}/> */}
            <TouchableOpacity style={{ backgroundColor: COLORS.White, borderRadius: 15, padding: 5, marginLeft: 60, marginTop: 20, elevation: 15 }}
              mode="contained" onPress={() => navigation.navigate("camera")}>
              <FontAwesome name='camera' size={18} color='black' />
            </TouchableOpacity>
          </View>

          <View style={styles.innerBottom}>
            <Text style={{ color: "rgba(0,0,0,5)", fontSize: 16, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', fontSize: 20 }}>Personal Info</Text>

            <View style={{ height: '100%' }}>
              <TextInput
                style={{ width: '100%', height: 50 }}
                left={<TextInput.Icon name="account" type="material-community" />}
                value={name}
                onChangeText={text => setName(text)}
              />

              <TextInput style={{ marginTop: 20, width: '100%', height: 50 }}

                left={<TextInput.Icon name="email" />}
                value={email}
                onChangeText={(text) => setEmail(text)}

              />

              <TextInput style={{ marginTop: 20, width: '100%', height: 50 }}

                left={<TextInput.Icon name="phone" />}
                value={phonenumber}
                onChangeText={(text) => setPhone(text)}

              />

              <TextInput style={{ marginTop: 20, width: '100%', height: 50 }}

                left={<TextInput.Icon name="map" />}
                value={location}
                onChangeText={(text) => setLocation(text)}

              />
              <Button
                title="Update"
                containerStyle={{
                  marginTop: 20,
                  borderRadius: 10,
                }}
                buttonStyle={{
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: COLORS.primary,
                }}
                titleStyle={{
                  color: COLORS.White,
                }}
                onPress={() => { updateUser() }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )

}

export default Test


const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerBottom: {
    paddingHorizontal: 20,
    marginTop: 40,
  },

  bottomView: {
    backgroundColor: '#fff',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    bottom:40
  },

  input: {
    borderColor: '#0b1674',
    borderWidth: 3,
    width: width / 1.3,
    padding: 10,

  },
  spinnerTextStyle: {
    color: 'red',
  },
  inputContainer: {
    top: 20

  },

  textdes: {
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#0b1674',
  },


  button: {
    width: width / 1.3,
    height: height / 18.3,

    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#0b1674',
    top: 50,
    left: 40,
  },

  buttonText: {
    fontSize: 20,
    color: '#ff6e1a',
    fontWeight: 'bold',
    top: 8,
    left: 160,
  },

  buttonb: {
    width: width / 1.3,
    height: height / 18.3,

    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#fff',
    top: 50,
    left: 40,
  },

  buttonTextb: {
    fontSize: 15,
    color: '#ff6e1a',
    fontWeight: 'bold',
    top: 8,
    left: 10,
  },

  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 20,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    borderWidth: 3,
    width: width / 1.2,
    height: height / 18.2,
    borderRadius: 30
  },

})