import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
    home: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:COLORS.AppBackgroundColor
    },
    eduText:{
        marginTop:'-1%',
        fontWeight:'400',
        fontSize:45,
        color:'#898C8F',
        fontWeight:'600'
    },
    last:{
        marginTop:'-1%',
        fontWeight:'500',
        fontSize:45,
        color:COLORS.primary,
        fontWeight:'600'
      
    },
    TextContainer:{
        flexDirection:'row'
    },
    subtitle:{
        fontSize:14,
        color:'#898C8F'
    },
    progress:{
        bottom:1,
        zIndex:0
    }

});


export default styles;