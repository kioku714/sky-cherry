<template>
  <div class="animated fadeIn question">
    <div>
      <b-row>
        <b-col sm="1" cols="2">
          <img src="/static/img/avatars/profile_thumbnail.jpg" class="img-avatar" />
        </b-col>
        <b-col>
          <a class="question-username-link" v-bind:href="'/profile/' + question._id">{{ question.createdBy[0].name }}</a>
          <small>{{ question.createdBy[0].level }} Cherry</small>
          <br>
          {{ $moment.utc(question.createdAt).local().fromNow() }}
        </b-col>
      </b-row>
    </div>
    <div class="field">
      ► {{ getMainFieldName() }} / {{ getSubFieldName() }}
    </div>
    <b-row>
      <b-col sm="10" cols="9">
        <h1>{{ question.title }}</h1>
      </b-col>
      <b-col>
        <h1 class="likes text-right">♥ {{ question.likes.length }}</h1>
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
    <div>
      {{ question.description }}
    </div>
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
            <a class="question-username-link" v-bind:href="'/profile/' + answer._id">{{ answer.createdBy.name }}</a>
            <small>{{ answer.createdBy.level }} Cherry</small>
            <br>
            {{ $moment.utc(answer.createdAt).local().fromNow() }} / SI: {{ answer.createdBy.si}}
          </b-col>
          <b-col>
            <h1 class="likes text-right">♥ {{ answer.likes.length }}</h1>
          </b-col>
        </b-row>
        <b-row class="answer-description">
          {{ answer.description }}
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
                     placeholder=""
                     :rows="2"
                     :max-rows="6">
            </b-form-textarea>
          </b-col>
        </b-row>
        <div class="float-right">
          <b-button variant="secondary" class="button-comment">Add comment</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
    <hr>
    <h1 class="text-center">YOUR ANSWER</h1>
    <vue-editor v-model="form.description"></vue-editor>
    <div class="text-center">
      <b-button variant="success" class="button-comment" @click="createAnswer()">Post Your Answer</b-button>
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
  data () {
    return {
      question: {},
      form: {
        description: '',
        createBy: this.$session.get('user-id'),
        question: ''
      },
      fieldItems: [
        {
          mainFieldValue: 'style',
          mainFieldName: '스타일',
          subFields: [
            {text: '패션/잡화', value: 'fashion'},
            {text: '메이크업/헤어', value: 'makeup'},
            {text: '스킨/바디', value: 'skin'}
          ]
        },
        {
          mainFieldValue: 'place',
          mainFieldName: '플레이스',
          subFields: [
            {text: '맛집', value: 'restaurant'},
            {text: '카페', value: 'cafe'},
            {text: '지역', value: 'area'},
            {text: '여행', value: 'travel'}
          ]
        },
        {
          mainFieldValue: 'culture',
          mainFieldName: '컬쳐',
          subFields: [
            {text: '영화/TV', value: 'movie'},
            {text: '음악', value: 'music'},
            {text: '도서', value: 'books'},
            {text: '공연', value: 'show'},
            {text: '스포츠/게임', value: 'sports'}
          ]
        },
        {
          mainFieldValue: 'finance',
          mainFieldName: '금융',
          subFields: [
            {text: '재태크', value: 'financialTechnology'},
            {text: '금융상품', value: 'financialProducts'},
            {text: '세금', value: 'tax'},
            {text: '부동산', value: 'realty'},
            {text: '용돈관리', value: 'pocketMoney'}
          ]
        },
        {
          mainFieldValue: 'life',
          mainFieldName: '라이프',
          subFields: [
            {text: '일상/취미', value: 'hobby'},
            {text: '리빙/인테리어', value: 'living'},
            {text: '건강', value: 'health'},
            {text: '기타', value: 'etc'}
          ]
        }
      ]
    }
  },
  methods: {
    fetchQuestion () {
      this.$http.get('/api/questions/' + this.$route.params.questionId)
        .then((response) => {
          this.question = response.data
          this.form.question = this.question._id
          console.log(JSON.stringify(this.question))
        })
    },
    createAnswer () {

    },
    getMainFieldName () {
      return this.fieldItems.find(x => x.mainFieldValue === this.question.mainField).mainFieldName
    },
    getSubFieldName (value) {
      var subFileds = this.fieldItems.find(x => x.mainFieldValue === this.question.mainField).subFields
      return subFileds.find(x => x.value === this.question.subField).text
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
    }
  }
}
</script>
