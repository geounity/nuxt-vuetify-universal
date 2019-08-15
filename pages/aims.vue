<template lang="pug">
  main
    v-container(fluid)
      gu-breadcrumbs
    h1.subtitle Proyectos
    v-container(v-for="(item, k) in items" :key="k")
      h1.title En {{item.text}}
      v-container(v-if="aims && aims.length !== 0")
        v-layout
          v-flex(v-for="(aim, i) in aims" :key="i")
            gu-static-card( :aim="aim" )
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
    ...mapGetters(['items', 'aims'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
