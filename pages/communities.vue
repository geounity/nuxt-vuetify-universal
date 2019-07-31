<template lang="pug">
  section
    h1 Comunidades
    v-layout(xs12 wrap justify-center).text-xs-center
      v-flex
        v-card(nuxt to="/").pa-3.my-1.elevation-4
          h2.title Geográficas
          p Continentes, naciones, provincias, municipios, etc.
      v-flex
        v-card(nuxt to="/").pa-3.my-1.elevation-4
          h2.title Empresariales
          p Negocios, mercados, organizaciones, cooperativas, etc.
      v-flex
        v-card(nuxt to="/").pa-3.my-1.elevation-4
          h2.title Ideológicas
          p Religiones, partidos políticos, equipos de futbol, etc.
</template>
