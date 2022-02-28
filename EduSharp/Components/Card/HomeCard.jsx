import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const cardWidth = Dimensions.get('screen').width * .25
const cardHeight = Dimensions.get('screen').height * .1

const HomeCard = ({ data,navigation }) => {
    return (
        <TouchableOpacity style={styles.shadowCard} onPress={()=>navigation.navigate(data.location,)}>
            <Icon name={data.icon} type="font-awesome" />
            <Text>{data.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shadowCard: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginTop: StatusBar.currentHeight,
        width: cardWidth,
        height: cardHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'rgba(0,0,0,.2)',
        margin:8,
    }
})
export default HomeCard


