<template>
  <div class="animated fadeIn question">
    <div>
      <b-row>
        <b-col sm="1" cols="2">
          <div v-if="question.createdBy.name === ''">
            <img src="/static/img/avatars/profile_thumbnail.jpg" class="img-avatar" />
          </div>
          <div v-else class="header-icon-text" v-bind:style="{ background: getBgColor(question.createdBy.email) }">
              {{ question.createdBy.name.substring(0, 1) }}
          </div>
        </b-col>
        <b-col>
          <a class="username-link" v-bind:href="'/profiles/' + question.createdBy._id">
            {{ question.createdBy.name }}
          </a>
          <span v-bind:style="{ color: getLevelColor(question.createdBy.level) }">
            <small>{{ question.createdBy.level }} Cherry</small>
          </span>
          <br>
          {{ $moment.utc(question.createdAt).local().fromNow() }}
        </b-col>
      </b-row>
    </div>
    <div class="field">
      ► {{ getMainFieldName() }} | {{ getSubFieldName() }}
    </div>
    <b-row>
      <b-col sm="10" cols="9">
        <h3>{{ question.title }}</h3>
      </b-col>
      <b-col>
        <h3 class="likes text-right">
          <div v-if="question.createdBy._id !== signInUserId" >
            <b-link v-on:click="likeQuestion(question._id)"><i class="fa fa-heart" /> {{ question.likes.length }}</b-link>
          </div>
          <div v-else>
            <i class="fa fa-heart" /> {{ question.likes.length }}
          </div>
        </h3>
      </b-col>
    </b-row>
    <hr>
    <div class="profile-title">Profile</div>
    <div class="profile-content">
      <b-row>
        <b-col sm="2" cols="6">
          <label>성별/나이:</label>
        </b-col>
        <b-col sm="3" cols="6">
          <label>{{ "male" === question.createdBy.gender ? "남" : "여"}}/{{ getAge() }}</label>
        </b-col>
        <b-col sm="2" cols="6">
          <label>직업:</label>
        </b-col>
        <b-col sm="3" cols="6">
          <label>{{ getOccupation() }}</label>
        </b-col>
      </b-row>
      <div v-if="this.question.mainField === 'finance'">
        <b-row>
          <b-col sm="2" cols="6">
            <label>가족형태:</label>
          </b-col>
          <b-col sm="3" cols="6">
            <label>{{ getFamilyType() }}</label>
          </b-col>
          <b-col sm="2" cols="6">
            <label>관심사:</label>
          </b-col>
          <b-col sm="3" cols="6">
            <label>{{ getInterest() }}</label>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2" cols="6">
            <label>월평균소득:</label>
          </b-col>
          <b-col sm="3" cols="6">
            <label>{{ getMonthlyIncome() }}</label>
          </b-col>
          <b-col sm="2" cols="6">
            <label>보유자산:</label>
          </b-col>
          <b-col sm="3" cols="6">
            <label>{{ getAssets() }}</label>
          </b-col>
        </b-row>
        <div>
          <b-form-group label="소득운용현황: "
                        :horizontal="true">
            <b-form-radio-group v-model="question.incomeManagement"
                                :options="$store.state.incomeManagement">
            </b-form-radio-group>
          </b-form-group>
        </div>
      </div>
    </div>
    <hr>
    <div v-html="question.description"></div>
    <div class="tags-container">
      <div class="question-tag" v-for="tag in question.tags" :key="tag">
        {{ tag }}
      </div>
    </div>
    <hr>
    <h2 class="text-center">{{ answers.length }} ANSWERS</h2>
    <b-list-group v-if="answers.length > 0" flush>
      <b-list-group-item v-for="answer in answers" :key="answer._id">
        <b-row>
          <b-col sm="1" cols="2">
            <div v-if="answer.createdBy.name === ''">
              <img src="/static/img/avatars/profile_thumbnail.jpg" class="img-avatar" />
            </div>
            <div v-else class="header-icon-text" v-bind:style="{ background: getBgColor(answer.createdBy.email) }">
              {{ answer.createdBy.name.substring(0, 1) }}
            </div>
          </b-col>
          <b-col sm="9" cols="6">
            <a class="username-link" v-bind:href="'/profiles/' + answer.createdBy._id">
              {{ answer.createdBy.name}}
            </a>
            <span v-bind:style="{ color: getLevelColor(answer.createdBy.level) }">
              <small>{{ answer.createdBy.level }} Cherry</small>
            </span>
            <br>
            {{ $moment.utc(answer.createdAt).local().fromNow() }} / SI: {{ answer.createdBy.si}}
          </b-col>
          <b-col>
            <h3 class="likes text-right">
              <div v-if="answer.createdBy._id !== signInUserId" >
                <b-link v-on:click="likeAnswer(answer._id)"><i class="fa fa-heart" /> {{ answer.likes.length }}</b-link>
              </div>
              <div v-else>
                <i class="fa fa-heart" /> {{ answer.likes.length }}
              </div>
            </h3>
          </b-col>
        </b-row>
        <b-row class="answer-description">
          <div v-html="answer.description"></div>
        </b-row>
        <b-row class="rating">
          <b-col sm="9" cols="6">
            <div>Cherry Guard's Ratings</div>
          </b-col>
          <b-col>
            <div class="text-right">+</div>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="1" cols="2">
            <div v-if="question.createdBy.name === ''">
              <img src="/static/img/avatars/profile_thumbnail.jpg" class="img-avatar" />
            </div>
            <div v-else class="header-icon-text" v-bind:style="{ background: getBgColor(email) }">
              {{ name.substring(0, 1) }}
            </div>
          </b-col>
          <b-col>
            <b-form-textarea id="comment"
                     :rows="2"
                     :max-rows="4"
                     v-model="text"
                     @input = "$emit('input', value)">
            </b-form-textarea>
          </b-col>
        </b-row>
        <div class="float-right">
          <b-button variant="secondary" class="button-comment">Add comment</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
    <div v-if="question.createdBy._id !== signInUserId" >
      <hr>
      <h2 class="text-center">YOUR ANSWER</h2>
      <vue-editor v-model="form.description"></vue-editor>
      <div class="text-center">
        <b-button variant="success" class="button-comment" @click="createAnswer()">Post Your Answer</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'Question',
  components: {
    VueEditor
  },
  created () {
    this.name = (this.$session.get('user-name') !== undefined) ? this.$session.get('user-name') : ''
    this.email = (this.$session.get('user-email') !== undefined) ? this.$session.get('user-email') : ''
    this.fetchQuestion()
    this.fetchAnswers()
  },
  computed: {
    textTrimed () {
      return this.text.trim()
    },
    value: {
      // Computed prop used as the v-model of this component
      get () {
        return {
          text: this.text.trim()
        }
      },
      set (val) {
        this.text = val.text === this.textTrimmed ? this.text : val.text
      }
    }
  },
  data () {
    return {
      name: '',
      email: '',
      text: '',
      signInUserId: '',
      question: {
        createdBy: [''],
        likes: [],
        answers: []
      },
      answers: [],
      form: {
        description: ''
      }
    }
  },
  methods: {
    fetchQuestion () {
      this.question = {
        createdBy: [''],
        likes: [],
        answers: []
      }
      this.$http.get('/api/questions/' + this.$route.params.questionId)
        .then((response) => {
          this.question = response.data
          this.signInUserId = this.$session.get('user-id')
          // console.log(JSON.stringify(this.question))
        })
    },
    fetchAnswers () {
      this.answers = []
      this.$http.get('/api/questions/' + this.$route.params.questionId + '/answers', {
      // this.$http.get('/api/answers', {
        // params: {
        //   createdBy: this.$route.params.userId
        // }
      })
        .then((response) => {
          this.answers = response.data
        })
    },
    getBgColor (email) {
      var color = ''
      switch (email) {
        case 'test01@cj.net':
          color = '#6d0592'
          break
        case 'test02@cj.net':
          color = '#026466'
          break
        case 'test03@cj.net':
          color = '#d34836'
          break
        case 'test04@cj.net':
          color = '#ff0084'
          break
        case 'test05@cj.net':
          color = '#1769ff'
          break
        default:
          color = '#ad2552'
      }
      return color
    },
    getLevelColor (level) {
      var color = ''
      switch (level) {
        case 'Black':
          color = 'black'
          break
        case 'Red':
          color = 'red'
          break
        case 'Green':
          color = 'green'
          break
        default:
          color = 'blue'
      }
      return color
    },
    createAnswer () {
      if (this.form.description) {
        this.$http.post('/api/answers', {
          questionId: this.question._id,
          description: this.form.description
        })
          .then((response) => {
            this.form.description = ''
            this.fetchQuestion()
            this.fetchAnswers()
          })
      } else {
        alert('답변을 입력해주세요.')
      }
    },
    getMainFieldName () {
      var mainField = this.$store.state.fieldItems.find(x => x.mainFieldValue === this.question.mainField)
      return mainField ? mainField.mainFieldName : ''
    },
    getSubFieldName (value) {
      var mainField = this.$store.state.fieldItems.find(x => x.mainFieldValue === this.question.mainField)
      if (mainField) {
        var subFields = mainField.subFields
        if (subFields) {
          var subField = subFields.find(x => x.value === this.question.subField)
          return subField ? subField.text : ''
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    getAge () {
      var ageDifMs = Date.now() - new Date(this.question.createdBy.birthday).getTime()
      var ageDate = new Date(ageDifMs) // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    },
    getOccupation () {
      if (this.question.occupation) {
        return this.$store.state.occupation.find(x => x.value === this.question.occupation).text
      } else {
        return ''
      }
    },
    getFamilyType () {
      if (this.question.familyType) {
        return this.$store.state.familyType.find(x => x.value === this.question.familyType).text
      } else {
        return ''
      }
    },
    getInterest () {
      if (this.question.interest) {
        return this.$store.state.interest.find(x => x.value === this.question.interest).text
      } else {
        return ''
      }
    },
    getMonthlyIncome () {
      if (this.question.monthlyIncome) {
        return this.$store.state.monthlyIncome.find(x => x.value === this.question.monthlyIncome).text
      } else {
        return ''
      }
    },
    getAssets () {
      if (this.question.assets) {
        return this.$store.state.assets.find(x => x.value === this.question.assets).text
      } else {
        return ''
      }
    },
    likeQuestion (questionId) {
      var self = this
      var clickUserId = this.question.likes.filter(function (like) {
        return like.createdBy === self.signInUserId
      })
      if (clickUserId.length !== 0) {
        alert('이미 좋아요를 누르셨어요.')
        return
      }
      this.$http.post('/api/likes', {questionId: questionId})
        .then((response) => {
          this.fetchQuestion()
        })
    },
    likeAnswer (answerId) {
      var answer = this.answers.find(x => x._id === answerId)
      var self = this
      var clickUserId = answer.likes.filter(function (like) {
        return like.createdBy === self.signInUserId
      })
      if (clickUserId.length !== 0) {
        alert('이미 좋아요를 누르셨어요.')
        return
      }
      this.$http.post('/api/likes', {answerId: answerId})
        .then((response) => {
          this.fetchQuestion()
          this.fetchAnswers()
        })
    }
  }
}
</script>
