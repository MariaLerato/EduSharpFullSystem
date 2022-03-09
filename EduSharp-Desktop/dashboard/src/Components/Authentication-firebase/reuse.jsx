import firebase from "./firebase";
import React from "react";
import { useNavigate,} from "react-router-dom";


//  const navi = useNavigation()
const db = firebase.ref('/users')
const _db = firebase.ref('/users')
const auth = firebase.app.auth()

class Users {
    signUp(email, password, firstname,lastname ){
        return firebase.app.auth().createUserWithEmailAndPassword(email, password).then(res => {
            res.user.sendEmailVerification().then( action => {
                alert('An email has been sent with the verification link, please check your emails and verify the link and then come and sign in')
                firebase.ref(`/user`).child(res.user.uid).set({
                    name : firstname,
                    lastname:lastname,
                    email: email,
                    password:password,
                    uid: res.user.uid
                })
            }).catch( err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err.message)
        })
    }  
        login(email, password,navigate,setLoad) {
            
            firebase.app.auth().signInWithEmailAndPassword(email,password).then(res => {
                
                if(res.user.emailVerified){
                    setLoad(false)
                    alert('Successfully logged in. Email verified')
                    navigate('/home')
                    localStorage.setItem('userid', res.user.uid)
                    console.log('userid',res.user.uid)
                }else {
                    setLoad(true)
                    alert('please verify your email address')
                    res.user.sendEmailVerification().then(res => {
                        alert('we send you an email again, please verify your email')
                    }).catch(err => {
                        alert(err.message)
                    })
                }
                
            })
         }
    resetPassword(email,navigate){
        auth.sendPasswordResetEmail(email).then(()=>{
            alert('password reset')
            navigate('/signIn')
        }).catch(err=>{
            console.log(err.message)
        })
    }
    
    getLoggedData(id){
        return firebase.ref(`/user/${id}`)
    }

    logOut(navigation){
        firebase.app.auth().signOut().then(() => {
            console.log('logged out')
            localStorage.removeItem('userid')
            navigation.goBack()
        }).catch(err => {
            console.log(err.message)
        })
    }
    getData(){
        return db
    }
    createData(userinfo){
        return db.push(userinfo)
    }
    getDataById(ref){
        return firebase.ref(`/users/${ref}`);
    }
    updateData(key,value){
        console.log(value)
        return db.child(key).update(value)
    }
    signOut(navigation){
        auth.signOut().then(()=>{
            localStorage.removeItem('userid')
            console.log('logged out')
            navigation.goBack()
        }).catch(err=>{
            console.log(err.message)
        })
    }
    upDateBio(ref,info){
        firebase.ref('/user').child(ref).update({
            dsc:info
        }).then(()=>{
            console.log('Update Complete')
        }).catch(err=>{
            console.log(err.message)
        })
    }
    GoogleLogin(){
        auth.fetchSignInMethodsForEmail()
    }
}
export default new Users()
