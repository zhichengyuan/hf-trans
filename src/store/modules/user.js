import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    storename: '',
    username: '',
    isAllAgent:'',
    companyMsg:{},
    linkSid:'',
    totalM:"",
    useM:"",
    invitCode:"",
}

const mutations = {
   
    SET_USERNAME: (state, username) => {
        state.username = username
    },
    SET_INVITCODE: (state, invitCode) => {
        state.invitCode = invitCode
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_STORENAME: (state, storename) => {
        state.storename = storename
    },
    SET_PARENT: (state, parent) => {
        state.parent = parent
    },
    SET_IsAllAgent: (state, parent) => {
        state.isAllAgent = parent
    },
    SET_CompanyMsg: (state, companyMsg) => {
        state.companyMsg = companyMsg
    },
    SET_linkSid: (state, linkSid) => {
        state.linkSid = linkSid
    },
    SET_userM: (state, useM) => {
        state.useM = useM
    },
    SET_totalM: (state, totalM) => {
        state.totalM = totalM
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                // console.log(response);
                commit('SET_TOKEN', data.token)
                // commit('SET_IsAllAgent', data.token)
                setToken(data.token) 
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    setIsAllAgent({commit},type) {
        commit("SET_IsAllAgent", type)
    },
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                console.log(response);
                const { data } = response
                // console.log(data);
                if (data.language) {
                    localStorage.setItem('language', data.language)
                } else {
                    localStorage.removeItem('language')
                }

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { roles, username, avatar, parent, introduction, storename ,_id,useM,totalM,invitCode} = data
                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }
                commit('SET_CompanyMsg',data)
                commit("SET_USERNAME", username)
                commit("SET_PARENT", parent)
                commit("SET_STORENAME", storename)
                commit('SET_ROLES', roles)
                commit('SET_NAME', username)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                commit('SET_linkSid', _id)
                commit('SET_userM', useM)
                commit('SET_totalM', totalM)
                commit('SET_INVITCODE', invitCode)
                if(data.isAllAgent){
                    commit('SET_IsAllAgent', data.isAllAgent)
                }else{
                    commit('SET_IsAllAgent', '0')
                }
                
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                // console.log("logout")
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()

                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                dispatch('tagsView/delAllViews', null, { root: true })

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // dynamically modify permissions
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            const token = role + '-token'

            commit('SET_TOKEN', token)
            setToken(token)

            const { roles } = await dispatch('getInfo')

            resetRouter()

            // generate accessible routes map based on roles
            const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // reset visited views and cached views
            dispatch('tagsView/delAllViews', null, { root: true })

            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}