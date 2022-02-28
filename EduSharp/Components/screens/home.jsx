import React from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, useWindowDimensions, Image } from 'react-native'
import { COLORS,FONTS,icons,img, SIZES } from '../../constants';

const HomeScreen = ({ navigation }) => {

  return (
    <>
      <View
        style={Styles.container}>
          <TouchableOpacity style={Styles.about} onPress={()=>navigation.navigate('about')}>
            <Text style={Styles.abouttext}>!</Text>
            </TouchableOpacity>
          <View style={Styles.semiContainer}>
            <Text style={Styles.WelcomeText}>
              Welcome
            </Text>
         
          <View style={Styles.ImageView}>
            <Image source={img.welcome} style={Styles.Image}></Image>
          </View>
          <View style={Styles.ButtonsView}>
            <TouchableOpacity  onPress={() => navigation.navigate('SignInScreen')} style={Styles.Buttons}><Text style={Styles.ButtonText}>Sign In </Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('register')} style={Styles.Button2}><Text style={Styles.ButtonText}>Sign Up </Text></TouchableOpacity>
          </View>
        </View>
      </View>
      <View>

      </View>
    </>
  )
  const layout = useWindowDimensions()
}

const Styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    margin: 20,
    borderWidth: 1,
    flex:1,
    margin: 8,
    borderColor: 'transparent',
    marginTop:30,
    backgroundColor:COLORS.AppBackgroundColor
  },
  about:{
    width:51,
    height:55,
    backgroundColor:COLORS.White,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'flex-end'
  },
  abouttext:{
    fontWeight:'700'
  },
  semiContainer:{
    margin: 30 
  },
  WelcomeText:{
    fontWeight: '600',
    fontSize: SIZES.largeTitle,
    color: '#3b3c3d',
    alignSelf: 'center',
   ...FONTS.h1
  },
  ImageView:{
    justifyContent:'center', 
    width: '100%',
    alignItems:'center'
  },
  Image:{
    width: 280,
     height: 320, 
    
  },
  ButtonsView:{
    alignItems:'center',
    justifyContent:'center'
  },
  Buttons:{
    borderRadius: 30,
     backgroundColor: COLORS.primary,
     alignItems:'center',
     justifyContent:'center',
       width: '100%',
     height: '20%'
  },
  ButtonText:{
    color: COLORS.White,
     alignSelf: 'center',
    fontSize: 24
  },
  Button2:{
    borderRadius: 30,
     backgroundColor: COLORS.secondary,
     alignItems:'center',
     justifyContent:'center',
      width: '100%',
      height: '20%',
     marginTop:'3%'
  }


})
export default HomeScreen;
