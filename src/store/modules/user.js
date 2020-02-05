import createEasyFirestore from 'vuex-easy-firestore'

//Creamos el store de los usuarios apartir de vuex-easy
const user = {
    firestorePath: 'colaboradores/{userId}',
    firestoreRefType: 'doc', // or 'doc'
    moduleName: 'user',
    statePropName: 'data',
    namespaced: true,

    state: {
    },
    mutations: {
  
    },
    actions: {
      
    },
    getters: {
  }
};

const easyFirestore = createEasyFirestore(user, {logging: true});

export default easyFirestore;