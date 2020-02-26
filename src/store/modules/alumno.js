import createEasyFirestore from 'vuex-easy-firestore'

//Creamos el store de los usuarios apartir de vuex-easy
const alumno = {
    firestorePath: 'DEMOS/{idalumno}',
    firestoreRefType: 'doc', // or 'doc'
    moduleName: 'alumno',
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

const easyFirestore = createEasyFirestore(alumno, {logging: true});

export default easyFirestore;