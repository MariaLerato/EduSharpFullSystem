import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import style from './style/progressIndicator';


const ProgressIndicator = () => {
    return (
        <View style={style.container}>
            <LottieView
                style={{
                    height: 3,
                    backgroundColor: '#eee',
                }}
                source={require('../../assets/lootie/23692-progress-bar-in-dodger-blue.json')}
                autoPlay
                loop
            />
        </View>
    );
}

export default ProgressIndicator;