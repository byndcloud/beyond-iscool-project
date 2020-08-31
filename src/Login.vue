<template>
    <v-main>
        <v-container fluid fill-height>
            <v-col>
                <v-text-field outlined label="Email" v-model="email"></v-text-field>
                <v-text-field outlined label="Senha" type="password" v-model="password"></v-text-field>
                <v-btn color="primary" @click="login()"> Entrar</v-btn>
                <v-btn dark small color="#db4a39" fab style="margin-left: 20px;">
                    <v-icon>
                        mdi-google
                    </v-icon>
                </v-btn>
                <v-btn color="primary" text style="margin-left: 20px;" @click="createAccDialog = true"> Criar conta</v-btn>
            </v-col>
            <v-dialog v-model="createAccDialog">
                <v-card>
                    <v-col>
                        <v-text-field outlined label="Email" v-model="newEmail"></v-text-field>
                        <v-text-field outlined label="Senha" type="password" v-model="newPassword"></v-text-field>
                        <v-btn color="primary" @click="createAcc()"> Criar</v-btn>
                    </v-col>
                </v-card>
            </v-dialog>
        </v-container>
    </v-main>
</template>
<script>
export default {
  data () {
    return {
      createAccDialog: false,
      newEmail: '',
      email: '',
      newPassword: '',
      password: ''
    }
  },
  methods: {
    createAcc () {
      this.$store.dispatch('users/createAcc', { email: this.newEmail, password: this.newPassword })
      this.newEmail = ''
      this.newPassword = ''
    },
    login () {
      this.$store.dispatch('users/login', { email: this.email, password: this.password })
      this.email = ''
      this.password = ''
    }
  }
}
</script>
