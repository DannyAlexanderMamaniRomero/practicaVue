import createEasyFirestore from 'vuex-easy-firestore'

//Creamos el store de los usuarios apartir de vuex-easy
const config = {
    firestorePath: 'configuracion',
    firestoreRefType: 'collection', // or 'doc'
    moduleName: 'config',
    statePropName: 'data',
    namespaced: true,

    state: {
  
    },
    mutations: {
  
    },
    actions: {
      
    },
    getters: {
        getConfigbyName: (state) => (value) => {
            return state.data[value];
        }
  }
};

const easyFirestore = createEasyFirestore(config, {logging: true});

export default easyFirestore;