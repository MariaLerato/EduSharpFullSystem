import React, { useState } from "react";
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

const Starred = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [share, setShare] = useState(false);
  const [modalVisible, setVisible] = useState(false);

  const Postcard = () => {
    return (
      <View>
        {Info.info.map((data) => (
          <Card key={data.id} containerStyle={{ borderRadius: 10 }}>
            <Card.FeaturedTitle style={Styles.cardHeader}>
              <View style={Styles.headerContainer}>
                <Card.Image source={data.pic} style={Styles.profile} />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#4545ede",
                    width: "100%",
                  }}
                >
                  <View>
                    <Text style={Styles.headertext}>{data.username}</Text>
                    <Text style={{ marginLeft: 20 }}>{data.time}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setIsVisible(true)}
                    style={{ alignSelf: "flex-end" }}
                  >
                    <Icon
                      name={"ellipsis-v"}
                      type={"font-awesome"}
                      style={{ marginBottom: 20, width: 8, height: 24 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Card.FeaturedTitle>
            <Card.FeaturedTitle style={Styles.post}>
              <TouchableOpacity onPress={()=>navigation.navigate('StarredReplies')}>
                <Text style={Styles.question}>{data.question}</Text>
                <Text>{data.question}</Text>
                <Text>{data.question}</Text>
              </TouchableOpacity>
            </Card.FeaturedTitle>
          </Card>
        ))}
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Icon name={"star"} type={"font-awesome"} color={'#FFBE3F'} />
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            width: 350,
          }}
        >
          <Text style={Styles.headingtext}>Starred Posts</Text>
          <TouchableOpacity style={Styles.touchable}>
            <Icon
              name="search"
              type="font-awesome"
              size={23}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <Postcard />
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
