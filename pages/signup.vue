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
            v-stepper-step(:complete="step > 3" step="3") Información complementaria
          
          v-stepper-items(class="mt-2")

            v-stepper-content(step="1" class="pa-0 text-xs-center")
              world-map(@selectedCountry="handleSelectedCountry")
              v-select(
                v-if="geocommunity.length >= 3"
                v-model="selectedState"
                :items="states"
                style="max-width:400px; margin:0 auto"
                class="my-5"
                :label="label"
                @change="selectState"
                solo
              )
              //- template(v-else-if="geocommunity.length === 3")
              //-   argentina-map(v-if="country.code === 'AR'")
              //- template(v-else)
              //-   h2.title Otro mapa u en su defecto un input select
              v-btn(color="success" @click="step = 2" class="mt-3" block) Continuar

            v-stepper-content(step="2")
              v-layout( justify-space-around wrap)
                v-flex( xs12 sm6 md6 class="my-2" )
                  form-new-user(@nextStep="step = 3; signupWithEmail = true" style="max-width:400px")
                v-flex( xs12 sm6 md6 )
                  firebase-ui(@nextStep="step = 3; signupWithEmail = false")

            v-stepper-content(step="3" class="pa-0")
              v-alert(type="success" :value="signupWithEmail" dismissible) Hemos enviado un correo de confirmación a tu casilla de email.
              complete-info-user

      //- v-row(v-if="geocommunity.length>2" justify="center" row wrap)
      //-   v-col(cols="12" wrap)
      //-     ul.list-continents.my-5
      //-       li(v-for="(item, i) in continents" :key="i" nuxt :to="item.path" active-class="highlighted" :class="item.name === continent.name ? 'highlighted' : ''") {{item.name}}
      //-      v-col(cols="12" class="my-2 text-center")        
      //-   h1.display-1.font-weight-black {{geocommunity[2].name}}
      //- v-col(cols="12" class="my-2 text-center")
      //-   img(:src="geocommunity[2].flag" width="200px" class="mr-1 my-1")
      //- v-col(cols="12" class="my-2 text-center")
      //-   h2.body-2 Población aproximada: {{geocommunity[2].population}}
      //-   h3.overline.mt-2 Cantidad de {{geocommunity[2].division_name}}: {{geocommunity[2].cant_states}}
      //-   h3.caption (Incluye la capital) 
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
      states: [],
      selectedState: ''
    }
  },
  computed: {
    ...mapState(['geocommunity', 'loading', 'country']),
    ...mapGetters(['items'])
  },
  beforeMount() {
    if (this.geocommunity.length === 3) {
      this.label = `Seleccione ${this.geocommunity[2].division_name}`
      this.$store
        .dispatch('FETCH_STATES', this.geocommunity[2].code)
        .then((states) => {
          this.states = states.data.map((state) => {
            return state.state
          })
        })
    }
  },
  methods: {
    handleSelectedCountry() {
      const country = this.geocommunity[2]
      this.label = `Seleccion de ${country.division_name}`
      this.$store.dispatch('FETCH_STATES', country.code).then((states) => {
        this.states = states.data.map((state) => {
          return state.state
        })
      })
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
