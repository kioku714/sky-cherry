<template>
  <div class="animated fadeIn">
    <h1>질문하기</h1>
    <div v-for="question in listItems" class="movie" :key="question">

      <div class="new-question grid-item">
        <div class="content">
          <!-- 사용자 닉네임, 질문 생성 시간  -->
          <span class="question-owner">
            <a class="username-link" v-bind:href="'/profile/' + question._id">yeaseul.moon</a>
            {{ prettyDate($moment.utc(question.createdAt).valueOf()) }}
          </span>
          <!-- 질문 제목 -->
          <h4 class="question-header">
            <a v-bind:href="'/question/' + question._id">{{ question.title }}</a>
          </h4>
          <!-- 질문 상세 내용, more 링크 -->
          <div class="question-body-container">
            <p class="question-body">
              {{ getDescription(question.description) }}
              <a v-show="question.description.length > maxDescriptionLength" class="more-link" v-bind:href="'/question/' + question._id">more</a>
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

    <a class="load-more-btn" v-show="distance < questions.length" @click="manualLoad">Load more</a>
    <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
        <span slot="no-more"/>
        <span slot="no-results"/>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Questions',
  created () {
    this.featchQuestionList(this.$route.query.sort)
  },
  components: {
    InfiniteLoading
  },
  data () {
    return {
      questions: [],
      listItems: [],
      pageCount: 3,
      distance: 0,
      maxDescriptionLength: 50
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.featchQuestionList(to.query.sort)
    next()
  },
  methods: {
    infiniteHandler (state) {
      state.complete()
    },
    featchQuestionList (sort) {
      this.questions = []
      this.listItems = []
      this.distance = 0
      this.$http.get('/api/question')
        .then((response) => {
          this.questions = response.data
        })
        .then(() => {
          if (sort !== 'new') {
            this.questions = this.sortByLike()
          }
          this.manualLoad()
        })
    },
    sortByLike () {
      return this.questions.slice().sort(function (a, b) {
        return b.likes.length - a.likes.length
      })
    },
    manualLoad () {
      this.distance = this.distance + this.pageCount
      const temp = []
      const itemCount = this.listItems.length + this.pageCount
      for (let i = this.listItems.length; i <= (itemCount > this.questions.length ? this.questions.length : itemCount) - 1; i++) {
        temp.push(this.questions[i])
      }
      this.listItems = this.listItems.concat(temp)
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
    },
    getDescription (description) {
      if (description.length > this.maxDescriptionLength) {
        return description.substr(0, this.maxDescriptionLength) + '...'
      }
      return description
    }
  }
}
</script>
