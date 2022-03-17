import React from 'react';
import {Text, View, FlatList} from 'react-native'

const Documents=()=>{

    const [books, setbooks] =  useState([]);

    const db = firebase.firestore();

    useEffect(() =>{
        let bookinfo = [];
        db.collection("books")
        .get()
        .then((res)=>{
            res.forEach((action)=>{
                bookinfo.push({...action.data(), id:
                action.id})
            
        })

        setbooks(bookinfo);
        console.log(id)
    });
},[]);

const Card = ({book,index}) =>{
    return( 
     <View style={{
         flex:1,
         flexDirection:'row', justifyContent:'space-between',alignContent:'space-between', marginTop:20,
 
 }}> 
 
     <Image source={{ uri: book?.images }} style={{width:'40%',height:'105%', borderRadius:10,}}>
     </Image>
     </View>
)} 
    
    return(
        <View>
<Text>Hello World Documents</Text>


<FlatList 
            data={books}
            contentContainerStyle={{paddingVertical:30,paddingLeft:20, justifyContent:'space-between'}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index}) => <Card book={item} index={index}/>}
            />
        </View>
    )
}

export default Documents