<template lang="pug">
  v-row(justfify-center align-center)
    v-btn(small color="primary" class="ml-3") Crear encuesta
    strong(class="mt-1 ml-3") En la comunidad de:
    v-breadcrumbs(:items="items" divider="<" class="pa-0 pl-5 ma-")
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
