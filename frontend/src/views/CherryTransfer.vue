<template>
  <div class="animated fadeIn">
    <h1>Cherry Transfer</h1>
    <b-col sm="12">
      <b-tabs>
        <b-tab title="CJONE" active>
        </b-tab>
        <b-tab title="Transfer" active>
        </b-tab>
        <b-tab title="History" active>
          <c-table sm="9" ref="table" v-if="receipts.length > 0" striped :rows="receipts" :columns="receiptFields" caption="<i class='fa fa-align-justify'></i> Transfer Results"></c-table>        </b-tab>
      </b-tabs>
    </b-col>
  </div>
</template>

<script>
import cTable from './base/Table.vue'

export default {
  name: 'CherryTransfer',
  components: {cTable},
  created () {
    this.fetchReceiptesData()
  },
  data () {
    return {
      receipts: [],
      receiptFields: [
        {key: 'eventFrom', label: '발신자'},
        {key: 'eventTo', label: '수신자'},
        {key: 'value', label: '전송토큰'},
        {key: 'tx', label: '상세이력'}
      ]
    }
  },
  methods: {
    fetchReceiptesData () {
      this.receipts = []
      this.$http.get('/api/contracts/receipts')
        .then((response) => {
          this.receipts = response.data.reverse()
        })
    }
  }
}
</script>
