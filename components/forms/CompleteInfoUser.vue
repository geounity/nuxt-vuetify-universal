<template lang="pug">
  v-form
    v-layout( justify-center align-center wrap )
      v-flex(xs12 class="text-center")
        h2.title.text-center.mb-2 Queremos saber un poco mas sobre ti
        h3.overline Datos opcionales, complete los que desee.
      v-flex(xs12 sm9 md7 lg4 class="text-center")
        h1.title {{username}}
        figure
          v-img(
            :src="avatar?avatar:'/sinfoto.png'",
            style="margin:1rem auto"
            width="200px"
          )
        v-btn(
          v-if="!loading",
          @click.once="selectFile"
          class="mb-2"
        ) Subir una foto
          v-icon(right aria-hidden="true") mdi-camera
        input(
          id="files",
          type="file",
          name="file",
          ref="uploadInput",
          accept="image/*",
          :multiple="false",
          @change="detectFiles($event)"
        )
        v-progress-circular(signup
          v-if="loading",
          :size="100",
          :width="15",
          :rotate="360",
          :value="progressUpload",
          color="primary"
        ) {{progressUpload}} %
        div(v-if="avatar")
          v-btn(
            class="mt-1 mb-5",
            dark
            small
            color="error"
            @click.once="deleteImage()"
          ) Borrar imagen
        v-text-field(
          v-model="formInfo.name"
          label="Nombre"
          style="max-width:250px; margin:0 auto"
          color="success"
          regular
        )
        v-text-field(
          v-model="formInfo.lastname"
          label="Apellido"
          style="max-width:250px; margin:0 auto"
          color="success"
          regular
        )
      v-flex(xs11 sm9 md7 lg4 class="mt-2")
        h6.caption.mt-3.pa-0 Cuentanos que servicio brindas a tu comunidad.
        v-text-field(
          v-model="formInfo.service"
          placeholder="Servicio"
          color="success"
          pers
          hint="Puede ser tu empleo, lo que aprendes, lo que vendes o lo que estas construyendo.",
          :persistentHint="true"
          solo
        )
        h3.body-1.text-center.mt-5 Previsualización de tu caja de opiniones
        v-card(style="max-width:450px;margin:0 auto" class="elevation-5")
          v-card-title
            v-avatar
              img(:src="avatar?avatar:'/sinfoto.png'" class="mr-4" style="border-radius:50%:float:left")
            div
              h4.caption #[strong {{username}}] ( {{formInfo.name}} {{formInfo.lastname}} )
              h5.overline
                span {{formInfo.datebirth?yearsOld:'xx'}} años
                span(style="font-size:0.9em;margin-left:0.5em") {{formInfo.service}}
          v-card-text
            p Esto es un texto de ejemplo. Usted puede dar su punto de vista sobre algún debate. Su opinión aparecera en una caja como esta.
          v-divider
          v-card-actions
            v-icon fab fa-facebook
      v-flex(xs12 lg4 class="mt-2 text-center")
        h3.body-2.text-center Fecha de nacimiento
        v-date-picker(v-model="formInfo.datebirth" color="green lighten-1")
      //- v-divider(vertical)
      v-flex(xs12 lg6 class="mt-5")
        
      v-flex(xs11 class="my-4")
        v-alert(:value="error?true:false" color="error" style="color:#fff" class="my-3" dismissible) {{ error }}
        v-btn( @click="save" :loading="loading" color="primary" block) Guardar
            
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      formInfo: {
        datebirth: '',
        fileName: '',
        lastname: '',
        name: '',
        service: ''
      }
    }
  },
  computed: {
    ...mapState(['error', 'loading', 'progressUpload']),
    ...mapGetters(['username', 'avatar']),
    yearsOld() {
      const today = new Date()
      const birthDate = new Date(this.formInfo.datebirth)
      let yearsOld = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        yearsOld--
      }
      return yearsOld
    }
  },
  methods: {
    async save() {
      await this.$store.dispatch('PUT_INFO_USER', this.formInfo)
      this.$nuxt.$router.push('/')
    },
    selectFile() {
      this.$refs.uploadInput.click()
    },
    detectFiles(e) {
      const fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map((x) => {
        this.upload(fileList[x])
      })
    },
    upload(file) {
      this.$store.commit('LOADING_ON')
      this.formInfo.fileName = file.name
      this.$store.dispatch('UPLOAD_IMAGE_USER', file).then((res) => {
        this.$store.commit('UPDATE_USER_IMAGE', res)
      })
    },
    deleteImage() {
      this.$store.commit('LOADING_ON')
      this.$store
        .dispatch('DELETE_IMAGE_USER', this.formInfo.fileName)
        .then(() => {
          this.$store.commit('LOADING_OFF')
          this.$store.commit('DELETE_IMAGE_USER')
        })
        .catch((e) => {
          console.error(`file delete error occured: ${e}`)
        })
    }
  }
}
</script>

<style scoped>
.progress-bar {
  margin: 10px 0;
}
input[type='file'] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>
