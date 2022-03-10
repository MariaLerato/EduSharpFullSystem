import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, useWindowDimensions, Image } from 'react-native'
import { COLORS,FONTS,icons,img, SIZES } from '../constants';
import Styles from "../style/onBoarding";

const WelcomeScreen = ({ navigation }) => {

  return (
    <>
      <View
        style={Styles.container}>
        <TouchableOpacity style={Styles.about} onPress={() => navigation.navigate('about')}>
          <Text style={Styles.abouttext}>!</Text>
        </TouchableOpacity>

        <View style={Styles.semiContainer}>
          <Text style={Styles.WelcomeText}>
            Welcome
          </Text>
          <View style={Styles.ImageView}>
            <Image source={img.welcome} style={Styles.Image}></Image>
          </View>
          <View >
            <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')} style={[Styles.Buttons]}><Text style={Styles.ButtonText}>Sign In </Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('register')} style={[Styles.Buttons,{backgroundColor:COLORS.AppSecondary}]}><Text style={Styles.ButtonText}>Sign Up </Text></TouchableOpacity>
            </View>
        </View>
      </View>
      <View>

      </View>
    </>
  )
}


export default WelcomeScreen;
