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
Vue.use(Vuex);

//const easyFirestores = createFirestores([users,usersasistencia])

const store = new Vuex.Store({
  modules:{app,permission},
  plugins: [users,usersasistencia,user,codigosindividuales,codigosagrupados,routers,config],
})

export default store

/*
export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
});*/
