<template lang="pug">
  v-card
    v-card-title {{ debate.title }}
    v-card-text {{ debate.description }}
    v-card-actions {{ debate.actions }}
</template>

<script>
export default {
  name: 'DebateCard',
  props: {
    debate: { type: Object, default: () => [] }
  }
}
</script>
