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
Vue.config.productionTip = false


Vue.use(Firebase)
Vue.use(Vuex)
Vue.use(VueRouter)

const vuexPersist = new VuexPersistence({
  key: `beyond`,
  storage: window.localStorage,
  modules: [
    'chat'
  ]
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
    sendMessage({ commit }, message) {
      commit('addMessage', message)
    },
    async createAcc ({ commit }, payload) {
      const { email, password } = payload
      auth.createUserWithEmailAndPassword( email, password )
      .then((res) => {
        console.log(res)
        commit( 'setUser', res.user)
        router.push('/')
      })
      .catch((err) => {
        commit( 'setLoginError', err)
        console.error(err)
      })
    },
    async login ({ commit },  payload) {
      const { email, password } = payload
      auth.signInWithEmailAndPassword( email, password)
      .then((res) => {
        console.log(res)
        commit( 'setUser', res.user)
        router.push('/')
      })
      .catch((err) => {
        commit( 'setLoginError', err)
        console.error(err)
      })
    },
// eslint-disable-next-line
    logout ({ }) {
      auth.signOut()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
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
    messages: [
      { user: "friend", text: "Olá, pode me ajudar?" },
      { user: "friend", text: "Sei que não falo contigo há bastante tempo mas estou escrevendo bastante aqui para termos um exemplo real de mensagem." }
    ]
  },
  getters: {
    getMessages: state => {
      return state.messages
    }
  },
  actions: {
    sendMessage({ commit }, message) {
      commit('addMessage', message)
    }
  },
  mutations: {
    addMessage (state, message) {
      state.messages.push(message)
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
