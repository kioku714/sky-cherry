<template>
  <div class="animated fadeIn question">
    <div>
      <b-row>
        <b-col sm="1" cols="2">
          <img src="/static/img/avatars/profile_thumbnail.jpg" class="img-avatar" />
        </b-col>
        <b-col>
          <a class="username-link" v-bind:href="'/profiles/' + question.createdBy[0]._id">
            {{ question.createdBy[0].name }}
          </a>
          <small>{{ question.createdBy[0].level }} Cherry</small>
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
        <h1>{{ question.title }}</h1>
      </b-col>
      <b-col>
        <h1 class="likes text-right">
          <div v-if="question.createdBy[0]._id !== signInUserId" >
            <b-link v-on:click="clickedLike(question._id, question.createdBy[0]._id)">♥ {{ question.likes.length }}</b-link>
          </div>
          <div v-else>
            ♥ {{ question.likes.length }}
          </div>
        </h1>
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
          <label>{{ "male" === question.createdBy[0].gender ? "남" : "여"}}/{{ getAge() }}</label>
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
          <b-form-group label="소득운용현황: ">
            <b-form-radio-group v-model="question.incomeManagement" :options="$store.state.incomeManagement">
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
    <h1 class="text-center">{{ question.answers.length }} ANSWERS</h1>
    <b-list-group v-if="question.answers.length > 0" flush>
      <b-list-group-item v-for="answer in question.answers" :key="answer._id">
        <b-row>
          <b-col sm="1" cols="2">
            <img src="/static/img/avatars/profile_thumbnail.jpg" class="img-avatar" />
          </b-col>
          <b-col sm="9" cols="6">
            <a class="username-link" v-bind:href="'/profiles/' + answer.createdBy._id">
              {{ answer.createdBy.name}}
            </a>
            <small>{{ answer.createdBy.level }} Cherry</small>
            <br>
            {{ $moment.utc(answer.createdAt).local().fromNow() }} / SI: {{ answer.createdBy.si}}
          </b-col>
          <b-col>
            <h1 class="likes text-right">
              <div v-if="answer.createdBy._id !== signInUserId" >
                <b-link v-on:click="clickedLike(answer._id, answer.createdBy._id)">♥ {{ answer.likes.length }}</b-link>
              </div>
              <div v-else>
                ♥ {{ answer.likes.length }}
              </div>
            </h1>
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
            <img src="/static/img/avatars/profile_thumbnail.jpg" class="img-avatar" />
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
    <div v-if="question.createdBy[0]._id !== signInUserId" >
      <hr>
      <h1 class="text-center">YOUR ANSWER</h1>
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
    this.fetchQuestion()
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
      text: '',
      signInUserId: '',
      question: {
        createdBy: [''],
        likes: [],
        answers: []
      },
      form: {
        description: '',
        createdBy: '',
        question: '',
        questionOrAnswer: '',
        questionOrAnswerCreatedBy: ''
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
          this.form.createdBy = this.$session.get('user-id')
          this.form.question = this.question._id
          // console.log(JSON.stringify(this.form))
        })
    },
    createAnswer () {
      if (this.form.description) {
        this.$http.post('/api/answers', this.form)
          .then((response) => {
            this.form.description = ''
            this.fetchQuestion()
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
      var ageDifMs = Date.now() - new Date(this.question.createdBy[0].birthday).getTime()
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
    clickedLike (questionOrAnswerId, questionOrAnswerCreatedBy) {
      this.form.questionOrAnswer = questionOrAnswerId
      this.form.questionOrAnswerCreatedBy = questionOrAnswerCreatedBy
      this.$http.post('/api/likes', this.form)
        .then((response) => {
          this.fetchQuestion()
        })
    }
  }
}
</script>
