<template>
  <div class="movies">
    <h1>영화 목록</h1>
    <div v-for="movie in movies" class="movie" :key="movie.id">
      <img v-bind:src="movie.poster" class="poster" fluid>
      <div>
        <router-link :to="{ name: 'detail', params: { id: movie.id }}">
          <strong>{{ movie.name }}</strong>
        </router-link>
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
