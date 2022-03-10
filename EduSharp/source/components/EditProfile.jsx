import { StyleSheet, Text, View } from 'react-native';
import React,{useState} from 'react';
import CustomTextInput from './CustomTextInput';
import { Button } from 'react-native-elements';

const EditProfile = () => {
    const[email,setEmail]=useState()
    const[location,setLocation]=useState()
    const[password,setpassword]=useState()
    const[newPassword,setnewPassword]=useState()
    const[username,setusername]=useState()

    const handleUpdate=()=>{
        const update={email,location,password,username}

    }
  return (
    <View style={{flex:1,width:'100%',paddingHorizontal:20,marginTop:15}}>
      <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>Profile</Text>
      <CustomTextInput placeholder="Username" iconleftname="user" value={username} setter={setusername}/>
      <CustomTextInput placeholder="Email" iconleftname="at" value={email} setter={setEmail}/>
      <CustomTextInput placeholder="Phone Number" iconleftname="mobile" value={email} setter={setEmail}/>
      <CustomTextInput placeholder="Location" iconleftname="map-marker" value={location} setter={setLocation}/>
      <CustomTextInput placeholder="Current Password" iconleftname="lock" value={password} setter={setpassword}/>   
      <CustomTextInput placeholder="New Password" iconleftname="lock" value={newPassword} setter={setnewPassword}/>   
      <Button title={"Update"} onPress={()=>handleUpdate()}/>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
