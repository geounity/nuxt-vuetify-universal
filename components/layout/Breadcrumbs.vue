<template lang="pug">
  v-row(align="center")
    span Global &gt;
    //- div(class="d-flex")
    //-   v-select(:items="geocommunities[0].items" :label="geocommunities[0].division" @focus="hola" @change="updateContinent" class="select-breadcrumbs ml-3" single-line dense)
    //-   v-select(v-if="geocommunities.length>1" :items="geocommunities[1].items" :label="geocommunities[1].division" @change="updateCountry" class="select-breadcrumbs ml-3" single-line dense)
    div(v-for="(geocommunity, i) in geocommunities" :key="i" class="d-flex")
      v-select(:items="geocommunity.items" :label="geocommunity.division" @focus="handleFocus(geocommunity.division)" @change="updateCommunity" class="select-breadcrumbs ml-3" single-line dense)
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
          console.log('hacer otra cosa')
      }
      console.log('Communities', this.geocommunities.length)
    }
  }
}
</script>

<style scoped>
.select-breadcrumbs {
  max-width: 120px;
}
</style>