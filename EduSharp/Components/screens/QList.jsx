import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, FlatList, Modal, Picker } from 'react-native'
import { Card, Icon, Input, ListItem, BottomSheet, BottomSheetProps, Avatar } from 'react-native-elements'
import { COLORS, FONTS, SIZES, icons } from "../../constants";
import ToggleSwitch from 'toggle-switch-react-native'
import Info from './Q&A'
import Post from "./PostQuestion";



const QList = ({ navigation }) => {
    const [toggle, setToggle] = useState(true)
    const option = () => {
        setToggle(!toggle)
    }
    const [isVisible, setIsVisible] = useState(false)
    const [share, setShare] = useState(false)

    const [modalVisible, setVisible] = useState(false)
    const Postcard = () => {
        return (
            <View style={{ marginTop: '4%', width: '105%', marginLeft: '-4%' }}>
                {
                    Info.info.map(data =>
                        <Card key={data.id} containerStyle={{ borderRadius: 10, }} >
                            <Card.FeaturedTitle style={Styles.cardHeader}>
                                <View style={{ padding: '2%' }}>
                                    <Card.Image source={data.pic} style={Styles.profile} />
                                </View>
                                <View>
                                    <Text style={Styles.headertext}>{data.username}</Text>
                                    <Text style={{ marginLeft: 20 }}>{data.time}</Text>
                                </View>
                                <TouchableOpacity onPress={() => setIsVisible(true)}>
                                    <Icon name={'ellipsis-v'} type={'font-awesome'} style={{ right:'0%', marginBottom: 20, width: 8, height: 24 }} />
                                </TouchableOpacity>
                            </Card.FeaturedTitle>
                            <Card.FeaturedTitle style={Styles.post} onPress={() => navigation.navigate(data.location)}>
                                <View  >
                                    <Text style={Styles.question} >
                                        {data.question}
                                    </Text>
                                    <Text >
                                        {data.question}
                                    </Text>
                                    <Text>
                                        {data.question}
                                    </Text>
                                </View>
                            </Card.FeaturedTitle>
                            <Card.FeaturedTitle style={{ padding: '1%', marginTop: '4%' }}>
                                <View style={Styles.iconContainer}>
                                    <View style={{ marginLeft: 10, marginBottom: -20, display: 'flex', flexDirection: 'row' }}>
                                        <Icon name={'thumbs-up'} type={'font-awesome'} style={{ width: 40, height: 40 }} color={'#3D93D1'} />
                                        <Text>{data.number}</Text>
                                    </View>
                                    <View style={{ marginLeft: 35, marginBottom: -20 }}>
                                        <Icon name={'star-o'} type={'font-awesome'} style={{ width: 40, height: 40 }} color={'#3D93D1'} />
                                    </View>
                                    <View style={{ marginLeft: 35, marginBottom: -20 }}>
                                        <Icon name={'share-alt'} type={'font-awesome'} style={{ width: 38, height: 38 }} color={'#3D93D1'} />
                                    </View>
                                    <TouchableOpacity style={{ marginLeft: 35, alignSelf: 'flex-end', marginBottom: -18 }} onPress={() => setShare(true)} >
                                        <Icon name={'comment'} type={'font-awesome'} style={{ width: 38, height: 38 }} color={'#3D93D1'} />
                                    </TouchableOpacity>
                                </View>
                            </Card.FeaturedTitle>
                        </Card>
                    )
                }
            </View>
        )
    }

    return (
        <>
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <View>
                        <Text style={Styles.headingtext}>
                            Q' As
                        </Text>
                    </View>
                    <TouchableOpacity style={Styles.touchable}>
                        <Icon name='search' type='font-awesome' size={23} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <View style={Styles.subtitle}>
                    <Text style={Styles.text}>View only the content that is relevent to my course</Text>
                    <ToggleSwitch
                        isOn={true}
                        onColor={'#3D93D1'}
                        offColor="red"
                        labelStyle={{ color: "black", fontWeight: '900' }}
                        size="medium"
                        style={Styles.toggle}
                    //   onToggle={option}
                    />
                </View>

                <ScrollView>
                    <Postcard />
                </ScrollView>
                <TouchableOpacity onPress={() => setVisible(true)} style={{ width: 60, height: 60, borderRadius: 40, backgroundColor: '#4B7BE8', justifyContent: 'center', alignSelf: 'flex-end', marginTop: '2%', marginBottom: '-5%' }}>
                    <Icon name={'plus'} type={'font-awesome'} size={30} color={COLORS.White} />
                </TouchableOpacity>
                <View>
                    <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            alert('Modal closed')
                            setVisible(!modalVisible)
                        }
                        }
                        presentationStyle={'overFullScreen'}
                    >
                        <View style={Styles.modalContainer}>
                            <View style={Styles.postContainer}>
                                <Text style={Styles.modalheadertext}>Make Post</Text>
                                <View style={Styles.picker}>
                                    <Picker>
                                        <Picker.Item label='Select grade' />
                                    </Picker>
                                </View>
                                <View style={Styles.picker}>
                                    <Picker>
                                        <Picker.Item label='Select grade' />
                                    </Picker>
                                </View>
                                <View style={Styles.modalInput}>
                                    <Input
                                        placeholder={'State the topic'}
                                        containerStyle={{ backgroundColor: COLORS.White, height: '100%', borderRadius: 10, padding: '1%' }}
                                        inputContainerStyle={{ borderColor: 'white' }}

                                    />
                                </View>
                                <View style={Styles.modalInputDes}>
                                    <Input
                                        placeholder={'Description'}
                                        containerStyle={{ backgroundColor: COLORS.White, height: '100%', borderRadius: 10, padding: '2%' }}
                                        inputContainerStyle={{ borderColor: 'white' }}

                                    />
                                </View>
                                <TouchableOpacity style={Styles.fileContainer}>
                                    <Input
                                        placeholder={'Add a Photo'}
                                        containerStyle={{ height: '100%', borderRadius: 20 }}
                                        inputContainerStyle={{ borderColor: '#EAEAEA' }}
                                        rightIcon={<Icon name={'image'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.fileContainer}>
                                    <Input
                                        placeholder={'Take a Picture'}
                                        containerStyle={{ height: '100%', borderRadius: 1, padding: '1%' }}
                                        inputContainerStyle={{ borderColor: '#EAEAEA' }}
                                        rightIcon={<Icon name={'camera'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.fileContainer}>
                                    <Input
                                        placeholder={'Add pdf,doc, or'}
                                        containerStyle={{ borderRadius: 1, padding: '1%', height: '100%' }}
                                        inputContainerStyle={{ borderColor: '#EAEAEA' }}
                                        rightIcon={<Icon name={'file'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                    />
                                </TouchableOpacity>
                                <View style={Styles.buttons}>
                                    <TouchableOpacity onPress={() => setVisible(false)} style={Styles.cancel}><Text style={Styles.cancelText}>Cancel</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => alert('Post successfully uploaded')} style={Styles.postbutton} ><Text style={Styles.postText}>Post</Text></TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>
                    <View>
                        <BottomSheet
                            modalProps={{}}
                            isVisible={isVisible}>
                            <View style={{ paddingBottom: '1%' }}>
                                <TouchableOpacity onPress={() => setIsVisible(false)}>
                                    <Icon name={'arrow-down'} type={'font-awesome'} color={'#EAEAEA'} />
                                </TouchableOpacity >
                                {
                                    Info.items.map((item, l) =>
                                        <ListItem key={item.id} style={{ color: '#7DB4DA', borderRadius: 20 }} >
                                            <ListItem.Content style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                                <Icon type={'font-awesome'} name={item.icon} size={20} color={'#7DB4DA'} style={{ margin: '2%' }} />
                                                <ListItem.Title style={{ color: '#7DB4DA', fontWeight: '700', paddingLeft: '2%', fontSize: 16 }}>{item.name}</ListItem.Title>
                                            </ListItem.Content>
                                        </ListItem>
                                    )
                                }
                            </View>
                        </BottomSheet>
                    </View>
                    <View style={{alignContent:'center'}} >
                        <BottomSheet
                            modalProps={{}}
                            isVisible={share}>
                            <View style={{ backgroundColor: 'white',borderTopEndRadius:20,borderTopStartRadius:20,alignItems:'center',justifyContent:'center',width:'90%' }}>
                            <View style={{ marginTop:'2%'}}>
                               
                                <View>
                                    <View style={Styles.bottomInputDes}>
                                        <Input
                                            placeholder={'Share your answer'}
                                            containerStyle={{ backgroundColor: '#EAEAEA', height: '100%', borderRadius: 10, padding: '2%' }}
                                            inputContainerStyle={{ borderColor: '#EAEAEA' }}
                                        />
                                    </View>
                                    <View>
                                        <TouchableOpacity style={Styles.SheetfileContainer}>
                                            <Input
                                                placeholder={'Add a Photo'}
                                                containerStyle={{ height: '100%', borderRadius: 20 }}
                                                inputContainerStyle={{ borderColor: '#EAEAEA' }}
                                                rightIcon={<Icon name={'image'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={Styles.SheetfileContainer}>
                                            <Input
                                                placeholder={'Take a Picture'}
                                                containerStyle={{ height: '100%', borderRadius: 1, padding: '1%' }}
                                                inputContainerStyle={{ borderColor: '#EAEAEA' }}
                                                rightIcon={<Icon name={'camera'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={Styles.SheetfileContainer}>
                                            <Input
                                                placeholder={'Add pdf,doc, or'}
                                                containerStyle={{ borderRadius: 1, padding: '1%', height: '100%' }}
                                                inputContainerStyle={{ borderColor: '#EAEAEA' }}
                                                rightIcon={<Icon name={'file'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                            />
                                        </TouchableOpacity>
                                        <View style={Styles.buttons}>
                                            <TouchableOpacity onPress={() => setShare(false)} style={Styles.cancel}><Text style={Styles.cancelText}>Cancel</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => alert('Post successfully uploaded')} style={Styles.postbutton} ><Text style={Styles.postText}>Post</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            </View>
                        </BottomSheet>
                    </View>
                </View>
            </View>
        </>
    )
}
const Styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.AppBackgroundColor,
        flex: 1,
        padding: '6%'
    }
    , header: {
        display: 'flex',
        flexDirection: 'row',

        marginTop: '6%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E9E9E9'

    },

    headingtext: {
        fontSize: SIZES.h1,
        fontWeight: '100'
    },
    touchable: {
        alignContent: 'flex-end',
        marginLeft: '70%',
        marginTop: '4%'
    },
    subtitle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5%'
    },
    text: {
        width: '72%',
        fontSize: 15
    },
    toggle: {
        alignContent: 'flex-end',
        marginLeft: '15%',
        marginTop: '2%'
    },
    profile: {
        width: 50,
        height: 50,

    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        //   backgroundColor:'red',
        width: '100%',
        height: 70,
        justifyContent:'space-between'
        // paddingLeft:'2%'
    },
    headertext: {
        fontSize: SIZES.h2,
        marginLeft: 20,
    },
    post: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '3%',
        marginTop: '-2%',
        textAlign: 'center'
    },
    question: {
        padding: '4%',
        fontSize: SIZES.body4
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.8

    },
    postContainer: {
        backgroundColor: COLORS.AppBackgroundColor,
        height: '90%',
        width: '90%',
        borderRadius: 20,
        alignItems: 'center',
        marginTop: '5%',
        paddingTop: '6%'

    },
    picker: {
        width: '90%',
        backgroundColor: COLORS.White,
        margin: '1%',
        borderRadius: 10,
    },
    modalInput: {
        width: '90%',
        backgroundColor: COLORS.White,
        margin: '1%',
        height: '9%',
        borderRadius: 10,

    },
    modalInputDes: {
        width: '90%',
        backgroundColor: COLORS.White,
        margin: '1%',
        borderRadius: 10,
        height: '15%'
    },
    modalheadertext: {
        fontSize: SIZES.h2,
        margin: '4%'
    },
    fileContainer: {
        width: '90%',
        backgroundColor: '#EAEAEA',
        margin: '1%',
        height: '9%',
        borderRadius: 20
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginLeft: '40%'
    },
    cancel: {
        marginTop: '4%',
        width: '40%',
        height: 40,
        alignItems: 'center', justifyContent: 'center'
    },
    postbutton: {
        marginTop: '4%',
        width: '40%',
        height: 45,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 10
    },
    postText: {
        color: 'white',
        fontSize: 18
    },
    cancelText: {
        color: 'black',
        fontSize: 18,
        paddingRight: '14%'
    },
    bottomInputDes: {
        width: '89%',
        backgroundColor:'#EAEAEA',
        margin: '2%',
        borderRadius: 10,
        height: '25%'
    },
    SheetfileContainer:{
        width: '90%',
        backgroundColor: '#EAEAEA',
        margin: '1%',
        height: '17%',
        borderRadius: 20
    }

})
export default QList
