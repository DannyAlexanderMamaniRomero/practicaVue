const app = {
    state: {
        userSelector:null,
        userIsLogin: false,
        routeSelector:null,
        roleSelector: null,
    },
    mutations:{
        SET_USERSELECTOR:(state,user) =>{
            state.userSelector = user
        },
        SET_USERISLOGIN:(state,flag) =>{
            state.userIsLogin = flag
        },
        SET_ROUTESELECTOR:(state,flag) =>{
            state.routeSelector = flag
        },
        SET_ROLESELECTOR:(state,flag) =>{
            state.roleSelector = flag
        }
    },
    actions:{
        setUserSelector({commit},{user}){
            commit('SET_USERSELECTOR',user)
        },
        setUserIsLogin({commit},{flag}){
            commit('SET_USERISLOGIN',flag)
        },
        setRouteSelector({commit},{flag}){
            commit('SET_ROUTESELECTOR',flag)
        },
        setRoleSelector({commit},{flag}){
            commit('SET_ROLESELECTOR',flag)
        },
    }
}

export default app