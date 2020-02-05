import createEasyFirestore from 'vuex-easy-firestore'

//Creamos el store de los usuarios apartir de vuex-easy
const codigosindividuales = {
    firestorePath: 'codigos',
    firestoreRefType: 'collection', // or 'doc'
    moduleName: 'codigosindividuales',
    statePropName: 'data',
    namespaced: true,

    state: {
    },
    mutations: {
  
    },
    actions: {
      
    },
    getters: {
        getCodigoByID: (state) => (id) => {
            return state.data[id];
        },
        
        getCodigosAgrupados: state => {
            return Object.values(state.data).filter(obj => obj.agrupado == true)
        },
        getCodigosSinAgrupar: state => {
            return Object.values(state.data).filter(obj => obj.agrupado == false)
        },
        userExists: (state) => (codigo) =>{
            return Object.values(state.data).filter(obj => obj.usuario == codigo)
        }
  }
};

const easyFirestore = createEasyFirestore(codigosindividuales, {logging: true});

export default easyFirestore;