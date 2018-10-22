<template>
  <div class="movies">
    <h1>테스트</h1>
    <div class="text-sm-right">
      <button v-on:click="registerQuestion">질문 등록</button>
    </div>
    <div v-for="movie in movies" class="movie" :key="movie.id">
      <div>
        <strong>{{ movie.no }} : {{ movie.title }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/question')
      .then((response) => {
        this.movies = response.data
      })
  },
  data () {
    return {
      movies: []
    }
  },
  methods: {
    registerQuestion () {
      var question = {
        title: "제 보험 한번만 봐주세요.",
        description: "엄마 친구가 보험설계사라 일단 이것 저것 가입하긴 했는데",
        mainField: "재테크",
        subField: "보험",
        age: 30,
        occupation: "",
        familtyType: "",
        interest: "",
        montlyIncome: "",
        assets: "",
        incomeManagement: "",
        tags: [
          "30대여자",
          "1인가구",
          "사무직"
        ]
      }
      this.$http.post('/api/question', question)
        .then((response) => {
          
        })
    }
  }
}
</script>
