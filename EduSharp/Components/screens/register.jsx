import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native-paper";
import { CheckBox, Input, Icon, Button } from "react-native-elements";
import { COLORS, SIZES, FONTS } from "../../constants/index";
import sqlite from "../Database/sqlite/sqlite";


const topPadding = Dimensions.get("screen").height * 0.1;
// import PasswordInputText from 'react-native-hide-show-password-input'

const Register = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [users, setUsers] = useState([]);
  const [showpassword, setShowPassword] = useState(true);
  const [isPasswordVisibility, setIsPasswordVisibility] = useState(true);
  const [isConfirmPasswordVisibility, setIsConfirmPasswordVisibility] =
    useState(true);

  const changePasswordViewState = () => {
    setIsPasswordVisibility(!isPasswordVisibility);
  };
  const changeConfirmPasswordViewState = () => {
    setIsConfirmPasswordVisibility(!isConfirmPasswordVisibility);
  };

  const PassWordViewState = () => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => changePasswordViewState()}
    >
      {isPasswordVisibility ? (
        <Icon name="eye-slash" type="font-awesome" style={{ marginLeft: 10 }} />
      ) : (
        <Icon name="eye" type="font-awesome" style={{ marginLeft: 10 }} />
      )}
    </TouchableOpacity>
  );
  const ConfirmPassWordViewState = () => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => changeConfirmPasswordViewState()}
    >
      {isConfirmPasswordVisibility ? (
        <Icon name="eye-slash" type="font-awesome" style={{ marginLeft: 10 }} />
      ) : (
        <Icon name="eye" type="font-awesome" style={{ marginLeft: 10 }} />
      )}
    </TouchableOpacity>
  );

  const checkIcon = () => {
    setChecked(!checked);
  };
  const show = () => {
    setShowPassword(!showpassword);
  };

  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Only 15 Characters Allowed")
      .required("Please enter username"),
    email: Yup.string()
      .email("Not the correct format")
      .required("Please enter email address"),
    password: Yup.string()
      .min(6, "Atleast 6 Characters ")
      .required("Please enter confirm password"),
    confirm: Yup.string()
      .min(6, "Atleast 6 Characters ")
      .required("Please enter confirm password"),
    checked: Yup.bool().oneOf([true], " ").required("*Required*")
  });


// backend code , verify if local database if open
//  useEffect(()=>{
//
// //sqlite
// },[])

//================================================
  const createUser = () => {
    setUsers([
      ...users,
      {
        name: name,
        email: email,
        password: password,
        confirm: confirm
      },
    ]);
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text style={{ ...FONTS.h1, fontWeight: "600", marginBottom: 20 }}>
            Sign Up
          </Text>
          <ScrollView>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirm: "",
                checked: false
              }}
              validateOnMount={true}
              validationSchema={validate}
              onSubmit={(values) =>
                createUser(
                  values.name,
                  values.email,
                  values.password,
                  values.confirm,
                  values.checked,
                
                )
              
              }
            >
              {({
                errors,
                values,
                handleChange,
                handleBlur,
                touched,
                handleSubmit
              }) => (
                <View>
                  <View style={styles.text}>
                    <Input
                      value={values.name}
                      placeholder={"Username"}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      leftIcon={<Icon name="user-o" type="font-awesome" />}
                    />
                    {errors.name && touched.name ? (
                      <Text style={styles.inputError}>{errors.name}</Text>
                    ) : null}
                  </View>
                  <View style={styles.text}>
                    <Input
                      value={values.email}
                      placeholder={" Email Address"}
                      onBlur={handleBlur("email")}
                      onChangeText={handleChange("email")}
                      leftIcon={<Icon name="envelope-o" type="font-awesome" />}
                    />
                    {errors.email && touched.email ? (
                      <Text style={styles.inputError}>{errors.email}</Text>
                    ) : null}
                  </View>
                  <View style={styles.text}>
                    <Input
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      placeholder=" Password"
                      leftIcon={<Icon name="lock" type="font-awesome" />}
                      rightIcon={<PassWordViewState />}
                      secureTextEntry={isPasswordVisibility}
                    />

                    {errors.password && touched.password ? (
                      <Text style={styles.inputError}>{errors.password}</Text>
                    ) : null}
                    <Text
                      style={{
                        alignSelf: "flex-start",
                        // padding: 4
                      }}
                    >
                      Strong Password:EduSharp@123
                    </Text>
                  </View>
                  <View style={styles.text}>
                    <Input
                      value={values.confirm}
                      onChangeText={handleChange("confirm")}
                      onBlur={handleBlur("confirm")}
                      placeholder="Confirm Password"
                      leftIcon={<Icon name="lock" type="font-awesome" />}
                      rightIcon={<ConfirmPassWordViewState />}
                      secureTextEntry={isConfirmPasswordVisibility}
                    />
                    {errors.confirm && touched.confirm ? (
                      <Text style={styles.inputError}>{errors.confirm}</Text>
                    ) : null}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox
                      title={"Accept T's & Cs"}
                      onPress={checkIcon}
                      style={{
                        backgroundColor: "gainsboro"
                      }}
                      checked={checked}
                      onBlur={handleBlur("checked")}
                    />
                    {errors.checked && touched.checked ? (
                      <Text style={{ color: COLORS.secondary, }}>{errors.checked}</Text>
                    ) : null}
                  </View>
                  <Text
                    style={{
                      marginTop: -40,
                      color: "#337af5",
                      marginLeft: "80%"
                    }}
                    onPress={() =>navigation.navigate("terms&conditions")}
                  >
                    View More
                  </Text>

                  <View style={{ marginTop: 18 }}>
                    <Button
                    onPress={() => navigation.navigate('DashBoard')}
                      title="Sign In"
                      containerStyle={{
                        marginTop: 10,
                        borderRadius: 20
                      }}
                      buttonStyle={{
                        backgroundColor: COLORS.primary
                      }}
                      titleStyle={{
                        color: COLORS.White
                      }}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>

            <View style={{flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'center'}}>
              <Text style={{...FONTS.h3}}>
                Have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
                <Text style={{color:COLORS.primary,...FONTS.h3}}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {},
  container: {
    marginTop: StatusBar.currentHeight,
    padding: 10,
    paddingTop: topPadding
  },
  inputError: {
    color: COLORS.Danger,
    ...FONTS.body4
  }
});
export default Register;
