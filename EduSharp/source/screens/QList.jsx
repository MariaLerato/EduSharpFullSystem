import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, FlatList, Modal, Picker } from 'react-native'
import { Card, Icon, Input, ListItem, BottomSheet, Divider } from 'react-native-elements'
import { COLORS, SIZES } from "../constants";
import { Switch } from "react-native-switch";
import Info from '../mock/Q&A'
import Post from "./PostQuestion";
import ProgressIndicator from "../components/progressIndicator";
import GeneralService from "../BackendFirebase/services/GeneralService";
import Auth from "../BackendFirebase/services/Auth";
import { auth, firestore, storage } from "../BackendFirebase/configue/Firebase";
import { Snackbar } from 'react-native-paper';
import QAComponent from "../components/qacomponent";
import * as Camera from 'expo-camera';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as Notifications from 'expo-notifications';
import * as DocumentPicker from 'expo-document-picker';
// import * as ImagePicker from 'expo-image-picker';


const QList = ({ navigation }) => {

    const [isVisible, setIsVisible] = useState(false)
    const [share, setShare] = useState(false)
    const [modalVisible, setVisible] = useState(false)
    const [selectedGrade, setselectedGrade] = useState('Grade 8');
    const [selectedSubject, setselectedSubject] = useState('Mathematics');
    const [openCamera, setopenCamera] = useState(false);
    const [topic, settopic] = useState(null);
    const [description, setdescription] = useState(null);
    const [loading, setloading] = useState(false);
    const [alert, setalert] = useState(false);
    const [alertColor, setalertColor] = useState('');
    const [alertMessage, setalertMessage] = useState('');
    const [post, setpost] = useState([]);
    const [userID, setuserID] = useState('');
    const [key, setkey] = useState('');
    const [postObject, setpostObject] = useState(null);

    // ===========================================================================
    // ===========================================================================
    let cameraRef = useRef();
    const [camera, setcamera] = useState(null)
    const [hasPermission, setHasPermission] = useState('');
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [err, seterr] = useState('');
    const [captureColor, setcaptureColor] = useState(COLORS.White);
    const [rotatoColor, setrotatoColor] = useState(COLORS.White);
    const [gallery, setgallery] = useState(COLORS.White);
    const [flesh, setflesh] = useState(false);
    const [autofocus, setautofocus] = useState(0);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [imageUrl, setimageUrl] = useState('');

    const [myName, setmyName] = useState('');



    const starWarching = async () => {
        try {

            await Camera.requestCameraPermissionsAsync();
            //await ImagePicker.requestMediaLibraryPermissionsAsync();

            const { status } = await Camera.Camera.requestCameraPermissionsAsync();
            setHasPermission(status)
        } catch (err) {
            seterr(err)
        }
    }

    const fleshLight = async () => {
        flesh ? setflesh(false) : setflesh(true);
    }

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    const cancelPreview = async () => {
        await camera.resumePreview();
        setIsPreview(false);
    };

    const pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            multiple: false, type: 'image/*',
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {

            setIsPreview(true);
            setimageUrl(result.uri);

            console.log(`content://${result.uri}`);
            let res = await new fetch(`file://${result.uri}`);
            const blob = await res.blob();

            await storage.ref().child("files").child('questionandanswers').child(uuidv4()).put(blob).then((res) => {
                console.log(res);
            });
        }


    }

    const onSnap = async () => {
        if (camera) {
            const options = { quality: 0.7, base64: true };
            const data = await camera.takePictureAsync(options);
            const source = data.base64;

            if (source) {


                // let formData = new FormData();
                // formData.append('file', {
                //   uri: data.uri.replace("file:///", ""),
                //   type: 'image/jpg', name: 'userProfile.jpg',
                // });

                await camera.pausePreview();
                setimageUrl(data.uri);

                console.log(data.uri, '====================================');

            }
            setIsPreview(true);
        }

    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
                console.log(fileReader.result);

            };
            fileReader.onerror = (error) => {
                reject(error);
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            };
        })
    }


    // ===========================================================================
    // ===========================================================================


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
            createdAt: new Date()
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

    const handleAddPost = async () => {

        setloading(true);

        if (imageUrl) {
            let res = await new fetch(imageUrl);
            const blob = await res.blob();
            const ref = storage.ref().child("files").child('questionandanswers').child(uuidv4());
            const results = await ref.put(blob);


            ref.getDownloadURL().then(url => {
                console.log('====================================');
                console.log("===>>>>==>>", url);
                handleSavePost(url);
                console.log('====================================');
            })


            return;
        }

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

    const getPost = async () => {
        await firestore.collection("questionAndAnswers").get().then(async (querySnapshot) => {
            console.log('Total users: ', querySnapshot.size);
            const data = [];
            await querySnapshot.forEach(async (documentSnapshot) => {


                await firestore.collection("users").doc(documentSnapshot.data().userID).get().then(async (res) => {


                    await firestore.collection("likes").where('postKey', '==', documentSnapshot.id).get().then(async (reslikes) => {

                        await firestore.collection("comments").where('postKey', '==', documentSnapshot.id).get().then(async (rescomments) => {

                            console.log(reslikes.size, rescomments.size, "==>>==>");
                            let dataset = {
                                key: documentSnapshot.id,
                                likes: reslikes.size,
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
                                location: res.data().location,
                                name: res.data().name,
                                image: res.data().profileUrl ? res.data().profileUrl : null,
                                phonenumber: res.data().phonenumber,
                            }
                            data.push(dataset);
                        })

                    })
                    setpost(data);
                });


            }).catch(err => {
                console.log('====================================');
                console.log(err, "==>>==>");
                console.log('====================================');
            });
        })
    }

    const onClose = () => {
        setopenCamera(false);
    }

    const getProfile = async () => {
        await firestore.collection("users").doc(auth.currentUser.uid).get().then(async (documentSnapshot) => {
            setmyName(documentSnapshot.data().name);
        })
    }

    useEffect(() => {
        starWarching();
        getPost();
        getProfile();
    }, [])

    return (
        <View style={[Styles.container, { padding: 5 }]}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {loading ? <View style={{ height: 10 }}><ProgressIndicator /></View> : null}
            </View>
            <View style={Styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <View style={{ paddingHorizontal: 10, borderBottomRightRadius: 35, borderTopRightRadius: 35, borderBottomLeftRadius: 15, borderTopLeftRadius: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.LightBlack }}>
                        <Icon type="material-community" name="arrow-left" size={26} />
                        <Text style={[Styles.headingtext, { marginHorizontal: 5 }]}>
                            Q' As
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.touchable} onPress={() => navigation.navigate("search")}>
                    <Icon name='search' type='font-awesome' size={23} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View>
                    <View style={Styles.subtitle}>
                        <Text style={[Styles.text, { fontSize: SIZES.h3 }]}>View only the content that is relevent to my course</Text>
                    </View>
                    <FlatList data={post} renderItem={(data, index) => (
                        <QAComponent data={data} onPress={() => { }} profilePress={() => { }} menuPress={() => { setpostObject(data.item); console.log(data.item); setkey(data.item.key); setuserID(data.item.userID); setIsVisible(true) }}
                            likePress={() => { handleLike(data.item.key, data.item.token, data.item.topic, data.item.description) }} sterePress={() => { handleStare(data.item.key) }} sharePress={() => { handleShare(data.item.key, data.item.token, data.item.topic, data.item.description) }} commentsPress={() => { navigation.navigate("Replies", { key: data.item.key, type: "qa" }) }} navigation={navigation} />
                    )}
                    />

                </View>
            </ScrollView >
            <TouchableOpacity onPress={() => setVisible(true)} style={{ position: 'absolute', marginHorizontal: 20, marginVertical: 20, width: 50, height: 50, bottom: 15, right: 15, borderRadius: 40, backgroundColor: '#4B7BE8', justifyContent: 'center', }}>
                <Icon name={'plus'} type={'font-awesome'} size={25} color={COLORS.White} />
            </TouchableOpacity>
            <View>

                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setVisible(!modalVisible)
                    }}
                    presentationStyle={'overFullScreen'}
                >
                    {openCamera ? <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
                        <View style={styles.container}>
                            <Camera.Camera ref={(ref) => setcamera(ref)} onCameraReady={onCameraReady} style={styles.camera} type={type} flashMode={flesh ? 2 : 0} autoFocus={autofocus} focusDepth={1} onMagicTap={() => { setautofocus(3) }} pictureSize='1200*1200' >

                                {/* =================================Preview================================= */}

                                {isPreview ?
                                    <View style={{ height: 800, width: '100%', borderRadius: 7, position: 'absolute', right: 5, top: 5, }}>
                                        <Image source={{ uri: imageUrl }} style={{ height: '100%', width: '100%' }} />
                                        <View style={{ bottom: 30, position: 'absolute', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                            <Icon type='material-community' name='cloud-upload-outline' onPress={() => setopenCamera(false)} color={COLORS.White} size={36} style={{ position: 'absolute' }} onPressIn={() => { setgallery(COLORS.Danger) }} onPressOut={() => { setgallery(COLORS.White) }} />
                                            <Icon type='material-community' name='close' onPress={cancelPreview} color={COLORS.White} size={36} style={{ position: 'absolute' }} onPressIn={() => { setgallery(COLORS.Danger) }} onPressOut={() => { setgallery(COLORS.White) }} />
                                        </View>
                                    </View> :
                                    <View style={{ height: '100%', width: '100%' }} >

                                        <View style={{ height: 40, width: 40, borderRadius: 7, position: 'absolute', right: 5, top: 15, flexDirection: 'row' }}>

                                            <Icon type='material-community' name='close' onPress={onClose} color={gallery} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setgallery(COLORS.Danger) }} onPressOut={() => { setgallery(COLORS.White) }} />
                                        </View>

                                        <View style={{ height: 40, width: 40, borderRadius: 7, position: 'absolute', bottom: 90, alignSelf: 'center' }}>
                                            <Icon type='material-community' name={flesh ? 'flashlight-off' : 'flashlight'} onPress={fleshLight} color={gallery} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setgallery(COLORS.Danger) }} onPressOut={() => { setgallery(COLORS.White) }} />
                                        </View>


                                        <View style={styles.buttonContainer}>

                                            <Icon type='material-community' name='folder-multiple-image' onPress={pickImage} color={gallery} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setgallery(COLORS.Danger) }} onPressOut={() => { setgallery(COLORS.White) }} />


                                            <Icon type='feather' name='aperture' onPress={onSnap} color={captureColor} size={50} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setcaptureColor(COLORS.Danger) }} onPressOut={() => { setcaptureColor(COLORS.White) }} />

                                            <Icon disabled={!isCameraReady} type='material-community' name='rotate-3d-variant' onPress={() => {
                                                setType(
                                                    type === Camera.Constants.Type.back
                                                        ? Camera.Constants.Type.front
                                                        : Camera.Constants.Type.back
                                                );
                                            }} color={rotatoColor} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setrotatoColor(COLORS.Danger) }} onPressOut={() => { setrotatoColor(COLORS.White) }} />

                                        </View>
                                    </View>
                                }
                                {/* =================================Preview================================= */}

                            </Camera.Camera>
                        </View>
                    </View> :
                        <View style={Styles.modalContainer}>

                            <View style={Styles.postContainer}>
                                {loading ?
                                    <View style={{ height: 10 }}><ProgressIndicator /></View> : null}

                                <Text style={[Styles.modalheadertext, { fontWeight: 'bold' }]}>Make Post</Text>
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
                                        placeholder={'Take a Picture'}
                                        editable={false}
                                        clickable={false}
                                        containerStyle={{ height: '100%', borderRadius: 1, padding: '1%' }}
                                        inputContainerStyle={{ borderColor: '#EAEAEA' }}
                                        rightIcon={<Icon name={'camera'} type={'font-awesome'} onPress={() => setopenCamera(true)} size={18} color={COLORS.primary} onp />}
                                    />
                                </TouchableOpacity>
                                <View style={Styles.buttons}>
                                    <TouchableOpacity onPress={() => setVisible(false)} style={Styles.cancel}><Text style={Styles.cancelText}>Cancel</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={handleAddPost} style={Styles.postbutton} ><Text style={Styles.postText}>Post</Text></TouchableOpacity>
                                </View>
                            </View>
                            <Snackbar
                                onDismiss={() => setalert(false)}
                                duration={615}
                                style={{ backgroundColor: COLORS.Danger }}
                                visible={alert}>
                                {alertMessage}
                            </Snackbar>
                        </View>}
                </Modal>

            </View>
            <View>
                <BottomSheet
                    modalProps={{}}
                    isVisible={isVisible}
                >
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
                style={{ backgroundColor: alertColor }}
                visible={alert}>
                {alertMessage}
            </Snackbar>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.Danger
    },
    camera: {
        height: '100%',
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 15,
        bottom: 20,
        position: 'absolute',
    },
    content: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',

    },
    button: {

    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        right: 10,
        color: COLORS.White
    },
});
const Styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.AppBackgroundColor,
        flex: 1,
        opacity: 1
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E9E9E9',
        width: '100%',
        justifyContent: 'space-between'
    },
    headingtext: {
        fontSize: SIZES.h1,
        fontWeight: '100'
    },
    touchable: {
        alignContent: 'flex-end',
        paddingRight: 15
    },
    subtitle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '4%'
    },
    text: {
        width: '72%',
        fontSize: 15
    },
    toggle: {
        alignContent: 'flex-end',
        marginLeft: '10%',
        marginTop: '2%'
    },
    profile: {
        width: 50,
        height: 50,
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row'
        , height: 60,
    },
    headertext: {
        fontSize: SIZES.h2,
        marginLeft: 20,
    },
    post: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: '-2%',
        textAlign: 'center'
    },
    question: {
        padding: 3,
        fontSize: SIZES.body4,
        width: '100%'
    },
    iconContainer: {
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
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        width: 250
    }

});

export default QList;