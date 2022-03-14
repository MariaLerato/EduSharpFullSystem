import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
  View,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
// import Icon from 'react-native-vector-icons/MaterialIcons'
import { Icon, Button } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

const Pro = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#ffffff" }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("../images/Rectangle.jpg")}
          style={{ height: Dimensions.get("window").height / 2.9 }}
        ></ImageBackground>
        {/*Bottom View*/}

        <View style={styles.bottomView}>
          <View style={styles.innerBottom}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              {" "}
              User Name
            </Text>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              {" "}
              Learner: Grade(0)
            </Text>

            <View style={{ marginLeft: 120, top: -50 }}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage.localUri }}
                  style={{ height: 120, width: 120, borderRadius: 60 }}
                />
              ) : (
                <Image
                  source={require("../images/Profile.jpg")}
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                    top: -120,
                    left: -20,
                    justifyContent: "center",
                  }}
                />
              )}
              {/* <Image source={{ uri: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-600w-193292033.jpg'}}
                style={{height:120,width:120,borderRadius:60,}}/> */}
              <TouchableOpacity
                style={{ marginLeft: 70, marginTop: -160 }}
                mode="contained"
                onPress={openImagePickerAsync}
              >
                <FontAwesome name="camera" size={29} color="grey" />
              </TouchableOpacity>
            </View>
            <View style={styles.boxcontainer}>
              {/* <Icon name="logout" size={25} style={{ color: 'red' }}
                        onPress={navigation.goBack}
                         
                          /> */}
              <Text style={styles.boxText}>Personal Information</Text>
            </View>

            <View style={styles.boxcontainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* <Icon name="logout" size={25} style={{ bottom:-20 }}
                        onPress={navigation.goBack}
                         
                          /> */}
                <TouchableOpacity onPress={()=>navigation.navigate('profile')} >
                  <Text style={styles.boxText}>Educational Information</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.logOut}>
              <Icon
                name="logout"
                size={25}
                color="red"
                onPress={navigation.goBack}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Pro;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  innerBottom: {
    paddingHorizontal: 15,
    top: 50,
  },

  bottomView: {
    flex: 1.5,
    backgroundColor: "#fff",
    bottom: 40,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },

  boxcontainer: {
    width: width / 1.1,
    height: height / 12.3,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  logOut: {
    paddingTop: 130,
  },
  containerStyle: {
    width: 300,
    marginVertical: 10,
    borderColor: "gray",
    elevation: 12,
  },
  buttonStyle: {
    backgroundColor: "white",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.2)",
  },

  boxText: {
    fontSize: 16,
    marginTop: 15,
  },
});
