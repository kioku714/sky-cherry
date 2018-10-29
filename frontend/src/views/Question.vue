<template>
  <div class="animated fadeIn">
    <h1>질문상세</h1>
    <h1>{{ question.title }}</h1>
    <h1>{{ question.description }}</h1>
    <h1>{{ question.mainField }}</h1>
    <h1>{{ question.subField }}</h1>
    <h1>{{ question.age }}</h1>
    <h1>{{ question.gender }}</h1>
    <h1>{{ question.occupation }}</h1>
    <h1>{{ question.familtyType }}</h1>
    <h1>{{ question.interest }}</h1>
    <h1>{{ question.montlyIncome }}</h1>
    <h1>{{ question.assets }}</h1>
    <h1>{{ question.incomeManagement }}</h1>
    <h1>{{ question.tags }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Question',
  created () {
    this.$http.get('/api/questions/' + this.$route.params.questionId)
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
