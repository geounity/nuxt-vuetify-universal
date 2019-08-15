<template lang="pug">
  main
    v-container(fluid)
      gu-breadcrumbs
    h1.subtitle Estadísticas
    v-container(v-for="(item, k) in items" :key="k")
      h1.title En {{item.text}}
      v-container(v-if="statics && statics.length !== 0")
        v-layout
          v-flex(v-for="(s, i) in statics" :key="i")
            gu-static-card( :static="s" )
      empty-page(v-else page="encuesta")
</template>

<script>
import { mapGetters } from 'vuex'
import GuBreadcrumbs from '~/components/layout/Breadcrumbs.vue'
import GuStaticCard from '~/components/cards/StaticCard.vue'
import EmptyPage from '~/components/empty/EmptyPage.vue'

export default {
  name: 'StaticPage',
  components: { GuBreadcrumbs, GuStaticCard, EmptyPage },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['items', 'statics'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
