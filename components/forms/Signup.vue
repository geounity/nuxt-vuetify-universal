<template lang="pug">
  v-form(v-model="value" ref="form" lazy-validation class="mb-3" style="margin:0 auto")
    v-alert(:value="error?true:false" color="error" style="color:#fff" class="my-3" dismissible) {{ error }}
    v-text-field(
      v-model="formRegister.email"  
      :rules="emailRules"
      label="Correo electronico"
      placeholder="e-mail"
      type="email"
      name="email"
      required
    )
    v-text-field(
      v-model="formRegister.username"
      :rules="userRules"
      :counter="15"
      label="Nombre de usuario"
      placeholder="username"
      name="username"
      required
    )
    v-text-field(
      v-model="formRegister.password"
      :rules="passRules"
      label="Contraseña"
      placeholder="insert password"
      name="password"
      type="password"
      required
    )
    v-checkbox(
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Acepto los Terminos y Condiciones"
      required
    )
    v-btn(:disabled="!value" :loading="loading" color="success" block @click.prevent="validate") Continue
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      value: true,
      checkbox: false,
      formRegister: {
        email: '',
        username: '',
        password: ''
      },
      userRules: [
        (v) => !!v || 'User is required',
        (v) => /^[0-9a-zA-Z]+$/.test(v) || 'User should be aphanumeric',
        (v) => v.length <= 15 || 'User must be less than 15 characters',
        (v) => v.length >= 3 || 'User must be more than 3 characters'
      ],
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
  computed: {
    ...mapState(['error', 'loading'])
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$store.commit('LOADING_ON')
        this.$store
          .dispatch('CREATE_USER', this.formRegister)
          .then(() => {
            this.$emit('nextStep')
            this.$store.commit('SET_ERROR', null)
            this.$store.commit('LOADING_OFF')
          })
          .catch((e) => {
            this.$store.commit('SET_ERROR', e)
            this.$store.commit('LOADING_OFF')
          })
      } else {
        console.log('Formulario INVALIDO!')
      }
    }
  }
}
</script>
