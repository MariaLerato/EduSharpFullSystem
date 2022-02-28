import React from 'react'
import { View, Text, SafeAreaView,FlatList } from 'react-native'
import HomeCard from '../Card/HomeCard'

const DashBoard = ({navigation}) => {

    const services = [{id:'0', name: "Material", icon: "question-circle", type: "font-awesome",location:"QList" }, {id:'1', name: "Lesson", icon: "book", type: "font-awesome",location:"QList" },{id:'2',name:"Q&A",icon:"question-circle",type:"font-awesome",location:"QList"},{name:"Papers",icon:"file-text",type:"font-awesome",location:"QList"}]

    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center',}}>
            <FlatList
                data={services}
                renderItem={({item})=>(
                    <HomeCard data={item} navigation={navigation}/>
                )}
            
                horizontal={false}
                numColumns={2}
            
            />
           
        </SafeAreaView>
    )
}

export default DashBoard
