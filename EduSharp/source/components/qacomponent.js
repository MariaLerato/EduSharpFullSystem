import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Divider, Icon, Image, Input } from 'react-native-elements';
import { COLORS, SIZES } from '../constants';

const QAComponent = ({ data, onPress, profilePress, menuPress, likePress, sterePress, sharePress, commentsPress }) => {
    const [commenting, setcommenting] = useState(false);

    return (
        <View style={{ padding: 10, width: '100%', marginVertical: 5, }}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 60 }}>
                <Image onPress={profilePress} source={data.item.downloadUrl ? { uri: data.item.downloadUrl } : require("../../assets/images/user.png")} style={{ borderRadius: 45, width: 45, height: 45 }} />
                <View style={{ paddingHorizontal: 10, width: '82%' }}>
                    <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold' }}>{data.item.name}</Text>
                    <Text style={{ fontSize: SIZES.h4, }}>{data.item.createdAt}</Text>
                </View>
                <Icon onPress={menuPress} type="material-community" name="dots-vertical" />
            </View>

            <Text style={{ fontSize: SIZES.h2, }}>{data.item.topic}</Text>
            <Text style={{ fontSize: SIZES.h4 }}>{data.item.description}</Text>
            {data.item.downloadUrl ? <Image source={""} style={{ height: 210, width: '100%', borderRadius: 7 }} /> : null}
            <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />

            <View style={{ paddingHorizontal: 1, padding: '1%', marginTop: 'auto' }}>
                <View style={{ paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={commentsPress}>
                        <Text style={{ fontSize: SIZES.h4, textAlign: 'right' }}>no comment</Text>
                    </TouchableOpacity>
                    <View style={[{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }]}>
                        <View style={{ marginLeft: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Icon onPress={likePress} name={'thumb-up'} type={'material-community'} size={26} color={'#3D93D1'} />
                            <Text style={{ fontSize: SIZES.h4, marginHorizontal: 5 }}>{9}</Text>
                        </View>
                        <Icon onPress={sterePress} name={'star-outline'} type={'material-community'} size={26} color={'#f79f45'} />

                        <Icon onPress={sharePress} name={'share-all'} type={'material-community'} size={26} color={'#3D93D1'} />

                        <Icon name={'comment'} type={'material-community'} size={26} color={'#3D93D1'} onPress={() => { commenting? setcommenting(false): setcommenting(true) }} />
                    </View>
                </View>
            </View>

            {commenting ? <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingRight: 30 }}>
                <Input style={{ maxHeight: 180, minHeight: 45, }} keyboardType={"default"} multiline />
                <Icon type='material-community' name='send' onPress={() => { setcommenting(false) }} />
            </View> : null}
        </View>
    );
}

export default QAComponent;
