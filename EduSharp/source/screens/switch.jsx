import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,ScrollView,
  TouchableOpacity,Modal, Picker
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

const Switch = ({ navigation, route }) => {
    const [name, setName] = useState(route.params.userName);
    const [email, setEmail] = useState(route.params.userEmail);
    const [phonenumber, setPhone] = useState(route.params.userPhonenumber);
    const [location, setLocation] = useState(route.params.userLocation);
  const [subject, setSubject] = useState('');
  
  const userId = auth.currentUser.uid;
    
  const [isLoading, setisLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setVisible] = useState(false)
    const [selectedSubject, setselectedSubject] = useState('Mathematics');
    const [selectedValue, setSelectedValue] = useState("java");

   
    const [grade, setGrade] = useState("");
   const [url,seturl] = useState();
    const db = firebase.firestore();
    
    useEffect(()=>{
      let item = [];
      db.collection('education').doc(userId).get().then((res)=>{setName({...res.data(), id: res.id })} )
    
    },[])
  
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

  
  
   
    const addGrade = () => {


      db.collection('education').add({
          grade:grade,
          subject:subject,
         userId:userId
      }).then((res) =>{
          alert("Success")
          // history.push('/switch')


      }).catch((err) =>{
          alert(err)
          // history.push('/switch')
      })

  }
  
   
  
    
  
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

<View style={{flex:1}} >
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
<ScrollView style={{top:80,}}>
<Text style={{color:"rgba(0,0,0,5)",fontSize:16,fontWeight:'bold', marginBottom:20, textAlign:'center', fontSize:20}}>Educational Info</Text>


<View style={{paddingHorizontal:20 }}>
<TextInput
      style={{width: '100%', height:50}}
      left={<TextInput.Icon name="account" type="material-community" /> } 
      value={grade}
      onChangeText={text=>setGrade(text)}
    />

<TextInput
      style={{width: '100%', height:50, marginTop:20}}
      left={<TextInput.Icon name="account" type="material-community" /> } 
      value={subject}
      onChangeText={text=>setSubject(text)}
    />
<View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
{/* <Text style={{fontSize:16, color:'black'}}>Encrolled Subjects</Text> */}


{/* <TouchableOpacity onPress={() => setVisible(true)} style={{ position: 'absolute', marginHorizontal: 20, marginVertical: 20, width: 50, height: 50, bottom: 15, right: 15, borderRadius: 40, backgroundColor: '#4B7BE8', justifyContent: 'center', }}>
                    <Icon name={'plus'} type={'font-awesome'} size={25} color={COLORS.White} />
                </TouchableOpacity> */}

{/* <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150, color:'blue' }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      > 
        <Picker.Item label="java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}

<View>


</View>

</View>
{/* <TextInput
      style={{width: '100%', height:50, marginTop:20}}
      left={<TextInput.Icon name="account" type="material-community" /> } 
      right={<TextInput.Icon name="pencil" />}
      value={name}
      onChangeText={text=>setName(text)}
    /> */}
  <Button
          title="Add"
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
          onPress={addGrade}
        />
 </View>
 </ScrollView>
 </View>
 </View>
    )

}

export default Switch


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
        backgroundColor:'red'
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