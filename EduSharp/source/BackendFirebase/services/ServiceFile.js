import { firestore } from "../configue/Firebase";


class Service {

    async post(table, data, id, navigation) {
        let obj = {};
        const userdata = {
            email: data.email,
            name: data.name,
            location: "",
            phonenumber: "",
        };

        console.log(userdata);

        await firestore.collection(`${table}`).doc(`${id}`).set(userdata).then((res) => {
            navigation.navigate('SignInScreen');
            obj = { status: 'Success', details: res };

        }).catch((err) => {
           return obj = { status: 'Failed', details: err };
        });
        
    }

    get(table) {

    }
    get(table, id, navigation) {

    }

    update(table, id, data, navigation) {

    }
}

export default new Service();