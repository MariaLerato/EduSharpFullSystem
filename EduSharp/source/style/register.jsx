
import {StyleSheet} from 'react-native';
import { COLORS, FONTS } from '../constants';

const styles = StyleSheet.create({
    text: {},
    container: {
      height:'100%',
      width:'100%'
    },
    inputError: {
      color: COLORS.Danger,
      ...FONTS.body4
    },input: {
      alignContent: "center",
      shadowColor: "#d5dbe3",
      marginHorizontal:5,
      marginVertical:5,
      height:40
    },
    lblSignUp:{
      fontWeight: "bold",
            color: "#3b3c3d",
            ...FONTS.body1,
            fontSize: 26,
            paddingHorizontal: 10,
            width: '100%',
            marginVertical:10
    }
  });

  export default styles;