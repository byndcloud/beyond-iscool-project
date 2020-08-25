<template>
  <v-app>
    <!-- With vuetify -->
    <v-main>
      <v-app-bar fixed>
        <v-btn x-large icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ name }}</v-toolbar-title>
      </v-app-bar>
      <div class="messages-container">
        <div v-for="(message, i) in messages" :key="i">
          <MessageCard :nameProp='name' :messageProp='message' />
        </div>
      </div>
      <v-app-bar color="#424242" fixed bottom>
        <v-text-field v-model='field' @keyup.enter='send()' solo label="Mensagem..." hide-details></v-text-field>
        <v-btn @click='send()' icon color="blue">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-app-bar>
    </v-main>
  </v-app>
</template>

<script>
import MessageCard from './components/MessageCard.vue'
export default {
  name: "App",
  components: {
    MessageCard
  },
  data: () => ({
    name: "Roberto Carlos",
    messages: [
      { user: "friend", text: "Olá, pode me ajudar?" },
      { user: "friend", text: "Sei que não falo contigo há bastante tempo mas estou escrevendo bastante aqui para termos um exemplo real de mensagem." }
    ],
    field: ''
  }),
  methods: {
    send () {
      let message = {
        user: 'me',
        text: this.field
      }
      this.messages.push(message)
      this.field = ''
    }
  }
};
</script>

<style>
.messages-container {
  width: 100%;
  padding-top: 64px;
  padding-bottom: 56px;
}
</style>