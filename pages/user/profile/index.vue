<template lang="pug">
  v-container
    complete-info-user
</template>

<script>
import { mapGetters } from 'vuex'
import CompleteInfoUser from '~/components/forms/CompleteInfoUser.vue'
export default {
  name: 'Profile',
  components: { CompleteInfoUser },
  data() {
    return {
      name: '',
      username: '',
      email: '',
      bio: ''
    }
  },
  computed: {
    ...mapGetters(['avatar'])
  },
  methods: {
    save() {}
  }
}
</script>
