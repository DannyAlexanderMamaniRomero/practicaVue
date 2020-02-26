import Vue from 'vue';
import Router from 'vue-router';
import store from './store'

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'default' ,title:'Home'},
    hidden: true,
    component: () => import(/* webpackChunkName: "home" */'@/views/Home'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'no-sidebar' , title:'Login'},
    hidden: true,
    component: () => import(/* webpackChunkName: "login" */'@/views/Login'),
  },
  {
    path: '/home',
    name: 'home',
    meta: { layout: 'default' , title:'Inicio'},
    component: () => import(/* webpackChunkName: "home" */'@/views/Home'),
  }
  
]
export const asyncRouterMap =[
  {
    path: '/asistencia',
    name: 'asistencia',
    meta: { layout: 'default', title:'Pasar Asistencia'},
    component: () => import(/* webpackChunkName: "asistencia" */'@/views/Asistencia'),
  },
  {
    path: '/adminasistencia',
    name: 'adminasistencia',
    meta: { layout: 'default' , roles: ["admin"], title:'Lista Asistencia [Administrador]'},
    component: () => import(/* webpackChunkName: "adminasistencia" */ '@/views/AdminAsistencia'),
  },
  {
    path: '/userasistencia',
    name: 'userasistencia',
    meta: { layout: 'default' , title:'Lista Asistencia [Usuario]'},
    component: () => import(/* webpackChunkName: "adminasistencia" */ '@/views/UserAsistencia'),
  },
  {
    path: '/alumnos',
    name: 'alumnos',
    meta: { layout: 'default' , roles: ["admin"], title:'Panel de Alumnos'},
    component: () => import(/* webpackChunkName: "adminasistencia" */ '@/views/Alumnos'),
  },  
  {
    path: '/codigos',
    name: 'codigos',
    meta: { layout: 'default' , roles: ["admin"], title:'Panel de códigos'},
    component: () => import(/* webpackChunkName: "adminasistencia" */ '@/views/Codigos'),
  },
  {
    path: '/routes',
    name: 'routes',
    meta: { layout: 'default' , roles: ["admin"], title:'Panel de Rutas'},
    component: () => import(/* webpackChunkName: "adminasistencia" */ '@/views/RouteRestriccion'),
  },
  {
    path: '/demodanny',
    name: 'demodanny',
    meta: { layout: 'default', title:'Registro de Notas'},
    component: () => import(/* webpackChunkName: "demoDanny" */ '@/views/demoDanny'),
  },
]
const router = new Router({
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 }),
});

const whiteList = ['/login','/home']// no redirect whitelist

router.beforeEach((to, from, next) => {
  if(store.state.app.userIsLogin){
    if (to.path === '/login') {
      next({ path: '/home' })
    }else {
      if(store.state.permission.addRouters.length === 0){
        const roles = store.state.user.data.roles
        store.dispatch('GenerateRoutes', roles).then(() => { 
          router.addRoutes(store.state.permission.addRouters) 
          next({ ...to, replace: true }) 
        }).catch((err) => {
          next({ path: '/' })
        })
        
      }
      next()
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      console.log("next")
      next()
    }
    else{
      next({ path: '/login' })
    }
    
  }
})

export default router