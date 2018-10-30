<template>
  <b-card :header="caption">
    <b-row class="justify-content-end">
      <b-col sm="7" md="5" lg="4" xl="3">
        <form class="pb-2">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="검색어를 입력해주세요." />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">지움</b-btn>
            </b-input-group-append>
          </b-input-group>
        </form>
      </b-col>
    </b-row>
    <b-table ref="table"
             @filtered="onFiltered"
             :filter="filter"
             :hover="hover"
             :striped="striped"
             :bordered="bordered"
             :small="small"
             :fixed="fixed"
             responsive="sm"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage">
      <template slot="eventFrom" slot-scope="data">
        {{ data.item['from-ref'] ? data.item['from-ref'].name : data.item.from }}
      </template>
      <template slot="eventTo" slot-scope="data">
        {{ data.item['to-ref'] ? data.item['to-ref'].name : data.item.to }}
      </template>
      <template slot="tx" slot-scope="data">
        <b-link :href="'https://rinkeby.etherscan.io/tx/'+data.item.tx" target="_blank">{{data.item.tx.substring(0, 10) + '...'}}</b-link>
      </template>
      <template slot="value" slot-scope="data">
        {{ data.item.value }}
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>

export default {
  name: 'c-table',
  created () {
    this.items = this.rows
    this.fields = this.columns
  },
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => [{key: 'name'}]
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      items: [],
      fields: [],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      filter: null,
      user: {}
    }
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
