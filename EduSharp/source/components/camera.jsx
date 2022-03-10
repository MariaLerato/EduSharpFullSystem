import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Camera from 'expo-camera';
import { Icon } from 'react-native-elements';
//import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../constants';



const Cam = ({ onClose }) => {


  let cameraRef = useRef();
  const [camera, setcamera] = useState(null)
  const [hasPermission, setHasPermission] = useState('');
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [err, seterr] = useState('');
  const [captureColor, setcaptureColor] = useState(COLORS.White);
  const [rotatoColor, setrotatoColor] = useState(COLORS.White);
  const [gallery, setgallery] = useState(COLORS.White);
  const [flesh, setflesh] = useState(false);
  const [autofocus, setautofocus] = useState(0);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [imageUrl, setimageUrl] = useState('');


  const starWarching = async () => {
    try {

      await Camera.requestCameraPermissionsAsync();
      //await ImagePicker.requestMediaLibraryPermissionsAsync();

      const { status } = await Camera.Camera.requestCameraPermissionsAsync();
      setHasPermission(status)
    } catch (err) {
      seterr(err)
    }
  }

  const fleshLight = async () => {
    flesh ? setflesh(false) : setflesh(true);
  }

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const cancelPreview = async () => {
    await camera.resumePreview();
    setIsPreview(false);
  };

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   base64: true,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    // });
    // setIsPreview(true);
    // setimageUrl(result.uri );
    // convertBase64(result);
    // console.log('====================================');
    setIsPreview(true);
  }

  const onSnap = async () => {
    if (camera) {
      const options = { quality: 0.7, base64: true };
      const data = await camera.takePictureAsync(options);
      const source = data.base64;

      if (source) {


        // let formData = new FormData();
        // formData.append('file', {
        //   uri: data.uri.replace("file:///", ""),
        //   type: 'image/jpg', name: 'userProfile.jpg',
        // });

        await camera.pausePreview();
        setimageUrl(data.url);
        console.log(data.uri , '====================================');

      }
      setIsPreview(true);
    }

  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
        console.log(fileReader.result);

      };
      fileReader.onerror = (error) => {
        reject(error);
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      };
    })
  }

  useEffect(() => {
    starWarching();
  }, [])

  if (hasPermission === '') {
    return <Text>No access to camera</Text>;
  }
  if (hasPermission === 'not granted') {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera.Camera ref={(ref) => setcamera(ref)} onCameraReady={onCameraReady} style={styles.camera} type={type} flashMode={flesh ? 2 : 0} autoFocus={autofocus} focusDepth={1} onMagicTap={() => { setautofocus(3) }} pictureSize='1200*1200' >

        {/* =================================Preview================================= */}

        {isPreview ?
          <View style={{ height: '100%', width: '100%', borderRadius: 7, position: 'absolute', right: 5, top: 5, }}>
            <Image source={{ uri: imageUrl }} style={{ backgroundColor: COLORS.White, height: '100%', width: '100%' }} />
            <View style={{ bottom: 30, position: 'absolute', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Icon type='material-community' name='cloud-upload-outline' onPress={cancelPreview} color={COLORS.White} size={36} style={{ position: 'absolute' }} onPressIn={() => { setgallery(COLORS.Danger) }} onPressOut={() => { setgallery(COLORS.White) }} />
              <Icon type='material-community' name='close' onPress={cancelPreview} color={COLORS.White} size={36} style={{ position: 'absolute' }} onPressIn={() => { setgallery(COLORS.Danger) }} onPressOut={() => { setgallery(COLORS.White) }} />
            </View>
          </View> :
          <View style={{ height: '100%', width: '100%' }} >

            <View style={{ height: 40, width: 40, borderRadius: 7, position: 'absolute', right: 5, top: 15, flexDirection: 'row' }}>

              <Icon type='material-community' name='close' onPress={onClose} color={gallery} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setgallery(COLORS.Danger) }} onPressOut={() => { setgallery(COLORS.White) }} />
            </View>

            <View style={{ height: 40, width: 40, borderRadius: 7, position: 'absolute', bottom: 90, alignSelf: 'center' }}>
              <Icon type='material-community' name={flesh ? 'flashlight-off' : 'flashlight'} onPress={fleshLight} color={gallery} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setgallery(COLORS.Danger) }} onPressOut={() => { setgallery(COLORS.White) }} />
            </View>


            <View style={styles.buttonContainer}>

              <Icon type='material-community' name='folder-multiple-image' onPress={pickImage} color={gallery} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setgallery(COLORS.Danger) }} onPressOut={() => { setgallery(COLORS.White) }} />


              <Icon type='feather' name='aperture' onPress={onSnap} color={captureColor} size={50} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setcaptureColor(COLORS.Danger) }} onPressOut={() => { setcaptureColor(COLORS.White) }} />

              <Icon disabled={!isCameraReady} type='material-community' name='rotate-3d-variant' onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }} color={rotatoColor} size={30} style={{ position: 'absolute', bottom: 10 }} onPressIn={() => { setrotatoColor(COLORS.Danger) }} onPressOut={() => { setrotatoColor(COLORS.White) }} />

            </View>
          </View>
        }
        {/* =================================Preview================================= */}

      </Camera.Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.Danger
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15,
    bottom: 20,
    position: 'absolute',
  },
  content: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',

  },
  button: {

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    right: 10,
    color: COLORS.White
  },
});

export default Cam