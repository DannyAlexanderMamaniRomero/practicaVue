import { asyncRouterMap, constantRouterMap } from '@/router'
import Fingerprint2 from 'fingerprintjs2';
import store from '@/store.js'


function fingerprintPermission(route, localfinger){
  let routeFinger = store.getters["routers/getFingerprintByName"](route.name);
  if(!routeFinger) return true
  return routeFinger.includes(localfinger)
}

function hasPermission(roles, route) {
    if(roles.includes("admin")) return true;
    if (route.meta && route.meta.roles) {
      
      return roles.some(role => route.meta.roles.includes(role))
    } else {
      return true
    }
  }

async function filterAsyncRouter(routes, roles) {
    const res = []
    var hashtemp = ""
    Fingerprint2.getV18(function(hash){
      hashtemp = hash // an array of components: {key: ..., value: ...}
      console.log("hash: "+hash)
    })
    await store.dispatch('routers/openDBChannel').catch(console.error)
    routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(roles, tmp) && fingerprintPermission(tmp,hashtemp)) {
          res.push(tmp)
      }
    })
    
    return res
}

const permission = {
    state: {
      routers: constantRouterMap,
      addRouters: []
    },
    mutations: {
      SET_ROUTERS: (state, routers) => {
        state.addRouters = routers
        state.routers = constantRouterMap.concat(routers)
      },
      RESET_STATE:(state) => {
        state.addRouters = [];
	    state.routers = constantRouterMap
      },
    },
    actions: {
      GenerateRoutes({ commit }, roles) {
        return new Promise(async resolve => {
          let accessedRouters
          if (roles.indexOf('admin') >= 0) {
            
            accessedRouters = await filterAsyncRouter(asyncRouterMap, roles)
          } else {
            accessedRouters = await filterAsyncRouter(asyncRouterMap, roles)
          }
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        })
      },
      ResetStatePermision({ commit }) {
        
          commit('RESET_STATE')
        
      },
    }
  }
  
  export default permission