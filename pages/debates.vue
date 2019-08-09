<template lang="pug">
  main
    v-container(fluid)
      gu-breadcrumbs
    v-container(v-if="debates && debates.length !== 0")
      v-layout
        v-flex(v-for="(d, i) in debates" :key="i")
          gu-debate-card( :debate="d" )
    empty-page(v-else page="debate")
</template>

<script>
import { mapGetters } from 'vuex'
import GuBreadcrumbs from '~/components/layout/Breadcrumbs.vue'
import GuDebateCard from '~/components/cards/DebateCard.vue'
import EmptyPage from '~/components/empty/EmptyPage.vue'
export default {
  name: 'PageDebates',
  components: { GuDebateCard, EmptyPage, GuBreadcrumbs },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['debates'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
