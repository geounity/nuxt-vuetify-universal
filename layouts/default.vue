<template lang="pug">
  v-app
    gu-appbar
    v-content
      nuxt
    gu-footer
    gu-bottom-nav(class="hidden-md-and-up")
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '~/services/firebase'

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
    ...mapState(['overlay', 'showModalSelectCommunity'])
  },
  beforeMount() {
    const self = this
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('USER LOGEADO')
        const email = user.email
        const emailVerified = user.emailVerified
        const photoURL = user.photoURL
        const phoneNumber = user.phoneNumber
        user.getIdToken().then(function(accessToken) {
          self.$store.dispatch('FETCH_AUTH_USER')
          self.$store.commit('SET_USER', {
            email,
            emailVerified,
            photoURL,
            accessToken,
            phoneNumber
          })
        })
      } else {
        console.log('NO LOGIN')
      }
    })
  },
  methods: {
    toggleOverlayLogin() {
      this.$store.commit('TOGGLE_OVERLAY_SIGNIN')
    }
  }
}
</script>

<style>
.box {
  background-color: #fafafa;
  color: #222;
  padding: 0.1em 0;
}
</style>
