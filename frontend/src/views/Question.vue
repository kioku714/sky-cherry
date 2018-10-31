<template>
  <div class="animated fadeIn">
    <div>
      <a class="username-link" v-bind:href="'/profile/' + question._id">yeaseul.moon</a>
      {{ question.createdBy.level }}
    </div>
    <div>
      {{ prettyDate($moment.utc(question.createdAt).valueOf()) }}
    </div>
    <h1>{{ question.title }}</h1>
    <hr/>
    <div>Profile</div>
    <div>
      <label class="col-md-6 col-form-label">성별/나이 : </label>
      <label class="col-md-6 col-form-label">{{ "male" === question.createdBy.gender ? "남" : "여"}}/{{ getAge() }}</label>
    </div>
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
    getAge () {
      var ageDifMs = Date.now() - new Date(this.question.createdBy.birthday).getTime()
      var ageDate = new Date(ageDifMs) // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    },
    prettyDate (time) {
      var diff = (new Date().getTime() - new Date(time).getTime()) / 1000
      if (diff < 60) {
        return '방금전'
      } else if (diff < 3600) {
        return Math.floor(diff / 60) + '분 전'
      } else if (diff < 86400) {
        return Math.floor(diff / 3600) + '시간 전'
      } else {
        return Math.floor(diff / 86400) + '일 전'
      }
    }
  }
}
</script>
