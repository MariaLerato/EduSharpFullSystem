import React from 'react';
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


const CustomDrawer = (props) => {
    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView {...props} >

                <View style={style.bottomView}>

                    <View style={{ padding: 40 }} >
                        <Image source={require('../../assets/images/Use.png')} style={{ height: 80, width: 80, margin: 40, borderRadius: 40 }} />
                        <Text style={[styles.lblUserName]}>Leah Makgatho</Text>
                    </View>
                </View>

                <DrawerItemList {...props} />
            </DrawerContentScrollView>


            <View style={{ flexDirection: 'row', padding: 20, borderTopWidth: 1, borderTopColor: 'gray' }}>
                <TouchableOpacity onPress={() => { }} >
                    <View style={{ left: 180 }}>
                        <FontAwesome5 name="power-off" size={20} color="red" />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>T's & Cs</Text>

                        <Text style={{ left: 110 }} >Log-out</Text>

                    </View>

                </TouchableOpacity>

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