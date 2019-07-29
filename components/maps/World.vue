<template lang="pug">
  .map-container(class="text-align-center")
    #world-map(:style="height")
</template>

<script>
if (process.browser) {
  window.jQuery = require('jquery')
  require('jvectormap')
  require('~/static/map-world')
}
export default {
  name: 'Worldmap',
  head: {
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/jquery-jvectormap-2.0.3.css',
        media: 'screen'
      }
    ]
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'height:200px'
        case 'sm':
          return 'height:250px'
        case 'md':
          return 'height:300px'
        case 'lg':
          return 'height:350px'
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
        window.jQuery('#world-map').vectorMap({
          map: 'world_mill',
          backgroundColor: '#246d7b',
          onRegionClick(e, code) {
            self.$emit('selectedCountry', code)
            self.$store.dispatch('FETCH_COUNTRY', code)
          }
        })
      })
    }
  }
}
</script>
