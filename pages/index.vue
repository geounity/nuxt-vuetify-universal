<template lang="pug">
  v-container
    v-row(v-if="!authId" justify="center" wrap)
      v-col(cols="12" blue-grey darken-4)
        h1.display-1.py-3.text-center.font-weight-black Digital Mediation
        p.text-center Geounity moderates debates between different points view. We identify agreements and conflicts.
      v-col(cols="12")
        h2.headline.py-3.text-center How it works
      v-col(cols="12" md="4")
        h3.title.pt-1.text-center Polls
        v-row(justify="center")
          v-img(src="polls.png" aspect-ratio="1" max-width="300")
        p.text-center It will allow to know points view better.
      v-col(cols="12" md="4")
        h3.title.pt-1.text-center Debates
        v-row(justify="center")
          v-img(src="debates.png" aspect-ratio="1" max-width="300")
        p.text-center Debate in a platform that rewards the best arguments.
      v-col(cols="12" md="4")
        h3.title.pt-1.text-center Aims
        v-row(justify="center")
          v-img(src="aims.png" aspect-ratio="1" max-width="300")
        p.text-center It will allow to know points view better.

    
    v-row(v-else="authId" justify="center" align="center" wrap)
      v-col(cols="11")    
        gu-breadcrumbs(class="my-5")
      v-card(class="mx-5 mt-5" style="max-width:300px" class="elevation-7")
        v-card-title
          h2.headline.text-center.mb-3(style="width:100%") Crea una encuesta
        v-card-text
          ul
            li Indique una comunidad y crea una encuesta para los se encuentren ahí.
            li Empieza a crear las preguntas que van a componer la encuesta
            li En cada pregunta podrá indicar su tipo y las opciones de respuestas.
            li Puede indicar la siguiente pregunta en función de la respuesta anterior.
            li Publique la encuesta y mire los resultados en tiempo real.
          v-card-actions
            v-btn(nuxt to="/poll/new" color="success" block) Crear
      v-card(class="mx-5 mt-5" style="max-width:300px" class="elevation-7")
        v-card-title
          h2.headline.text-center.mb-3(style="width:100%") Abre un nuevo debate
        v-card-text
          ul
            li Indique una comunidad y abra un nuevo debate.
            li Puede dar su opinión desde diferentes puntos de vista.
            li En cada opinión puede hacer referencia a una estadística externa o interna de las encuestas.
            li Puede invitar a personas que opinen y marcar con cual esta de acuerdo.
        v-card-actions
          v-btn(color="success" block) Crear
      v-card(class="mx-5 mt-5" style="max-width:300px" class="elevation-7")
        v-card-title
          h2.headline.text-center.mb-3(style="width:100%") Acción colectiva
        v-card-text
          ul
            li Indique una comunidad y proyecta una idea.
            li Indica un problema y describe como lo solucionarias.
            li Especifica cuanto tiempo, dinero, recursos materiales y personas se necesitan.
            li Los usuarios te pueden hacer preguntas.
            li Tu y otros usuarios podrán responderlas.
        v-card-actions
          v-btn(color="success" block) Crear
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import GuBreadcrumbs from '~/components/layout/Breadcrumbs.vue'
export default {
  name: 'Index',
  components: { GuBreadcrumbs },
  data() {
    return {
      continents: [
        {
          name: 'Africa',
          path: '/Africa'
        },
        {
          name: 'Asia',
          path: '/Asia'
        },
        {
          name: 'Americas',
          path: '/Americas'
        },
        {
          name: 'Europe',
          path: '/Europe'
        },
        {
          name: 'Oceania',
          path: '/Oceania'
        }
      ]
    }
  },
  computed: {
    ...mapState(['authId']),
    ...mapGetters(['continent'])
  }
}
</script>

<style lang="stylus">

.list-continents {
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  padding: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.list-continents li {
  flex: auto;
  list-style: none;
  text-align: center;
}
.highlighted {
  background-color: peru;
}
</style>
