import admin from 'firebase-admin'
const serviceAccount=require('./service-account-file.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://edusharp-de629-default-rtdb.firebaseio.com',
    
});

// const app = initializeApp();

const authentication=admin.auth()

const deleteUser=()=>{
    authentication.deleteUser('FhSBNbuburSxRZWRS4Eke67eAwn2').then(res=>console.log(res)).catch((error)=>console.log(error))
}

export {deleteUser}
