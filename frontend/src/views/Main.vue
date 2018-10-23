<template>
  <div class="movies">
    <h1>영화 목록</h1>
    <div v-for="movie in movies" class="movie" :key="movie.id">
      <img v-bind:src="movie.poster" class="poster" fluid>
      <div>
        <strong>{{ movie.name }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/test')
      .then((response) => {
        this.movies = response.data
      })
  },
  data () {
    return {
      movies: []
    }
  }
}
</script>
