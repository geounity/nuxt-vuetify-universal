<template lang="pug">
  v-row(justfify-center align-center)
    strong(class="ml-2") Mi comunidad:
    v-breadcrumbs(:items="items" divider="<" class="pa-0 pl-2")
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
