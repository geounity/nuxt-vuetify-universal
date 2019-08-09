<template lang="pug">
  main
    v-container(fluid)
      gu-breadcrumbs
    v-container(v-if="aims && aims.length !== 0")
      v-layout
        v-flex(v-for="(a, i) in aims" :key="i")
          gu-card-aim( :aim="a")
    empty-page(v-else page="idea")
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters(['aims'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
