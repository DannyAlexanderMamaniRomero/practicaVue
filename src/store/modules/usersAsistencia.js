import createEasyFirestore from 'vuex-easy-firestore'


//Creamos el store de los usuarios apartir de vuex-easy
const usersAsistencia = {
    firestorePath: 'colaboradores/{idusuario}/nasistencia',
    firestoreRefType: 'collection', // or 'doc'
    moduleName: 'usersasistencia',
    statePropName: 'data',
    namespaced: true,

    mutations: {
  
    },
    actions: {
  
    },
    getters: {
        // ...
        getAsistenciaByID: (state) => (id) => {
            return state.data[id];
        }
    }
};

const easyFirestore = createEasyFirestore(usersAsistencia, {logging: true});

export default easyFirestore;