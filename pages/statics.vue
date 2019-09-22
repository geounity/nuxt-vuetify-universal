<template lang="pug">
  v-container
    v-row(v-if="authId")
      gu-breadcrumbs
    v-row(justify="center")
      h1.subtitle.text-center Statics
    v-row(v-for="(item, k) in items" :key="k")
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
    ...mapState(['authId']),
    ...mapGetters(['items', 'statics'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
