<template>
  <v-app>
    <gu-appbar></gu-appbar>
    <v-content>
      <nuxt />
    </v-content>
    <gu-footer></gu-footer>
    <gu-bottom-nav class="hidden-md-and-up"></gu-bottom-nav>
  </v-app>
</template>

<script>
import guAppbar from '~/components/layout/Appbar.vue'
import guBottomNav from '~/components/layout/BottomNav.vue'
import guFooter from '~/components/layout/Footer.vue'
export default {
  components: { guAppbar, guBottomNav, guFooter },
  data() {
    return {
      logged: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Vuetify.js'
    }
  }
}
</script>
