<template lang="pug">
  v-container
    gu-breadcrumbs
    v-row(justify="center")
      h1.subtitle.text-center Debates
    v-row(v-for="(item, k) in geocommunities" :key="k")
      v-col(cols="12")
        h2.title {{item.text}}
      template(v-if="debates && debates.length !== 0")
        v-col(cols="12" md="8")
          v-row
            v-col(cols="12" v-for="(d, i) in debates" :key="i")
              gu-debate-card( :debate="d" )
        v-col(cols="12" md="4" class="aside")
          aside
            p
      empty-page(v-else page="debate")
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  import EmptyPage from '~/components/empty/EmptyPage.vue'
  import GuBreadcrumbs from '~/components/layout/Breadcrumbs.vue'
  import GuDebateCard from '~/components/cards/DebateCard.vue'
  
  import apiGeounity from '~/plugins/api'

  export default {
    name: 'PageDebates',
    components: { GuDebateCard, EmptyPage, GuBreadcrumbs },
    async asyncData () {
      try {
        let res = await apiGeounity.get('/api/debates')
        return { debates: res.data.data}
      } catch (e) {
        return { error: e }
      }
    },
    data() {
      return {}
    },
    computed: {
      ...mapState(['authId']),
      ...mapGetters(['geocommunities'])
    }
  }
</script>

<style scoped>
  main {
    height: 100%;
  }
  .aside{
    background-color:lightslategray; 
  }
</style>
