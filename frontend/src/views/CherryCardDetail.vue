<template>
  <div class="animated fadeIn">
    <div class="textBody">
        <h1 class="tit">{{ cherryCard.title }}</h1>
        <p class="cont">{{ cherryCard.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/cherryCard/' + this.$route.params.id)
      .then((response) => {
        this.cherryCard = response.data
      })
  },
  data () {
    return {
      cherryCard: {}
    }
  }
}
</script>
