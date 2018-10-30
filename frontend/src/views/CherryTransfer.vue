<template>
  <div class="animated fadeIn">
    <h1>Cherry Transfer</h1>
  </div>
</template>

<script>
export default {
  name: 'CherryTransfer',
  created () {
    this.fetchData()
  },
  data () {
    return {
    }
  },
  methods: {
    fetchData () {
      this.$http.get('/api/contracts/receipts')
        .then((response) => {
          this.receipts = response.data
        })
    }
  }
}
</script>
