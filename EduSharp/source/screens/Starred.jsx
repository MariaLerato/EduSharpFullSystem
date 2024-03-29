import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Picker,
} from "react-native";
import {
  Card,
  Icon,
  Input,
  ListItem,
  BottomSheet,
} from "react-native-elements";
import { COLORS, SIZES } from "../constants";
import { Switch } from "react-native-switch";
import Info from "../mock/Q&A";
import Post from "./PostQuestion";
import { auth, firestore } from "../BackendFirebase/configue/Firebase";
import Anim from "../components/LottieComponent";
import QAComponent from './../components/materialcomponent';
import LessonComponent from "../components/lessonComponent";
import MaterialComponent from "./../components/materialcomponent";

const Starred = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [share, setShare] = useState(false);
  const [modalVisible, setVisible] = useState(false);
  const [post, setpost] = useState([]);


  const getPost = async () => {
    await firestore.collection("stares").where("user", "==", auth.currentUser.uid).get().then(async (starepost) => {
      const data = [];
      starepost.forEach(async (documentSnapshot) => {
        await firestore.collection(documentSnapshot.data().post).doc(documentSnapshot.data().postKey).get().then(async (res) => {

          await firestore.collection("users").doc(documentSnapshot.data().user).get().then(async (res) => {

            await firestore.collection("likes").where('postKey', '==', documentSnapshot.id).get().then(async (reslikes) => {

              await firestore.collection("comments").where('postKey', '==', documentSnapshot.id).get().then(async (rescomments) => {

                console.log(reslikes.size, rescomments.size, "==>>==>");
                let dataset = {
                  key: documentSnapshot.id,
                  likes: reslikes.size,
                  post: documentSnapshot.data().post,
                  comments: rescomments.size,
                  createdAt: documentSnapshot.data().createdAt,
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
                data.push(dataset);
              })

            })
            setpost(data);
            console.log(data);
          })
        })


      }).catch(err => {
        console.log('====================================');
        console.log(err, "==>>==>");
        console.log('====================================');
      });
    })
  }

  useEffect(() => {
    getPost();
  }, [])

  return (
    <View style={Styles.container}>
      
      <ScrollView>
        {post.length > 0 ? <FlatList data={post} renderItem={(data, index) => (
          <View>
            {data.item.post == "questionpapers" ?
              <QAComponent data={data} onPress={() => { }} profilePress={() => { }} menuPress={() => { setpostObject(data.item); console.log(data.item); setkey(data.item.key); setuserID(data.item.userID); setIsVisible(true) }}
                likePress={() => { handleLike(data.item.key, data.item.token, data.item.topic, data.item.description) }} sterePress={() => { handleStare(data.item.key) }} sharePress={() => { handleShare(data.item.key, data.item.token, data.item.topic, data.item.description) }} commentsPress={() => { navigation.navigate("Replies", { key: data.item.key, type: "qa" }) }} navigation={navigation} /> : null}

            {data.item.post == "questionAndAnswers" ?
              <MaterialComponent data={data} onPress={() => { }} profilePress={() => { }} menuPress={() => { setpostObject(data.item); console.log(data.item); setkey(data.item.key); setuserID(data.item.userID); setIsVisible(true) }}
                likePress={() => { handleLike(data.item.key, data.item.token, data.item.topic, data.item.description) }} sterePress={() => { handleStare(data.item.key) }} sharePress={() => { handleShare(data.item.key, data.item.token, data.item.topic, data.item.description) }} commentsPress={() => { navigation.navigate("Replies", { key: data.item.key, type: "qa" }) }} navigation={navigation} /> : null}
            {data.item.post == "lessons" ?
              <LessonComponent data={data} onPress={() => { }} profilePress={() => { }} menuPress={() => { setpostObject(data.item); console.log(data.item); setkey(data.item.key); setuserID(data.item.userID); setIsVisible(true) }}
                likePress={() => { handleLike(data.item.key, data.item.token, data.item.topic, data.item.description) }} sterePress={() => { handleStare(data.item.key) }} sharePress={() => { handleShare(data.item.key, data.item.token, data.item.topic, data.item.description) }} commentsPress={() => { navigation.navigate("Replies", { key: data.item.key, type: "qa" }) }} navigation={navigation} /> : null}</View>
        )}
        /> :
          <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ paddingVertical: 10, height: 250, justifyContent: 'center', alignItems: 'center' }}>
              <Anim json={require('../../assets/lootie/93461-loading.json')} autoplay={true} autosize={false} loop={true} speed={1} style={{ height: 65, width: 65, backgroundColor: COLORS.AppBackgroundColor }} />
            </View>
          </View>

        }
      </ScrollView>

      <View>
        <BottomSheet modalProps={{}} isVisible={isVisible}>
          <View style={{ paddingBottom: "1%", borderRadius: 5 }}>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Icon
                name={"arrow-down"}
                type={"font-awesome"}
                color={"#EAEAEA"}
              />
            </TouchableOpacity>
            {Info.items.map((item, l) => (
              <ListItem
                key={item.id}
                style={{ color: "#7DB4DA", borderRadius: 20 }}
              >
                <ListItem.Content
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Icon
                    type={"font-awesome"}
                    name={item.icon}
                    size={20}
                    color={"#7DB4DA"}
                    style={{ margin: "2%" }}
                  />
                  <ListItem.Title
                    style={{
                      color: "#7DB4DA",
                      fontWeight: "600",
                      paddingLeft: "2%",
                      fontSize: 16,
                    }}
                  >
                    {item.name}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.AppBackgroundColor,
    flex: 1,
    padding: "2%",
    opacity: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  headingtext: {
    fontSize: SIZES.h3,
    fontWeight: "600",
    paddingLeft: "10%",

  },
  touchable: {},
  subtitle: {
    display: "flex",
    flexDirection: "row",
    marginTop: "4%",
  },
  text: {
    width: "72%",
    fontSize: 15,
  },
  toggle: {
    alignContent: "flex-end",
    marginLeft: "10%",
    marginTop: "2%",
  },
  profile: {
    width: 50,
    height: 50,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    height: 60,
  },
  headertext: {
    fontSize: SIZES.h2,
    marginLeft: 20,
  },
  post: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "3%",
    marginTop: "-2%",
    textAlign: "center",
  },
  question: {
    padding: "2%",
    fontSize: SIZES.body4,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "black",
    opacity: 0.8,
  },
  postContainer: {
    backgroundColor: COLORS.AppBackgroundColor,
    height: "90%",
    width: "90%",
    borderRadius: 20,
    alignItems: "center",
    marginTop: "5%",
    paddingTop: "6%",
  },
  picker: {
    width: "90%",
    backgroundColor: COLORS.White,
    margin: "1%",
    borderRadius: 10,
  },
  modalInput: {
    width: "90%",
    backgroundColor: COLORS.White,
    margin: "1%",
    height: "9%",
    borderRadius: 10,
  },
  modalInputDes: {
    width: "90%",
    backgroundColor: COLORS.White,
    margin: "1%",
    borderRadius: 10,
    height: "15%",
  },
  modalheadertext: {
    fontSize: SIZES.h2,
    margin: "4%",
  },
  fileContainer: {
    width: "90%",
    backgroundColor: "#EAEAEA",
    margin: "1%",
    height: "9%",
    borderRadius: 20,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: "40%",
  },
  cancel: {
    marginTop: "4%",
    width: "40%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "4%",
  },
  postbutton: {
    marginTop: "4%",
    width: "45%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginBottom: "4%",
  },
  postText: {
    color: "white",
    fontSize: 18,
  },
  cancelText: {
    color: "black",
    fontSize: 18,
    paddingRight: "14%",
  },
  bottomInputDes: {
    backgroundColor: "#f2f2f2",
    margin: "auto",
    borderRadius: 15,
    padding: "auto",
    width: "85%",
    height: 150,
    marginTop: "6%",
  },
  SheetfileContainer: {
    backgroundColor: "#f2f2f2",
    margin: "auto",
    borderRadius: 25,
    height: 55,
    marginTop: "2%",
    width: "85%",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    width: 250,
  },
});
export default Starred;
