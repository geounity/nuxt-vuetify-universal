<template lang="pug">
  v-app-bar( dense app )
    v-toolbar-title
      nuxt-link( to="/" exact class="font-weight-black mr-2") {{title}}
    v-spacer
    v-toolbar-items.hidden-sm-and-down.mr-5
      v-btn( nuxt :to="item.to" exact :key="i" v-for="(item, i) in items" text color="rgb(62, 6, 148)" ) {{item.title}}
    v-toolbar-items(style="display:flex;align-items:center")
      v-btn( v-if="!isAuthenticated" nuxt to="/signin" x-large text class="font-weight-black" max-height="37" color="rgb(62, 6, 148)") Login
      v-btn( v-if="!isAuthenticated" nuxt to="/signup" x-large class="font-weight-black my-btn-color" max-height="37" class="px-3") Registrate
      v-menu(v-if="isAuthenticated" transition="slide-y-transition" close-on-click offset-y)
        template(v-slot:activator="{on}")
          v-btn(text color="primary" v-on="on")
            span {{username}}
            v-avatar(v-if="avatar" height="32" width="32")
              img(:src="avatar")
            v-icon mdi-menu-down
        v-list
          v-list-item
            v-btn( nuxt to="/user/profile" text ) Mi perfil
          v-list-item
            v-btn( @click="signOut" text ) Cerrar sesión
</template>

<script>
import { mapGetters } from 'vuex'
import guFormSignin from '~/components/forms/Signin.vue'

export default {
  name: 'Appbar',
  components: { guFormSignin },
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
    ...mapGetters(['avatar', 'isAuthenticated', 'username'])
  },
  methods: {
    signOut() {
      this.$store.dispatch('SIGN_OUT')
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
