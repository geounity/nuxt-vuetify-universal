<template lang="pug">
  main
    v-layout(v-if="!authId" class="blue-grey darken-4" justify-center wrap)
      v-flex(xs12 class="text-center")
        world-map
      v-flex(xs11)
        h1(:class="fontSize").py-5.text-center.white--text Somos Comunidad Global Online
      v-layout
        ul.list-continents.my-5
          li(v-for="(item, i) in continents" :key="i" nuxt :to="item.path" active-class="highlighted" :class="item.name === continent.name ? 'highlighted' : ''") {{item.name}}
      v-layout(v-if="geocommunity.length>2" justify-center row wrap)
        v-flex(xs12 class="my-2 text-center")        
          h1.display-1.font-weight-black {{geocommunity[2].name}}
        v-flex(xs12 class="my-2 text-center")
          img(:src="geocommunity[2].flag" width="200px" class="mr-1 my-1")
        v-flex(xs12 class="my-2 text-center")
          h2.body-2 Población aproximada: {{geocommunity[2].population}}
          h3.overline.mt-2 Cantidad de {{geocommunity[2].division_name}}: {{geocommunity[2].cant_states}}
          h3.caption (Incluye la capital)
    v-layout(v-else="authId" justify-center align-center wrap)
      v-flex(xs11)    
        gu-breadcrumbs(class="my-5")
      v-card(class="mx-5" style="max-width:300px" class="elevation-7")
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
            v-btn(color="success" block) Crear
      v-card(class="mx-5" style="max-width:300px" class="elevation-7")
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
      v-card(class="mx-5" style="max-width:300px" class="elevation-7")
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
import WorldMap from '~/components/maps/World.vue'
export default {
  name: 'Index',
  components: { WorldMap, GuBreadcrumbs },
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
    ...mapState(['geocommunity', 'authId']),
    ...mapGetters(['continent'])
  },
  mounted() {
    this.fontSize()
  },
  methods: {
    fontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'title'
        case 'sm':
          return 'headline'
        case 'md':
          return 'display-1'
        case 'lg':
          return 'display-2'
        case 'xl':
          return 'display-3'
        default:
          return 'display-1'
      }
    }
  }
}
</script>

<style scoped>
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
