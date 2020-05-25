<template>
  <section class="section">
    <title-bar>
      Welcome!
    </title-bar>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import TitleBar from '@/components/TitleBar'

export default {
  name: 'home',
  components: {
    TitleBar
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'userName'
    ])
  }
}
</script>
