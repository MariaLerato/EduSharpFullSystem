import { StyleSheet } from "react-native";
import { FONTS, SIZES } from "../constants";

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 100,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    lblcard: {
        fontSize: SIZES.h2,
        fontWeight: "900",
        textAlign: "center",
        top: 30,
        ...FONTS.h2
    }
})

export default styles;