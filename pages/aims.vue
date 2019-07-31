<template lang="pug">
  main
    v-breadcrumbs(:items="items" divider="<")
    v-container(v-if="aims")
      v-layout
        v-flex
          v-card( v-for="(a, i) in aims" :key="i")
            p {{ a }}
    empty-page(v-else page="idea")
</template>

<script>
import { mapGetters } from 'vuex'
import EmptyPage from '~/components/empty/EmptyPage.vue'
export default {
  name: 'PageAims',
  components: { EmptyPage },
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
