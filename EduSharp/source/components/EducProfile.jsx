import {
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Overlay, Icon } from "react-native-elements";
import { COLORS } from "../constants";
const overViewWidth = Dimensions.get("screen").width * 0.9;
const overViewHieght = Dimensions.get("screen").height * 0.4;
const subjects = [
  {
    name: "English Home Language",
    icon: "language",
  },
  {
    name: "Mathematics",
    icon: "calculator",
  },
  {
    name: "Life Science",
    icon: "flask",
  },
  {
    name: "Geography",
    icon: "globe",
  },
  {
    name: "Physical Science",
    icon: "flask",
  },
  {
    name: "Mathematical Literacy",
    icon: "calculator",
  },
];
const EducProfile = () => {
  const [grade, setGrade] = useState();
  const [visible, setVisible] = useState(false);
  const [subject, setSubject] = useState();
  const [mySubject, subMySubject] = useState([]);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const handleSubjectAdd = (sub) => {
    toggleOverlay();
    setSubject(sub);
    if(!mySubject.includes(sub)){
        subMySubject([...mySubject, sub]);
    }
  };
  console.log(mySubject);
  const DialogView = () => (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{ width: overViewWidth, height: overViewHieght }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,.2)",
          padding: 10,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          marginBottom: 15,
        }}
      >
        <Icon
          name="search"
          type="font-awesome"
          color="rgba(0,0,0,.2)"
          size={20}
          style={{ marginRight: 5 }}
        />
        <TextInput placeholder="Search Subject" style={{ flex: 1 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.name}
            onPress={() => handleSubjectAdd(subject)}
            style={{
              padding: 10,
              borderColor: "rgba(0,0,0,.1)",
              borderWidth: 1,
              marginBottom: 5,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
            activeOpacity={0.7}
          >
            <Icon
              name={subject.icon}
              type="font-awesome"
              color="rgba(0,0,0,.2)"
              size={20}
              style={{ marginRight: 5 }}
            />
            <Text>{subject.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Overlay>
  );

  return (
    <View
      style={{ flex: 1, width: "100%", paddingHorizontal: 20, marginTop: 15 }}
    >
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Education
      </Text>
      <Picker
        selectedValue={grade}
        style={styles.pickersty}
        onValueChange={(itemValue, itemIndex) => setGrade(itemValue)}
      >
        <Picker.Item label="Grade 8" value="8" />
        <Picker.Item label="Grade 9" value="9" />
        <Picker.Item label="Grade 10" value="10" />
        <Picker.Item label="Grade 11" value="11" />
        <Picker.Item label="Grade 12" value="12" />
      </Picker>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Enrolled Subjects
        </Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setVisible(true)}>
          <Text style={{ color: "#3D93D1", fontWeight: "bold" }}>
            +Add new subject
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop:20}} showsVerticalScrollIndicator={false}>
        {mySubject.map((subject) => (
          <View
          key={subject.name}
            style={{
              padding: 10,
              borderColor: "rgba(0,0,0,.1)",
              borderWidth: 1,
              marginBottom: 5,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              name={subject.icon}
              type="font-awesome"
              color="rgba(0,0,0,.2)"
              size={20}
              style={{ marginRight: 5 }}
            />
            <Text>{subject.name}</Text>
          </View>
        ))}
      </ScrollView>
      <DialogView />
    </View>
  );
};

export default EducProfile;

const styles = StyleSheet.create({
  pickersty: {
    height: 50,
    width: "100%",
    borderWidth: 0,
  },
});
