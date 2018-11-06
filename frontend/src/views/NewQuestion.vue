<template>
  <div class="animated fadeIn">
    <div class="col-md-12">
      <div class="card-body">
        <form class="form-horizontal" action="" method="post" enctype="multipart/form-data">
          <div class="form-group row">
            <label class="col-md-2 col-form-label">* 분야 : </label>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.mainField">
                <option v-for="option in $store.state.fieldItems" v-bind:value="option.mainFieldValue" :key="option.mainFieldValue">
                  {{ option.mainFieldName }}
                </option>
              </b-form-select>
            </div>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.subField">
                <option v-for="option in getSubFieldItems(form.mainField)" v-bind:value="option.value" :key="option.value">
                  {{ option.text }}
                </option>
              </b-form-select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-12 col-form-label" for="text-input"><h1>Ask a question...</h1></label>
          </div>
          <div class="from-group row">
            <div class="col-md-12">
              <b-form-input type="text" v-model="form.title" placeholder="제목을 입력하세요."></b-form-input>
            </div>
          </div>
          <br>
          <div class="form-group row">
            <label class="col-md-2 col-form-label">성별/나이</label>
            <label class="col-md-2 col-form-label">{{ "male" === profile.gender ? "남" : "여" }} / {{ form.age }}</label>
            <label class="col-md-2 col-form-label"></label>
            <label class="col-md-2 col-form-label">직업</label>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.occupation" :options="$store.state.occupation" />
            </div>
          </div>
          <div class="form-group row" v-if="form.mainField === 'finance'">
            <label class="col-md-2 col-form-label">가족형태</label>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.familyType" :options="$store.state.familyType" />
            </div>
            <label class="col-md-2 col-form-label"></label>
            <label class="col-md-2 col-form-label">관심사</label>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.interest" :options="$store.state.interest" />
            </div>
          </div>
          <div class="form-group row" v-if="form.mainField === 'finance'">
            <label class="col-md-2 col-form-label">월평균소득</label>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.monthlyIncome" :options="$store.state.monthlyIncome" />
            </div>
            <label class="col-md-2 col-form-label"></label>
            <label class="col-md-2 col-form-label">보유자산</label>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.assets" :options="$store.state.assets" />
            </div>
          </div>
          <div class="form-group row" v-if="form.mainField === 'finance'">
              <label class="col-md-2 col-form-label">소득운용현황</label>
              <div class="col-md-10 col-form-label">
                <b-form-radio-group
                  :options="$store.state.incomeManagement"
                  checked="deposit"
                  v-model="form.incomeManagement" @change="form.incomeManagement = ''">
                </b-form-radio-group>
              </div>
            </div>
          <div class="form-group row">
            <div class="col-md-12">
              <vue-editor v-model="form.description" rows="9" placeholder="질문을 입력하세요."></vue-editor>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-12">
              <vue-tags-input
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"
                @before-adding-tag="addTagStyle"
                style="max-width: 100%;"
              />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-12 text-center">
              <b-button class="button-comment" variant="success" v-on:click="createQuestion">Post Your Question</b-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import { VueEditor } from 'vue2-editor'

export default {
  name: 'NewQuestion',
  components: {
    VueTagsInput,
    VueEditor
  },
  created () {
    this.fetchProfile()
    this.fetchTokens()
  },
  data () {
    return {
      profile: {},
      form: {
        title: '',
        description: '',
        mainField: 'style',
        subField: '',
        age: 0,
        gender: 'female',
        occupation: '',
        familyType: '',
        interest: '',
        monthlyIncome: '',
        assets: '',
        incomeManagement: 'deposit',
        tags: []
      },
      tag: '',
      tags: []
    }
  },
  methods: {
    createQuestion () {
      this.form.tags = this.getTags()
      this.$http.post('/api/questions', this.form)
        .then((response) => {
          this.$router.push('/question/' + response.data._id)
        })
    },
    fetchProfile () {
      this.profile = []
      this.$http.get('/api/users/' + this.$session.get('user-id'))
        .then((response) => {
          this.profile = response.data

          this.form.age = this.getAge()
          this.form.occupation = response.data.occupation
          this.form.familyType = response.data.familyType
          this.form.interest = response.data.interest
          this.form.monthlyIncome = response.data.monthlyIncome
          this.form.assets = response.data.assets
          this.form.incomeManagement = response.data.incomeManagement
        })
    },
    fetchTokens () {
      this.$http.get('/api/users/' + this.$session.get('user-id') + '/tokens')
        .then((response) => {
          if (response.data.tokens < 4) {
            alert('Cherry가 부족합니다. (Cherry : ' + response.data.tokens + ')')
            this.$router.go(-1)
          }
        })
    },
    getTags () {
      return this.tags.map(x => x.text)
    },
    getAge () {
      var ageDifMs = Date.now() - new Date(this.profile.birthday).getTime()
      var ageDate = new Date(ageDifMs) // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    },
    addTagStyle (obj) {
      obj.tag.style = 'font-size: 12px; color: #3c4859; background-color: transparent; border: solid 1px #8894a5; border-radius: .5rem;'
      obj.addTag()
    },
    getSubFieldItems (mainField) {
      var subFields = this.$store.state.fieldItems.find(x => x.mainFieldValue === mainField).subFields
      this.form.subField = subFields[0].value
      return subFields
    }
  }
}
</script>
