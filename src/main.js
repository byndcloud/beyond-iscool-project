import Vue from 'vue'
import App from './App.vue'
import UserList from './UserList.vue'
import Chat from './Chat.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Firebase from './firebase'

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
