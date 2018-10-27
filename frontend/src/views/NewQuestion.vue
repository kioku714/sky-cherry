<template>
  <div class="animated fadeIn">
    <h1>질문 등록</h1>
    <div class="text-sm-right">
      <button v-on:click="registerQuestion">질문 등록</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewQuestion',
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
    registerQuestion () {
      var question = {
        title: '이더리움이??',
        description: '엄마 친구가 보험설계사라 일단 이것 저것 가입하긴 했는데 제대로 가입 한게 맞나요? 보장 내용 한번만 봐주세요.. 전문가님의 조언이 필요합니다. 제 보험 내역은 아래와 같습니다.',
        mainField: '재테크',
        subField: '보험',
        age: 31,
        gender: 'female',
        occupation: '사무직',
        familtyType: '1인가구',
        interest: '결혼자금',
        montlyIncome: '300~350',
        assets: '8000만~1억',
        incomeManagement: '8000만~1억',
        tags: [
          '30대여자',
          '1인가구',
          '사무직'
        ]
      }
      this.$http.post('/api/questions', question)
        .then((response) => {
        })
    }
  }
}
</script>
