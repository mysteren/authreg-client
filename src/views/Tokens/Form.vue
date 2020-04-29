<template>
  <section class="section">
    <title-bar>
      Токен
      <router-link to="/tokens" class="button is-primary" slot="button">К списку</router-link>
    </title-bar>

    <tiles>
      <card-component title="Редактирование" icon="account-circle" class="tile is-child">
        <form @submit.prevent="submit">
          <b-field horizontal label="Ключ" >
            <b-input v-model="form.key" name="key" required />
            <button class="button" @click.prevent="tokenGenerator()">Генератор</button>
          </b-field>
          <b-field horizontal label="Описание">
            <b-input v-model="form.description" name="description" />
          </b-field>
          <hr />
          <b-field label="Активный" horizontal>
            <b-switch v-model="form.active" />
          </b-field>
          <hr />
          <b-field label="Параметры" horizontal>
            <vue-json-editor v-model="form.params" :expandedOnStart="true"></vue-json-editor>
          </b-field>
          <hr />
          <b-field horizontal>
            <div class="control">
              <button
                type="submit"
                class="button is-primary"
                :class="{'is-loading':isLoading}"
              >Сохранить</button>
            </div>
          </b-field>
        </form>
      </card-component>
      <template v-if="item">
        <card-component title="Данные" icon="account" class="tile is-child">
          <b-field horizontal label="ID">
            <b-input :value="item.id" custom-class="is-static" readonly />
          </b-field>
          <b-field horizontal label="Ключ">
            <b-input :value="item.key" custom-class="is-static" readonly />
          </b-field>
          <b-field horizontal label="Описание">
            <b-input :value="item.description" custom-class="is-static" readonly />
          </b-field>
          <b-field horizontal label="Активный">
            <b-input :value="item.active ? 'да' : 'нет'" custom-class="is-static" readonly />
          </b-field>
          <b-field horizontal label="Параметры">
            <pre>{{ item.params }}</pre>
          </b-field>
        </card-component>
      </template>
    </tiles>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import vueJsonEditor from 'vue-json-editor'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import Tiles from '@/components/Tiles'

export default {
  name: 'TokensForm',
  props: {
    id: {
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      item: null,
      errors: null,
      form: this.getClearFormObject()
    }
  },
  components: {
    Tiles,
    TitleBar,
    CardComponent,
    vueJsonEditor
  },
  computed: {
    ...mapState(['userAvatar', 'userName', 'userEmail'])
  },
  created () {
    this.getRecordData()
  },
  methods: {
    getClearFormObject () {
      return {
        key: null,
        description: null,
        active: false
      }
    },
    getRecordData () {
      if (this.id) {
        this.$http
          .get(`/tokens/${this.id}`)
          .then(r => {
            console.log(r.data)
            if (r.data.data) {
              this.form = r.data.data
              this.item = { ...r.data.data }
            }
          })
          .catch(e => {
            this.item = null

            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
    submit () {
      this.isLoading = true
      this.errors = null
      let method = 'post'
      let url = '/tokens'

      if (this.id) {
        method = 'put'
        url = `/tokens/${this.id}`
      }

      this.$http({
        method,
        url,
        data: this.form
      }).then(r => {
        if (!this.id && r.data.data.id) {
          this.$router.push({ name: 'entities.edit', params: { id: r.data.data.id } })

          this.$buefy.snackbar.open({
            message: 'Запись создана',
            queue: false
          })
        } else {
          this.item = r.data.data

          this.$buefy.snackbar.open({
            message: 'Запись обновлена',
            queue: false
          })
        }
      }).catch(e => {
        this.$buefy.toast.open({
          message: `Ошибка (${e.response.statusText} ${e.response.status}): ${e.response.data.error}`,
          type: 'is-danger',
          queue: false
        })
      }).finally(() => {
        this.isLoading = false
      })
    },
    tokenGenerator (length = 32) {
      const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
      const b = []
      for (let i = 0; i < length; i++) {
        const j = (Math.random() * (a.length - 1)).toFixed(0)
        b[i] = a[j]
      }
      this.form.key = b.join('')
    }
  }
}
</script>
