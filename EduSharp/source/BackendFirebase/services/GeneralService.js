import { firestore } from "../configue/Firebase";


class GeneralService {

    async post(table, data, navigation) {
        let obj = [];
        
        return await firestore.collection(table).doc().set(data).then((res) => {
            const object =  { status: 'Success', details: res };
            obj.push(object);
            console.log(res, "==>>");
        }).catch((err) => {
            const object = { status: 'Failed', details: err };
            obj.push(object);
            console.log(err, "======>>>>>>>");
        });
    }

    async indiPost(table,id,object,data,navigation){
        return await firestore.collection(table).doc(id).set(data).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }

    async get(table) {
         return await firestore.collection(table).get().then(querySnapshot=>{
            console.log('Total users: ', querySnapshot.size);
            let data = [];
            querySnapshot.forEach(documentSnapshot => {
                data.push(documentSnapshot.data());
            });

        }).catch(err=>{
            console.log('====================================');
            console.log(err, "==>>==>");
            console.log('====================================');
        });
    }
    async getItem(table, id, navigation) {
        return await firestore.collection(table).doc(id).get();
    }

    async update(table, id, data, navigation) {
        return await firestore.collection(table).doc(id).update(data);
    }
}

export default new GeneralService();