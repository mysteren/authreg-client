<template>
  <section class="section">
    <title-bar>
      Токены
      <router-link to="/tokens/new" class="button" slot="button">
        Новая запись
      </router-link>
    </title-bar>

    <card-component class="has-table">
      <modal-box
        :is-active="isModalActive"
        :trash-object-name="trashObjectName"
        @confirm="trashConfirm"
        @cancel="trashCancel"/>
      <b-table
          :checkable="false"
          :loading="isLoading"
          :paginated="paginated"
          :per-page="perPage"
          :striped="true"
          :hoverable="true"
          default-sort="name"
          :data='records'>

        <template slot-scope="props">
          <b-table-column label="Ключ" field="key" sortable>
            {{ props.row.key }}
          </b-table-column>
          <b-table-column label="Описание" field="description" sortable>
            {{ props.row.description }}
          </b-table-column>
          <b-table-column label="Активный" field="active" sortable>
            {{ props.row.active }}
          </b-table-column>
          <b-table-column custom-key="actions" class="is-actions-cell">
            <div class="buttons is-right">
              <router-link :to="{name:'tokens.edit', params: {id: props.row.id}}" class="button is-small is-primary">
                <b-icon icon="eye" custom-size="default"/>
              </router-link>
              <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
                <b-icon icon="trash-can" custom-size="default"/>
              </button>
            </div>
          </b-table-column>
        </template>

        <section class="section" slot="empty">
          <div class="content has-text-grey has-text-centered">
            <template v-if="isLoading">
              <p>
                <b-icon icon="dots-horizontal" size="is-large"/>
              </p>
              <p>Fetching data...</p>
            </template>
            <template v-else>
              <p>
                <b-icon icon="emoticon-sad" size="is-large"/>
              </p>
              <p>Nothing's there&hellip;</p>
            </template>
          </div>
        </section>
      </b-table>
    </card-component>

  </section>
</template>

<script>
import { mapState } from 'vuex'

import CardComponent from '@/components/CardComponent'
import ModalBox from '@/components/ModalBox'
import TitleBar from '@/components/TitleBar'
// import HeroBar from '@/components/HeroBar'
// import CardToolbar from '@/components/CardToolbar'
// import ModalTrashBox from '@/components/ModalTrashBox'

export default {
  name: 'TokensIndex',
  components: {
    // ModalTrashBox,
    // CardToolbar,
    TitleBar,
    ModalBox,
    CardComponent
  },
  data () {
    return {
      checkable: true,
      isModalActive: false,
      trashObject: null,
      trashObjectName: null,
      records: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
  created () {
    this.getRecordsData()
  },
  methods: {
    getRecordsData () {
      this.isLoading = true
      this.$http
        .get('/tokens')
        .then(r => {
          this.isLoading = false
          console.log(this.isLoading)
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.records = r.data.data
            console.log(this.records)
          }
        })
        .catch(err => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        })
    },
    trashModal (trashObject = null) {
      console.log(trashObject)
      if (trashObject) {
        this.trashObject = trashObject
        this.isModalActive = true
        this.trashObjectName = trashObject.key
      }
    },
    trashConfirm () {
      const url = `/tokens/${this.trashObject.id}`
      const method = 'delete'
      const data = null

      this.isModalActive = false

      this.$http({
        method,
        url,
        data
      }).then(r => {
        let count = 0
        if (r.data.data) {
          count = r.data.data
          this.getRecordsData()
        }

        this.trashObject = null
        this.checkedRows = []

        this.$buefy.snackbar.open({
          message: `Удалено обьектов ${count}`,
          queue: false
        })
      }).catch(err => {
        this.$buefy.toast.open({
          message: `Ошибка: ${err.message}`,
          type: 'is-danger',
          queue: false
        })
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
