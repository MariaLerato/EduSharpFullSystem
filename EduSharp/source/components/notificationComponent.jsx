import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Divider, Image } from 'react-native-elements';
import { Text } from 'react-native-paper';
import { SIZES } from '../constants';

export default function NotificationComponent({ profilePress, data }) {

    const [days, setdays] = useState('');

    const handleDaysCalculation = () => {

        var one_day = 1000 * 60 * 60 * 24;
        let today = new Date();
        let dateSent = new Date();

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


    useEffect(() => {
        handleDaysCalculation();
    }, [])

    return (
        <View style={{ paddingHorizontal: 7, backgroundColor: "#9f9e9e" }}>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', height: 60 }}>
                <Image onPress={profilePress} source={"data.item.uri" ? { uri: "data.item.uri" } : require("../../assets/images/user.png")} style={{ borderRadius: 35, width: 35, height: 35 }} />
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold' }}>{"data.item.name"}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: SIZES.h5, backgroundColor: "#9e9f9f", paddingHorizontal: 15, marginLeft: 5, borderRadius: 3 }}>{"data.item.role"}</Text>
                    </View>
                    <Text style={{ fontSize: SIZES.h4, }}>{days}</Text>
                </View>
            </View>
            <View>
            </View>
            <Text style={{ fontSize:SIZES.h4 }}>trial</Text>
            <Divider style={{ height: 5,  }} />
        </View>
    );
}
