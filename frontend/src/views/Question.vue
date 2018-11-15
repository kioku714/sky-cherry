<template>
  <div class="animated fadeIn question">
    <div>
      <b-row>
        <b-col sm="1" cols="2">
          <div v-if="question.createdBy.name === ''">
            <img src="/static/img/avatars/profile_thumbnail.jpg" class="img-avatar" />
          </div>
          <div v-else class="header-icon-text" v-bind:style="{ background: getBgColor(question.createdBy.email) }">
              {{ questionUserName }}
          </div>
        </b-col>
        <b-col>
          <a v-bind:style="{color: '#30CE92', fontWeight: 'bold'}" v-bind:href="'/profiles/' + question.createdBy._id">
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
    <div class="my-2" v-bind:style="{color: '#0170ba'}">
      ► {{ getMainFieldName() }} | {{ getSubFieldName() }}
    </div>
    <b-row>
      <b-col sm="10" cols="9">
        <h4>{{ question.title }}</h4>
      </b-col>
      <b-col>
        <h4 class="like text-right">
          <div v-if="question.createdBy._id !== signInUserId" >
            <b-link v-on:click="likeQuestion(question._id)"><i class="fa fa-heart" /> {{ question.likes.length }}</b-link>
          </div>
          <div v-else>
            <i class="fa fa-heart" /> {{ question.likes.length }}
          </div>
        </h4>
      </b-col>
    </b-row>
    <hr>
    <div class="mb-2" v-bind:style="{color: '#ad2552', fontSize: '18px', fontWeight: 'bold'}">Profile</div>
    <b-row>
      <b-col sm="2" cols="6">
        <label>성별/나이:</label>
      </b-col>
      <b-col sm="3" cols="6">
        <label>{{ "male" === question.createdBy.gender ? "남" : "여"}}/{{ $moment({}).diff($moment(question.createdBy.birthday), 'years') }}</label>
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
    <hr>
    <div v-html="question.description"></div>
    <div class="mb-3">
      <div class="question-tag" v-for="tag in question.tags" :key="tag">
        {{ tag }}
      </div>
    </div>
    <div>
    </div>
    <hr>
    <h2 v-if="answers.length > 0" class="text-center mb-3">{{ answers.length }} Answers</h2>
    <b-list-group v-if="answers.length > 0" flush>
      <b-list-group-item v-for="answer in answers" :key="answer._id" v-bind:style="{ background: '#FEFBF4' }">
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
            <a v-bind:style="{color: '#30CE92', fontWeight: 'bold'}" v-bind:href="'/profiles/' + answer.createdBy._id">
              {{ answer.createdBy.name}}
            </a>
            <span v-bind:style="{ color: getLevelColor(answer.createdBy.level) }">
              <small>{{ answer.createdBy.level }} Cherry</small>
            </span>
            <br>
            {{ $moment.utc(answer.createdAt).local().fromNow() }} / SI: {{ answer.createdBy.si}}
          </b-col>
          <b-col>
            <h4 class="like text-right">
              <div v-if="answer.createdBy._id !== signInUserId" >
                <b-link v-on:click="likeAnswer(answer._id)"><i class="fa fa-heart" /> {{ answer.likes.length }}</b-link>
              </div>
              <div v-else>
                <i class="fa fa-heart" /> {{ answer.likes.length }}
              </div>
            </h4>
          </b-col>
        </b-row>
        <b-row class="mt-3 mx-3">
          <div v-html="answer.description"></div>
        </b-row>
        <hr v-bind:style="{ borderColor: '#efefef' }">
        <b-row>
          <b-col sm="9" cols="9">
            <div class="mt-1">
              <span class="font-weight-bold" v-bind:style="{color: '#4c3926'}">Cherry Guard's Ratings</span>
              <span v-bind:style="{color: '#0170ba'}">(Average: <i class="fa fa-star" /> {{ getRandomNum() }})</span>
            </div>
          </b-col>
          <b-col>
            <div class="text-right">
              <b-btn v-b-toggle="answer._id" v-bind:style="{backgroundColor: 'transparent', borderColor: 'transparent'}">
                <i class="when-opened fa fa-times"/>
                <i class="when-closed fa fa-plus"/>
              </b-btn>
            </div>
          </b-col>
        </b-row>
        <b-collapse :id=answer._id class="mt-2">
          <b-row>
            <b-col sm="3">
              • 올바른 정보만을 이야기 하는가?
            </b-col>
            <b-col>
              <star-rating inactive-color="#F9D6E2"
                           active-color="#E16D90"
                           :star-size="20"
                           :show-rating="false"
                           :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]">
              </star-rating>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              • 의도적인 홍보성 답변은 아닌가?
            </b-col>
            <b-col>
              <star-rating inactive-color="#F9D6E2"
                           active-color="#E16D90"
                           :star-size="20"
                           :show-rating="false"
                           :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]">
              </star-rating>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              • 질문에 맞는 답변인가?
            </b-col>
            <b-col>
              <star-rating inactive-color="#F9D6E2"
                           active-color="#E16D90"
                           :star-size="20"
                           :show-rating="false"
                           :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]">
              </star-rating>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              • 다른 답변을 모방하지 않았는가?
            </b-col>
            <b-col>
              <star-rating inactive-color="#F9D6E2"
                           active-color="#E16D90"
                           :star-size="20"
                           :show-rating="false"
                           :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]">
              </star-rating>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              • 실용적인 답변으로 보여지는가?
            </b-col>
            <b-col>
              <star-rating inactive-color="#F9D6E2"
                           active-color="#E16D90"
                           :star-size="20"
                           :show-rating="false"
                           :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]">
              </star-rating>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" class="my-2">
              <small class="text-muted">아직 평가에 참여하지 않으셨습니다.</small>
            </b-col>
            <b-col class="mt-1">
              <b-button variant="secondary" v-bind:style="{ border: 'none', borderRadius: '.3rem', fontSize: '12px', backgroundColor: '#D8D8D8' }">submit score</b-button>
            </b-col>
          </b-row>
        </b-collapse>
        <hr v-bind:style="{ borderColor: '#efefef' }">
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
          <b-button variant="secondary" class="mt-2" v-bind:style="{ border: 'none', borderRadius: '.3rem', backgroundColor: '#D8D8D8' }">Add comment</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
    <div v-if="question.createdBy._id !== signInUserId" >
      <h2 class="text-center my-3">Your Answer</h2>
      <vue-editor v-model="form.description" v-bind:style="{ background: 'white' }"></vue-editor>
      <div class="text-center">
        <b-button variant="success" @click="createAnswer()" class="mt-3" v-bind:style="{ borderRadius: '.3rem' }">Post Your Answer</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import StarRating from 'vue-star-rating'

export default {
  name: 'Question',
  components: {
    VueEditor,
    StarRating
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
      questionUserName: '',
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
          this.questionUserName = (this.question.createdBy.name !== '') ? this.question.createdBy.name.substring(0, 1) : ''
          this.signInUserId = this.$session.get('user-id')
          // console.log(JSON.stringify(this.question))
        })
    },
    fetchAnswers () {
      this.answers = []
      this.$http.get('/api/questions/' + this.$route.params.questionId + '/answers')
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
        let loader = this.$loading.show()
        this.$http.post('/api/answers', {
          questionId: this.question._id,
          description: this.form.description
        })
          .then((response) => {
            this.form.description = ''
            this.fetchQuestion()
            this.fetchAnswers()
            loader.hide()
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
      let loader = this.$loading.show()
      this.$http.post('/api/likes', {questionId: questionId})
        .then((response) => {
          this.fetchQuestion()
          loader.hide()
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
      let loader = this.$loading.show()
      this.$http.post('/api/likes', {answerId: answerId})
        .then((response) => {
          this.fetchQuestion()
          this.fetchAnswers()
          loader.hide()
        })
    },
    getRandomNum () {
      // 3 ~ 5 사이의 랜덤 소수
      const num = Math.random() * (5 - 2) + 2
      return num.toFixed(2)
    }
  }
}
</script>
