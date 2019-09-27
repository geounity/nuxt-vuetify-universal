<template lang="pug">
  v-container
    v-row(justify="center" wrap)
      v-col(lg="10")
        v-alert(:value="true" color="info" class="mb-2" dismissible)
          span.white--text Eres uno de los pimeros usuarios en registrarse

        v-stepper(v-model="step" alt-labels)
          v-stepper-header
            v-stepper-step(:complete="step > 1" step="1" editable color="#246d7b") Tu comunidad
            v-divider
            v-stepper-step(:complete="step > 2" step="2") Registra tu usuario
            v-divider
            v-stepper-step(:complete="step > 3" step="3") Información adicional

          v-stepper-items(class="mt-2")
            v-stepper-content(step="1" class="pa-0 text-xs-center")
              world-map(@selectedCountry="handleSelectedCountry")
              v-select(
                v-if="geocommunities.length >= 3"
                :items="geocommunities[2].items"
                style="max-width:400px; margin:0 auto"
                class="my-5"
                :label="label"
                @change="selectState"
                solo
              )
              //- template(v-else-if="geocommunities.length === 3")
              //-   argentina-map(v-if="country.code === 'AR'")
              //- template(v-else)
              //-   h2.title Otro mapa u en su defecto un input select
              v-btn(color="success" @click="step = 2" class="mt-3" block) Continuar

            v-stepper-content(step="2")
              v-row( justify="space-around" wrap)
                v-col( cols="12" sm="6" class="my-2" )
                  form-new-user(@nextStep="step = 3; signupWithEmail = true" style="max-width:400px")
                v-col( cols="12" sm="6" )
                  firebase-ui(@nextStep="step = 3; signupWithEmail = false")

            v-stepper-content(step="3" class="pa-0")
              v-alert(type="success" :value="signupWithEmail" dismissible) Hemos enviado un correo de confirmación a tu casilla de email.
              complete-info-user
</template>
<script>
import { mapState, mapGetters } from 'vuex'

import WorldMap from '~/components/maps/World.vue'
// import ArgentinaMap from '~/components/maps/Argentina.vue'

import formNewUser from '~/components/forms/Signup.vue'
import FirebaseUi from '~/components/firebaseui.vue'
import CompleteInfoUser from '~/components/forms/CompleteInfoUser.vue'

export default {
  name: 'Signup',
  // components: { WorldMap, FirebaseUi, CompleteInfoUser },
  components: {
    CompleteInfoUser,
    WorldMap,
    formNewUser,
    FirebaseUi
  },
  data() {
    return {
      errors: '',
      label: '',
      step: 1,
      signupWithEmail: false,
      selectedState: ''
    }
  },
  computed: {
    ...mapState(['loading', 'country']),
    ...mapGetters(['geocommunities'])
  },
  beforeMount() {
    if (this.geocommunities.length === 3) {
      this.label = `Seleccione ${this.geocommunities[2].division_name}`
      this.$store
        .dispatch('FETCH_STATES', this.geocommunities[2].code)
        .then((states) => {
          this.states = states.data.map((state) => {
            return state.state
          })
        })
    }
  },
  methods: {
    handleSelectedCountry() {
      // this.label = this.geocommunities[2].divisionName
      this.label = 'Select state'
    },
    selectState() {
      this.$store.commit('UPDATE_GEOCOMMUNITY', {
        name: this.selectedState,
        level: 4
      })
    }
  }
}
</script>
