import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Info from '../mock/Q&A'
import { img, COLORS, SIZES } from "../constants";
import { Card, Icon, BottomSheet, ListItem, Input, Image } from 'react-native-elements'
import QAComponent from "../components/materialcomponent";
import GeneralService from "../BackendFirebase/services/GeneralService";
import { auth, firestore } from "../BackendFirebase/configue/Firebase";
import { useRoute } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import CommentComponent from "../components/commentComponent";

const RepliesContainer = ({ navigation }) => {

    const params = useRoute().params;
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
    const [commenting, setcommenting] = useState(false);
    const [days, setdays] = useState('');
    const [comment, setcomment] = useState('');
    const [comments, setcomments] = useState([]);

    const handleDaysCalculation = (date) => {

        var one_day = 1000 * 60 * 60 * 24;
        let today = new Date();
        let dateSent = new Date(date);

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


    const handleLike = (key) => {
        const data = {
            user: auth.currentUser.uid,
            postKey: key,
            createdAt: new Date()
        }
        GeneralService.post("likes", data, navigation).then(res => {
            setalert(true);
            setalertMessage("Liked");
        })
            .catch(err => {
                setalert(true);
                setalertMessage(err)
            })
    }

    const handleCommentLike = (key) => {
        const data = {
            user: auth.currentUser.uid,
            postKey: key,
            createdAt: new Date()
        }
        GeneralService.post("comment_likes", data, navigation).then(res => {
            setalert(true);
            setalertMessage("Liked");
        })
            .catch(err => {
                setalert(true);
                setalertMessage(err)
            })
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

    const handleShare = (key) => {
        const data = {
            user: auth.currentUser.uid,
            postKey: key,
            createdAt: new Date()
        }

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

    const getPost = async () => {
        await firestore.collection("questionAndAnswers").doc(params.key).get().then(async (documentSnapshot) => {

            await firestore.collection("users").doc(documentSnapshot.data().userID).get().then(async (res) => {

                await firestore.collection("likes").where('postKey', '==', documentSnapshot.id).get().then(async (reslikes) => {

                    await firestore.collection("comments").where('postKey', '==', documentSnapshot.id).get().then(async (rescomments) => {

                        var dateexpired = "";
                        var one_day = 1000 * 60 * 60 * 24;
                        let today = new Date();
                        let dateSent = new Date(documentSnapshot.data().createdAt);

                        var diff = today.getTime() - dateSent.getTime();                       
                        var minutes = Math.floor(diff / 1000 / 60);

                        var hours = Math.floor(diff / 36e5),
                            minutes = Math.floor(diff % 36e5 / 60000),
                            seconds = Math.floor(diff % 60000 / 1000);

                        if (hours < 24 && hours > 1) {
                            dateexpired = `${hours} h ago`;
                        } else if (hours <= 1) {

                            let days = hours / 24;
                            dateexpired = `${minutes} min ago`;
                        } else if (hours > 24) {

                            let days = hours / 24;
                            if (days < 2) {
                                let daycount = days.toString();
                                dateexpired = `${daycount.substring(0, daycount.indexOf('.'))} day ago`;
                            } else if (days > 1 && days < 29) {
                                let daycount = days.toString();
                                dateexpired = `${daycount.substring(0, daycount.indexOf('.'))} days ago`;
                            } else if (days > 30) {
                                let daycount = (days / 30).toString();
                                dateexpired = `${daycount.substring(0, daycount.indexOf('.'))} mon ago`;
                            }
                        }

                        let dataset = {
                            key: documentSnapshot.id,
                            likes: reslikes.size,
                            comments: rescomments.size,
                            datePosted: dateexpired,
                            description: documentSnapshot.data().description,
                            grade: documentSnapshot.data().grade,
                            downloadUrl: documentSnapshot.data().downloadUrl,
                            status: documentSnapshot.data().status,
                            subject: documentSnapshot.data().subject,
                            topic: documentSnapshot.data().topic,
                            userID: documentSnapshot.data().userID,
                            email: res.data().email,
                            location: res.data().location,
                            name: res.data().name,
                            image: res.data().profileUrl ? res.data().profileUrl : null,
                            phonenumber: res.data().phonenumber,
                        }


                        setpost(dataset);
                    })

                })
            });


        }).catch(err => {
            console.log('====================================');
            console.log(err, "==>>==>");
            console.log('====================================');
        });
    }

    const getComments = async () => {

        await firestore.collection("comments").where('postKey', '==', params.key).get().then(async (querySnapshot) => {

            const data = [];

            await querySnapshot.forEach(async (documentSnapshot) => {

                await firestore.collection("users").doc(documentSnapshot.data().user).get().then(async (res) => {
                    await firestore.collection("comment_likes").where('postKey', '==', documentSnapshot.id).get().then(async (reslikes) => {

                        console.log(res.data());
                        var dateexpired = "";
                        var one_day = 1000 * 60 * 60 * 24;
                        let today = new Date();
                        let dateSent = new Date(documentSnapshot.createdAt);

                        var diff = today.getTime() - dateSent.getTime();
                        //var hours = Math.floor(diff / 1000 / 60 / 60);
                        // diff -= hours * 1000 * 60 * 60;
                        var minutes = Math.floor(diff / 1000 / 60);

                        var hours = Math.floor(diff / 36e5),
                            minutes = Math.floor(diff % 36e5 / 60000),
                            seconds = Math.floor(diff % 60000 / 1000);

                        if (hours < 24 && hours > 1) {
                            dateexpired = `${hours} h ago`;
                        } else if (hours <= 1) {

                            let days = hours / 24;
                            dateexpired = `${minutes} min ago`;
                        } else if (hours > 24) {

                            let days = hours / 24;
                            if (days < 2) {
                                let daycount = days.toString();
                                dateexpired = `${daycount.substring(0, daycount.indexOf('.'))} day ago`;
                            } else if (days > 1 && days < 29) {
                                let daycount = days.toString();
                                dateexpired = `${daycount.substring(0, daycount.indexOf('.'))} days ago`;
                            } else if (days > 30) {
                                let daycount = (days / 30).toString();
                                dateexpired = `${daycount.substring(0, daycount.indexOf('.'))} mon ago`;
                            }
                        }

                        let dataset = {
                            key: documentSnapshot.id,
                            comment: documentSnapshot.data().comments,
                            datePosted: documentSnapshot.data().createdAt,
                            userID: documentSnapshot.data().user,
                            email: res.data().email,
                            likes: reslikes.size,
                            location: res.data().location,
                            name: res.data().name,
                            image: res.data().profileUrl ? res.data().profileUrl : null,
                            phonenumber: res.data().phonenumber,
                        }

                        data.push(dataset);
                        console.log('====================================');
                        console.log(dataset);
                        console.log('====================================');
                    })
                })
            })

            setcomments(data);
            console.log(data, "{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}");

        })
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
        getPost();
        getComments();
    }, [])


    return (
        <View style={[Styles.container, { height: '100%' }]}>
            <View style={Styles.header}>
                <Text style={Styles.headertext}>Q' As</Text>
            </View>

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
                    <Image onPress={() => { }} source={post.downloadUrl ? { uri: post.downloadUrl } : require("../../assets/images/user.png")} style={{ borderRadius: 45, width: 45, height: 45 }} />
                    <View style={{ paddingHorizontal: 10, width: '82%' }}>
                        <Text style={{ fontSize: SIZES.h2, fontWeight: 'bold' }}>{post.name}</Text>
                        <Text style={{ fontSize: SIZES.h4, }}>{post.datePosted}</Text>
                    </View>
                    <Icon onPress={() => { }} type="material-community" name="dots-vertical" />
                </View>

                <Text style={{ fontSize: SIZES.h2, }}>{post.topic}</Text>
                <Text style={{ fontSize: SIZES.h4 }}>{post.description}</Text>
                {post.downloadUrl ? <Image source={""} style={{ height: 210, width: '100%', borderRadius: 7 }} /> : null}
                <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />

                <View style={{ paddingHorizontal: 1, padding: '1%', marginTop: 'auto' }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={{ fontSize: SIZES.h4, textAlign: 'right' }}>{post.likes} comment</Text>
                        </TouchableOpacity>
                        <View style={[{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }]}>
                            <View style={{ marginLeft: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Icon onPress={handleLike} name={'thumb-up'} type={'material-community'} size={26} color={'#3D93D1'} />
                                <Text style={{ fontSize: SIZES.h4, marginHorizontal: 5 }}>{post.likes}</Text>
                            </View>
                            <Icon onPress={handleStare} name={'star-outline'} type={'material-community'} size={26} color={'#f79f45'} />
                            <Icon onPress={handleShare} name={'share-all'} type={'material-community'} size={26} color={'#3D93D1'} />
                            <Icon name={'comment'} type={'material-community'} size={26} color={'#3D93D1'} onPress={() => { commenting ? setcommenting(false) : setcommenting(true) }} />
                        </View>
                    </View>
                </View>

                <Divider style={{ height: 3, width: '100%', backgroundColor: COLORS.AppBackgroundColor }} />
            </View>
            <Text style={[Styles.subtext, { fontSize: SIZES.body3, fontWeight: '900' }]}>Replies</Text>

            <View style={{ paddingLeft: 20 }}>
                <FlatList data={comments} renderItem={(data, index) => (
                    <CommentComponent data={data} onPress={() => { }} profilePress={() => { }} menuPress={() => { setkey(data.item.key); setuserID(data.item.userID); setIsVisible(true) }}
                        likePress={() => { handleCommentLike(data.item.key) }} sterePress={() => { handleStare(data.item.key) }} sharePress={() => { handleShare(data.item.key) }} commentsPress={() => { navigation.navigate("Replies", { key: data.item.key, type: "qa" }) }} navigation={navigation} />
                )}
                />
            </View>
            {commenting ? <View style={{ position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', alignItems: 'center', paddingRight: 30 }}>
                <Input style={{ maxHeight: 180, minHeight: 45, }} values={comment} onChangeText={(e) => { setcomment(e) }} keyboardType={"default"} multiline />
                <Icon type='material-community' name='send' onPress={() => { handleComment(post.key) }} />
            </View> : null}
            <View>
                <BottomSheet
                    modalProps={{}}
                    isVisible={isVisible}>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => setIsVisible(false)}>
                            <Icon name={'arrow-down'} type={'font-awesome'} color={'#EAEAEA'} />
                        </TouchableOpacity >
                        {
                            Info.items.map((item, l) =>
                                <ListItem key={item.id} style={{ color: '#7DB4DA', }} >
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
            <View style={{ alignContent: 'center' }} >
                <BottomSheet
                    modalProps={{}}
                    isVisible={share}>
                    <View style={{ backgroundColor: 'white', borderTopEndRadius: 25, borderTopStartRadius: 25, margin: 'auto', alignItems: 'center' }}>
                        <View style={Styles.bottomInputDes}>
                            <Input
                                placeholder={'Share your answer'}
                                containerStyle={{ backgroundColor: '#f2f2f2', borderRadius: 10, padding: '2%', height: '100%' }}
                                inputContainerStyle={{ borderColor: '#f2f2f2' }}

                            />
                        </View>
                        <View style={{ width: '100%', margin: 'auto', alignItems: 'center' }}>
                            <TouchableOpacity style={Styles.SheetfileContainer}>
                                <Input
                                    placeholder={'Add a Photo'}
                                    containerStyle={{ borderRadius: 20 }}
                                    inputContainerStyle={{ borderColor: '#f2f2f2' }}
                                    rightIcon={<Icon name={'image'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.SheetfileContainer}>
                                <Input
                                    placeholder={'Take a Picture'}
                                    containerStyle={{ borderRadius: 1, padding: '1%' }}
                                    inputContainerStyle={{ borderColor: '#f2f2f2' }}
                                    rightIcon={<Icon name={'camera'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.SheetfileContainer}>
                                <Input
                                    placeholder={'Add pdf,doc, or'}
                                    containerStyle={{ borderRadius: 1, padding: '1%', }}
                                    inputContainerStyle={{ borderColor: '#f2f2f2' }}
                                    rightIcon={<Icon name={'file'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                />
                            </TouchableOpacity>
                            <View style={Styles.buttons}>
                                <TouchableOpacity onPress={() => setShare(false)} style={Styles.cancel}><Text style={Styles.cancelText}>Cancel</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => alert('Post successfully uploaded')} style={Styles.postbutton} ><Text style={Styles.postText}>Post</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </BottomSheet>
            </View>

        </View>
    );
}
const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F4F4',
        flex: 1,
        padding: '1%'
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',

    },
    subtext: {
        marginVertical: 4,
        marginHorizontal: 3,
        fontSize: SIZES.h4,

    },
    headertext: {
        fontSize: SIZES.h1,
        marginLeft: 20
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E9E9E9'
    },
    post: {
        width: '100%',
        paddingLeft: '-4%',
        marginTop: '2%',
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
    profile: {
        width: 50,
        height: 50,
    },
    repliyHeader: {
        fontSize: SIZES.h3,
        marginLeft: 10
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
    }
})
export default RepliesContainer