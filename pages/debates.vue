<template lang="pug">
  main
    v-breadcrumbs(:items="items" divider="<")
    v-container(v-if="debates && debates.length !== 0")
      v-layout
        v-flex(v-for="(d, i) in debates" :key="i")
          gu-debate-card( :debate="d" )
    empty-page(v-else page="debate")
</template>

<script>
import { mapGetters } from 'vuex'
import GuDebateCard from '~/components/cards/DebateCard.vue'
import EmptyPage from '~/components/empty/EmptyPage.vue'
export default {
  name: 'PageDebates',
  components: { GuDebateCard, EmptyPage },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['debates', 'items'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
