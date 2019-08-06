<template lang="pug">
  v-card
    v-card-title {{static.title}}
    v-card-text {{static.description}}
    v-card-text
      h2 Chart
    v-card-actions
      v-btn(color="success") Algunos botones
      v-btn(color="info") {{static.author}}
</template>
<script>
// import Chart from '~/components/Chart.vue'
export default {
  name: 'StaticCard',
  props: {
    static: { type: Object, default: () => [] }
  }
  // components: { Chart }
}
</script>
