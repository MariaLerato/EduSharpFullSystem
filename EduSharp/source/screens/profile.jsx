import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,TouchableOpacity
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Checkbox, Snackbar, TextInput } from "react-native-paper";
import { Icon, Input, Avatar } from "react-native-elements";
import Styles from "../style/signinScreen";
import { COLORS, SIZES, FONTS } from "../constants";
import { db,auth } from "../BackendFirebase/configue/Firebase";
import firebase from "firebase";
import { Button } from "react-native-elements/dist/buttons/Button";
const imagesize=100
const imageradius=imagesize/2
const height = Dimensions.get("screen").height;
const row1Height = height * 0.3;
const row2Height = height * 0.7;
const Stack = createNativeStackNavigator();

const Profile = ({navigation, route}) => {
  const [name, setName] = useState(route.params.userName);
  const [email, setEmail] = useState(route.params.userEmail);
  const [phone, setPhone] = useState(route.params.userPhone);
  const [location, setLocation] = useState(route.params.userLocation);
  const userId = auth.currentUser.uid;
  const db = firebase.firestore();

  const updateUser = ()=>{
    db.collection('users').doc(userId).update({name:name, email:email,location:location})
  }


// useEffect(()=>{
//   let item = [];
//   db.collection('users').doc(userId).get().then((res)=>{setName({...res.data(), id: res.id })} )
//   console.log(name)

// },[])

//   const Update = () => {
//     firebase
//       .database()
//       .ref(`/users/${firebase.auth().currentUser.uid}`)
//       .update({
//         name: name,
//         Email: Email,
//       })
//       .then(() => {
//         Alert.alert("Update", "Your Profile was successfully Updated");
//         // setisLoading(false);
//       })
//       .catch((err) => {
//         // setisLoading(false);
//         SetErrMessage(err.message);
//         // setdisplayFormErr(true);
//       });
//   };

  function OnnameChange(value) {
    setName(value);
  }
 
  function OnEmailChange(value) {
    setEmail(value);
  }

  const Logout = () => {
    navigation.navigate("Login");
    firebase.auth().signOut();
  };

//   useEffect(() => {
//     db.ref('/users/' + userId).on('value', value => {
//         console.log(value, 'value')
//         setName(value?.val().name)
        
//         setemail(value.val().email)

//     })
// }, [])


  const LocationArray = ["Home", "Profile", "Education"];
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
       
        </View>
       
        
     
     
      <View style={{flex: 1,
    marginBottom: 390,backgroundColor:'#fff'}}>
                <Text style={{color:"rgba(0,0,0,5)",fontSize:16,fontWeight:'bold', marginBottom:20, textAlign:'center', fontSize:20}}>Profile</Text>

<View style={{paddingHorizontal:20}}>
      <TextInput
      style={{width: '100%'}}
      left={<TextInput.Icon name="account" type="material-community" /> } 
      right={<TextInput.Icon name="pencil" />}
      value={name}
      onChangeText={text=>setName(text)}
    />

<TextInput style={{marginTop:20, width: '100%'}}
      
      left={<TextInput.Icon name="email" />}
      right={<TextInput.Icon name="pencil" />}
      value={email}
      onChangeText={(text)=>setEmail(text)}

    />

{/* <TextInput style={{marginTop:20, width: '100%'}}
      
      left={<TextInput.Icon name="email" />}
      right={<TextInput.Icon name="pencil" />}
      value={phone}
      onChangeText={(text)=>setPhone(text)}

    /> */}

<TextInput style={{marginTop:20, width: '100%'}}
      
      left={<TextInput.Icon name="email" />}
      right={<TextInput.Icon name="pencil" />}
      value={location}
      onChangeText={(text)=>setLocation(text)}

    />


</View>

              <Button
                  title="Update"
                  containerStyle={{
                    marginTop: 30,
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
  );
};
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
  }
});
export default Profile;

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
