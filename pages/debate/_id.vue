<template lang="pug">
  v-container
    v-row(justify="center" align="center")
      v-col(cols="12")
        h1.display-2.text-center {{ debate.title }}
      v-col(cols="12" md="5")
        v-img(:src="debate.image" aspect-ratio="1" max-height="300")
      v-col(cols="12" md="4")
        p.body-1 {{ debate.description }}
    v-divider
    v-row
      v-col(cols="12")
        strong Debate {{ debate.public?'public':'private' }}
      v-col(cols="12")
        strong Categories: 
        span(v-for="(category, i) in debate.categories" :key="i") {{ category }}{{ debate.categories.length-1===i?'.':', '}}
      v-col(cols="12")
        strong Chars allowed: 
        span min: {{ debate.minchar }} - 
        span man: {{ debate.maxchar }}.
</template>

<script>

  import apiGeounity from '~/plugins/api'

  export default {
    name: 'Debate',
    async asyncData({ params }) {
      let res = await apiGeounity.get(`/api/debates/${params.id}`)
      return { debate: res.data.data }
    }
  }
</script>