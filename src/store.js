import Vue from 'vue';
import Vuex from 'vuex';
import users from './store/modules/users';
import user from './store/modules/user';
import usersasistencia from './store/modules/usersAsistencia';
import app from './store/modules/app';
import codigosindividuales from './store/modules/codigosIndividuales';
import codigosagrupados from './store/modules/codigosAgrupados';
import permission from './store/modules/permission';
import routers from './store/modules/routers';
import config from './store/modules/config';
import demodanny from './store/modules/demoDanny';
import alumno from './store/modules/alumno';
Vue.use(Vuex);

//const easyFirestores = createFirestores([users,usersasistencia])

const store = new Vuex.Store({
  modules:{app,permission},
  plugins: [users,usersasistencia,user,codigosindividuales,codigosagrupados,routers,config,demodanny,alumno],
  state: {
      name:'danny'
  },
})

export default store


// export default new Vuex.Store({
//   modules:{app,permission},
//   plugins: [users,usersasistencia,user,codigosindividuales,codigosagrupados,routers,config],
//   state: {
//     name:'danny'
//   },
//   mutations: {

//   },
//   actions: {

//   },
// });
