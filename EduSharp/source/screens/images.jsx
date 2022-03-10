import React from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import {Card,Icon,} from 'react-native-elements'
import { COLORS } from '../constants'
import Info from '../mock/Q&A'

const FileImages = ({navigation})=>{
    const CardFiles = ()=> {
        return(
            <View style={{width:'45%',alignSelf:'center',marginLeft:'2%'}}>
                {Info.docs.map(data=>
                  <Card key={data.id} containerStyle={{borderRadius:20}}>  
                      <Card.Image source={data.pic} style={{width:'100%',}}>
                          <View  style={{alignSelf:'flex-end',justifyContent:'flex-end',marginTop:'-2%'}}>
                          <Icon name={data.icon} type={data.typeIcon} size={20}/>
                          </View>
                      </Card.Image>
                  </Card>
                  )}
            </View>
        )
    }
      return(
          <View style={styles.container}>
              <View style={styles.header}>
                  <Text style={{fontSize:25,fontWeight:'600'}}>My Files</Text>
                     <View style={styles.iconContainer}>
                     <Icon name={'border-all'} type={'font-awesome-5'} size={22}/>
                      <TouchableOpacity style={{marginLeft:'2%'}}>
                          <Icon name={'ellipsis-v'} type={'font-awesome'}/>
                      </TouchableOpacity>
                     </View>
              </View>
              <View style={{marginTop:'2%',borderBottomColor:'#C4C4C4',borderBottomWidth:0.5,}}>
                  <ScrollView horizontal contentContainerStyle={{justifyContent:"space-evenly",paddingVertical:'2%'}} >
                      <TouchableOpacity onPress={()=>navigation.navigate('MyFiles')} style={{backgroundColor:'#FFFFFF',width:90,height:40,borderRadius:50,alignItems:'center',justifyContent:'center'}} >
                          <Text>Docs</Text>
                      </TouchableOpacity>
                      <TouchableOpacity><Text>    </Text></TouchableOpacity>
                      <TouchableOpacity onPress={()=>navigation.navigate('videos')} style={{backgroundColor:'#FFFFFF',width:90,height:40,borderRadius:50,alignItems:'center',justifyContent:'center'}} >
                      <Text>Videos</Text>
                      </TouchableOpacity >
                      <TouchableOpacity><Text>     </Text></TouchableOpacity>
                      <TouchableOpacity style={{backgroundColor:COLORS.AppPrimary,width:90,height:40,borderRadius:50,alignItems:'center',justifyContent:'center'}}>
                          <Text  style={{color:'white',fontSize:18,fontWeight:'600'}}>Images</Text>
                      </TouchableOpacity>
                      <TouchableOpacity><Text>  </Text></TouchableOpacity>
                      <TouchableOpacity onPress={()=>navigation.navigate('downloads')} style={{backgroundColor:'#FFFFFF',width:90,height:40,borderRadius:50,alignItems:'center',justifyContent:'center'}}>
                          <Text>Downloads</Text>
                      </TouchableOpacity>
                  
                  </ScrollView>
                 
              </View>
                <FlatList
                data={Info.docs}
                renderItem={CardFiles}
                keyExtractor={item=>item.id}
                numColumns={2}
                />
                
          </View>
      )
  }
  const styles = StyleSheet.create({
      container:{
          flex:1,
          padding:'2%'
      },
      header:{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          marginTop:'8%'
      },
      iconContainer:{
          display:'flex',
          flexDirection:'row',
          marginRight:'2%',
          justifyContent:'space-around'
      }
})
export default FileImages