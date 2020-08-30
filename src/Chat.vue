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
      <div v-for="(message, i) in getMessages" :key="i">
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
      <v-btn @click="send()" icon color="blue">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-app-bar>
  </v-main>
</template>

<script>
import MessageCard from './components/MessageCard.vue'
import DogInfoCard from './components/DogInfoCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    MessageCard,
    DogInfoCard
  },
  data: () => ({
    field: ''
  }),
  methods: {
    send () {
      let message = {
        user: 'me',
        text: this.field
      }
      this.$store.dispatch('chat/sendMessage', message)
      if (this.field.toLowerCase().includes('dog')) {
        this.$store.dispatch('chat/getDoggyMessage')
      }
      this.field = ''
    },
    clearMessages () {
      this.$store.dispatch('chat/clear')
    }
  },
  computed: {
    ...mapGetters('chat', ['getMessages'])
  }
}
</script>

<style scoped>
.messages-container {
  padding-bottom: 66px;
}
</style>
