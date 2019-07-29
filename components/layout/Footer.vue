<template lang="pug">
  v-footer(dark height="auto" class="brown darken-4")
    v-layout(justify-center class="text-center")
      v-card(text tile class="brown darken-4 white--text")
        v-card-text
          v-btn(
            v-for="icon in icons"
            :key="icon"
            class="mx-1 white--text"
            icon
          )
            v-icon(size="24px") {{ icon }}
        v-card-text(class="white--text pt-0")
          p(style="color:#64DD17;max-width:600px") Geounity app es una sistema de moderación y estudio para comunidades o empresas. Creamos acuerdos e identificamos conflictos entre los diferentes puntos de vista. También organizamos objetivos en común para una comunidad en específico.

        v-divider

        v-card-text(class="white--text")
          span &copy;2019 #[strong Geounity]
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-linkedin', 'mdi-twitter', 'mdi-instagram', 'mdi-facebook']
  })
}
</script>
