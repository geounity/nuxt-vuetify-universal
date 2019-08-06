<template lang="pug">
  main
    v-breadcrumbs(:items="items" divider="<")
    v-container(v-if="aims && aims.length !== 0")
      v-layout
        v-flex(v-for="(a, i) in aims" :key="i")
          gu-card-aim( :aim="a")
    empty-page(v-else page="idea")
</template>

<script>
import { mapGetters } from 'vuex'
import EmptyPage from '~/components/empty/EmptyPage.vue'
import GuCardAim from '~/components/cards/AimCard.vue'
export default {
  name: 'PageAims',
  components: { GuCardAim, EmptyPage },
  date() {
    return {}
  },
  computed: {
    ...mapGetters(['aims', 'items'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
