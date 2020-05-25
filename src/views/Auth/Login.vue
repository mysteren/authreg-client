<template>
  <section class="section">
    <div class="login">
      <card-component title="Авторизация" icon="account-circle">
        <form  @submit.prevent="handleLogin()">
          <b-field >
            <b-input
              v-model="login"
              type="text"
              placeholder="Логин"
              required />
          </b-field>
          <b-field >
            <b-input
              v-model="password"
              type="password"
              placeholder="Пароль"
              required
              password-reveal />
          </b-field>
          <div v-if="error" class="error has-text-danger">
            {{ error }}
          </div>
          <b-field>
            <div class="control">
              <button
                type="submit"
                class="button is-primary"
              >Вход</button>
            </div>
          </b-field>
        </form>
      </card-component>
    </div>
  </section>
</template>

<script>
// import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
// import ModalTrashBox from '@/components/ModalTrashBox'

export default {
  name: 'TokensIndex',
  components: {
    // ModalTrashBox,
    CardComponent
  },
  data () {
    return {
      login: null,
      password: null,
      error: null
    }
  },
  methods: {
    handleLogin () {
      this.error = null
      if (this.login && this.password) {
        this.$store.dispatch('auth/login', {
          login: this.login,
          password: this.password
        }).then((data) => {
          this.$router.push('/')
          this.error = null
        }, error => {
          if (error.message) {
            this.error = error.message
          } else {
            this.error = error
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">

.login {
  display: flex;
  justify-content: center;
}

.error {
  // color: $danger;
  margin-bottom: 10px;
}

</style>
