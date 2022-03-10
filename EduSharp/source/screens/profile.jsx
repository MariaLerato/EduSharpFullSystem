import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  ImageBackground
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Icon, Input,Avatar } from "react-native-elements";
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

const Profile = () => {
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
        <View style={styles.usernames}>
          <Text style={{color:"rgba(0,0,0,1)",fontSize:16,fontWeight:'bold'}}>username</Text>
          <Text style={{color:"rgba(0,0,0,.5)",fontStyle:'italic'}}>learner grade 11</Text>
        </View>
        {location === "Home" ? (
          <ProfileHome setLocation={setLocation} />
        ) : location === "Profile" ? (
          <EditProfile />
        ) : (
          <EducProfile />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
