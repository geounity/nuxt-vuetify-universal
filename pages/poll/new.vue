<template lang="pug">
  v-container
    v-layout(wrap)
      v-flex(xs12)
        h6.caption Para la comunidad de:
        v-breadcrumbs(:items="items" divider="<")
    v-layout(justify-center wrap)
      v-flex(xs12)
        h4.heading.mt-2 Título de la encuesta <br />
        v-text-field(
          v-model="formPoll.title"
          :rules="titleRules"
          placeholder="Titulo"
          name="title-poll"
          type="text"
          solo
        )
      v-flex(xs12)
        v-alert(:value="error" color="warning" dismissible dark) {{ error }}
      v-flex(xs12 md6 class="mb-5")
        h4.heading Preguntas <br />
        v-stepper(v-model="question")
          v-stepper-header(style="justify-content:flex-start")
            v-stepper-step(
              v-for="i in formPoll.questions.length"
              :key="i"
              color="#246d7b"
              :step="i"
              editable
              style="flex-basis: 40px; padding: 24px 10px;"
            )
            v-stepper-step(
              color="#246d7b"
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
                v-btn(color="primary" @click.prevent="selectedType") Boolean
                v-btn(color="primary" @click.prevent="selectedType") Number
                v-btn(color="primary" @click.prevent="selectedType") Elección única
                v-btn(color="primary" @click.prevent="selectedType") Elección múltiple
                v-btn(color="primary" @click.prevent="selectedType") Abierta
                a( nuxt to="/docs")
                  h6.caption.text-center Ver ejemplos sobre tipos de preguntas
              h4(v-if="selectType").body-2.my-2 Opciones para respuestas:
              .group-options(v-if="selectType==='Boolean'")
                v-text-field(
                  v-model="formPoll.questions[i - 1].options[0]"
                  type="text"
                  style="max-width:100px"
                  outlined
                )
                v-text-field(
                  v-model="formPoll.questions[i - 1].options[1]"
                  type="text"
                  style="max-width:100px"
                  outlined
                )
              .group-options(v-if="selectType==='Number'")
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
              .group-options(v-if="selectType==='Radio'")
                v-text-field(
                  v-for="(r, j) in radios"
                  :key="j"
                  v-model="formPoll.questions[i - 1].options[j - 1]"
                  label=`Opción`
                  type="text"
                  outlined
                  width="100%"
                )
                v-btn(color="secondary" @click.prevent="addQuestion") +
                v-btn(color="secondary" @click.prevent="removeQuestion") -
              .group-options(v-if="selectType==='Checkbox'")
                v-text-field(
                  v-for="(c, j) in checkboxs"
                  :key="j"
                  v-model="formPoll.questions[i - 1].options[j - 1]"
                  label='Opción'
                  type="text"
                  outlined
                  width="100%"
                )
                v-btn(color="secondary" @click.prevent="addOptionCheckbox") +
                v-btn(color="secondary" @click.prevent="removeOptionCheckbox") -
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
                .group-options(v-if="selectType==='Boolean'" class="mt-2 mb-4")
                  v-btn(color="success") {{formPoll.questions[i - 1].options[0]}}
                  v-btn(color="error") {{formPoll.questions[i - 1].options[1]}}
                .group-options(v-if="selectType==='Number'" class="mb-4")
                  v-text-field(
                    class="mt-1"
                    :label="label2"
                    type="number"
                    outlined
                    :min="formPoll.questions[i - 1].options[0]"
                    :max="formPoll.questions[i - 1].options[1]"
                  )
        v-btn(color="success" class="mt-4") Ver demo
</template>

<script>
import { setTimeout } from 'timers'
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      question: 1,
      selectType: '',
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
        (v) => v.length <= 256 || 'Password must be less than 256 characters',
        (v) => v.length >= 6 || 'Password must be more than 6 characters'
      ]
    }
  },
  computed: {
    ...mapState(['error']),
    ...mapGetters(['items'])
  },
  mounted() {
    this.label = `Pregunta para ${this.items[this.items.length - 1].text}`
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
    selectedType(e) {
      this.formPoll.questions[this.question - 1].type = e.target.textContent
      this.selectType = e.target.textContent
      if (e.target.textContent === 'Boolean') {
        this.formPoll.questions[this.question - 1].options[0] = 'SI'
        this.formPoll.questions[this.question - 1].options[1] = 'NO'
      }
      const self = this
      if (e.target.textContent === 'Number') {
        this.formPoll.questions[this.question - 1].options[0] = 1
        this.formPoll.questions[this.question - 1].options[1] = 100
        setTimeout(() => {
          self.label2 = `Ingrese un número entre ${
            self.formPoll.questions[self.question - 1].options[0]
          } y ${self.formPoll.questions[self.question - 1].options[1]}`
        }, 500)
      }
    },
    updateLabel() {
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

<style lang="scss" scoped>
ul {
  margin: 0 0 0.5rem 0;
  padding: 0;
}
.group-buttons-type {
  display: grid;
  justify-content: space-around;
  grid-template: 1fr 1fr / 1fr 1fr;
  grid-gap: 0.5rem;
}
.group-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
