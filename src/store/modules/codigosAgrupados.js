import createEasyFirestore from 'vuex-easy-firestore'

//Creamos el store de los usuarios apartir de vuex-easy
const codigosagrupados = {
    firestorePath: 'codigosgrupos',
    firestoreRefType: 'collection', // or 'doc'
    moduleName: 'codigosagrupados',
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

const easyFirestore = createEasyFirestore(codigosagrupados, {logging: true});

export default easyFirestore;