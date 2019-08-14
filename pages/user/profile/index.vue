<template lang="pug">
  v-container
    v-layout
      v-flex(xs3)
        v-img(:src="avatar")
      v-flex(xs9)
        v-text-field(
          v-model="name"
          label="Nombre"
          solo
        )
        v-text-field(
          v-model="username"
          label="Username"
          solo
        )
        v-text-field(
          v-model="email"
          label="Email"
          solo
        )
        v-text-field(
          v-model="bio"
          label="Biografía"
          solo
        )
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
  }
}
</script>
