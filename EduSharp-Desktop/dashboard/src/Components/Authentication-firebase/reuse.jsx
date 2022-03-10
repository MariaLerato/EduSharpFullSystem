import { auth, firestore } from "./firebase";
import React from "react";
import { useNavigate } from "react-router-dom";

//  const navi = useNavigation()
// const db = firebase.ref('/users')
// const _db = firebase.ref('/users')
// const auth = firebase.app.auth()
const admin = firestore.collection("admin");

class Users {
 async signUp(email, password, firstname, lastname) {

    let res=new Promise((result,rej)=>{

        auth.createUserWithEmailAndPassword(email, password)
         .then((res) => {
            result({
                status:'success',
                name: firstname,
                lastname: lastname,
                email: email,
                uid: res.user.uid
            })
            res.user
             .sendEmailVerification()
             .then((action) => {
               //create user in fire store
                admin
                 .doc(res.user.uid)
                 .set({
                   name: firstname,
                   lastname: lastname,
                   email: email,
                   uid: res.user.uid
                 })
                 .then(() => {
                    //return

                    console.log('--++---+++---')
                   
                 })
                 .catch((error) => {
                   console.log(error);
                 });
             })
             .catch((error) => {
               console.log(error);
             });
         })
         .catch((error) => {
           console.log(error);
         });
    })


    return await res
  }

  async login(email, password,navigate){
      auth.signInWithEmailAndPassword(email,password)
      .then((res)=>{
        navigate('/home')
        localStorage.setItem('userid', res.user.uid)
      })
      .catch((error)=>{
        console.log('login error: ',error)
      })
  }
  resetPassword(email,navigate){
    auth.sendPasswordResetEmail(email)
    .then((res)=>{
      navigate('/signIn')
    })
    .catch((error)=>{
      console.log("reset password error:"+error)
    })
  }
  signOut(){
    localStorage.removeItem('userid')
    auth.signOut();
  }
  // getLoggedData(id){
  //     return firebase.ref(`/user/${id}`)
  // }

  
  // getData(){
  //     return db
  // }
  // createData(userinfo){
  //     return db.push(userinfo)
  // }
  // getDataById(ref){
  //     return firebase.ref(`/users/${ref}`);
  // }
  // updateData(key,value){
  //     console.log(value)
  //     return db.child(key).update(value)
  // }
  
  // upDateBio(ref,info){
  //     firebase.ref('/user').child(ref).update({
  //         dsc:info
  //     }).then(()=>{
  //         console.log('Update Complete')
  //     }).catch(err=>{
  //         console.log(err.message)
  //     })
  // }
  
}
export default new Users();
