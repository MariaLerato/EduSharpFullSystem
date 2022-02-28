import React,{Component, useEffect} from 'react';
import {Text, StyleSheet,View,ImageBackground, Image,useWindowDimensions} from 'react-native';
import { COLORS,icons,img } from '../../constants';
import * as Progress from 'react-native-progress'

const Splash = ({
    navigation,

    }) => {
       
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
                        
          <Progress.Bar progress={0.3} width={200} animationType={'timing'} style={styles.progress}/>
        
        </View>
    )
};


const styles = StyleSheet.create({
    home: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:COLORS.AppBackgroundColor
    },
    eduText:{
        marginTop:'-1%',
        fontWeight:'400',
        fontSize:45,
        color:'#898C8F',
        fontWeight:'600'
    },
    last:{
        marginTop:'-1%',
        fontWeight:'500',
        fontSize:45,
        color:COLORS.primary,
        fontWeight:'600'
      
    },
    TextContainer:{
        flexDirection:'row'
    },
    subtitle:{
        fontSize:14,
        color:'#898C8F'
    },
    progress:{
        bottom:1,
        zIndex:0
    }

});

export default Splash;
