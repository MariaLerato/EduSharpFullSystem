import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Picker,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { COLORS, SIZES } from "../constants";
import {
  Icon,
  Input,
  ListItem,
  BottomSheet,
  Card,
} from "react-native-elements";
import Info from "../mock/Q&A";
const width = Dimensions.get("window").width / 2 - 30;

// import { Icon } from "react-native-paper/lib/typescript/components/List/List";

const Search = ({ navigation }) => {
  const [categoryIndex, setCategoryIndex] = React.useState(0);
  const categories = [{item:"Q As",location:'QList'}, {item:"Material",location:'Material'},{ item:"Lesson",location:'QList'}, {item:"Papers",location:'QList'}];

  const CategoryList = () => {
    return (
      <View style={Styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity style={Styles.cat}
            key={index}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(item.location)>  setCategoryIndex(index)}>
          
            <Text
              style={[
                Styles.categoryText,
                categoryIndex === index && Styles.categoryTextSelected,
              ]}
            >
              {item.item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const [isVisible, setIsVisible] = useState(false);
  const [share, setShare] = useState(false);
  const [modalVisible, setVisible] = useState(false);

  const Qcard = () => {
    return (
      <View style={{ width: "100%", marginLeft: "-2%" }}>
        {Info.info.map((data) => (
          <Card
            key={data.id}
            containerStyle={{ borderRadius: 10, marginRight: "1%" }}
          >
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
                      style={{
                        right: "0%",
                        marginBottom: 20,
                        width: 8,
                        height: 24,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Card.FeaturedTitle>
            <Card.FeaturedTitle style={Styles.post}>
              <View>
                <Text style={Styles.question}>{data.question}</Text>
                <Text>{data.question}</Text>
                <Text>{data.question}</Text>
              </View>
            </Card.FeaturedTitle>
            <Card.FeaturedTitle style={{ padding: "1%", marginTop: "4%" }}>
              <View style={Styles.iconContainer}>
                <View
                  style={{
                    marginLeft: 5,
                    marginBottom: -20,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Icon
                    name={"thumbs-up"}
                    type={"font-awesome"}
                    style={{ width: 45, height: 45 }}
                    color={"#3D93D1"}
                  />
                  <Text>{data.number}</Text>
                </View>
                <View style={{ marginLeft: 35, marginBottom: -20 }}>
                  <Icon
                    name={"star-o"}
                    type={"font-awesome"}
                    style={{ width: 40, height: 40 }}
                    color={"#3D93D1"}
                  />
                </View>
                <View style={{ marginLeft: 35, marginBottom: -20 }}>
                  <Icon
                    name={"share-alt"}
                    type={"font-awesome"}
                    style={{ width: 38, height: 38 }}
                    color={"#3D93D1"}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    marginLeft: 35,
                    alignSelf: "flex-end",
                    marginBottom: -18,
                  }}
                  onPress={() => navigation.navigate(data.location)}
                >
                  <Icon
                    name={"comment"}
                    type={"font-awesome"}
                    style={{ width: 38, height: 38 }}
                    color={"#3D93D1"}
                  />
                </TouchableOpacity>
              </View>
            </Card.FeaturedTitle>
          </Card>
        ))}
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <View style={Styles.back}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.Black}
            onPress={navigation.goBack}
          />
        </View>
        <View style={Styles.touchable}>
          <TextInput placeholder="Search" style={{ color: COLORS.grey }} />
          <Icon name="search" color={COLORS.primary} size={28} />
        </View>
      </View>

      <CategoryList />
      <ScrollView>
        <View style={Styles.subtitle}></View>
        <Qcard />
      </ScrollView>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          width: 60,
          height: 60,
          borderRadius: 40,
          backgroundColor: "#4B7BE8",
          justifyContent: "center",
          alignSelf: "flex-end",
          marginTop: "-16%",
          marginBottom: "1%",
        }}
      >
        <Icon
          name={"plus"}
          type={"font-awesome"}
          size={30}
          color={COLORS.White}
        />
      </TouchableOpacity>
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setVisible(!modalVisible);
          }}
          presentationStyle={"overFullScreen"}
        >
          <View style={Styles.modalContainer}>
            <View style={Styles.postContainer}>
              <Text style={Styles.modalheadertext}>Make Post</Text>
              <View style={Styles.picker}>
                <Picker>
                  <Picker.Item label="Select grade" />
                </Picker>
              </View>
              <View style={Styles.picker}>
                <Picker>
                  <Picker.Item label="Select Subject" />
                </Picker>
              </View>
              <View style={Styles.modalInput}>
                <Input
                  placeholder={"State the topic"}
                  containerStyle={{
                    backgroundColor: COLORS.White,
                    height: "100%",
                    borderRadius: 10,
                    padding: "1%",
                  }}
                  inputContainerStyle={{ borderColor: "white" }}
                />
              </View>
              <View style={Styles.modalInputDes}>
                <Input
                  placeholder={"Description"}
                  containerStyle={{
                    backgroundColor: COLORS.White,
                    height: "100%",
                    borderRadius: 10,
                    padding: "2%",
                  }}
                  inputContainerStyle={{ borderColor: "white" }}
                />
              </View>
              <TouchableOpacity style={Styles.fileContainer}>
                <Input
                  placeholder={"Add a Photo"}
                  containerStyle={{ height: "100%", borderRadius: 20 }}
                  inputContainerStyle={{ borderColor: "#EAEAEA" }}
                  rightIcon={
                    <Icon
                      name={"image"}
                      type={"font-awesome"}
                      size={18}
                      color={COLORS.primary}
                    />
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.fileContainer}>
                <Input
                  placeholder={"Take a Picture"}
                  containerStyle={{
                    height: "100%",
                    borderRadius: 1,
                    padding: "1%",
                  }}
                  inputContainerStyle={{ borderColor: "#EAEAEA" }}
                  rightIcon={
                    <Icon
                      name={"camera"}
                      type={"font-awesome"}
                      size={18}
                      color={COLORS.primary}
                    />
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.fileContainer}>
                <Input
                  placeholder={"Add pdf,doc, or"}
                  containerStyle={{
                    borderRadius: 1,
                    padding: "1%",
                    height: "100%",
                  }}
                  inputContainerStyle={{ borderColor: "#EAEAEA" }}
                  rightIcon={
                    <Icon
                      name={"file"}
                      type={"font-awesome"}
                      size={18}
                      color={COLORS.primary}
                    />
                  }
                />
              </TouchableOpacity>
              <View style={Styles.buttons}>
                <TouchableOpacity
                  onPress={() => setVisible(false)}
                  style={Styles.cancel}
                >
                  <Text style={Styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => alert("Post successfully uploaded")}
                  style={Styles.postbutton}
                >
                  <Text style={Styles.postText}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
export default Search;

const Styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: COLORS.AppBackgroundColor,
    flex: 1,
    padding: "2%",
    opacity: 1,
    marginTop:StatusBar.currentHeight
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: "4%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E9E9E9",
    backgroundColor: "blue",
  },
  headingtext: {
    fontSize: SIZES.h1,
    fontWeight: "100",
  },
  touchable: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    flexDirection: "row",
   flex:1,
    marginLeft: 40,
    borderRadius: 15,

    paddingVertical: 10,
    justifyContent: "space-between",
  },
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
  cat:{
      backgroundColor:'white',
      paddingHorizontal:10,
      height:30,
      borderRadius:20,
    
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    width: 250,
  },
});
