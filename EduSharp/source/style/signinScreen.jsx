
import { COLORS, FONTS, SIZES } from "../constants";
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container: {
      height:'100%',
      width:'100%',
    },
    input: {
      alignContent: "center",
      shadowColor: "#d5dbe3",
      marginHorizontal:5,
      marginVertical:5,
      fontSize:SIZES.body3,
      height:40
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
      paddingHorizontal:15,
      paddingVertical:5,
      borderWidth:1,
      height: 40,
      borderColor:'rgba(0,0,0,.1)',
      borderRadius:5,
    },
    labSignin:{
        fontWeight: "bold",
        color: "#3b3c3d",
        ...FONTS.body1,
        fontSize: 26,
        paddingHorizontal:20,
        width:'100%'
      }
  });

  export default Styles;