import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Slideshow from 'react-native-image-slider-show';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
//import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Preference = ({ navigation })=> {
   
    return (
    <>
    <View>
            <View style ={{top:20, margin:30, borderTopRadius: 5, borderTopRightRadius: 5}}>
           <Text>Languages </Text>
           {/* <Icon
                name='star'
                type='FontAwesome'
                color='#4B7BE8'
              /> */}

              <Text>Font size</Text>
              <Text>Enable dark theme</Text>
              <Text>Font size</Text>
              <Text>Font size</Text>
    </View>






    </View>

    </>
    )
  }

  export default Preference 
