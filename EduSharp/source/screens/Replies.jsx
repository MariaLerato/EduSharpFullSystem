import React,{useState} from "react";
import {View,ScrollView,Text,StyleSheet,TouchableOpacity} from 'react-native'
import Info from '../mock/Q&A'
import { img,COLORS,SIZES } from "../constants";
import {Card, Icon,BottomSheet,ListItem,Input} from 'react-native-elements'

const RepliesContainer=({ navigation }) =>{
    const [isVisible, setIsVisible] = useState(false)
    const [share, setShare] = useState(false)
   
    const Postcard = () => {
        return (
            <View style={{paddingLeft:'3%'}}>
                <Card containerStyle={{ borderRadius: 10,width:'98%',marginLeft:'-1%',padding:'2%' }}>
                    <Card.FeaturedTitle style={Styles.cardHeader}>
                        <View >
                            <Card.Image source={img.user} style={Styles.profile} />
                        </View>
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:270}}>
                            <View>
                                <Text style={Styles.headertext}>Monicca</Text>
                                <Text style={{ marginLeft: 20 }}>2h ago</Text>
                            </View>
                            <TouchableOpacity  onPress={() => setIsVisible(true)}>
                                <Icon name={'ellipsis-v'} type={'font-awesome'}  style={{ right:'0%', marginBottom: 25, width: 8, height: 24 }} />
                            </TouchableOpacity>
                            
                        </View>
                    </Card.FeaturedTitle>
                    <Card.FeaturedTitle style={Styles.post}>
                        <View >
                            <Text style={Styles.question}>
                                Lorem ipsum dolor sit amet, consectetur a
                            </Text>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur a
                            </Text>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur a
                            </Text>
                        </View>
                    </Card.FeaturedTitle>
                    <Card.FeaturedTitle style={{ padding: '2%', marginTop: '8%' }}>
                        <View style={Styles.iconContainer}>
                            <View style={{ marginLeft: 15, marginBottom: -20, display: 'flex', flexDirection: 'row' }}>
                                <Icon name={'thumbs-up'} type={'font-awesome'} style={{ width: 40, height: 40 }} color={'#3D93D1'} />
                                <Text>1K</Text>
                            </View>
                            <View style={{ marginLeft: 35, marginBottom: -20 }}>
                                <Icon name={'star-o'} type={'font-awesome'} style={{ width: 40, height: 40 }} color={'#3D93D1'} />
                            </View>
                            <View style={{ marginLeft: 35, marginBottom: -20 }}>
                                <Icon name={'share-alt'} type={'font-awesome'} style={{ width: 38, height: 38 }} color={'#3D93D1'} />
                            </View>
                            <TouchableOpacity style={{ marginLeft: 35, alignSelf: 'flex-end', marginBottom: -18 }} onPress={() => setShare(true)} >
                                <Icon name={'comment'} type={'font-awesome'} style={{ width: 38, height: 38 }} color={'#3D93D1'} />
                            </TouchableOpacity>
                        </View>
                    </Card.FeaturedTitle>
                </Card>
            </View>
        );
    };
    const Replies = () => {
        return (
            <View style={{ width: '98%',alignItems:'flex-start',marginLeft:1 }}>
                {Info.replies.map(data => 
                <Card key={data.id} containerStyle={{ borderRadius: 20,width:'92%' }}>
                    <Card.FeaturedTitle style={Styles.cardHeader}>
                        <View>
                            <Card.Image source={data.pic} style={Styles.profile} />
                        </View>
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:240}}>
                            <View>
                                <Text style={Styles.repliyHeader}>{data.username}</Text>
                                <Text style={{ marginLeft: 10 }}>{data.time}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setIsVisible(true)}>
                            <Icon name={'ellipsis-v'} type={'font-awesome'}  />
                            </TouchableOpacity>
                               
                        </View>
                        
                    </Card.FeaturedTitle>
                    <Card.FeaturedTitle style={Styles.post}>
                        <View>
                            <Text style={Styles.question}>
                                {data.reply}
                            </Text>
                            <Text>
                                {data.reply}
                            </Text>
                        </View>
                    </Card.FeaturedTitle>
                    <Card.FeaturedTitle style={{ padding: '1%', marginTop: '1%' }}>
                        <View style={Styles.iconContainer}>
                            <TouchableOpacity style={{ marginLeft: 200, marginBottom: -30, display: 'flex', flexDirection: 'row' }}>
                                <Icon name={'thumbs-up'} type={'font-awesome'} style={{ width: 40, height: 40 }} color={'#3D93D1'} />
                                <Text>{data.number}</Text>
                            </TouchableOpacity>
                        </View>
                    </Card.FeaturedTitle>
                </Card>
                )}
            </View>
        );
    };
    return (
        <ScrollView style={Styles.container}>
            <View style={Styles.header}>
                <Text style={Styles.headertext}>Q' As</Text>
            </View>
            <View style={{width:'100%'}}>
                <Postcard />
            </View>
            <ScrollView>
                <Text style={Styles.subtext}>Replies</Text>
                <View style={{width:'100%'}}>
                    <Replies />
                    <Text>        </Text>
                    <Text>        </Text>
                </View>
            </ScrollView>
            <View>
                        <BottomSheet
                            modalProps={{}}
                            isVisible={isVisible}>
                            <View style={{  }}>
                                <TouchableOpacity onPress={() => setIsVisible(false)}>
                                    <Icon name={'arrow-down'} type={'font-awesome'} color={'#EAEAEA'} />
                                </TouchableOpacity >
                                {
                                    Info.items.map((item, l) =>
                                        <ListItem key={item.id} style={{ color: '#7DB4DA', }} >
                                            <ListItem.Content style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                                <Icon type={'font-awesome'} name={item.icon} size={20} color={'#7DB4DA'} style={{ margin: '2%' }} />
                                                <ListItem.Title style={{ color: '#7DB4DA', fontWeight: '700', paddingLeft: '2%', fontSize: 16 }}>{item.name}</ListItem.Title>
                                            </ListItem.Content>
                                        </ListItem>
                                    )
                                }
                            </View>
                        </BottomSheet>
                    </View>
                    <View style={{alignContent:'center'}} >
                        <BottomSheet
                            modalProps={{}}
                            isVisible={share}>
                            <View style={{ backgroundColor: 'white',borderTopEndRadius:25,borderTopStartRadius:25,margin:'auto',alignItems:'center' }}>
                                    <View style={Styles.bottomInputDes}>
                                        <Input
                                            placeholder={'Share your answer'}
                                            containerStyle={{ backgroundColor: '#f2f2f2', borderRadius: 10, padding: '2%',height:'100%' }}
                                            inputContainerStyle={{ borderColor: '#f2f2f2' }}
                                           
                                        />
                                    </View>
                                    <View style={{width:'100%',margin:'auto',alignItems:'center'}}>
                                        <TouchableOpacity style={Styles.SheetfileContainer}>
                                            <Input
                                                placeholder={'Add a Photo'}
                                                containerStyle={{ borderRadius: 20 }}
                                                inputContainerStyle={{ borderColor: '#f2f2f2' }}
                                                rightIcon={<Icon name={'image'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={Styles.SheetfileContainer}>
                                            <Input
                                                placeholder={'Take a Picture'}
                                                containerStyle={{ borderRadius: 1, padding: '1%' }}
                                                inputContainerStyle={{ borderColor: '#f2f2f2' }}
                                                rightIcon={<Icon name={'camera'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={Styles.SheetfileContainer}>
                                            <Input
                                                placeholder={'Add pdf,doc, or'}
                                                containerStyle={{ borderRadius: 1, padding: '1%', }}
                                                inputContainerStyle={{ borderColor: '#f2f2f2' }}
                                                rightIcon={<Icon name={'file'} type={'font-awesome'} size={18} color={COLORS.primary} />}
                                            />
                                        </TouchableOpacity>
                                        <View style={Styles.buttons}>
                                            <TouchableOpacity onPress={() => setShare(false)} style={Styles.cancel}><Text style={Styles.cancelText}>Cancel</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => alert('Post successfully uploaded')} style={Styles.postbutton} ><Text style={Styles.postText}>Post</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                        </BottomSheet>
                    </View>
                
        </ScrollView>
    );
}
const Styles = StyleSheet.create({
    container:{
        backgroundColor:'#F4F4F4',
        flex:1,
        padding:'1%'
    },
    cardHeader:{
        display:'flex',
        flexDirection:'row',
        
    },
    subtext:{
        margin:'1%',
        fontSize:SIZES.h4,
        paddingLeft:'2%'
    },
    headertext:{
        fontSize:SIZES.h1,
        marginLeft:20
    },
    header:{
        display:'flex',
        flexDirection:'row',
        marginTop:'5%',
        borderBottomWidth:0.5,
        borderBottomColor:'#E9E9E9'
    },
    post:{
        width:'100%',
        paddingLeft:'-4%',
        marginTop:'2%',
        textAlign:'center'
    },
    question:{
        padding:'4%',
        fontSize:SIZES.body4
    },
    iconContainer:{
        display:'flex',
        flexDirection:'row',
       width:'100%'
    },
    profile:{
        width:50,
        height:50,
    },
    repliyHeader:{
        fontSize:SIZES.h3,
        marginLeft:10
    },
    fileContainer: {
        width: '90%',
        backgroundColor: '#EAEAEA',
        margin: '1%',
        height: '9%',
        borderRadius: 20
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginLeft: '40%'
    },
    cancel: {
        marginTop: '4%',
        width: '40%',
        height: 40,
        alignItems: 'center', justifyContent: 'center',
        marginBottom:'4%'
    },
    postbutton: {
        marginTop: '4%',
        width: '45%',
        height: 45,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginBottom:'4%'
    },
    postText: {
        color: 'white',
        fontSize: 18
    },
    cancelText: {
        color: 'black',
        fontSize: 18,
        paddingRight: '14%'
    },
    bottomInputDes: {
        backgroundColor: '#f2f2f2',
        margin: 'auto',
        borderRadius: 15,
        padding:'auto',
        width:'85%',height:150,
        marginTop:'6%'
    },
    SheetfileContainer:{
        backgroundColor: '#f2f2f2',
        margin: 'auto',
        borderRadius: 25,
        height:55,
        marginTop:'2%',
        width:'85%'
    }
})
export default RepliesContainer