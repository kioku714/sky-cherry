<template>
  <div class="animated fadeIn">
    <div class="col-md-12">
      <div class="card-body">
        <form class="form-horizontal" action="" method="post" enctype="multipart/form-data">
          <div class="form-group row">
            <label class="col-md-2 col-form-label">* 분야 : </label>
            <div class="col-md-2 mb-1">
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
          <div class="row">
            <label class="col-md-12 col-form-label" for="text-input">
              <h2>Ask a question...</h2>
            </label>
          </div>
          <div class="from-group row">
            <div class="col-md-12">
              <b-form-input type="text" v-model="form.title" placeholder="제목을 입력하세요."></b-form-input>
            </div>
          </div>
          <br>
          <b-row class="form-group">
            <b-col sm="2" cols="4">
              <label class="col-form-label">성별/나이 :</label>
            </b-col>
            <b-col sm="3" cols="8">
              <label class="col-form-label">{{ "male" === profile.gender ? "남" : "여" }} / {{ $moment({}).diff($moment(profile.birthday), 'years') }}</label>
            </b-col>
            <b-col sm="2" cols="4">
              <label class="col-form-label">직업 :</label>
            </b-col>
            <b-col sm="3" cols="8">
              <b-form-select class="form-control" v-model="form.occupation" :options="$store.state.occupation" />
            </b-col>
          </b-row>
          <div class="form-group row" v-if="form.mainField === 'finance'">
            <label class="col-md-2 col-form-label">가족형태 :</label>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.familyType" :options="$store.state.familyType" />
            </div>
            <label class="col-md-2 col-form-label"></label>
            <label class="col-md-2 col-form-label">관심사 :</label>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.interest" :options="$store.state.interest" />
            </div>
          </div>
          <div class="form-group row" v-if="form.mainField === 'finance'">
            <label class="col-md-2 col-form-label">월평균소득 :</label>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.monthlyIncome" :options="$store.state.monthlyIncome" />
            </div>
            <label class="col-md-2 col-form-label"></label>
            <label class="col-md-2 col-form-label">보유자산 :</label>
            <div class="col-md-2">
              <b-form-select class="form-control" v-model="form.assets" :options="$store.state.assets" />
            </div>
          </div>
          <div class="form-group row" v-if="form.mainField === 'finance'">
              <label class="col-md-2 col-form-label">소득운용현황 :</label>
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
              <vue-editor v-model="form.description" rows="9" placeholder="질문을 입력하세요.

- 구체적으로 적어주세요. 모호한 질문을 하면 모호한 대답을 얻습니다.
- 다른 사람들과의 관련성을 높이세요. 나와 비슷하다고 생각되는 성향과 관련된 주제를 tag하면 더 많은 사람들이 확인하고 답변할 수 있습니다.
- 답변 확인 후 반드시 채택해주세요. 채택과 like을 통해 답변자에게 고마움을 표시하세요."></vue-editor>
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
              <b-button class="button-comment" variant="success" v-on:click="createQuestion" v-bind:style="{ borderRadius: '.3rem' }">Post Your Question</b-button>
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
      let loader = this.$loading.show()
      this.$http.post('/api/questions', this.form)
        .then((response) => {
          this.$router.push('/question/' + response.data._id)
        })
        .finally(() => loader.hide())
    },
    fetchProfile () {
      this.profile = []
      this.$http.get('/api/users/' + this.$session.get('user-id'))
        .then((response) => {
          this.profile = response.data

          this.form.occupation = response.data.occupation ? response.data.occupation : 'administrator'
          this.form.familyType = response.data.familyType ? response.data.familyType : 'single'
          this.form.interest = response.data.interest ? response.data.interest : 'myHouse'
          this.form.monthlyIncome = response.data.monthlyIncome ? response.data.monthlyIncome : 'under100'
          this.form.assets = response.data.assets ? response.data.assets : 'under1000'
          this.form.incomeManagement = response.data.incomeManagement ? response.data.incomeManagement : 'saving'
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
