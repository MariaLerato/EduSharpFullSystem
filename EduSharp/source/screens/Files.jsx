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
import Documents from "./filesComponents/documents";
import Downloads from "./filesComponents/downloads";
import Images from "./filesComponents/images";
import Videos from "./filesComponents/videos";

import Info from '../mock/Q&A'

const width = Dimensions.get("window").width / 2 - 30;

// import { Icon } from "react-native-paper/lib/typescript/components/List/List";

const Files = ({ navigation }) => {

  const [categoryIndex, setCategoryIndex] = React.useState(0);
  
  const categories = [{item:"Q As",location:'documents'}, {item:"Downloads",location:'Downloads'},{ item:"Images",location:'Images'}, {item:"Videos",location:'Videos'}];


const [code, setcode] = useState(0);

const CardFiles = () => {
    return (
        <View style={{ width: '45%', alignSelf: 'center', marginLeft: '2%' }}>
            {Info.docs.map(data =>
                <Card key={data.id} containerStyle={{ borderRadius: 20 }}>
                        <Icon name={data.icon} type={data.typeIcon} size={20}
                            color='#4B7BE8' />
                    <Card.Image source={data.pic} style={{ width: '100%', paddingTop: '-5%' }}>
                        <View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', marginTop: '-2%' }}>

                        </View>
                    </Card.Image>
                </Card>
            )}
        </View>
    )
}

  return (
    <View style={Styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',paddingHorizontal:10 }}>
        <Icon
          name="arrow-back-ios"
          size={20}
          color={COLORS.primary}
          onPress={navigation.goBack}
        />
        <View >
          <Text style={[
                Styles.categoryText,{fontSize:SIZES.h2,fontWeight:'bold',color:COLORS.primary}
              ]}>My Files</Text>
        </View>
      </View>

      <View style={{flexDirection:'row' ,justifyContent:'space-between',marginVertical:10 }}>
      <TouchableOpacity style={Styles.cat}
            key={0}
            activeOpacity={0.8}
            onPress={() => setcode(0)}>

            <Text
              style={[
                Styles.categoryText,{fontSize:SIZES.h4,fontWeight:'800'}
              ]}
            >
              {"Docs "}
            </Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={Styles.cat}
            key={0}
            activeOpacity={0.8}
            onPress={() => setcode(1)}>

            <Text
              style={[
                Styles.categoryText,{fontSize:SIZES.h4,fontWeight:'800'}
              ]}
            >
              {"Images "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={Styles.cat}
            key={0}
            activeOpacity={0.8}
            onPress={() => setcode(2)}>

            <Text
              style={[
                Styles.categoryText,{fontSize:SIZES.h4,fontWeight:'800'}
              ]}
            >
              {"Downloads"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={Styles.cat}
            key={0}
            activeOpacity={0.8}
            onPress={() => setcode(3)}>

            <Text
              style={[
                Styles.categoryText,{fontSize:SIZES.h4,fontWeight:'800'}
              ]}
            >
              {"Videos"}
            </Text>
          </TouchableOpacity>
          
      </View>
     {code == 0?<Documents />:null}
     {code == 1?<Images/>:null}
     {code == 2?<Downloads/>:null}
     {code == 3?<Videos/>:null}
    </View>
  );
};
export default Files;

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
    paddingTop:10
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
    paddingHorizontal: 10,
    backgroundColor: "white",
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
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
  cat: {
    backgroundColor: 'white',
    padding: 10,
    height: 30,
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center',
    padding: 10,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    width: 250,
  },
});
