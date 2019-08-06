<template lang="pug">
  v-card
    v-card-title {{ aim.title }}
    v-card-text {{ aim.description }}
    v-card-actions {{ aim.actions }}
</template>

<script>
export default {
  name: 'AimCard',
  props: {
    aim: { type: Object, default: () => [] }
  }
}
</script>
