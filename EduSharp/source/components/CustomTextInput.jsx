import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";

const CustomTextInput = ({ placeholder, iconleftname, value, setter }) => {
  const [disable, setDisable] = useState(false);
  const [security, setSecurity] = useState(false);
  const [isPasswordField, setIsPasswordField] = useState(false);
  const [passwordVisible,setPasswordVisible]=useState(false)
  useEffect(() => {
    const check = () => {
      if (placeholder.includes("Password")) {
        setSecurity(true);
        setIsPasswordField(true);
      }
    };
    return check();
  }, []);
  
  const handlePasswordVisibility=()=>{
    setPasswordVisible(!passwordVisible)
    setSecurity(!security)
  }


  return (
    <View style={styles.conatiner}>
      <Icon name={iconleftname} type="font-awesome" />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        editable={disable}
        value={value}
        onChangeText={(text) => setter(text)}
        secureTextEntry={security}
      />
       {isPasswordField && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePasswordVisibility()}
          style={{marginRight:5}}
        >
          {!passwordVisible ? (
            <Icon name="eye" type="font-awesome" />
          ) : (
            <Icon name="eye-slash" type="font-awesome" />
          )}
        </TouchableOpacity>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setDisable(!disable)}
      >
        {!disable ? (
          <Icon name="pencil" type="font-awesome" />
        ) : (
          <Icon name="times" type="font-awesome" />
        )}
      </TouchableOpacity>
     
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderColor: "transparent", // width:'100%',
    borderWidth: 0,
  },
  conatiner: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,.2)",
    marginBottom: 10,
  },
});
