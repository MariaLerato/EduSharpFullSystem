import { Dimensions } from "react-native";
const{width,height}=Dimensions.get('window')

export const COLORS={
    primary:"#4B7BE8",
    secondary:"#FB1111",
    Danger:"#dc3545",
    Black:"#000000",
    White:"#ffffff",
    LightBlack:"rgba(0,0,0,.45)",
    DarkBlack:"rgba(0,0,0,.8)",
    
    AppBackgroundColor:"#F4F4F4",
    AppBluelink:'#0645AD',
    AppPrimary:'#3D93D1',
    AppSecondary:'#FC2B4D',
    AppAltColor:'#F0DDEF',
    AppHeaderColor:"#3D93D1"
}

export const SIZES={
    base:0,
    font:14,
    radius:30,
    padding:10,
    padding2:12,

    largeTitle:50,
    h1:30,
    h2:22,
    h3:20,
    h4:18,
    h5:16,
    h6:14,

    body1:30,
    body2:20,
    body3:16,
    body4:14,
    body5:12,

}
export const FONTS={
    largeTitle: {fontSize:SIZES.largeTitle,lineHeight:40},
    h1:{fontSize:SIZES.h1,lineHeight:36},
    h2:{fontSize:SIZES.h2,lineHeight:30},
    h3:{fontSize:SIZES.h3,lineHeight:22},
    h4:{fontSize:SIZES.h4,lineHeight:22},
    body1:{fontSize:SIZES.body1,lineHeight:36},
    body2:{fontSize:SIZES.body2,lineHeight:30},
    body3:{fontSize:SIZES.body3,lineHeight:22},
    body4:{fontSize:SIZES.body4,lineHeight:22},
    body5:{fontSize:SIZES.body5,lineHeight:22},
 }
 
 const appTheme={COLORS,SIZES,FONTS,width,height}
 
 export default appTheme


