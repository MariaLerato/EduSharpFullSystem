import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,ScrollView,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { TextInput } from "react-native-gesture-handler";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Checkbox, Snackbar, TextInput } from "react-native-paper";
import { Icon, Input, Avatar } from "react-native-elements";
import Styles from "../style/signinScreen";
import { COLORS, SIZES, FONTS } from "../constants";
import { db, auth } from "../BackendFirebase/configue/Firebase";
import firebase from "firebase";
import { Button } from "react-native-elements/dist/buttons/Button";
import * as ImagePicker from 'expo-image-picker';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Test = ({ navigation, route }) => {
    const [name, setName] = useState(route.params.userName);
    const [email, setEmail] = useState(route.params.userEmail);
    const [phonenumber, setPhone] = useState(route.params.userPhonenumber);
    const [location, setLocation] = useState(route.params.userLocation);
    const userId = auth.currentUser.uid;
    const [isLoading, setisLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
        return(

<ScrollView style={{flex:1, backgroundColor:'#ffffff'}} showsVerticalScrollIndicator={false}>
<ImageBackground source={backgroundImg2}
style={{height:Dimensions.get('window').height / 3.5}}>
</ImageBackground>


{/*Bottom View*/}

<View style={styles.bottomView}>
<View style={{ marginLeft: 120, top:-100, position:'absolute' }}>
                    {
                        selectedImage ? (<Image
                            source={{ uri: selectedImage.localUri }}
                            style={{ height: 120, width: 120, borderRadius: 60, }}
                        />
                        ) : (
                            <Image source={profilimg}
                                style={{ height: 120, width: 120, borderRadius: 60, top: 30 }} />
                        )
                    }
                    {/* <Image source={{ uri: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-600w-193292033.jpg'}}
                style={{height:120,width:120,borderRadius:60,}}/> */}
                    <TouchableOpacity style={{ marginLeft: 90, marginTop: -20 }}
                        mode="contained" onPress={openImagePickerAsync}>
                        <FontAwesome name='camera' size={29} color='grey' />
                    </TouchableOpacity>
                </View>
<View style={styles.innerBottom}>
<Text style={{color:"rgba(0,0,0,5)",fontSize:16,fontWeight:'bold', marginBottom:20, textAlign:'center', fontSize:20}}>Personal Info</Text>


<View style={{flex:1 }}>
<TextInput
      style={{width: '100%', height:50}}
      left={<TextInput.Icon name="account" type="material-community" /> } 
      right={<TextInput.Icon name="pencil" />}
      value={name}
      onChangeText={text=>setName(text)}
    />

<TextInput style={{marginTop:20, width: '100%', height:50}}
      
      left={<TextInput.Icon name="email" />}
      right={<TextInput.Icon name="pencil" />}
      value={email}
      onChangeText={(text)=>setEmail(text)}

    /> 

           <TextInput style={{marginTop:20, width: '100%', height:50}}
      
      left={<TextInput.Icon name="phone" />}
      right={<TextInput.Icon name="pencil" />}
      value={phonenumber}
      onChangeText={(text)=>setPhone(text)}

    /> 

         <TextInput style={{marginTop:20, width: '100%', height:50}}
      
      left={<TextInput.Icon name="map" />}
      right={<TextInput.Icon name="pencil" />}
      value={location}
      onChangeText={(text)=>setLocation(text)}

    />
  <Button
          title="Update"
          containerStyle={{
            marginTop: 20,
            borderRadius: 20,
          }}
          buttonStyle={{
            borderRadius: 5,
            marginHorizontal: 20,
            backgroundColor: COLORS.primary,
          }}
          titleStyle={{
            color: COLORS.White,
          }}
          onPress={updateUser()}
        />
 </View>
 </View>
 </View>
 </ScrollView>
    )

}

export default Test


const {width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    innerBottom: {
        paddingHorizontal:20,
        top:60,
    },

    bottomView:{
  flex:1.5,
  backgroundColor:'#fff',
  bottom:50,
  borderTopStartRadius: 40,
  borderTopEndRadius: 40,

  },

  input:{
      borderColor: '#0b1674',
      borderWidth: 3,
      width:width / 1.3,
      padding: 10,
    
    },
    spinnerTextStyle: {
        color: 'red',
      },
    inputContainer:{
        top:20
  
    },

    textdes:{
        fontWeight:'bold',
    paddingBottom:10,
        color:'#0b1674',
 },

 
 button:{
    width:width / 1.3,
    height:height / 18.3,

    borderRadius:10,
    alignItems:'center',
    backgroundColor: '#fff',
    borderWidth:3,
    borderColor:'#0b1674',
    top:50,
    left:40,
},

 buttonText: {
    fontSize: 20,
    color: '#ff6e1a',
    fontWeight: 'bold',
top:8,
left:160,
 },

 buttonb:{
    width:width / 1.3,
    height:height / 18.3,

    borderRadius:10,
    alignItems:'center',
    backgroundColor: '#fff',
    borderWidth:3,
    borderColor:'#fff',
    top:50,
    left:40,
},

 buttonTextb: {
    fontSize: 15,
    color: '#ff6e1a',
    fontWeight: 'bold',
top:8,
left:10,
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
      width:width / 1.2,
      height:height / 18.2,
      borderRadius:30
},

})