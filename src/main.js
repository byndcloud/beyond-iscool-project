import Vue from 'vue'
import App from './App.vue'
import UserList from './UserList.vue'
import Chat from './Chat.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Firebase, { auth } from './firebase'
import Login from './Login'
import axios from 'axios'
Vue.config.productionTip = false

Vue.use(Firebase)
Vue.use(Vuex)
Vue.use(VueRouter)

const vuexPersist = new VuexPersistence({
  key: `beyond`,
  storage: window.localStorage,
  modules: ['chat']
})

const users = {
  namespaced: true,
  state: {
    users: [
      {
        name: 'Guilherme'
      },
      {
        name: 'Vinícius'
      },
      {
        name: 'Almir'
      }
    ],
    user: null,
    loginError: null
  },
  getters: {
    getMessages: state => {
      return state.messages
    }
  },
  actions: {
    sendMessage ({ commit }, message) {
      commit('addMessage', message)
    },
    async createAcc ({ commit }, payload) {
      const { email, password } = payload
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res)
          commit('setUser', res.user)
          router.push('/')
        })
        .catch(err => {
          commit('setLoginError', err)
          console.error(err)
        })
    },
    async login ({ commit }, payload) {
      const { email, password } = payload
      auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res)
          commit('setUser', res.user)
          router.push('/')
        })
        .catch(err => {
          commit('setLoginError', err)
          console.error(err)
        })
    },
    // eslint-disable-next-line
    logout({}) {
      auth
        .signOut()
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mutations: {
    addMessage (state, message) {
      state.messages.push(message)
    },
    setUser (state, user) {
      state.user = user
    },
    setLoginError (state, error) {
      state.loginError = error
    }
  }
}

const chat = {
  namespaced: true,
  state: {
    messages: []
  },
  getters: {
    getMessages: state => {
      return state.messages
    }
  },
  actions: {
    clear ({ commit }) {
      commit('deleteAllMessages')
    },
    sendMessage ({ commit }, message) {
      commit('addMessage', message)
    },
    async getDoggyMessage ({ commit }) {
      const url = 'https://api.thedogapi.com/v1/images/search?limit=1'
      const response = await axios.get(url, {
        headers: {
          'x-api-key': 'dcfdb2e1-9d5c-4d60-98ca-069bb106650f'
        }
      })
      const dogInfo = response.data[0]
      dogInfo.messageType = 'dog'
      dogInfo.favorite = false
      commit('addMessage', dogInfo)
    },
    async favorite (context, dog) {
      const url = 'https://api.thedogapi.com/v1/favourites'
      const config = {
        headers: {
          'x-api-key': 'dcfdb2e1-9d5c-4d60-98ca-069bb106650f'
        }
      }
      console.log(`dog info`, dog)
      try {
        if (dog.favorite) {
          const response = await axios.post(url, {
            image_id: dog.id
          }, config)
          console.log(`response`, response)
          return response.data.id
        } else {
          const response = await axios.delete(`${url}/${dog.favoriteId}`, config)
          console.log(`delete response`, response)
          return null
        }
      } catch (e) {
        console.log(e.response)
      }
    }
  },
  mutations: {
    addMessage (state, message) {
      state.messages.push(message)
    },
    deleteAllMessages (state) {
      state.messages = []
    }
  }
}

const store = new Vuex.Store({
  modules: {
    users: users,
    chat: chat
  },
  plugins: [vuexPersist.plugin]
})

const routes = [
  {
    path: '/',
    component: UserList
  },
  {
    path: '/chat/:name',
    component: Chat
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from, next)
  if (to.fullPath === '/chat/Vinícius') next('/')
  else next()
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
