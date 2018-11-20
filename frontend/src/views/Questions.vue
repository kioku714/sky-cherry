<template>
  <div class="animated fadeIn">
    <b-form-input class="mb-4" type="text" v-model="search" placeholder="Search for questions"  v-bind:style="{borderColor: '#30CE92'}" style="background: url('/static/img/magnifying-glass.png') no-repeat center; background-size: 26px 26px; background-position: right 13px center; padding: 8px 48px 8px 8px; border-color: '#30CE92';"></b-form-input>
    <b-row v-show="(filteredList.length == 0) || (search.length != 0)">
      <div class="text-center" v-bind:style="{margin: 'auto'}">
        <h3>찾는 질문이 없을 시 직접 질문을 등록해보세요!</h3>
        <b-button :to="{name: '질문 등록'}" variant="success" class="mt-3" v-bind:style="{ borderRadius: '.3rem' }">Add a Question</b-button>
      </div>
    </b-row>
    <div v-for="question in filteredList" :key="question._id">
      <div class="new-question grid-item">
        <div class="content">
          <!-- 사용자 닉네임, 질문 생성 시간  -->
          <span>
            <a v-bind:style="{color: '#30CE92', fontWeight: 'bold'}" v-bind:href="'/profiles/' + question.createdBy._id">{{ question.createdBy.name }}</a>
          </span>
          <span class="text-muted">{{ $moment.utc(question.createdAt).local().fromNow() }}</span>
          <!-- 질문 제목 -->
          <h4 class="mt-2">
            <a v-bind:href="'/question/' + question._id" v-bind:style="{color: '#4c3926'}">{{ question.title }}</a>
          </h4>
          <!-- 질문 상세 내용, more 링크 -->
          <div class="mt-2" v-bind:style="{color: '#4c3926'}">
            {{ getDescription(question.description) }}
            <a v-show="question.description.length > maxDescriptionLength" v-bind:href="'/question/' + question._id" v-bind:style="{color: '#0170ba'}">more</a>
          </div>
          <!-- Tags -->
          <div class="d-flex flex-wrap">
            <div class="mr-1" v-for="tag in question.tags" :key="tag" v-bind:style="{color: '#4c3926'}">
              #{{ tag }}
            </div>
          </div>
          <!-- 좋아요, 코멘트 -->
          <div class="d-flex mt-3">
            <i class="icon-heart icons font-1xl d-block mr-3 like"> {{ question.likes.length }}</i>
            <i class="icon-menu icons font-1xl d-block text-muted"> {{ question.answers.length }}</i>
          </div>
          <hr>
        </div>
      </div>
    </div>
    <b-row>
      <b-col sm="4" v-bind:style="{margin: 'auto'}">
        <button v-bind:style="{borderRadius: '.3rem'}" class="btn btn-light btn-lg btn-block" type="button" v-show="(distance < questions.length) && (search.length == 0)" @click="manualLoad" >Load more</button>
      </b-col>
    </b-row>
    <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
        <span slot="no-more"/>
        <span slot="no-results"/>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import striptags from 'striptags'

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
      maxDescriptionLength: 50,
      search: ''
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.featchQuestionList(to.query.sort)
    next()
  },
  computed: {
    filteredList () {
      if (this.search.length === 0) {
        return this.listItems
      }
      return this.questions.filter(question => {
        return question.title.toLowerCase().includes(this.search.toLowerCase()) || striptags(question.description).toLowerCase().includes(this.search.toLowerCase()) || question.createdBy.name.toLowerCase().includes(this.search.toLowerCase()) || question.tags.includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    infiniteHandler (state) {
      state.complete()
    },
    featchQuestionList (sort) {
      this.questions = []
      this.listItems = []
      this.distance = 0
      this.$http.get('/api/questions')
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
    getDescription (description) {
      description = striptags(description)
      if (description.length > this.maxDescriptionLength) {
        return description.substr(0, this.maxDescriptionLength) + '...'
      }
      return description
    }
  }
}
</script>
