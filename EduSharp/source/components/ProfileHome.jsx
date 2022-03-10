import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon, Button } from "react-native-elements";

const ProfileHome = ({ setLocation }) => {
  return (
    <View>
      <Button
        title="Personal Information"
        titleStyle={{ fontWeight: "bold" ,color:'black' }}
        containerStyle={styles.containerStyle}
        buttonStyle={styles.buttonStyle}
        icon={{ name: "user", type: "font-awesome", size: 15, color: "black" }}
        iconContainerStyle={{ marginRight: 10 }}
        onPress={()=>setLocation("Profile")}
      />
      <Button
        title={"Educational Information"}
        titleStyle={{ fontWeight: "bold" ,color:'black'}}
        containerStyle={styles.containerStyle}
        buttonStyle={styles.buttonStyle}
        icon={{ name: "graduation-cap", type: "font-awesome", size: 15, color: "black" }}
        iconContainerStyle={{ marginRight: 10 }}
        onPress={()=>setLocation("Education")} 
      />
    </View>
  );
};

export default ProfileHome;

const styles = StyleSheet.create({
  containerStyle: {
    width: 300,
    marginVertical: 10,
    borderColor:'gray'
  },
  buttonStyle: {
    // backgroundColor: "white ",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    borderWidth:1,
    borderColor:'rgba(0,0,0,.2)'
  },
});
