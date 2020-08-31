<template>
    <div>
        <v-card v-if="!messageProp.file" outlined class='ma-3' :class="{ 'teal accent-4': messageProp.user == 'friend', 'grey lighten-2': messageProp.user != 'friend' }">
        <v-card-subtitle class="font-weight-bold">{{ messageProp.user == 'friend' ? $route.params.name : "Eu" }}</v-card-subtitle>
        <v-card-text>{{ messageProp.text}}</v-card-text>
    </v-card>
    <v-card v-if="messageProp.file" outlined class='ma-3' :class="{ 'teal accent-4': messageProp.user == 'friend', 'grey lighten-2': messageProp.user != 'friend' }">
        <v-card-subtitle class="font-weight-bold">{{ messageProp.user == 'friend' ? $route.params.name : "Eu" }}</v-card-subtitle>
        <v-img v-if="src" :src="src"/>
    </v-card>
    </div>  
</template>

<script>
import { storage } from '../firebase'
export default {
    props: [ 'messageProp' ],
    data () {
        return {
            ready: false,
            src: null
        }
    },
    async created () {
        if (this.messageProp.file){
            const url = await storage.ref().child(`${this.messageProp.user}/${this.messageProp.to}/image`).getDownloadURL()
            console.log(url)
            this.src = url

        }
    }
}
</script>