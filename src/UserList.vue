<template>
  <v-main>
    <v-list>
      <v-list-item v-for="user of users" :key="user.name" @click="openChat(user.name)">
        <v-list-item-title>{{ user.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    openChat(userName) {
      this.$router.push(`chat/${userName}`)
    }
  },
  computed: {
    ...mapState('users', ['users'])
  }
}
</script>

<style>

</style>