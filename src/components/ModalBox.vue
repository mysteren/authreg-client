<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Подтвержение действия</p>
      </header>
      <section class="modal-card-body">
        <p>Удалить запись <b>{{ trashObjectName }}</b> ?</p>
        <p>Действие безвозвратно.</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Отмена</button>
        <button class="button is-danger" @click="confirm">Удалдить</button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalBox',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    trashObjectName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isModalActive: false
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    }
  },
  watch: {
    isActive (newValue) {
      this.isModalActive = newValue
    },
    isModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  }
}
</script>
