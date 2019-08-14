<template lang="pug">
  v-container
    v-layout(align-center wrap class="mt-1")    
      v-subheader Para la comunidad de:
      v-breadcrumbs(:items="items" divider="<" class="pa-0 mr-3")
      v-btn(@click.prevent="toggleModalSelectCommunity" text color="primary").caption Cambiar
    v-layout(justify-center wrap)
      v-flex(xs12)
        h4.heading.mt-2 Título de la encuesta <br />
        v-text-field(
          v-model="formPoll.title"
          :rules="titleRules"
          placeholder="Titulo"
          name="title-poll"
          type="text"
          outlined
        )
      v-flex(xs12)
        v-alert(:value="error?true:false" color="warning" dismissible dark) {{ error }}
      v-flex(xs12 md6 class="mb-5")
        h4.heading Preguntas <br />
        v-stepper(v-model="question")
          v-stepper-header(style="justify-content:flex-start;flex-wrap:nowrap;overflow:scroll")
            v-stepper-step(
              v-for="i in formPoll.questions.length"
              :key="i"
              color="#246d7b"
              :step="i"
              editable
              style="flex-basis: 40px; padding: 24px 10px;"
            )
            v-stepper-step(
              color="success"
              step="+"
              style="flex-basis: 40px; padding: 24px 10px;"
              @click.prevent="addQuestion"
            )
          v-stepper-items
            v-stepper-content(v-for="i in formPoll.questions.length" :key="i" :step="i")
              h3.body-2.ma-0 Escriba aquí la pregunta:
              v-text-field(
                v-model="formPoll.questions[i - 1].content"
                :label="label"
                name=`${i}-question`
                type="text"
                class="mt-1"
                outlined
              )
              h3.body-2.ma-0 Tipo de pregunta:
              .group-buttons-type
                v-btn(color="primary" @click.stop="selectedType('boolean', i - 1)") Dicotómica
                v-btn(color="primary" @click.stop="selectedType('number', i - 1)") Number
                v-btn(color="primary" @click.stop="selectedType('radio', i - 1)") Elección única
                v-btn(color="primary" @click.stop="selectedType('checkbox', i - 1)") Elección múltiple
                v-btn(color="primary" style="justify-items:center" @click.stop="selectedType('open', i - 1)") Abierta
              .group-options(v-if="selectType[i - 1]==='boolean'")
                p.caption.text-left.mt-5(style="background-color:#ddd;padding:0.5rem") Las preguntas dicotómicas solo tienen una opción entre dos. Generalmente suelen ser SI/NO MUJER/HOMBRE POSITIVO/NEGATIVO etc. Usted las puede modificar.
                h3.body-2.mb-3.mt-5 Opciones para respuestas:
                div(style="display:flex;justify-content:space-around")
                  v-text-field(
                    v-model="formPoll.questions[i - 1].options[0]"
                    type="text"
                    style="max-width:150px"
                    outlined                
                  )
                  v-text-field(
                    v-model="formPoll.questions[i - 1].options[1]"
                    type="text"
                    style="max-width:150px"
                    outlined
                  )
              .group-options(v-if="selectType[i - 1]==='number'")
                p.caption.text-left.mt-5(style="background-color:#ddd;padding:0.5rem") Las preguntas númericas solo aceptan números enteros como respuestas. Usted puede definir el rango que deberá tener la respuesta.
                h3.body-2.mb-3.mt-5 Opciones para respuestas:
                div(style="display:flex;justify-content:space-around")
                  v-text-field(
                    v-model="formPoll.questions[i - 1].options[0]"
                    label="Min"
                    class="mt-1"
                    type="number"
                    style="max-width:100px"
                    @change="updateLabel"
                    outlined
                  )
                  v-text-field(
                    v-model="formPoll.questions[i - 1].options[1]"
                    label="Max"
                    class="mt-1"
                    type="number"
                    style="max-width:100px"
                    @change="updateLabel"
                    outlined
                  )
              .group-options(v-if="selectType[i - 1]==='radio'")
                p.caption.text-left.mt-5(style="background-color:#ddd;padding:0.5rem") Estas preguntas tienen 3 o mas opciones y solo podrá seleccionar una sola. Si quiere usar dos opciones use las de tipo dicotómica.
                h3.body-2.mb-3.mt-5 Opciones para respuestas:
                v-text-field(
                  v-for="(r, j) in radios"
                  :key="j"
                  v-model="formPoll.questions[i - 1].options[j]"
                  type="text"
                  outlined
                  width="100%"
                )
                v-btn(color="secondary" @click.prevent="addOptionRadio" class="mr-2") +
                v-btn(color="secondary" @click.prevent="removeOptionRadio" class="ml-2") -
              .group-options(v-if="selectType[i - 1]==='checkbox'")
                p.caption.text-left.mt-5(style="background-color:#ddd;padding:0.5rem") Estas preguntas tienen 2 o mas opciones y podrá seleccionar las que quiera incluyendo ninguna o todas.
                h3.body-2.mb-3.mt-5 Opciones para respuestas:
                v-text-field(
                  v-for="(c, j) in checkboxs"
                  :key="j"
                  v-model="formPoll.questions[i - 1].options[j]"
                  type="text"
                  outlined
                  width="100%"
                )
                v-btn(color="secondary" @click.prevent="addOptionCheckbox" class="mr-2") +
                v-btn(color="secondary" @click.prevent="removeOptionCheckbox" class="ml-2") -
              .group-options(v-if="selectType[i - 1]==='open'")
                p.caption.text-left.mt-5(style="background-color:#ddd;padding:0.5rem") Las respuestas abiertas no tienen opciones de respuesta. Tienen 1000 caracteres para responder libremente.

              v-btn(color="#246d7b" class="mt-5" style="color:white" block @click.prevent="addQuestion") Nueva pregunta
      v-flex(xs12 md5 offset-md1)
        h4.heading Previsualización <br />
        v-card
          v-card-title(class="text-center")
            h3.title {{ formPoll.title }} 
          v-card-text
            h4.heading Preguntas <br />
            ol
              li.body-2(v-for="i in formPoll.questions.length" :key="i") {{ formPoll.questions[i - 1].content }}
                h6.caption.mb-2 Type: {{formPoll.questions[i - 1].type}}
                .group-options(v-if="selectType[i - 1]==='boolean'" class="mt-2 mb-4")
                  v-btn(color="success" class="mr-2") {{formPoll.questions[i - 1].options[0]}}
                  v-btn(color="error" class="ml-2") {{formPoll.questions[i - 1].options[1]}}
                .group-options(v-if="selectType[i - 1]==='number'" class="mb-4")
                  v-text-field(
                    class="mt-1"
                    :label="label2"
                    type="number"
                    outlined
                    :min="formPoll.questions[i - 1].options[0]"
                    :max="formPoll.questions[i - 1].options[1]"
                  )
                .group-options(v-if="selectType[i - 1]==='radio'" class="mb-4")
                  v-radio-group(v-model="radioGroup")
                    v-radio(
                      v-for="(r, j) in radios"
                      :key="j"
                      :label="formPoll.questions[i - 1].options[j]"
                      class="mt-1"
                    )
                .group-options(v-if="selectType[i - 1]==='checkbox'" class="mb-4")
                  v-checkbox(
                    v-for="(c, j) in checkboxs"
                    :key="i"
                    :label="formPoll.questions[i - 1].options[j]"
                  )
        v-btn(color="" class="mt-4" block) Ver demo
        v-btn(color="success" class="mt-4" block dark style="height:3rem") Publicar
</template>

<script>
import { setTimeout } from 'timers'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      question: 1,
      radioGroup: 1,
      selectType: [],
      checkboxs: 1, // Cantidad de opciones para preguntas radios
      radios: 3, // Cantidad de opciones para preguntas radios
      label: '',
      label2: '',
      formPoll: {
        title: 'Título',
        geocommunity: '',
        questions: [
          {
            content: '',
            type: '', // Boolean, number, radio, checkbox,
            options: [],
            next: [] // Marca la siguiente pregunta en función de la respuesta actual
          }
        ]
      },
      titleRules: [
        (v) =>
          v.length <= 256 ||
          'Título de la encuesta debe tener menos de 100 caracteres',
        (v) =>
          v.length >= 5 ||
          'Título de la encuesta debe tener mas de 5 caracteres'
      ]
    }
  },
  computed: {
    ...mapState(['error']),
    ...mapGetters(['items'])
  },
  mounted() {
    this.label = `Pregunta para ${this.items[this.items.length - 1].text}...`
  },
  methods: {
    addQuestion() {
      if (this.formPoll.questions[this.question - 1].content) {
        this.formPoll.questions.push({
          content: '',
          type: '',
          options: [],
          next: []
        })
        const self = this
        setTimeout(() => {
          self.question++
        }, 500)
      } else {
        this.$store.commit(
          'SET_ERROR',
          'Esta pregunta esta vacía, complete para crear otra.'
        )
      }
    },
    addOptionRadio() {
      if (this.radios < 20) {
        this.radios++
      }
    },
    removeOptionRadio() {
      if (this.radios > 3) {
        this.radios--
      }
    },
    addOptionCheckbox() {
      if (this.checkboxs < 20) {
        this.checkboxs++
      }
    },
    removeOptionCheckbox() {
      if (this.checkboxs > 1) {
        this.checkboxs--
      }
    },
    selectedType(e, i) {
      this.formPoll.questions[this.question - 1].type = e
      this.selectType[i] = e
      if (e === 'boolean') {
        this.formPoll.questions[this.question - 1].options[0] = 'SI'
        this.formPoll.questions[this.question - 1].options[1] = 'NO'
      }
      if (e === 'number') {
        const self = this
        this.formPoll.questions[this.question - 1].options[0] = 1
        this.formPoll.questions[this.question - 1].options[1] = 100
        setTimeout(() => {
          self.label2 = `Ingrese un número entre ${
            self.formPoll.questions[self.question - 1].options[0]
          } y ${self.formPoll.questions[self.question - 1].options[1]}`
        }, 100)
      }
      if (e === 'radio') {
        this.formPoll.questions[this.question - 1].options[0] = 'Opción 1'
        this.formPoll.questions[this.question - 1].options[1] = 'Opción 2'
        this.formPoll.questions[this.question - 1].options[2] = 'Opción 3'
      }
      if (e === 'checkbox') {
        this.formPoll.questions[this.question - 1].options[0] = 'Opción 1'
      }
    },
    toggleModalSelectCommunity() {
      this.$store.commit('TOGGLE_MODAL_SELECT_COMMUNITY')
    },
    updateLabel() {
      console.log('Estamos dentro del update')
      const self = this
      setTimeout(() => {
        self.label2 = `Ingrese un número entre ${
          self.formPoll.questions[self.question - 1].options[0]
        } y ${self.formPoll.questions[self.question - 1].options[1]}`
      }, 500)
    }
  }
}
</script>

<style scoped>
ul li {
  list-style: none;
}
.group-buttons-type {
  display: grid;
  justify-content: space-around;
  grid-template: 1fr 1fr / 1fr 1fr;
  grid-gap: 0.5rem;
}
.group-options {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
