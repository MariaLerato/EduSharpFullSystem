import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './source/screens/welcome'
import Register from './source/screens/register'
import Splash from './source/screens/SplashScreen'
import SignIn from './source/screens/SignInScreen'
import Terms from './source/screens/terms&conditions'
import DashBoard from './source/screens/DashBoard'
import Questions from './source/screens/QList'
import Post from './source/screens/PostQuestion'
import RepliesContainer from './source/screens/Replies'
import Material from './source/screens/Material'
import MyFiles from './source/screens/MyFiles'
import FileImages from './source/screens/images'
import DownloadFiles from './source/screens/downloads'
import VideoFiles from './source/screens/videos'
import Search from './source/screens/search'
import StarredReplies from './source/screens/StarredReplies'
import Profile from './source/screens/profile';
import WelcomeScreen from './source/screens/welcome';
import Lessons from './source/screens/Lessons';
import QuestionPaper from './source/screens/QuestionPapers';
import Pro from './source/screens/Pro';
import Education from './source/screens/education';
import Files from './source/screens/Files';
import Videos from './source/screens/videos';
import MainContainer from './source/screens/MainContainer';
import Test from './source/screens/test';
import Switch from './source/screens/switch';
import Cam from './source/components/camera';
import Forgot from './source/screens/forgot';

const Menu = () => {
    const Stack = createNativeStackNavigator()
    return (


        <NavigationContainer >
            <Stack.Navigator initialRouteName={'welcomeScreen'} screenOptions={{ headerShown: false }}
            >
            <Stack.Screen name={'MainContainer'} component={MainContainer}/>

                <Stack.Screen name={'Pro'} component={Pro}/>
                <Stack.Screen name={'switch'} component={Switch}/>
                <Stack.Screen name={'forgot'} component={Forgot}/>
                 <Stack.Screen name={'Files'} component={Files}/>
                <Stack.Screen name={'welcomeScreen'} component={WelcomeScreen} />
                <Stack.Screen name={'home'} component={HomeScreen} />
                <Stack.Screen name={'SplashScreen'} component={Splash} />
                <Stack.Screen name={'register'} component={Register} />
                <Stack.Screen name={'SignInScreen'} component={SignIn} />
                <Stack.Screen name={'terms&conditions'} component={Terms} />
                <Stack.Screen name={'profile'} component={Profile} />
                <Stack.Screen name={'DashBoard'} component={DashBoard} />
                <Stack.Screen name={'QList'} component={Questions} />
                <Stack.Screen name={'Replies'} component={RepliesContainer} />
                <Stack.Screen name={'PostQuestion'} component={Post} />
                <Stack.Screen name={'Material'} component={Material} />
                <Stack.Screen name={'MyFiles'} component={MyFiles} />
                <Stack.Screen name={'images'} component={FileImages} />
                <Stack.Screen name={'test'} component={Test}/>
                <Stack.Screen name={'downloads'} component={DownloadFiles} />
                <Stack.Screen name={'videos'} component={VideoFiles} />
                <Stack.Screen name={'search'} component={Search} />
                <Stack.Screen name={'education'} component={Education}/>
                <Stack.Screen name={'StarredReplies'} component={StarredReplies} />
                <Stack.Screen name={'lessonscreen'} component={Lessons} />
                <Stack.Screen name={'questionpaperscreen'} component={QuestionPaper} />
                <Stack.Screen name={'camera'} component={Cam} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Menu
