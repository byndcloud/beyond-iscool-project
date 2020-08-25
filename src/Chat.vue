<template>
  <v-main>
    <v-toolbar fixed>
      <v-btn x-large icon @click="$router.push('/')">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $route.params.name }}</v-toolbar-title>
    </v-toolbar>
    <div class="messages-container">
      <div v-for="(message, i) in getMessages" :key="i">
        <v-card outlined v-if="message.user == 'friend'" class='ma-3 teal accent-4'>
          <v-card-subtitle class="font-weight-bold">{{ $route.params.name }}</v-card-subtitle>
          <v-card-text>{{ message.text}}</v-card-text>
        </v-card>
        <v-card outlined v-else class='ma-3 grey lighten-2'>
          <v-card-subtitle class="font-weight-bold">Eu</v-card-subtitle>
          <v-card-text>{{ message.text}}</v-card-text>
        </v-card>
      </div>
    </div>
    <v-app-bar color="#424242" fixed bottom>
      <v-text-field v-model='field' @keyup.enter='send()' solo label="Mensagem..." hide-details></v-text-field>
      <v-btn @click='send()' icon color="blue">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-app-bar>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "App",
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
      this.field = ''
    }
  },
  computed: {
    ...mapGetters('chat', ['getMessages'])
  }
}
</script>

<style>

</style>