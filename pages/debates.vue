<template lang="pug">
  v-container
    v-row(v-if="authId")
      gu-breadcrumbs
    v-row(justify="center")
      h1.subtitle.text-center Debates
    v-row(v-for="(item, k) in items" :key="k")
      v-col(cols="12")
        h2.title {{item.text}}
      v-col(v-if="debates && debates.length !== 0")
        v-row
          v-col(v-for="(d, i) in debates" :key="i")
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
    ...mapGetters(['items', 'debates'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
