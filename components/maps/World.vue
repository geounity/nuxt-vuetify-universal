<template lang="pug">
  .map-container(class="text-align-center")
    #vmap(:style="height")
    h2.title.text-center.my-2 Seleccione una comunidad
</template>

<script>
if (process.browser) {
  window.jQuery = require('jquery')
  require('~/static/jquery.vmap')
  require('~/static/jquery.vmap.world')
}
export default {
  name: 'Worldmap',
  head: {
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/jqvmap.css',
        media: 'screen'
      }
    ]
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'height:290px'
        case 'sm':
          return 'height:250px'
        case 'md':
          return 'height:300px'
        case 'lg':
          return 'height:450px'
        case 'xl':
          return 'height:550px'
        default:
          return 'height:400px'
      }
    }
  },
  mounted() {
    this.drawMap()
  },
  methods: {
    drawMap() {
      const self = this
      window.jQuery(document).ready(function() {
        window.jQuery('#vmap').vectorMap({
          map: 'world_en',
          backgroundColor: '#246d7b',
          borderColor: '#818181',
          borderOpacity: 0.25,
          borderWidth: 1,
          selectedColor: '#c9dfaf',
          regionsSelectableOne: true,
          onRegionClick(e, code) {
            self.$store.dispatch('FETCH_COUNTRY', code).then(() => {
              self.$emit('selectedCountry')
            })
          }
        })
      })
    }
  }
}
</script>
