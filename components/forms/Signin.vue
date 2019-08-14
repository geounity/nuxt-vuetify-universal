<template lang="pug">
  v-row(justify-center wrap class="mt-5")
    v-col(xs12 md8 lg6 xl4)
      v-form(v-model="value" ref="form" lazy-validation class="my-1" style="max-width:600px;margin:0 auto")
        h2(heading class="text-center mb-5") Iniciar sesión
        v-text-field(
          v-model="formLogin.email"  
          :rules="emailRules"
          label="Correo electronico"
          type="email"
          name="email"
          solo
          required
        )
        v-text-field(
          v-model="formLogin.password"
          :rules="passRules"
          label="Contraseña"
          placeholder="********"
          name="password"
          type="password"
          solo
          required
        )
        v-btn(:disabled="!value" color="success" block @click="loginHandlerSubmit" @keyup.enter="loginHandlerSubmit") Iniciar sesión
    v-divider(vertical)
    v-col(xs12 md4 lg6 xl4)
      no-ssr
        firebase-ui
</template>

<script>
import FirebaseUi from '~/components/firebaseui'
export default {
  components: { FirebaseUi },
  data() {
    return {
      value: true,
      formLogin: {
        email: '',
        password: ''
      },
      checkbox: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length <= 256 || 'Password must be less than 256 characters',
        (v) => v.length >= 6 || 'Password must be more than 6 characters'
      ]
    }
  },
  methods: {
    loginHandlerSubmit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('SIGN_IN', {
            email: this.formLogin.email,
            password: this.formLogin.password
          })
          .then((res) => {
            this.$store.dispatch('FETCH_AUTH_USER')
            this.$store.dispatch('FETCH_USER', res.user.email)
            this.$store.commit('TOGGLE_MODAL_SIGNIN')
          })
          .catch(function(error) {
            const errorCode = error.code
            const errorMessage = error.message
            console.error(errorCode, errorMessage)
          })
      } else {
        console.log('Formulario Invalido!')
      }
    }
  }
}
</script>
