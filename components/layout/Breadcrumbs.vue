<template lang="pug">
  v-layout(align-center wrap)
    v-subheader En la comunidad de:
    v-breadcrumbs(:items="items" divider="<" class="pa-0 mr-3")
    v-btn(small color="primary") cambiar
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Breadcrumbs',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['items'])
  }
}
</script>
