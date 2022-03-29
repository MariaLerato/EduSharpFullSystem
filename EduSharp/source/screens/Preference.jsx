import * as React from 'react';
import { Button, View, Text, FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Slideshow from 'react-native-image-slider-show';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
//import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NotificationComponent from '../components/notificationComponent';
import { auth, firestore } from '../BackendFirebase/configue/Firebase';
import Anim from '../components/LottieComponent';
import { COLORS } from '../constants';


const Preference = ({ navigation }) => {

  const [notifications, setnotifications] = React.useState([]);

  const GetNotifications = async () => {

    await firestore.collection("notifications").where('userID', '==', auth.currentUser.uid).get().then(async (querySnapshot) => {

      const data = [];

      await querySnapshot.forEach(async (documentSnapshot) => {

        await firestore.collection("users").doc(documentSnapshot.data().user).get().then(async (res) => {

          let dataset = {
            key: documentSnapshot.id,
            body: documentSnapshot.data().body,
            createdAt: documentSnapshot.data().createdAt,
            userID: documentSnapshot.data().userID,
            title: documentSnapshot.data().title,
            user: documentSnapshot.data().user,
            name: res.data().name,
            token: res.data().token ? res.data().token : null,
            image: res.data().profileUrl ? res.data().profileUrl : null,
          }

          data.push(dataset);
          console.log(dataset);
          setnotifications(data);
        })
      })

      setcomments(data);
      console.log(data);

    })
  }

  React.useEffect(() => {
    GetNotifications();

  }, [])


  return (

    <View>

      {notifications.length > 0 ? <FlatList data={notifications} renderItem={(data, index) => (
        <NotificationComponent profilePress={() => { }} data={data.item} />
      )}
      /> :
        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ paddingVertical: 10, height: 250, justifyContent: 'center', alignItems: 'center' }}>
            <Anim json={require('../../assets/lootie/93461-loading.json')} autoplay={true} autosize={false} loop={true} speed={1} style={{ height: 65, width: 65, backgroundColor: COLORS.AppBackgroundColor }} />
          </View>
        </View>
      }


    </View>

  )
}

export default Preference 
