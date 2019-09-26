<template lang="pug">
  v-row(align="center" justify="start")
    v-col(cols="12" md="1")
      span Global
    v-col(cols="12" md="3" v-for="(geocommunity, i) in geocommunities" :key="i")
      v-select(:items="geocommunity.items" :label="geocommunity.division" @focus="handleFocus(geocommunity.division)" @change="updateCommunity" class="select-breadcrumbs" single-line dense)
</template>

<script>
import { mapGetters } from 'vuex'
import apiGeounity from '~/plugins/api'

export default {
  name: 'Breadcrumbs',
  data() {
    return {
      focusOn: ''
    }
  },
  computed: {
    ...mapGetters(['geocommunities'])
  },
  methods: {
    handleFocus(geocommunity){
      this.focusOn = geocommunity
    },

    async updateCommunity(geocommunity) {
      console.log('Communitty selected: ', geocommunity)
      console.log('Focus on: ', this.focusOn)
      switch (this.focusOn) {
        case 'Continents':
          this.$store.dispatch('UPDATE_CONTINENT', geocommunity)
          break;
        case 'Countries':
          this.$store.dispatch('UPDATE_COUNTRY', geocommunity)
          break;
      }
      console.log('Communities', this.geocommunities.length)
    }
  }
}
</script>

<style scoped>
/* .select-breadcrumbs {
  max-width: 150px;
} */
</style>