import React,{useState} from 'react'
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,Modal} from 'react-native'

const Post =()=>{
    const [modalVisible,setVisible] = useState(false)

    return(
        <View>
            <Modal
                 animationType={'slide'}
                 transparent={true}
                  visible={modalVisible}
                  onRequestClose={()=>{alert('Modal closed')
                    setVisible(!modalVisible)
                }
                }
                
            >
                <View>
                    <Text>Inside Modal</Text>
                    <TouchableOpacity onPress={()=>setVisible(true)}><Text>Hide Modal</Text></TouchableOpacity>
                </View>
            </Modal>
            <View>
                    <Text>Outside Modal</Text>
                    <TouchableOpacity onPress={()=>setVisible(true)}><Text>Show Modal</Text></TouchableOpacity>
                </View>
        </View>
    )
}
export default Post