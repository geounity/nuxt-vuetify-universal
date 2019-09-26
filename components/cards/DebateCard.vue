<template lang="pug">
  v-card(elevation="7")
    v-img(:src="debate.image" max-height="300")
    v-card-title {{ debate.title }}
    v-card-text {{ debate.description }}
    v-card-actions
      v-btn(nuxt :to="`debate/${debate.id}`" text) Click
</template>

<script>
export default {
  name: 'DebateCard',
  props: {
    debate: { type: Object, default: () => [] }
  }
}
</script>
