import React from 'react';
import { StatusBar } from 'react-native';


const APPStatusBar = ({ background, style }) => {


    return (
        <StatusBar barStyle={style} backgroundColor={background} />
    );
}

export default APPStatusBar
