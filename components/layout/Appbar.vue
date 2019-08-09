<template lang="pug">
  v-app-bar( dense app )
    v-toolbar-title
      nuxt-link( to="/" exact class="font-weight-black mr-2") {{title}}
    v-toolbar-items.hidden-sm-and-down.mr-5
      v-btn( nuxt :to="item.to" exact :key="i" v-for="(item, i) in items" x-large text color="rgb(62, 6, 148)" ) {{item.title}}
    v-spacer
    v-toolbar-items(style="display:flex;align-items:center")
      v-btn( v-if="!isAuthenticated" @click.prevent="toggleModalHandle" x-small text class="font-weight-black" max-height="37" color="rgb(62, 6, 148)") Login
      v-btn( v-if="!isAuthenticated" nuxt to="/signup" x-small class="font-weight-black my-btn-color" max-height="37" class="px-4") Registrate
      v-btn( v-if="isAuthenticated" nuxt to="/user/profile" x-small ) {{username}}
      v-btn( v-if="isAuthenticated" @click="signOut" x-small text ) Cerrar sesión 
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Appbar',
  data() {
    return {
      to: '/login',
      title: 'Geounity',
      items: [
        { title: 'Estadisticas', to: '/statics' },
        { title: 'Debates', to: '/debates' },
        { title: 'Planificación', to: '/aims' },
        {
          title: 'Comunidades',
          to: '/communities'
        }
      ]
    }
  },
  computed: {
    ...mapState(['username']),
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    signOut() {
      this.$store.dispatch('SIGN_OUT')
    },
    toggleModalHandle() {
      this.$store.commit('TOGGLE_MODAL_SIGNIN')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(62, 6, 148);
}
.my-btn-color {
  background-image: linear-gradient(270deg, #34d058 0, #28a745 90%);
  color: #fff;
}
</style>
