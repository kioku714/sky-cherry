<template>
  <div class="animated fadeIn">
    <h1>질문상세</h1>
    <h1>{{ question.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Question',
  created () {
    this.$http.get('/api/question/' + this.$route.params.questionId)
      .then((response) => {
        this.question = response.data
      })
  },
  data () {
    return {
      question: {}
    }
  },
  methods: {
  }
}
</script>
