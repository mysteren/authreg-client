<template>
  <div id="app">
    <nav-bar/>
    <!-- <aside-menu :menu="menu" /> -->
    <router-view/>
    <footer-bar/>
  </div>
</template>

<style lang="scss">

</style>
<script>
import NavBar from '@/components/NavBar'
import FooterBar from '@/components/FooterBar'

export default {
  components: { FooterBar, NavBar },
  computed: {
  },
  created () {
    // this.$http.defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZG1pbiJ9.2ja3UKLfNRsk-YwYLlc8YqILWebENqUrmMiBLAlqY58'
    this.$store.commit('user', {
      name: 'admin',
      email: '',
      avatar: ''
    })
  }
}
</script>
