import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Modal, Picker, FlatList } from 'react-native'
import { Icon, Card, BottomSheet, Input, ListItem, Divider } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import ProgressIndicator from '../components/progressIndicator';
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { v4 as uuidv4 } from 'uuid'
import Info from '../mock/Q&A';
import { useEffect } from 'react';
import { auth, firestore, storage } from '../BackendFirebase/configue/Firebase';
import MaterialComponent from '../components/materialcomponent';
import GeneralService from '../BackendFirebase/services/GeneralService';
import DocumentPicker from 'react-native-document-picker';
import Anim from '../components/LottieComponent';


const Material = ({ navigation }) => {
    // const [toggle, setToggle] = useState(true)
    // const option = () => {
    //     setToggle(!toggle)
    // }
    const [isVisible, setIsVisible] = useState(false);
    const [share, setShare] = useState(false);
    const [modalVisible, setVisible] = useState(false);
    const [postObject, setpostObject] = useState(null);

    const [alertColor, setalertColor] = useState('');
    const [selectedGrade, setselectedGrade] = useState('Grade 8');
    const [selectedSubject, setselectedSubject] = useState('Mathematics');
    const [topic, settopic] = useState(null);
    const [description, setdescription] = useState(null);
    const [loading, setloading] = useState(false);
    const [alert, setalert] = useState(false);
    const [alertMessage, setalertMessage] = useState('');
    const [post, setpost] = useState([]);
    const [fileUrl, setfileUrl] = useState('');
    const [filename, setfilename] = useState('');
    const [userID, setuserID] = useState('');
    const [key, setkey] = useState('');

    const handleLike = (key, token, topic, desc) => {
        const data = {
            user: auth.currentUser.uid,
            postKey: key,
            createdAt: new Date()
        }
        GeneralService.post("likes", data, navigation).then(res => {
            setalert(true);
            setalertMessage("Liked");
            schedulePushNotification("liked your post.", token, topic, desc);
        })
            .catch(err => {
                setalert(true);
                setalertMessage(err)
            })
    }

    // Function to schedule push notification messge => returns a callback/promise
    async function schedulePushNotification(task, token, topic, desc) {

        Notifications.scheduleNotificationAsync({})
        await Notifications.scheduleNotificationAsync({
            content: {
                title: `${myName} ${task}`,
                body: `${topic}\n${desc}`,
                data: { data: 'goes here' },
            },
            trigger: { seconds: 2 },
            to: token

        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleStare = (key) => {
        const data = {
            user: auth.currentUser.uid,
            postKey: key,
            createdAt: new Date(),
            post:'materials'
        }
        GeneralService.post("stares", data, navigation).then(res => {
            setalert(true);
            setalertMessage("Liked");
        })
            .catch(err => {
                setalert(true);
                setalertMessage(err)
            })
    }

    const handleShare = (key, token, topic, desc) => {
        const data = {
            user: auth.currentUser.uid,
            postKey: key,
            createdAt: new Date()
        }
        schedulePushNotification("shared your post.", token, topic, desc);
    }

    const handleSavePost = async (downloadUri) => {


        if (selectedGrade != null && selectedSubject != null && topic != null && description != null) {
            let values = {
                grade: selectedGrade,
                subject: selectedSubject,
                userID: auth.currentUser.uid,
                topic: topic,
                description: description,
                status: true,
                illustrationURL: null,
                downloadUrl: downloadUri,
                visibility: true,
                downloadable: true,
                createdAt: new Date().toString()
            }
            GeneralService.post("questionAndAnswers", values, navigation).then((res) => {
                setloading(false);
                setalert(true);
                setalertMessage('Content is posted successfully.');
                setVisible(false);
                setalertColor(COLORS.Black)
                console.log(res.data);
            }).catch((err) => {
                setalert(true);
                setloading(false);
                setalertColor(COLORS.Danger)
                setalertMessage('Erroor has occured, please ry again in a moment.');
                console.log(err);
            })
        } else {
            setalert(true);
            setloading(false);
            setalertMessage("Please provide enought infomation for soliderity.");
        }

    }

    const ReportPost = async (key, token, topic, desc) => {
        await firestore.collection("questionAndAnswers").doc(key).update({ Reported: true }).then(async (querySnapshot) => {
            console.log(querySnapshot);
            console.log(key);
            setIsVisible(false);
            schedulePushNotification("report your post for rule violation.", token, topic, desc);
        }).catch(err => {
            console.log(err);
        })
    }

    const DeletePost = async (key) => {
        await firestore.collection("questionAndAnswers").doc(key).delete().then(async (querySnapshot) => {
            console.log(" Post deleted successfully ,querySnapshot");
            console.log(key);
            setIsVisible(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const SetVisibility = async (key) => {
        await firestore.collection("questionAndAnswers").doc(key).update({ visibility: postObject.visibility ? false : true }).then(async (querySnapshot) => {
            console.log(querySnapshot);
            console.log(key);
            setIsVisible(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleAddPost = () => {

        setloading(true);
        if (selectedGrade != null && selectedSubject != null && topic != null && description != null) {
            let values = {
                grade: selectedGrade,
                subject: selectedSubject,
                userID: auth.currentUser.uid,
                topic: topic,
                description: description,
                status: true,
                illustrationURL: null,
                downloadUrl: null,
                visibility: true,
                downloadable: true,
                createdAt: new Date().toString()
            }
            GeneralService.post("materials", values, navigation).then((res) => {
                setloading(false);
                setalert(true);
                setalertMessage('Content is posted successfully.');
                setVisible(false);
                setalertColor(COLORS.Black)
                console.log(res.data);
            }).catch((err) => {
                setalert(true);
                setloading(false);
                setalertColor(COLORS.Danger)
                setalertMessage('Erroor has occured, please ry again in a moment.');
                console.log(err);
            })
        } else {
            setalert(true);
            setloading(false);
            setalertMessage("Please provide enought infomation for soliderity.");
        }
    }

    const getPost = async () => {
        await firestore.collection("materials").get().then(async (querySnapshot) => {
            console.log('Total users: ', querySnapshot.size);
            const data = [];
            await querySnapshot.forEach(async (documentSnapshot) => {

                await firestore.collection("users").doc(documentSnapshot.data().userID).get().then(async (res) => {


                    await firestore.collection("likes").where('postKey', '==', documentSnapshot.id).get().then(async (reslikes) => {

                        await firestore.collection("comments").where('postKey', '==', documentSnapshot.id).get().then(async (rescomments) => {

                            await firestore.collection('education').doc(`${documentSnapshot.data().userID}`).get().then((resEdu) => {
                                console.log(res.data(), "======");
                                

                                console.log(reslikes.size, rescomments.size, "==>>==>");
                                let dataset = {
                                    key: documentSnapshot.id,
                                    likes: reslikes.size,
                                    role: resEdu.data().role ? resEdu.data().role : null,
                                    schoolName: resEdu.data().schoolName ? resEdu.data().schoolName : null,
                                    stream: resEdu.data().stream ? resEdu.data().stream : null,
                                    grade: resEdu.data().grade ? resEdu.data().grade : null,
                                    comments: rescomments.size,
                                    createdAt: documentSnapshot.data().createdAt,
                                    description: documentSnapshot.data().description,
                                    grade: documentSnapshot.data().grade,
                                    downloadUrl: documentSnapshot.data().downloadUrl,
                                    status: documentSnapshot.data().status,
                                    subject: documentSnapshot.data().subject,
                                    topic: documentSnapshot.data().topic,
                                    userID: documentSnapshot.data().userID,
                                    reported: documentSnapshot.data().Reported ? documentSnapshot.data().Reported : false,
                                    visibility: documentSnapshot.data().visibility,
                                    email: res.data().email,
                                    token: res.data().token ? res.data().token : null,
                                    uri: res.data().uri ? res.data().uri : null,
                                    location: res.data().location,
                                    name: res.data().name,
                                    image: res.data().profileUrl ? res.data().profileUrl : null,
                                    phonenumber: res.data().phonenumber,
                                }
                                data.push(dataset);
                            })
                        })

                    })
                    setpost(data);
                    console.log(data);
                });


            }).catch(err => {
                console.log('====================================');
                console.log(err, "==>>==>");
                console.log('====================================');
            });
        })
    }

    const SelectFile = async () => {


        const result = await DocumentPicker.pick({
            type: DocumentPicker.types.pdf,
            copyTo: 'documentDirectory',
        });

        if (!result.cancelled) {

            setfileUrl(decodeURI(
                file.fileCopyUri.replace('file://', ''),
            ));
            setfilename(result.name);
            console.log(decodeURI(
                file.fileCopyUri.replace('file://', ''),
            ));
            uploadImageAsync(result.file);
        }


    }

    const uploadImageAsync = async () => {

        // const blob = await new Promise((resolve, reject) => {
        //     const xhr = new XMLHttpRequest();
        //     xhr.onload = function () {
        //         resolve(xhr.response);
        //     };
        //     xhr.onerror = function (e) {
        //         console.log(e);
        //         reject(new TypeError("Network request failed"));
        //     };
        //     xhr.responseType = "blob";
        //     xhr.open("GET", fileUrl, true);
        //     xhr.send(null);
        // })

        let res = await new fetch(fileUrl);
        const blob = await res.blob();

        await storage.ref().child("files").child('material').child(uuidv4()).put(blob).then((res) => {
            console.log(res);
        });
    }

    useEffect(() => {
        getPost();

    }, [])

    return (
        <>
            <View style={Styles.container}>
                <View style={Styles.header}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <View style={{ paddingHorizontal: 10, borderBottomRightRadius: 35, borderTopRightRadius: 35, borderBottomLeftRadius: 15, borderTopLeftRadius: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.LightBlack }}>
                            <Icon type="material-community" name="arrow-left" size={26} />
                            <Text style={[Styles.headingtext, { marginHorizontal: 5 }]}>
                                Material
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.touchable} onPress={() => navigation.navigate("search")}>
                        <Icon name='search' type='font-awesome' size={23} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={Styles.subtitle}>
                        <Text style={Styles.text}>View only the content that is relevent to my course</Text>
                        {/* <ToggleSwitch
                            isOn={true}
                            onColor={'#3D93D1'}
                            offColor="red"
                            labelStyle={{ color: "black", fontWeight: '900' }}
                            size="medium" 
                            style={Styles.toggle}
                        /> */}
                    </View>
                   {post.length > 0 ? <FlatList data={post} renderItem={(data, index) => (
                        <MaterialComponent data={data} onPress={() => { }} profilePress={() => { }} menuPress={() => { setkey(data.item.key); setuserID(data.item.userID); setIsVisible(true) }}
                            likePress={() => { handleLike(data.item.key) }} sterePress={() => { handleStare(data.item.key) }} sharePress={() => { handleShare(data.item.key) }} commentsPress={() => { navigation.navigate("Replies", { key: data.item.key, type: "file" }) }} navigation={navigation} />
                    )}
                    />:
                        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{  paddingVertical: 10, height: 250, justifyContent: 'center', alignItems: 'center' }}>
                                <Anim json={require('../../assets/lootie/93461-loading.json')} autoplay={true} autosize={false} loop={true} speed={1} style={{ height: 65, width: 65, backgroundColor: COLORS.AppBackgroundColor }} />
                            </View>
                        </View>

                    }

                </ScrollView>
                <TouchableOpacity onPress={() => setVisible(true)} style={{ position: 'absolute', marginHorizontal: 20, marginVertical: 20, width: 50, height: 50, bottom: 15, right: 15, borderRadius: 40, backgroundColor: '#4B7BE8', justifyContent: 'center', }}>
                    <Icon name={'plus'} type={'font-awesome'} size={25} color={COLORS.White} />
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
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    {loading ? <View style={{ height: 10 }}><ProgressIndicator /></View> : null}
                                </View>
                                <Text style={Styles.modalheadertext}>Add Material</Text>
                                <View style={Styles.picker}>
                                    <Picker selectedValue={selectedGrade}
                                        style={{ height: 45, width: '100%' }}
                                        onValueChange={(itemValue, itemIndex) => setselectedGrade(itemValue)}>
                                        <Picker.Item label='Grade 8' value='Grade 8' />
                                        <Picker.Item label='Grade 9' value='Grade 9' />
                                        <Picker.Item label='Grade 10' value='Grade 10' />
                                        <Picker.Item label='Grade 11' value='Grade 11' />
                                        <Picker.Item label='Grade 12' value='Grade 12' />
                                    </Picker>
                                </View>
                                <View style={Styles.picker}>
                                    <Picker selectedValue={selectedSubject}
                                        style={{ height: 45, width: '100%' }}
                                        onValueChange={(itemValue, itemIndex) => setselectedSubject(itemValue)}>
                                        <Picker.Item label='Mathematics' value="Mathematics" />
                                        <Picker.Item label='Geograpghy' value="Geograpghy" />
                                        <Picker.Item label='Agricultural sciences' value="Agricultural sciences" />
                                        <Picker.Item label='Select Subject' value="Mathematics" />
                                        <Picker.Item label='Select Subject' value="Mathematics" />
                                        <Picker.Item label='Select Subject' value="Mathematics" />
                                        <Picker.Item label='Select Subject' value="Mathematics" />
                                        <Picker.Item label='Select Subject' value="Mathematics" />
                                        <Picker.Item label='Select Subject' value="Mathematics" />
                                    </Picker>
                                </View>
                                <View style={Styles.modalInput}>
                                    <Input
                                        placeholder={'State the topic'}
                                        value={topic}
                                        onChangeText={(e) => settopic(e)}
                                        containerStyle={{ backgroundColor: COLORS.White, height: '100%', borderRadius: 10, padding: '1%' }}
                                        inputContainerStyle={{ borderColor: 'white' }}
                                    />
                                </View>
                                <View style={Styles.modalInputDes}>
                                    <Input
                                        placeholder={'Description'}
                                        keyboardType={'twitter'}
                                        value={description}
                                        multiline
                                        onChangeText={(e) => setdescription(e)}
                                        containerStyle={{ backgroundColor: COLORS.White, height: '100%', borderRadius: 10, padding: 1 }}
                                        inputContainerStyle={{ borderColor: 'white' }}
                                    />
                                </View>

                                <TouchableOpacity style={Styles.fileContainer}>
                                    <Input
                                        placeholder={'Add pdf'}
                                        value={filename}
                                        onChangeText={(e) => setfilename(e)}
                                        containerStyle={{ borderRadius: 1, padding: '1%', height: '100%' }}
                                        inputContainerStyle={{ borderColor: '#EAEAEA' }}
                                        rightIcon={<Icon name={'file'} type={'font-awesome'} size={18} color={COLORS.primary} onPress={SelectFile} />}
                                    />
                                </TouchableOpacity>
                                <View style={[Styles.buttons, { marginVertical: 10 }]}>
                                    <TouchableOpacity onPress={() => setVisible(false)} style={Styles.cancel}><Text style={Styles.cancelText}>Cancel</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={handleAddPost} style={Styles.postbutton} ><Text style={Styles.postText}>Upload</Text></TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </Modal>
                </View>
                <View style={{ alignContent: 'center' }}>
                    <BottomSheet
                        modalProps={{}}
                        isVisible={isVisible}>
                        <View style={{ paddingBottom: '1%', borderRadius: 5 }}>
                            <TouchableOpacity onPress={() => setIsVisible(false)}>
                                <Icon name={'arrow-down'} type={'font-awesome'} color={'#EAEAEA'} />
                            </TouchableOpacity >

                            <View style={{ borderTopLeftRadius: 11, borderTopRightRadius: 11, alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 15, paddingVertical: 15, backgroundColor: COLORS.White }}>

                                <Text style={{ marginVertical: 5, fontSize: SIZES.body2, fontWeight: '800' }}>Post Menu</Text>
                                <TouchableOpacity style={{ marginHorizontal: 5, width: '100%', paddingVertical: 3 }} disabled={userID == auth.currentUser.uid ? false : true} onPress={() => { SetVisibility(key) }}>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ paddingVertical: 7, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                            <Icon type={'material-community'} name={postObject ? postObject.visibility ? "account-lock" : "account-lock" : "menu"} size={20} color={userID == auth.currentUser.uid ? '#000000' : COLORS.Danger} style={{ margin: '2%' }} />
                                            <Text style={{ color: userID == auth.currentUser.uid ? '#000000' : COLORS.Danger, fontWeight: '600', paddingLeft: '2%', fontSize: SIZES.h4 }}>{postObject ? postObject.visibility ? "Hide post" : "Show post" : "Hide post"}</Text>
                                        </View>
                                        <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />
                                    </View>
                                </TouchableOpacity >
                                <TouchableOpacity style={{ marginHorizontal: 5, width: '100%', paddingVertical: 3 }} disabled={userID == auth.currentUser.uid ? false : true} onPress={() => setIsVisible(false)}>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ paddingVertical: 7, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                            <Icon type={'material-community'} name={"pencil"} size={20} color={userID == auth.currentUser.uid ? '#000000' : COLORS.Danger} style={{ margin: '2%' }} />
                                            <Text style={{ color: userID == auth.currentUser.uid ? '#000000' : COLORS.Danger, fontWeight: '600', paddingLeft: '2%', fontSize: SIZES.h4 }}>{"Edit Post"}</Text>
                                        </View>
                                        <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />
                                    </View>
                                </TouchableOpacity >
                                <TouchableOpacity style={{ marginHorizontal: 5, width: '100%', paddingVertical: 3 }} disabled={userID == auth.currentUser.uid ? false : true} onPress={() => setIsVisible(false)}>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ paddingVertical: 7, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                            <Icon type={'material-community'} name={"share"} size={20} color={'#000000'} style={{ margin: '2%' }} />
                                            <Text style={{ color: '#000000', fontWeight: '600', paddingLeft: '2%', fontSize: SIZES.h4 }}>{"Share"}</Text>
                                        </View>
                                        <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />
                                    </View>
                                </TouchableOpacity >
                                <TouchableOpacity style={{ marginHorizontal: 5, width: '100%', paddingVertical: 3 }} disabled={userID == auth.currentUser.uid ? false : true} onPress={() => { navigation.navigate("Replies", { key: postObject.key, type: "qa" }) }}>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ paddingVertical: 7, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                            <Icon type={'material-community'} name={"view-module"} size={20} color={userID == auth.currentUser.uid ? '#000000' : COLORS.Danger} style={{ margin: '2%' }} />
                                            <Text style={{ color: userID == auth.currentUser.uid ? '#000000' : COLORS.Danger, fontWeight: '600', paddingLeft: '2%', fontSize: SIZES.h4 }}>{"View post"}</Text>
                                        </View>
                                        <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />
                                    </View>
                                </TouchableOpacity >

                                <TouchableOpacity style={{ marginHorizontal: 5, width: '100%', paddingVertical: 3 }} disabled={userID == auth.currentUser.uid ? false : true} onPress={() => { ReportPost(postObject.key, postObject.token, postObject.topic, postObject.description) }}>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ paddingVertical: 7, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                            <Icon type={'material-community'} name={"alert-rhombus"} size={20} color={userID == auth.currentUser.uid ? '#000000' : COLORS.Danger} style={{ margin: '2%' }} />
                                            <Text style={{ color: userID == auth.currentUser.uid ? '#000000' : COLORS.Danger, fontWeight: '600', paddingLeft: '2%', fontSize: SIZES.h4 }}>{"Report this post"}</Text>
                                        </View>
                                        <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />
                                    </View>
                                </TouchableOpacity >
                                <TouchableOpacity style={{ marginHorizontal: 5, width: '100%', paddingVertical: 3 }} disabled={userID == auth.currentUser.uid ? false : true} onPress={() => { DeletePost(key) }}>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ paddingVertical: 7, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                            <Icon type={'material-community'} name={"delete"} size={20} color={userID == auth.currentUser.uid ? '#000000' : COLORS.Danger} style={{ margin: '2%' }} />
                                            <Text style={{ color: userID == auth.currentUser.uid ? '#000000' : COLORS.Danger, fontWeight: '600', paddingLeft: '2%', fontSize: SIZES.h4 }}>{"Delete"}</Text>
                                        </View>
                                        <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />
                                    </View>
                                </TouchableOpacity >

                            </View>

                        </View>
                    </BottomSheet>
                </View>
                <Snackbar
                    onDismiss={() => setalert(false)}
                    duration={615}
                    style={{ backgroundColor: COLORS.Danger }}
                    visible={alert}>
                    {alertMessage}
                </Snackbar>
            </View>
        </>
    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.AppBackgroundColor,
        padding: '3%'
    },
    subtitle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5%',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 15,
        width: '50%'
    },
    toggle: {
        marginRight: '2%'
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E9E9E9',
        width: '100%',
        justifyContent: 'space-between'
    },
    headingtext: {
        fontSize: SIZES.h3,
        fontWeight: '100'
    },
    searchIcon: {
        marginRight: '2%'
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.8,
    },
    postContainer: {
        backgroundColor: COLORS.AppBackgroundColor,
        paddingHorizontal: 15,
        paddingVertical: 20,
        width: '90%',
        margin: 25,
        alignItems: 'center',
        borderRadius: 12

    },
    picker: {
        width: '100%',
        backgroundColor: COLORS.White,
        margin: '1%',
        borderRadius: 7,
    },
    modalInput: {
        width: '100%',
        backgroundColor: COLORS.White,
        margin: '1%',
        height: 45,
        borderRadius: 7,

    },
    modalInputDes: {
        width: '100%',
        backgroundColor: COLORS.White,
        margin: '1%',
        borderRadius: 7,
        height: 115
    },
    modalheadertext: {
        fontSize: SIZES.h2,
        margin: '4%'
    },
    fileContainer: {
        width: '100%',
        backgroundColor: '#EAEAEA',
        margin: '1%',
        height: 45,
        borderRadius: 7
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
        alignItems: 'center', justifyContent: 'center',
        marginBottom: '4%'
    },
    postbutton: {
        marginTop: '4%',
        width: '45%',
        height: 45,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginBottom: '4%'
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
        backgroundColor: '#f2f2f2',
        margin: 'auto',
        borderRadius: 15,
        padding: 'auto',
        width: '85%', height: 150,
        marginTop: '6%'
    },
    SheetfileContainer: {
        backgroundColor: '#f2f2f2',
        margin: 'auto',
        borderRadius: 25,
        height: 55,
        marginTop: '2%',
        width: '85%'
    },
    headerContainer: {

        display: 'flex',
        flexDirection: 'row',
        width: 250
    }


})
export default Material