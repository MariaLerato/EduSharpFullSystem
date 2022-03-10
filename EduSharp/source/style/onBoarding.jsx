
import { COLORS, FONTS, SIZES } from "../constants";
import { StyleSheet } from 'react-native';


const Styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    height: '100%',
    width: '100%',
    margin: 8,
    marginTop: 30,
    backgroundColor: COLORS.AppBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  about: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.White,
    borderRadius: 50,
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  abouttext: {
    fontWeight: 'bold',
    fontSize: SIZES.h1 + 7,
    textAlign: 'center'
  },
  semiContainer: {
    margin: 30,
    marginHorizontal:30,
  },
  WelcomeText: {
    fontWeight: 'bold',
    fontSize: SIZES.h1 + 10,
    alignSelf: 'center',
    bottom: 40,
  },
  ImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:14
  },
  Image: {
    width: 300,
    height: 250,
    paddingBottom:40
  },
  Buttons: {
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginVertical:5
  },
  ButtonText: {
    color: COLORS.White,
    alignSelf: 'center',
    fontSize: 24,
    ...FONTS.h2,
    fontWeight: 'bold'
  }


})

export default Styles;