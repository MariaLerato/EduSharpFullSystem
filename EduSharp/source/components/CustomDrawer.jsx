import React, { useEffect, useState } from 'react';
import {
    View, Text,
    ImageBackground, Image,
    StyleSheet, TouchableOpacity
} from 'react-native';
import { ListItem, Header, Button } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import style from './style/CustomDrawer';
import { COLORS, SIZES } from './../constants';
import { auth, firestore } from '../BackendFirebase/configue/Firebase';


const CustomDrawer = (props) => {

    const [name, setName] = useState('');

    const getProfile = async () => {
        await firestore.collection("users").doc(auth.currentUser.uid).get().then(async (documentSnapshot) => {
            setName(documentSnapshot.data().name);
        })
    }

    useEffect(() => {
      getProfile();
    }, [])


    return (
        <View style={{ flex: 1, padding:0 }}>

            <DrawerContentScrollView {...props} >

                <View style={[style.bottomView, {
                    backgroundColor: COLORS.primary,
                    borderBottomRightRadius: 85, height: 210, justifyContent: 'flex-start', alignItems: 'flex-start'
                }]}>

                    <View style={{ position: 'absolute', bottom: 5, marginHorizontal: 10 }} >
                        <Image source={require('../../assets/images/Use.png')} style={{ height: 65, width: 65, borderRadius: 65 }} />
                        <Text style={[styles.lblUserName, { fontWeight: 'bold', marginVertical: 5, color: COLORS.White, fontSize: SIZES.h2 }]}>{name}</Text>
                    </View>
                </View>

                <DrawerItemList {...props} />
            </DrawerContentScrollView>


            <View style={{ flexDirection: 'row', padding: 10, borderTopWidth: 1, borderTopColor: 'gray', justifyContent: 'space-between' }}>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ fontSize:SIZES.h5,fontWeight:'800' }}>T's & Cs</Text>
                </View>

                <View style={{justifyContent:'center',alignItems:'center',width:50}}>
                    <View style={{height:25,}}>
                        <FontAwesome5 name="power-off" size={20} color="red" />
                    </View>
                    <View>
                    <Text style={{ fontSize:SIZES.h5,fontWeight:'800' }} >Log-out</Text>
                    </View>
                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    inner: {
        width: '193px',
        height: '80px',
        top: '350px',

    },

    bottomView: {
        flex: 1.5,
        backgroundColor: '#4B7BE8',
        bottom: 50,
        borderBottomRightRadius: 60,
        height: 250
    },
    textdes: {
        fontWeight: 'bold',
        paddingBottom: 10,
        color: '#0b1674',
    }



})

export default CustomDrawer