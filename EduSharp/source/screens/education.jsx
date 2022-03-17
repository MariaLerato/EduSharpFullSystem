import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar, TouchableOpacity,
  Dimensions,Modal,
  ImageBackground
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Checkbox, Snackbar, TextInput } from "react-native-paper";
import { Icon, Input, Avatar } from "react-native-elements";
import Styles from "../style/signinScreen";
import { TextInput } from "react-native-gesture-handler";

import { COLORS, SIZES, FONTS } from "../constants";
import { db,auth } from "../BackendFirebase/configue/Firebase";

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

const Education = ({navigation, route}) => {

  const [modalVisible, setVisible] = useState(false)

  const [name, setName] = useState(route.params.userName);
  const [email, setEmail] = useState(route.params.userEmail);
  const [phonenumber, setPhone] = useState(route.params.userPhonenumber);
  const [grade, setGrade] = useState(route.params.userGrade);
 const [url,seturl] = useState();
  //
 
  const userId = auth.currentUser.uid;
  


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
       
        </View>
       
        
     
     
      <View style={{flex: 1,
    marginBottom: 390,backgroundColor:'#fff'}}>
                <Text style={{color:"rgba(0,0,0,5)",fontSize:16,fontWeight:'bold', marginBottom:20, textAlign:'center', fontSize:20}}>Educational Info</Text>

<View style={{paddingHorizontal:20}}>
      {/* <TextInput
      style={{width: '100%', shadowColor:'white'}}
      left={<TextInput.Icon name="account" type="material-community" /> } 
      right={<TextInput.Icon name="pencil" />}
      value={name}
      onChangeText={text =>setName(text)}
    /> */}

<TextInput
            style={{
              height: 50,
              width: "90%",
              borderColor: "black",
              paddingHorizontal: 20,
              borderWidth: 2,
              borderRadius: 10,
              marginLeft: 15,
              color: "black",
              fontWeight: "bold",
            }}
            placeholder="Grade 8"

            value={grade}
            onChangeText={(text) => setGrade(text)}
          />
<View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20 }}>
{/* <Text style={{fontSize:16, color:'black'}}>Encrolled Subjects</Text> */}


{/* <TouchableOpacity onPress={() => setVisible(true)} style={{ position: 'absolute', marginHorizontal: 20, marginVertical: 20, width: 50, height: 50, bottom: 15, right: 15, borderRadius: 40, backgroundColor: '#4B7BE8', justifyContent: 'center', }}>
                    <Icon name={'plus'} type={'font-awesome'} size={25} color={COLORS.White} />
                </TouchableOpacity> */}
{/* <Text style={{fontSize:16, color:'blue'}}> + Add Subject */}

{/* <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            alert('Modal closed')
                            setVisible(!modalVisible)
                        }
                        }
                        presentationStyle={'overFullScreen'}
                    >
                        <View>
                           
                                <Text>Modeal</Text>

                                

                        </View>
                    </Modal> */}
</View>
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
                  // onPress={updateUser}
                />
      </View>
    
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"

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
export default Education;


