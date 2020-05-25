<template>
  <footer v-show="isFooterBarVisible" class="footer">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            {{ 'Версия \xa0' }} <span class="tag"> v{{ version }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import { version } from '../../package.json'

export default {
  name: 'FooterBar',
  data () {
    return {
      version
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    ...mapState([
      'isFooterBarVisible'
    ])
  }
}
</script>
