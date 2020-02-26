import createEasyFirestore from 'vuex-easy-firestore'

//Creamos el store de los usuarios apartir de vuex-easy
const demoDanny = {
    firestorePath: 'DEMOS/',
    firestoreRefType: 'collection', // or 'doc'
    moduleName: 'demodanny',
    statePropName: 'data',
    namespaced: true,   

    mutations: {
  
    },
    actions: {
  
    },
    getters: {
        // ...
        // getAlumnoByID: (state) => (id) => {
        //     return state.data[id];
        // }
    }
};

const easyFirestore = createEasyFirestore(demoDanny, {logging: true});

export default easyFirestore;