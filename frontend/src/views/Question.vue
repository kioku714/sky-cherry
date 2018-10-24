<template>
  <div class="animated fadeIn">
    <h1>질문하기</h1>
    <div class="text-sm-right">
      <button v-on:click="registerQuestion">질문 등록</button>
    </div>
    <div v-for="question in questions" class="movie" :key="question.id">

      <div class="new-question grid-item">
        <div class="content">
          <!-- 사용자 닉네임, 질문 생성 시간  -->
          <span class="question-owner">
            <a target="_blank" class="username-link" href="/profiles/v1vm3rjltd14">yeaseul.moon</a>
            5 days ago
          </span>
          <!-- 질문 제목 -->
          <h4 class="question-header">
            <a href="/questions/as-the-creator-of-a-smart-contract-how-can-i-retain-control-over-e1474b6f-5c80-4626-bba3-52b72f5dfe5e">{{ question.title }}</a>
          </h4>
          <!-- 질문 상세 내용, more 링크 -->
          <div class="question-body-container">
              <p class="question-body">
                {{ question.description }}
                <a class="more-link" href="/questions/as-the-creator-of-a-smart-contract-how-can-i-retain-control-over-e1474b6f-5c80-4626-bba3-52b72f5dfe5e">more</a>
              </p>
          </div>
          <!-- Tags -->
          <div class="tags-container">
            <div class="question-tag" v-for="tag in question.tags" :key="tag">
              {{ tag }}
            </div>
          </div>
          <!-- 좋아요, 코멘트 -->
          <div class="d-flex">
            <div class="question-icon-container karma-icon-container">
              <img class="question-icon" src="https://assets.delegatecall.com/assets/header/karma-symbol-f36cf481efbaf440052f2563cfb4b8d615e38242e474a6ec68162adee1f16c4a.svg" alt="Karma symbol">
              {{ question.likes.length }}
            </div>
            <div class="question-icon-container answer-icon-container">
              <img class="question-icon" src="https://assets.delegatecall.com/assets/questions/speach_bubble-5b535e6354d928919956366cd452732dea32b99711b57cc80fe03b3c0de155b5.svg" alt="Speach bubble">
              {{ question.answers.length }}
            </div>
          </div>
          <hr>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  created () {
    this.$http.get('/api/question')
      .then((response) => {
        this.questions = response.data
      })
  },
  data () {
    return {
      questions: []
    }
  },
  methods: {
    registerQuestion () {
      var question = {
        title: '제 보험 한번만 봐주세요.',
        description: '엄마 친구가 보험설계사라 일단 이것 저것 가입하긴 했는데',
        mainField: '재테크',
        subField: '보험',
        age: 30,
        occupation: '',
        familtyType: '',
        interest: '',
        montlyIncome: '',
        assets: '',
        incomeManagement: '',
        tags: [
          '30대여자',
          '1인가구',
          '사무직'
        ]
      }
      this.$http.post('/api/question', question)
        .then((response) => {
        })
    }
  }
}
</script>
