<template lang="pug">
  v-row(justify="center" wrap class="mt-5")
    v-col(cols="10" md="7" lg="4" align-self-center)
      form-login
    v-col(cols="12")
      no-ssr
        firebase-ui
</template>

<script>

import FormLogin from '~/components/forms/Signin.vue'
import FirebaseUi from '~/components/firebaseui'

export default {
  name: 'Signin',
  components: {
    FormLogin,
    FirebaseUi
  },
  data () {
    return {

    }
  }
}
</script>