import { auth, firestore, storage,firebase, } from "./firebase";
import React from "react";
import { useNavigate } from "react-router-dom";
import{getAuth}from 'firebase/auth'
// import {} from './Authentication'

const admin = firestore.collection("admin");
const storageref = storage.ref("files");

class Users {
  async signUp(email, password, firstname, lastname) {
    let res = new Promise((result, rej) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          result({
            status: "success",
            name: firstname,
            lastname: lastname,
            email: email,
            uid: res.user.uid
          });
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
    });

    return await res;
  }

  async login(email, password, navigate) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        navigate("/home");
        localStorage.setItem("userid", res.user.uid);
      })
      .catch((error) => {
        console.log("login error: ", error);
      });
  }
  resetPassword(email, navigate) {
    auth
      .sendPasswordResetEmail(email)
      .then((res) => {
        navigate("/signIn");
      })
      .catch((error) => {
        console.log("reset password error:" + error);
      });
  }
  signOut() {
    localStorage.removeItem("userid");
    auth.signOut();
    // navigate("/");
    // console.log("=======================================",navigate());
    // navigate("/signIn");
  }
  isLogIn() {
    const id = localStorage.getItem("userid");

    if (id) return true;

    return false;
  }
  async addItem(subject, grade, description, topic, file, filename, item) {
    //item=>{lessons,question paper,books}
    const id = localStorage.getItem("userid");
    console.log("llllll");
    if (
      !subject ||
      !grade ||
      !description ||
      !topic ||
      !file ||
      !item ||
      !filename ||
      !id
    ) {
      return {
        status: "Error",
        message: "Please enter all the information!"
      };
    }
    console.log(id, "------=-=---------========---------=---------=", item);

    if (!id) {
      return {
        status: "Error",
        message: "Please log in!"
      };
    }

    const results = new Promise(async (resolutionFunc, rejectionFunc) => {
      var uploadTask = storageref.child(`${item}/${id}/${filename}`).put(file);
      await uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {resolutionFunc({
          status: "Error",
          message: error,
        })},
        () => {
          const url = uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              // alert("Successfully Added A New File");
              console.log("File available at", downloadURL);
              firestore.collection(item).doc().set({
                createdAt: new Date(),
                description: description,
                downloadURL,
                downloadable: true,
                grade: grade,
                illustrationURL: null,
                status: true,
                subject: subject,
                topic: topic,
                isAdmin: true,
                userID: id
              });
              resolutionFunc({
                status: "Success",
                message: "Data added",
                newData: {
                  createdAt: new Date(),
                  description: description,
                  downloadURL,
                  downloadable: true,
                  grade: grade,
                  illustrationURL: null,
                  status: true,
                  subject: subject,
                  topic: topic,
                  isAdmin: true,
                  userID: id
                }
              });
            });
        }
      );
    });

    return results;
  }
  viewItems(item) {
    const id = localStorage.getItem("userid");
    console.log("amariamariamariaamariamairiaamiair");
    var res = [];
    return firestore
      .collection(item)
      .where("userID", "==", id)
      .get()
      .then((querySnapshot) => {
        var arr = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const data = { itemKey: doc.id, ...doc.data() };
          arr.push(data);
          //console.log(doc.id, " => ", doc.data());
        });
        return {
          status: "success",
          message: "successfuly retrived data",
          data: arr
        };
      })
      .catch((error) => {
        return error;
      });
  }

  getUser() {
    return firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        var arr = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          arr.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
        return {
          status: "success",
          message: "successfuly retrived data",
          data: arr
        };
      })
      .catch((error) => {
        return {
          status: "Error",
          message: error,
          data: []
        };
      });
  }

  deleteItem(item, itemKey) {
    if (!item || !itemKey) {
      return {
        status: "error",
        message: "missing some fields"
      };
    }
    return firestore
      .collection(item)
      .doc(itemKey)
      .delete()
      .then(() => {
        return {
          status: "success",
          message: "Document successfully deleted! "
        };
      })
      .catch((error) => {
        return {
          status: "error",
          message: `Error removing document: ${error}`
        };
      });
  }
  updateItem(item,itemKey,updateData){
    if (!item || !itemKey||!updateData) {
      return {
        status: "error",
        message: "missing some fields"
      };
    }
    firestore.collection(item).doc(itemKey).update(updateData).then(()=>{
      return{
        staus:'Success',
        message:'Data updatedd'
      }
    }).catch((error)=>{

    })
  }
  deleteUser(userid){
    //0f5Lk6EcfqedagfcxAu4WJadQtj2
    // getAuth()
    // .deleteUser('FhSBNbuburSxRZWRS4Eke67eAwn2')
    // .then(() => {
    //   console.log('Successfully deleted user');
    // })
    // .catch((error) => {
    //   console.log('Error deleting user:', error);
    // });
    // const user=firebase.auth().getUser('FhSBNbuburSxRZWRS4Eke67eAwn2');
    // auth.getUser('FhSBNbuburSxRZWRS4Eke67eAwn2').then(res=>console.log(res)).catch(error=>console.log(error))
    // auth.getUser('FhSBNbuburSxRZWRS4Eke67eAwn2').then(res=>console.log(res)).catch(error=>console.log(error))
    console.log('_____________________________________')
    // auth.remove('h7KIHxalwxcycgIMyf4AY5HzFwm2').then(res=>console.log(res,'=======')).catch((error)=>console.log(error))
  }
}
export default new Users();
