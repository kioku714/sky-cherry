<template>
  <div>
    <h1>상세 내용</h1>
    <img v-bind:src="movie.poster" class="poster" fluid>
      <div>
        <strong>{{ movie.name }}</strong>
      </div>
  </div>
</template>

<script>
export default {
  created: function () {
    var id = this.$route.params.id
    this.$http.get(`/api/test/${id}`)
      .then((response) => {
        this.movie = response.data[0]
      })
  },
  data: function () {
    return {
      movie: {}
    }
  }
}
</script>
