<template lang="pug">
  v-container
    gu-breadcrumbs
    v-row(justify="center")
      h1.subtitle.text-center Statics
    v-row(v-for="(item, k) in geocommunities" :key="k")
      v-col(cols="12")
        h1.title {{item.text}}
      v-col(v-if="statics && statics.length !== 0")
        v-row
          v-col(v-for="(s, i) in statics" :key="i")
            gu-static-card( :static="s" )
      empty-page(v-else page="encuesta")
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import EmptyPage from '~/components/empty/EmptyPage.vue'
import GuBreadcrumbs from '~/components/layout/Breadcrumbs.vue'
import GuStaticCard from '~/components/cards/StaticCard.vue'

export default {
  name: 'StaticPage',
  components: { GuBreadcrumbs, GuStaticCard, EmptyPage },
  data() {
    return {}
  },
  computed: {
    ...mapState(['authId']),
    ...mapGetters(['geocommunities', 'statics'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
