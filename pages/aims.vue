<template lang="pug">
  v-container
    v-row(v-if="authId")
      gu-breadcrumbs
    v-row(justify="center")
      h1.subtitle.text-center Aims
    v-row(v-for="(item, k) in items" :key="k")
      v-col(cols="12")
        h1.title {{item.text}}
      v-col(v-if="aims && aims.length !== 0")
        v-row
          v-col(v-for="(a, i) in aims" :key="i")
            gu-static-card( :aim="a" )
      empty-page(v-else page="idea")
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import GuBreadcrumbs from '~/components/layout/Breadcrumbs.vue'
import GuCardAim from '~/components/cards/AimCard.vue'
import EmptyPage from '~/components/empty/EmptyPage.vue'
export default {
  name: 'PageAims',
  components: { GuCardAim, EmptyPage, GuBreadcrumbs },
  date() {
    return {}
  },
  computed: {
    ...mapState(['authId']),
    ...mapGetters(['items', 'aims'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
