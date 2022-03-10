import React, { useState } from "react";
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
import { COLORS } from "../constants";

const HomeScreen = ({ navigation }) => {
  const [dataSource, setDataSource] = useState([
    {
      caption: "Cape Town",
      title: "Lima offer examples for water",
      author: "by Varun Singh",
      date: "7 Jun 2021",
      url: "https://images.pexels.com/photos/2837863/pexels-photo-2837863.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      caption: "Johannesburg",
      title: "Rush Hour",
      author: "by Marget Bolepo",
      date: "7 Sept 2021",
      url: "http://placeimg.com/640/480/any",
    },
    {
      caption: "Cape Town",
      title: "Natural Disasters",
      author: "by Varun Singh",
      date: "17 Oct 2021",
      url: "https://images.pexels.com/photos/753619/pexels-photo-753619.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ]);

  return (
    <View>
      <View
        style={{ margin: 30, borderTopRadius: 5, borderTopRightRadius: 5 }}
      >
        <Slideshow
          style={{ borderTopRightRadius: 20 }}
          dataSource={dataSource}
          containerStyle={{ borderRadius: 15, overflow: "hidden" }}
          height={180}
          titleStyle={{ color: "white", fontSize: 20, fontWeight: "700" }}
          captionStyle={{ color: "white" }}
          arrow={false}
        />
      </View>

      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: '2%',
        }}
      >
        <Card style={{ width: 150, height: 100, alignContent: 'center', justifyContent: 'center', borderRadius: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Material")}>
            <View style={{ alignSelf: 'center', top: 20, }}>
              <FontAwesome5
                name="folder-open"
                size={30}
                color="#4B7BE8"
                margin={20}
              />
            </View>

            <Text
              style={{
                fontSize: 20,

                textAlign: "center",
                top: 30,
              }}
            >
              Materials
            </Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ width: 150, height: 100, alignContent: 'center', justifyContent: 'center', borderRadius: 20, }}>
          <TouchableOpacity onPress={() => navigation.navigate("lessonscreen")}>
            <View style={{ alignSelf: 'center', top: 20, }} >
              <FontAwesome5
                name="edit"
                size={30}
                color="#4B7BE8"
                margin={20}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                top: 30,
              }}
            >
              Lessons
            </Text>
          </TouchableOpacity>
        </Card>
      </View>

      <View
        style={{

          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: '30%',
          padding: '2%'
        }}
      >
        <Card style={{ width: 150, height: 100, alignContent: 'center', justifyContent: 'center', borderRadius: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("QList")}>
            <View style={{ top: 20, alignSelf: 'center' }}>
              <FontAwesome5
                name="question-circle"
                size={30}
                color="#4B7BE8"
                margin={20}
              />
            </View>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "normal",
                textAlign: "center",
                top: 30,

              }}
            >
              Q'As
            </Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ width: 150, height: 100, alignContent: 'center', justifyContent: 'center', borderRadius: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("questionpaperscreen")}>
            <View style={{ top: 20, alignSelf: 'center' }}>
              <FontAwesome5
                name="copy"
                size={30}
                color="#4B7BE8"
                margin={20}
              />
            </View>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "normal",
                textAlign: "center",
                top: 30,

              }}
            >
              Papers
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};

export default HomeScreen;
