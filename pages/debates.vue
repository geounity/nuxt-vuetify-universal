<template lang="pug">
  main
    v-container(fluid)
      gu-breadcrumbs
    h1.subtitle Debates
    v-container(v-for="(item, k) in items" :key="k")
      h1.title En {{item.text}}
      v-container(v-if="debates && debates.length !== 0")
        v-layout
          v-flex(v-for="(d, i) in debates" :key="i")
            gu-static-card( :debate="d" )
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
    ...mapGetters(['items', 'debates'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
