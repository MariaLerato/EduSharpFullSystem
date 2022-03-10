import React from 'react';
import LottieView from 'lottie-react-native';


const Anim = ({json, loop, autoplay, autosize, speed, style}) => {

    return (
            <LottieView
                source={json}
                autoPlay={autoplay}
                loop={loop}
                style={style}
                autoSize={autosize}
                speed={speed}
                resizeMode='cover' />
    )
}
export default Anim