import createEasyFirestore from 'vuex-easy-firestore'

//Creamos el store de los usuarios apartir de vuex-easy
const routers = {
    firestorePath: 'configuracion/rutas/lista',
    firestoreRefType: 'collection', // or 'doc'
    moduleName: 'routers',
    statePropName: 'data',
    namespaced: true,

    state: {
  
    },
    mutations: {
  
    },
    actions: {
      
    },
    getters: {
        getFingerprintByName: (state) => (id) => {
            if(state.data[id])
                return state.data[id].fingerprint;
            else return null
        },

  }
};

const easyFirestore = createEasyFirestore(routers, {logging: true});

export default easyFirestore;