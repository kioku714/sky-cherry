<template>
  <div class="animated fadeIn">
    <div class="textBody">
        <h1 class="tit">메시지: {{ this.cherryCard.title }}</h1>
        <p class="cont">{{ this.cherryCard.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.cherryCard = {}
    this.$http.get('/api/cherryCard/' + this.$route.params.id)
      .then((response) => {
        this.cherryCard = response.data
      })
  },
  data () {
    return {
      cherryCard: {
        title: 'test',
        content: 'zzzz'
      }
    }
  }
}
</script>
