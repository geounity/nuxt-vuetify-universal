<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import { auth, authProviders } from '~/plugins/firebase'

export default {
  name: 'UserLogin',
  data() {
    return {}
  },
  mounted() {
    const self = this
    const uiConfig = {
      signInSuccessUrl: '/',
      signInFlow: 'popup',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        authProviders.Google,
        authProviders.Facebook,
        authProviders.Twitter,
        authProviders.Github
      ],
      tosUrl: '/politics',
      privacyPolicyUrl: '/privacy-policy',
      callbacks: {
        signInSuccessWithAuthResult() {
          console.log('signInSuccessWithAuthResult')
          self.$store.dispatch('TOGGLE_MODAL_SIGNIN')
          self.$emit('nextStep')
          self.$router.push('/')
        },
        uiShown() {
          console.log('uiShown')
        }
      }
    }
    if (process.browser) {
      const firebaseui = require('firebaseui')
      const ui =
        firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
      ui.start('#firebaseui-auth-container', uiConfig)
      if (ui.isPendingRedirect()) {
        ui.start('#firebaseui-auth-container', uiConfig)
      }
    }
  }
}
</script>
<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
