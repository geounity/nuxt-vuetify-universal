<template lang="pug">
  v-app-bar( color="rgb(62, 6, 148)" dense dark app )
    v-toolbar-title
      nuxt-link( to="/" exact class="font-weight-black") {{title}}
    v-toolbar-items.hidden-sm-and-down
      v-btn( nuxt :to="item.to" exact :key="i" v-for="(item, i) in items" text ) {{item.title}}
    v-spacer
    v-toolbar-items
      v-btn( v-if="!authId" @click.prevent="toggleModalHandle" small text class="font-weight-black") Login
      v-btn( v-if="!authId" nuxt to="/signup" color="success" small class="font-weight-black") Registrate
      v-btn( v-if="authId" nuxt to="/user/profile" small) {{username}}
      v-btn( v-if="authId" @click="signOut" small text ) Cerrar sesión 
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Appbar',
  data() {
    return {
      to: '/login',
      title: 'Geounity',
      items: [
        { title: 'Statics', to: '/statics' },
        { title: 'Debates', to: '/debates' },
        { title: 'Aims', to: '/aims' },
        {
          title: 'Communities',
          to: '/communities'
        }
      ]
    }
  },
  computed: {
    ...mapState(['authId', 'username'])
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
  color: white;
}
</style>
