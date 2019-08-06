<template lang="pug">
  v-app-bar( dense app )
    v-toolbar-title
      nuxt-link( to="/" exact class="font-weight-black mr-2") {{title}}
    v-spacer
    v-toolbar-items.hidden-sm-and-down.mr-5
      v-btn( nuxt :to="item.to" exact :key="i" v-for="(item, i) in items" x-large text color="rgb(62, 6, 148)" ) {{item.title}}
    v-toolbar-items(style="display:flex;align-items:center")
      v-btn( v-if="!authId" @click.prevent="toggleModalHandle" x-small text class="font-weight-black" max-height="37" color="rgb(62, 6, 148)") Login
      v-btn( v-if="!authId" nuxt to="/signup" x-small class="font-weight-black my-btn-color" max-height="37" class="px-4") Registrate
      v-btn( v-if="authId" nuxt to="/user/profile" x-small ) {{username}}
      v-btn( v-if="authId" @click="signOut" x-small text ) Cerrar sesión 
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
      this.$store.modules.user.dispatch('SIGN_OUT')
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
