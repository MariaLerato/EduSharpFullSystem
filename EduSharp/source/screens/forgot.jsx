import React, { useState, useEffect } from "react";
import {Text,  Pressable,
    TouchableOpacity,
    Image,
    ScrollView, Dimensions,
    View, StyleSheet,Alert, ToastAndroid, ActivityIndicator} from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from "../constants";

import { useAuth } from "../BackendFirebase/configue/UserAuthContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db, auth } from "../BackendFirebase/configue/Firebase";

import { Button } from "react-native-elements/dist/buttons/Button";


const Forgot =({navigation})=>{

const [email, setEmail] = useState();
    // const {resetPassword}=useAuth()
    // const [email,setEmail]=useState();
    // const reset =async()=>{
    //     try{
    //         await resetPassword(email)
    //         setEmail('')
    //     }catch(error){
    //         Alert.alert(error.message)
    //     }
    // }

    const sendPasswordReset = () => {
        auth.sendPasswordResetEmail(email)
        .then(function() {
            console.log("email sent")
            navigation.navigate('SignInScreen')
        })
        .catch(function(error) {
            console.log(error)
        });
        Alert.alert("A Link has been sent to your email for a reset.")
    };

    return(
        <>
<View style={{flex:1, backgroundColor:'#ffffff'}}>
{/* <ImageBackground source={require('./images/background1.png')}
style={{height:Dimensions.get('window').height / 2.5}}>
</ImageBackground> */}

{/*Bottom View*/}
<Icon name="arrow-back-ios" size={26}
             color={'black'} onPress={navigation.goBack}
            style={{paddingHorizontal:20, marginTop:20}}/>

<View style={styles.bottomView}>

    <Image source={require('../images/forgot.png')}
style={{height:190, width:240, }}>
</Image>



<View style={styles.innerBottom}>
<Text style= {{fontWeight:'bold', color: COLORS.primary, fontSize:26 }}>
Forgot Your Password?
</Text>

<Text style={{marginTop:20, color:'black', fontWeight:'bold', fontSize:16}}>
Enter Your Email Address And We Will Email You A Link To Reset Your Password</Text>


<View>
      <TextInput
        style={{height: 50, width: '100%', paddingHorizontal:20, marginTop:20}}
        left={<TextInput.Icon name="account" type="material-community" /> } 

        value={email}
        onChangeText={(e)=>(setEmail(e))}
        placeholder={'Email'}
      />

<Button
          title="Continue"
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
          onPress={sendPasswordReset}
        />

       



    </View>
</View>
</View>

</View>
</>
    )
}

export default Forgot

const {width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },

  
    innerBottom: {
        paddingHorizontal:20,
        
    },


    bottomView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
          backgroundColor:'#fff',
          marginBottom:200
  
  },

  input:{
      borderColor: '#0b1674',
      borderWidth: 3,
      width:width / 1.3,
      padding: 10,
      
    
    },

    inputContainer:{
        top:20
  
    },

    textdes:{
        fontWeight:'bold',
    paddingBottom:10,
        color:'#0b1674',
        top:40,
 },

 
 button:{
    width:width / 1.3,
    height:height / 18.3,

    borderRadius:10,
    alignItems:'center',
    backgroundColor: '#fff',
    borderWidth:3,
    borderColor:'#0b1674',
    top:90,
    left:10,
},

 buttonText: {
    fontSize: 20,
    color: '#ff6e1a',
    fontWeight: 'bold',
    top:4,
 },

})