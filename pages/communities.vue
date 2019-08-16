<template lang="pug">
  main
    h1.display-2.text-center.my-5 Comunidad Global
    h2.display-1.text-center.my-3 Naciones Unidas
    ul.gu-flex
      li(v-for="(flag, i) in flags" :key="i")
        img(:src="flag" width="50")
</template>

<script>
export default {
  name: 'Communities',
  data() {
    return {
      flags: []
    }
  },
  beforeMount() {
    this.$store.dispatch('FETCH_FLAGS').then((res) => {
      this.flags = res
    })
  }
}
</script>

<style scoped>
ul {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 2rem;
}
ul li {
  margin: 0.3rem;
  list-style: none;
}
</style>
