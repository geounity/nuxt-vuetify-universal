<template lang="pug">
  v-container
    v-row
      v-col
        gu-breadcrumbs
    v-row
      v-col(cols="12")
        h3.caption Se creara una encuesta en la comunidad seleccionada
        h4.heading.mt-2 Título del debate <br />
        v-text-field(
          v-model="formDebate.title"
          :rules="titleRules"
          placeholder="Sugerimos un problema actual"
          name="title-poll"
          type="text"
          solo
        )
        v-switch(
          v-model="switch1"
          :label="`${switch1?'Publica':'Privada'}`"
        )
</template>

<script>
import GuBreadcrumbs from '~/components/layout/Breadcrumbs'
export default {
  name: 'DebateNew',
  components: { GuBreadcrumbs },
  data() {
    return {
      switch1: true,
      formDebate: {
        title: '',
        public: true
      }
    }
  }
}
</script>