<template lang="pug">
  main
    v-layout(v-if="!logged" class="blue-grey darken-4" justify-center wrap)
      v-flex(xs12 class="text-center")
        world-map
      v-flex(xs11 class="my-2")
        template(v-if="geocommunity.length>2")
          v-img( :src="geocommunity[2].flag" width="100px" class="mr-1 my-1" style="float:left")
          h1.title.white--text {{geocommunity[2].country}}
          h2.body-2.white--text Población: {{geocommunity[2].population}}
          h3.caption.white--text Cantidad de {{geocommunity[2].division_name}}: {{geocommunity[2].cant_states}}
        template(v-else)
          no-ssr
            h1(:class="fontSize").font-weight-bold.text-center.white--text Somos Comunidad Global Online
</template>

<script>
import { mapGetters } from 'vuex'
import WorldMap from '~/components/maps/World.vue'
export default {
  name: 'Index',
  components: { WorldMap },
  data() {
    return {
      var: ''
    }
  },
  computed: {
    ...mapGetters(['geocommunity', 'logged']),
    fontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'title'
        case 'sm':
          return 'headline'
        case 'md':
          return 'display-1'
        case 'lg':
          return 'display-2'
        case 'xl':
          return 'display-3'
        default:
          return 'display-4'
      }
    }
  }
}
</script>
