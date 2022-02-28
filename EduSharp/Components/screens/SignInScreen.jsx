import React, { useState } from "react";
import "react-native-gesture-handler";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { FONTS, COLORS,img } from "../../constants";

const topPadding =Dimensions.get('screen').height*.2

const SignIn = ({ navigation }) => {

  const [isPasswordVisibility, setIsPasswordVisibility] = useState(true);

  const changePasswordViewState = () => {
    setIsPasswordVisibility(!isPasswordVisibility);
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

  // const img = {
  //   uri: "https://s3-alpha-sig.figma.com/img/2dc7/d28f/2d79748dc83f65605ff2759929c7d3fe?Expires=1636329600&Signature=OrmiI4sx69i1NNGQJipZBZagYmvDbcEbiiqHPfQ5w1hXlU84-Azvx9uA5FnojqYULHtCYKDx3xbKwC7ZyKlvEWbq~4cRCVWOaqsbg4scBmUMpWfOCsv3AlUV-hnszmuMyeR2ncuA27ezjSbdQkdafAihaZqGifRKthe8dqUivIbiqJSWTMEwHBYQklErhdbQY6cCnJm0y7YiR5~Z8rkJTifvVOdXWx6ECPI6gdGxX6r3qGVRa1RLwuDVFJcwKVJOW57XiTa~9YF3WOLag9euWbwGBZbWGm2bKEkqDyLzJKAMqan8DErnBJTjUk-qKNCamhRus6r-16oAFrchDJjK~g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  // };
  return (
    <SafeAreaView style={STYLES.container}>
      <ScrollView  showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              fontWeight: "500",
              color: "#3b3c3d",
              ...FONTS.h1
            }}
          >
            Sign In
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={STYLES.inputContainer}>
            <Input
              placeholder="Email"
              style={STYLES.input}
              leftIcon={<Icon name="envelope-o" type="font-awesome" />}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <Input
              placeholder="Password"
              style={STYLES.input}
              leftIcon={<Icon name="lock" type="font-awesome" />}
              rightIcon={<PassWordViewState />}
              secureTextEntry={isPasswordVisibility}
            />
          </View>
          <TouchableOpacity activeOpacity={0.7} style={{ padding: 10 }}>
            <Text style={{ textAlign: "right" ,fontStyle:'italic',...FONTS.body3}}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button onPress={() => navigation.navigate('DashBoard')}
            title="Sign In"
            containerStyle={{
              marginTop: 10,
              borderRadius: 20,
            }}
            buttonStyle={{
              backgroundColor: COLORS.primary,
            }}
            titleStyle={{
              color: COLORS.White,
            }}
           onPress={()=> navigation.navigate('DashBoard')}
          />

          <Text
            style={{
              ...FONTS.h4,
              textAlign: "center",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            or
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity activeOpacity={.7} style={[STYLES.altSignInBtn,{marginRight:5}]}>
              <Image
                source={img.google}
                style={STYLES.Image}
                resizeMode='contain'
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.7} style={[STYLES.altSignInBtn,{marginLeft:5}]}>
              <Icon
                name="facebook"
                size={25}
                color={"blue"}
                style={STYLES.inputIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Text style={{ fontWeight: "500", ...FONTS.body2}}>
            Don`t have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={{ fontWeight: "900",...FONTS.body2 ,color:COLORS.primary}}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const STYLES = StyleSheet.create({
  container: {
    flex:1,
    marginTop: StatusBar.currentHeight,
    padding: 10,
    backgroundColor: COLORS.AppBackgroundColor,
    justifyContent:'center',
    alignItems:'center',
    paddingTop:topPadding,
  },

  inputContainer: { flexDirection: "row" },
  input: {
    height: 50,
    padding: 5,
    alignContent: "center",
    shadowColor: "#d5dbe3",
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    borderBottomRightRadius: 5,
    borderTopStartRadius: 5,
    width: "100%",
  },
  inputIcon: { marginLeft: 0 },
  btnPrimary: {
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#2769ba",
    borderRadius: 40,
  },
  ImageView:{
    justifyContent:'center', 
    width: '100%',
    alignItems:'center'
  },
  Image:{
    width: 30,
     height: 20, 
    
  },
  btnSecondary: {
    height: 50,
    borderColor: "#a5a5a5",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  btn: { justifyContent: "center" },
  altSignInBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth:1,
    borderColor:'rgba(0,0,0,.1)',
    borderRadius:5,
  },
});

export default SignIn;
