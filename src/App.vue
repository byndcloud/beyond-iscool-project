<template>
  <v-app>
    <v-main>
      <v-app-bar fixed>
        <v-btn x-large icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ name }}</v-toolbar-title>
      </v-app-bar>
      <div class="messages-container">
        <div v-for="(message, i) in messages" :key="i">
          <v-card outlined v-if="message.user == 'friend'" class='ma-3 teal accent-4'>
            <v-card-subtitle class="font-weight-bold">{{ name }}</v-card-subtitle>
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
  </v-app>
</template>

<script>
export default {
  name: "App",
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