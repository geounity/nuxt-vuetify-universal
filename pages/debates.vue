<template lang="pug">
  main
    v-breadcrumbs(:items="items" divider="<")
    v-container(v-if="debates")
      v-layout
        v-flex
          v-card( v-for="(d, i) in debates" :key="i")
            p {{ d }}
    empty-page(v-else page="debate")
</template>

<script>
import { mapGetters } from 'vuex'
import EmptyPage from '~/components/empty/EmptyPage.vue'
export default {
  name: 'PageDebates',
  components: { EmptyPage },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['debates', 'items'])
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
