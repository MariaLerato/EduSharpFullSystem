import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Divider, Icon, Image, Input } from 'react-native-elements';
import { auth } from '../BackendFirebase/configue/Firebase';
import GeneralService from '../BackendFirebase/services/GeneralService';
import { COLORS, SIZES } from '../constants';
import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js';
import { DataTable } from 'react-native-paper';

const MaterialComponent = ({ data, onPress, profilePress, menuPress, likePress, sterePress, sharePress, commentsPress, navigation }) => {
    const [commenting, setcommenting] = useState(false);
    const [days, setdays] = useState('');
    const [comment, setcomment] = useState('');

    const handleDaysCalculation = () => {

        var one_day = 1000 * 60 * 60 * 24;
        let today = new Date();
        let dateSent = new Date(data.item.createdAt);

        var diff = today.getTime() - dateSent.getTime();
        //var hours = Math.floor(diff / 1000 / 60 / 60);
        // diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);

        var hours = Math.floor(diff / 36e5),
            minutes = Math.floor(diff % 36e5 / 60000),
            seconds = Math.floor(diff % 60000 / 1000);

        if (hours < 24 && hours > 1) {
            setdays(`${hours} h ago`);
        } else if (hours <= 1) {

            let days = hours / 24;
            setdays(`${minutes} min ago`);
        } else if (hours > 24) {

            let days = hours / 24;
            if (days < 2) {
                let daycount = days.toString();
                setdays(`${daycount.substring(0, daycount.indexOf('.'))} day ago`);
            } else if (days > 1 && days < 29) {
                let daycount = days.toString();
                setdays(`${daycount.substring(0, daycount.indexOf('.'))} days ago`);
            } else if (days > 30) {
                let daycount = (days / 30).toString();
                setdays(`${daycount.substring(0, daycount.indexOf('.'))} mon ago`);
            }
        }

    }

    const handleComment = (key) => {
        const data = {
            user: auth.currentUser.uid,
            postKey: key,
            comments: comment,
            createdAt: new Date()
        }

        GeneralService.post("comments", data, navigation).then(res => {

            setcommenting(false);
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        handleDaysCalculation();
    }, [])

    return (
        <View style={{
            padding: 10, width: '100%', marginVertical: 5, shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
        }}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 60 }}>
                <Image onPress={profilePress} source={data.item.uri ? { uri: data.item.uri } : require("../../assets/images/user.png")} style={{ borderRadius: 45, width: 45, height: 45 }} />
                <View style={{ paddingHorizontal: 10, width: '82%' }}>
                <View style={{ width: '82%' , flexDirection:'row', alignItems:'center'}}>
                                    <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold' }}>{data.item.name}</Text>
                                    <Text style={{ fontWeight:'bold', fontSize: SIZES.h5, backgroundColor:"#9e9f9f", paddingHorizontal:15, marginLeft:5, borderRadius:3}}>{data.item.role}</Text>
                                </View>
                    <Text style={{ fontSize: SIZES.h4, }}>{days}</Text>
                </View>
                <Icon onPress={menuPress} type="material-community" name="dots-vertical" />
            </View>

            <Text style={{ fontSize: SIZES.h4 }}>{data.item.description}</Text>
            <View style={{ height: 210, width: '100%', borderRadius: 7 }}>
                <View style={{ flex: 1,backgroundColor: '#ecf0f1' }}>
                    <PDFReader
                        source={require('../../assets/files/doc.pdf')}
                        onError={(err)=>{console.log("err","=======================================");}}
                        onLoad={(res)=>{console.log("res");}}
                        onLoadEnd={(res)=>{console.log("res");}}
                    />
                </View>

            </View>
            <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />

            <View style={{ paddingHorizontal: 1, padding: '1%', marginTop: 'auto' }}>
                <View style={{ paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={commentsPress}>
                        <Text style={{ fontSize: SIZES.h4, textAlign: 'right' }}>{data.item.comments} comment</Text>
                    </TouchableOpacity>
                    <View style={[{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }]}>
                        <View style={{ marginLeft: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Icon onPress={likePress} name={data.item.userID == auth.currentUser.uid ?'thumb-up':'thumb-up-outline'} type={'material-community'} size={26} color={'#3D93D1'} />
                            <Text style={{ fontSize: SIZES.h4, marginHorizontal: 5 }}>{data.item.likes}</Text>
                        </View>
                        <Icon onPress={sterePress} name={'star-outline'} type={'material-community'} size={26} color={'#f79f45'} />
                        <Icon onPress={sharePress} name={'share-all'} type={'material-community'} size={26} color={'#3D93D1'} />
                       
                    </View>
                </View>
            </View>

            {commenting ? <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingRight: 30 }}>
                <Input style={{ maxHeight: 180, minHeight: 45, }} values={comment} onChangeText={(e) => { setcomment(e) }} keyboardType={"default"} multiline />
                <Icon type='material-community' name='send' onPress={() => { handleComment(data.item.key) }} />
            </View> : null}
            <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />

        </View>
    );
}

export default MaterialComponent;
