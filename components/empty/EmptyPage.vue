<template lang="pug">
  .empty_state
    v-container
      v-layout(justify-center)
        v-flex(xs12)
          h3 No hay {{page}}s en esta comunidad
          div(v-if="!authId" class="text-center")
            p Para crear una {{page}} registrate
            v-btn( nuxt to="/signup" color="success" class="mt-3") Registrarte
          div(v-else class="text-center")
            p Se el primero en crear {{page==='debate'?'un':'una'}} {{page}} para tu comunidad
            v-btn( v-if="page==='encuesta'" nuxt to="/poll/new" color="primary" class="mt-3") Crear encuesta
            v-btn( v-if="page==='debate'" nuxt to="/debate/new" color="primary" class="mt-3") Crear debate
            v-btn( v-if="page==='idea'" nuxt to="/aim/new" color="primary" class="mt-3") Crear propuesta
</template>

<script>
export default {
  name: 'EmptyPage',
  props: {
    page: {
      type: String,
      default: 'nada',
      required: false
    }
  },
  data() {
    return {}
  },
  computed: {
    authId() {
      return this.$store.state.authId
    }
  }
}
</script>

<style scoped>
body,
html {
  height: 100% !important;
}

* {
  font-family: 'Lato';
}

.empty_state {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty_state h3 {
  margin: 8px 0px;
  text-align: center;
  font-weight: normal;
}
.empty_state p {
  font-size: 14px;
  margin: 0px;
  color: #999;
  text-align: center;
}
</style>
