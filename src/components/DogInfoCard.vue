<template>
  <v-card outlined class="ma-3 green accent-4">
    <v-card-subtitle class="font-weight-bold">The Dog API</v-card-subtitle>
    <v-img
      :src="dog.url"
      :lazy-src="lazy"
      height="auto"
      width="100%"
      :aspect-ratio="dog.width / dog.height"
    />
    <v-card-text v-if="breedInfo">
      <div><b>Name:</b> {{ breedInfo.name || 'unknown' }}</div>
      <div><b>Temperament:</b> {{ breedInfo.temperament || 'unknown' }}</div>
      <div><b>Breed group:</b> {{ breedInfo.breed_group || 'unknown' }}</div>
      <div><b>Origin:</b> {{ breedInfo.origin || 'unknown' }}</div>
      <div><b>Height:</b> {{ breedInfo.height.metric || 'unknown' }}</div>
      <div><b>Weight:</b> {{ breedInfo.weight.metric || 'unknown' }}</div>
      <div><b>Life span:</b> {{ breedInfo.height.life_span || 'unknown' }}</div>
      <div><b>Bred for:</b> {{ breedInfo.bred_for || 'unknown' }}</div>
    </v-card-text>
    <v-card-text v-else>No information about this doggy :(</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    dog: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      lazy:
        'https://cdn4.vectorstock.com/i/1000x1000/32/18/central-asian-shepherd-dog-flat-icon-doggy-head-vector-18623218.jpg'
    }
  },
  computed: {
    breedInfo () {
      console.log(`breed info`, this.dog)
      return this.dog.breeds && this.dog.breeds[0]
    }
  }
}
</script>
