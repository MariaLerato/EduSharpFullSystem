
import { auth } from "../configue/Firebase";
import Service from "./ServiceFile";


class Auth {
  async SignUp(data, navigation) {
    let obj = {};
    try {
      await auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          auth.currentUser.sendEmailVerification().then(() => {
            Service.post("users", data, userCredential.user.uid, navigation);
          }).catch((err) => {

            obj = { status: 'Failed', details: err };

          });

        })
        .catch((err) => {

          obj = { status: 'Failed', details: err };

        });
    } catch (err) {
      console.log(err);
    }
    return obj;
  }
  async SignIn(data, navigation) {
    let obj = {};
    try{
    await auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        if (auth.currentUser.emailVerified) { navigation.navigate('DashBoard') }
        else {
          auth.currentUser.sendEmailVerification();
          obj = { status: 'Success', details: "Your account is not verified, please verify your account" }
        }
      })
      .catch((error) => {
        obj = { status: 'Failed', details: error }
      });
    }catch(err){
      console.log(err);
    }
    return obj;
  }

  // async  loginWithFacebook() {
  //   await Facebook.initializeAsync('363241902313591');

  //   const { type, token } = await Facebook.logInWithReadPermissionsAsync({
  //     permissions: ['public_profile'],
  //   });

  //   if (type === 'success') {
  //     // Build Firebase credential with the Facebook access token.
  //     const facebookAuthProvider = new FacebookAuthProvider();
  //     const credential = facebookAuthProvider.credential(token);

  //     // Sign in with credential from the Facebook user.
  //     signInWithCredential(auth, credential).catch(error => {
  //       // Handle Errors here.
  //     });
  //   }
  // }

  async SignOut(navigation, location) {
    let obj = {}
    await auth
      .signOut()
      .then(() => {
        navigation.replace(location);
        obj = { status: "success", message: "signed out" };
      })
      .catch((error) => {
        obj = { status: "Error", message: error };
      });
    return obj;
  }
  async authState() {
    return await auth.onAuthStateChanged((user) => {
      let obj = {};
      if (user) {
        obj = { status: "success", message: "user logged in" };
      } else {
        obj = {
          status: "Error",
          message: "user not logged in",
        };
      }
    });

  }

}

export default new Auth();
