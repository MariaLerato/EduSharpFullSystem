import React,{Component, useEffect} from 'react';
import {Text, StyleSheet,View,ImageBackground, Image,useWindowDimensions} from 'react-native';
import { icons } from '../constants/Icons';
import appTheme from '../constants/theme';
import img from '../constants/img';
import styles from '../style/splashscreen';
//import { COLORS } from './../../constants/theme';


const Splash = ({navigation}) => {
       
        const layout=useWindowDimensions()
        useEffect(() => {
            setTimeout(() =>{
                navigation.navigate('home')
            }, 3000);
    }, [])

    return (
        
        
        <View style={styles.home}>
            <Image source={img.logo} resizeMode='contain' style={{
                width:'100%',height:'20%'
            }}/>
            <View style={styles.TextContainer}>
                <Text style={styles.eduText}>Edu</Text>
            <Text style={styles.last}>Sharp</Text></View>
            <Text style={styles.subtitle}>where education lives</Text>
                        
          {/* <Progress.Bar progress={0.3} width={200} animationType={'timing'} style={styles.progress}/> */}
        
        </View>
    )
};


export default Splash;
