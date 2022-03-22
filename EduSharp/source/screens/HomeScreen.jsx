import React, { useState, useEffect, useRef } from "react";
import Constants from 'expo-constants';
import {
  Button,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Icon, Text } from "react-native-elements";
import Slideshow from "react-native-image-slider-show";
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from "react-native-paper";
//import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Styles from './../style/onBoarding';
import { COLORS, SIZES } from "../constants";
import * as Notifications from 'expo-notifications';
import { auth, firestore } from "../BackendFirebase/configue/Firebase";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [name, setName] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();


  // Function that request no
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.set()).data;
      console.log(token);
      await Notifications.subscribe(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    UpdateToken(token);
  }

  const UpdateToken = async (token) => {
    await firestore.collection("users").doc(auth.currentUser.uid).update({ token: token }).then(async (querySnapshot) => {
      console.log(querySnapshot);
      console.log(key);
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
                caption: documentSnapshot.data().description,
                grade: documentSnapshot.data().grade,
                url: documentSnapshot.data().downloadUrl,
                status: documentSnapshot.data().status,
                subject: documentSnapshot.data().subject,
                title: documentSnapshot.data().topic,
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
          console.log(data, "====>>>");
          setDataSource(data);
        });


      }).catch(err => {
        console.log('====================================');
        console.log(err, "==>>==>");
        console.log('====================================');
      });
    })
  }


  const getProfile = async () => {
    await firestore.collection("users").doc(auth.currentUser.uid).get().then(async (documentSnapshot) => {
      setName(documentSnapshot.data().name);
    })
  }
  useEffect(() => {

    getPost();
    getProfile();
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);

  return (
    <View>
      
      <Text style={{ fontSize: SIZES.h4, margin: 15, }}>Hi <Text style={{ fontSize: SIZES.h4, fontWeight: 'bold' }}>{name}</Text> , Please check the latest post by friends and teachers.</Text>
      <View style={{ marginHorizontal: 30, borderTopRadius: 5, borderTopRightRadius: 5 }} >
        <Slideshow
          style={{ borderTopRightRadius: 20 }}
          dataSource={dataSource}
          containerStyle={{ borderRadius: 15, overflow: "hidden" }}
          height={210}
          titleStyle={{ color: "white", fontSize: 20, fontWeight: "700" }}
          captionStyle={{ color: "white" }}
          arrow={true}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 30
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Material")}>
          <View style={{
            alignSelf: 'center', width: 150, height: 100,
            alignContent: 'center', justifyContent: 'center', borderRadius: 9,
            backgroundColor: COLORS.White, shadowColor: "#000",
            shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.43, shadowRadius: 9.51, elevation: 15,
          }}>
            <View style={{ alignSelf: 'center', justifyContent: 'center', paddingVertical: 5 }}>
              <FontAwesome5
                name="folder-open"
                size={30}
                color="#4B7BE8"

              />
            </View>
            <Text style={{ fontSize: 18, fontWeight: 'normal', textAlign: "center", }}>
              Material
            </Text>
          </View>


        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("lessonscreen")}>
          <View style={{
            alignSelf: 'center', width: 150, height: 100,
            alignContent: 'center', justifyContent: 'center', borderRadius: 9,
            backgroundColor: COLORS.White, shadowColor: "#000",
            shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.43, shadowRadius: 9.51, elevation: 15,
          }}>
            <View style={{ alignSelf: 'center', justifyContent: 'center', paddingVertical: 5 }}>
              <FontAwesome5
                name="edit"
                size={30}
                color="#4B7BE8"
              />
            </View>
            <Text style={{ fontSize: 18, fontWeight: 'normal', textAlign: "center", }}>
              Lessons
            </Text>
          </View>


        </TouchableOpacity>

      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >

        <TouchableOpacity onPress={() => navigation.navigate("QList")}>
          <View style={{
            alignSelf: 'center', width: 150, height: 100,
            alignContent: 'center', justifyContent: 'center', borderRadius: 9,
            backgroundColor: COLORS.White, shadowColor: "#000",
            shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.43, shadowRadius: 9.51, elevation: 15,
          }}>
            <View style={{ alignSelf: 'center', justifyContent: 'center', paddingVertical: 5 }}>
              <FontAwesome5
                name="question-circle"
                size={30}
                color="#4B7BE8"

              />
            </View>
            <Text style={{ fontSize: 18, fontWeight: 'normal', textAlign: "center", }}>
              Q'As
            </Text>
          </View>


        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate("questionpaperscreen")}>
          <View style={{
            alignSelf: 'center', width: 150, height: 100,
            alignContent: 'center', justifyContent: 'center', borderRadius: 9,
            backgroundColor: COLORS.White, shadowColor: "#000",
            shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.43, shadowRadius: 9.51, elevation: 15,
          }}>
            <View style={{ alignSelf: 'center', justifyContent: 'center', paddingVertical: 5 }}>
              <FontAwesome5
                name="copy"
                size={30}
                color="#4B7BE8"

              />
            </View>
            <Text style={{ fontSize: 18, fontWeight: 'normal', textAlign: "center", }}>
              Papers
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default HomeScreen;
