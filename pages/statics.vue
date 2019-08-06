<template lang="pug">
  main
    v-breadcrumbs(:items="items" divider="<")
    v-container(v-if="statics && statics.length !== 0")
      v-layout
        v-flex(v-for="(s, i) in statics" :key="i")
          gu-static-card( :static="s" )
    empty-page(v-else page="encuesta")
</template>

<script>
import { mapGetters } from 'vuex'
import GuStaticCard from '~/components/cards/StaticCard.vue'
import EmptyPage from '~/components/empty/EmptyPage.vue'

export default {
  name: 'StaticPage',
  components: { GuStaticCard, EmptyPage },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['statics', 'items'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
