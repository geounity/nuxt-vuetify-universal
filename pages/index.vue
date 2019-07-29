<template lang="pug">
  main
    v-layout(v-if="!logged" class="blue-grey darken-4" justify-center wrap)
      v-flex(xs12 class="text-center")
        world-map
</template>

<script>
import WorldMap from '~/components/maps/World.vue'
export default {
  name: 'Index',
  components: { WorldMap },
  computed: {
    logged() {
      return this.$store.state.logged
    }
  }
}
</script>
