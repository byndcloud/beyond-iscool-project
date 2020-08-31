<template>
  <v-main>
    <v-toolbar fixed>
      <v-btn x-large icon @click="$router.push('/')">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $route.params.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn x-large icon @click="clearMessages">
        <v-icon>mdi-playlist-remove</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="messages-container">
      <div class="message" v-for="(message, i) in getMessages" :key="i">
        <DogInfoCard v-if="message.messageType === 'dog'" :dog="message" />
        <MessageCard v-else :messageProp="message" />
      </div>
    </div>
    <v-app-bar color="#424242" fixed bottom>
      <v-text-field
        v-model="field"
        @keyup.enter="send()"
        solo
        label="Mensagem..."
        hide-details
      ></v-text-field>
     <v-file-input v-model="file" accept="image/*" label="Clique aqui para adicionar uma imagem" solo hide-details v-if="fileMode"></v-file-input>
      <v-btn @click='fileMode = !fileMode' icon color="blue">
        <v-icon v-if="!fileMode">mdi-camera</v-icon>
        <v-icon v-if="fileMode">mdi-text</v-icon>
      </v-btn>
      <v-btn @click='send()' icon color="blue"></v-btn>
    </v-app-bar>
  </v-main>
</template>

<script>
import MessageCard from './components/MessageCard.vue'
import { firestore } from './firebase'
import DogInfoCard from './components/DogInfoCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    MessageCard,
    DogInfoCard
  },
  data: () => ({
    field: '',
    fileMode: false, 
    file: null,
    messages: []
  }),
  methods: {
    async send () {
      let message = {
        user: this.getUser.email,
        text: this.field,
        file: this.file,
        to: this.$route.params.name
      }
      this.$store.dispatch('chat/sendMessage', message)
      if (this.field.toLowerCase().includes('dog')) {
        await this.$store.dispatch('chat/getDoggyMessage')
      }
      this.$nextTick(() => {
        this.scrollToBottom()
      })
      this.field = ''
      this.file = null
    },
    clearMessages () {
      this.$store.dispatch('chat/clear')
    },
    scrollToBottom () {
      const messages = document.querySelector('.messages-container')
      window.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' })
    }
  },
  computed: {
    ...mapGetters('users', ['getUser'])
  },
  created () {
    firestore.collection('messages').where('user', '==', this.getUser.email).where('to', '==', this.$route.params.name).orderBy('created_at', 'desc')
    .onSnapshot((querySnapshot) => {
      this.messages = []
      querySnapshot.forEach((doc) => {
        this.messages.push(doc.data())
      })
    })
  }
}
</script>

<style scoped>
.messages-container {
  padding-bottom: 66px;
}
</style>
