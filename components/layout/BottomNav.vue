<template lang="pug">
  v-bottom-navigation(
    v-model="bottomNav"
    :value="true"
    color="#fff"
    style="border-top:1px solid grey"
    fixed
    app
  )
    v-btn(
      color="teal"
      text
      value="home"
      nuxt
      to='/'
      class="fix-minwidth"
    )
      span Home
      v-icon mdi-home
    v-btn(
      color="teal"
      text
      value="communities"
      nuxt
      to='/communities'
      class="fix-minwidth"
    )
      span Communities
      v-icon mdi-account-group
    v-btn(
      color="teal"
      text
      value="statics"
      nuxt
      to='/statics'
      class="fix-minwidth"
    )
      span Statics
      v-icon mdi-chart-pie
    v-btn(
      color="teal"
      text
      value="debates"
      nuxt
      to='/debates'
      class="fix-minwidth"
    )
      span Debates
      v-icon mdi-google-circles-communities
    v-btn(
      color="teal"
      text
      value="aims"
      nuxt
      to='/aims'
      class="fix-minwidth"
    )
      span Aims
      v-icon mdi-lightbulb-on-outline
    
</template>

<script>
export default {
  name: 'BottomNav',
  data() {
    return {
      bottomNav: 'home'
    }
  }
}
</script>

<style scoped>
.fix-minwidth {
  min-width: 50px !important;
}
</style>
