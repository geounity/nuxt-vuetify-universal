<template>
  <v-app>
    <gu-appbar></gu-appbar>
    <v-content>
      <nuxt />
    </v-content>
    <gu-footer></gu-footer>
    <gu-bottom-nav class="hidden-md-and-up"></gu-bottom-nav>
    <gu-modal-login :show="showModalLogin">
      <gu-form-signin></gu-form-signin>
    </gu-modal-login>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import guAppbar from '~/components/layout/Appbar.vue'
import guBottomNav from '~/components/layout/BottomNav.vue'
import guFooter from '~/components/layout/Footer.vue'
import guModalLogin from '~/components/modals/ModalSignIn.vue'
import guFormSignin from '~/components/forms/Signin.vue'

export default {
  // middleware: 'authenticated',
  components: {
    guAppbar,
    guBottomNav,
    guFooter,
    guModalLogin,
    guFormSignin
  },
  data() {
    return {
      title: 'Geounity App'
    }
  },
  computed: {
    ...mapState(['showModalLogin', 'showModalSelectCommunity'])
  }
}
</script>
