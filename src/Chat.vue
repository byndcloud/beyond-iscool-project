<template>
  <v-main>
    <v-toolbar fixed>
      <v-btn x-large icon @click="$router.push('/')">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $route.params.name }}</v-toolbar-title>
    </v-toolbar>
    <div class="messages-container">
      <div v-for="(message, i) in messages" :key="i">
        <MessageCard :messageProp='message' />
      </div>
    </div>
    <v-app-bar color="#424242" fixed bottom>
      <v-text-field v-model='field' @keyup.enter='send()' solo label="Mensagem..." hide-details v-if="!fileMode"></v-text-field>
      <v-file-input v-model="file" accept="image/*" label="Clique aqui para adicionar uma imagem" solo hide-details v-if="fileMode"></v-file-input>
      <v-btn @click='fileMode = !fileMode' icon color="blue">
        <v-icon v-if="!fileMode">mdi-camera</v-icon>
        <v-icon v-if="fileMode">mdi-text</v-icon>
      </v-btn>
      <v-btn @click='send()' icon color="blue">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-app-bar>
  </v-main>
</template>

<script>
import MessageCard from './components/MessageCard.vue'
import { firestore } from './firebase'
import { mapGetters } from 'vuex'

export default {
  name: "App",
  components: {
    MessageCard
  },
  data: () => ({
    field: '',
    fileMode: false, 
    file: null,
    messages: []
  }),
  methods: {
    send () {
      let message = {
        user: this.getUser.email,
        text: this.field,
        file: this.file,
        to: this.$route.params.name
      }
      this.$store.dispatch('chat/sendMessage', message)
      this.field = ''
      this.file = null
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

<style>

</style>