<template lang="pug">
  v-form
    v-layout( justify-center align-center wrap )
      v-flex(xs12 class="text-center my-3")
        h2.title.text-center.mb-2 Queremos saber un poco mas sobre ti
        h5.body-2 Datos opcionales, complete los que desee.
      v-flex(xs12 sm9 md7 lg4 class="text-center")
        figure
          v-img(
            :src="photoURL?photoURL:'/sinfoto.png'",
            style="margin:1rem auto"
            width="200px"
          )
        v-btn(
          v-if="!loading",
          @click.once="selectFile"
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
        div(v-if="photoURL")
          v-btn(
            class="ma-0",
            dark
            small
            color="error"
            @click.once="deleteImage()"
          ) Borrar imagen
      v-flex(xs11 sm9 md7 lg4 class="mt-2")
        v-text-field(
          v-model="formInfo.name"
          label="Nombre"
          style="max-width:450px; margin:0 auto"
          solo
        )
        v-text-field(
          v-model="formInfo.lastName"
          label="Apellido"
          style="max-width:450px; margin:0 auto"
          solo
        )
      v-flex(xs12 lg4 class="mt-2 text-center")
        h3.body-2.text-center Fecha de nacimiento
        v-date-picker(v-model="formInfo.birthDate" color="green lighten-1")
      //- v-divider(vertical)
      v-flex(xs12 lg6 class="mt-5")
        h3.subheading.text-center.my-2 Previsualización de tu caja de opiniones
        v-card(style="max-width:450px;margin:0 auto" class="elevation-5")
          v-card-title
            v-avatar
              img(:src="photoURL?photoURL:'/sinfoto.png'" class="mr-2" style="border-radius:50%:float:left")
            div
              h4.overline #[strong {{username}}] ( {{formInfo.name}} {{formInfo.lastName}} )
              h5.body-2 {{formInfo.birthDate?yearsOld:'xx'}} años
          v-card-text
            p Esto es un texto de ejemplo. Usted puede dar su punto de vista sobre algún debate. Su opinión aparecera en una caja como esta.
          v-divider
          v-card-actions
            v-icon fab fa-facebook
      v-flex(xs11 class="my-4")
        v-btn( @click="save" color="primary" block) Guardar
            
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      formInfo: {
        fileName: '',
        name: 'Nombre',
        lastName: 'Apellido',
        birthDate: ''
      }
    }
  },
  computed: {
    ...mapState(['loading', 'progressUpload']),
    ...mapGetters('modules/user', ['username', 'avatar']),
    yearsOld() {
      const today = new Date()
      const birthDate = new Date(this.formInfo.birthDate)
      let yearsOld = today.getFullYear() - birthDate.getFullYear()
      const month = today.getMonth() - birthDate.getMonth()
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        yearsOld--
      }
      return yearsOld
    }
  },
  methods: {
    save() {
      console.log('Ponele que la imagen se haya enviado')
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
      this.$store.dispatch('UPLOAD_IMAGE_USER', file)
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
