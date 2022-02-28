import React from 'react'
import {img} from '../../constants'

class Info{
    info=[
        {
             id:'1',username:'Monicca',time:'2h ago',question:'Lorem ipsum dolor sit amet, consectetur a',pic:img.user,location:'Replies',number:'1K'   
        },
        {
            id:'2',username:'Lebogang',time:'2h ago',question:'Lorem ipsum dolor sit amet, consectetur a',pic:img.user,location:'Replies', number:'1K'   
        },
        {
            id:'3',username:'Malcom X',time:'2h ago',question:'Lorem ipsum dolor sit amet, consectetur a',pic:img.user ,location:'Replies', number:'1K'  
        }
]
replies=[{
    
        id:'1',username:'Katlego',time:'2h ago',reply:'Lorem ipsum dolor sit amet, consectetur a',pic:img.user,number:'1K'    
   },
   {
       id:'2',username:'Makoma',time:'20min ago',reply:'Lorem ipsum dolor sit amet, consectetur a',pic:img.user,number:'1K' 
   },
   {
       id:'3',username:'Malcom art',time:'2s ago',reply:'Lorem ipsum dolor sit amet, consectetur a',pic:img.user, number:'1K'  
   }
]
 items=[
    {id:'0',icon:'eye-slash',name:'Hide post', typeIcon:'font-awesome'},
    {id:'1',icon:'pencil',name:'Edit post',typeIcon:'font-awesome'},
    {id:'2',icon:'share-alt',name:'Share post',typeIcon:'font-awesome'},
    {id:'3',icon:'photo',name:'View post',typeIcon:'font-awesome'},
    {id:'4',icon:'trash',name:'Delete post', typeIcon:'font-awesome'},
]

}
export default new Info