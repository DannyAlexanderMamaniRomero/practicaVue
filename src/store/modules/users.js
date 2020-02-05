import createEasyFirestore from 'vuex-easy-firestore'

//Creamos el store de los usuarios apartir de vuex-easy
const users = {
    firestorePath: 'colaboradores',
    firestoreRefType: 'collection', // or 'doc'
    moduleName: 'users',
    statePropName: 'data',
    namespaced: true,

    state: {
  
    },
    mutations: {
  
    },
    actions: {
      
    },
    getters: {
        getUserByID: (state) => (id) => {
            return state.data[id];
        }
  }
};

const easyFirestore = createEasyFirestore(users, {logging: true});

export default easyFirestore;