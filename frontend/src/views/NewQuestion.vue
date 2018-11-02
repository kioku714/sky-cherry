<template>
  <div class="animated fadeIn">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h1>질문 등록</h1>
        </div>
        <div class="card-body">
          <form class="form-horizontal" action="" method="post" enctype="multipart/form-data">
            <div class="form-group row">
              <label class="col-md-2 col-form-label">분야 : </label>
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
              <label class="col-md-12 col-form-label" for="text-input"><strong>Ask a question...</strong></label>
            </div>
            <div class="from-group row">
              <div class="col-md-12">
                <b-form-input type="text" v-model="form.title" placeholder="제목을 입력하세요."></b-form-input>
              </div>
            </div>
            <br>
            <div class="form-group row">
              <label class="col-md-2 col-form-label">성별/나이</label>
              <label class="col-md-2 col-form-label">{{ "male" === profile.gender ? "남" : "여"}} / {{ profile.age }}</label>
              <label class="col-md-2 col-form-label"></label>
              <label class="col-md-2 col-form-label">직업</label>
              <div class="col-md-2">
                <b-form-select class="form-control" v-model="form.occupation" :options="$store.state.occupation" />
              </div>
            </div>
            <div class="form-group row" v-if="form.mainField === 'finance'">
              <label class="col-md-2 col-form-label">가족형태</label>
              <div class="col-md-2">
                <b-form-select class="form-control" v-model="form.familyType" :options="$store.state.famailyType" />
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
                    plain
                    :options="$store.state.incomeManagement"
                    checked="deposit"
                    v-model="form.incomeManagement" @change="form.incomeManagement = ''">
                  </b-form-radio-group>
                </div>
              </div>
            <div class="form-group row">
              <div class="col-md-12">
                <textarea class="form-control" v-model="form.description" rows="9" placeholder="질문을 입력하세요."></textarea>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <vue-tags-input
                  v-model="tag"
                  :tags="tags"
                  @tags-changed="newTags => tags = newTags"
                  @before-adding-tag="addTagStyle"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="card-footer text-sm-right">
          <button class="btn btn-sm btn-primary" type="submit" v-on:click="createQuestion">
            Post Your Question
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  name: 'NewQuestion',
  components: {
    VueTagsInput
  },
  created () {
  },
  data () {
    return {
      profile: {},
      form: {
        title: '',
        description: '',
        mainField: 'style',
        subField: '',
        age: 31,
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
        })
    },
    fetchProfile () {
      this.profile = []
      this.$http.get('/api/users/' + this.$route.params.userId)
        .then((response) => {
          this.profile = response.data

          this.form.occupation = response.data.occupation
          this.form.familyType = response.data.familyType
          this.form.interest = response.data.interest
          this.form.monthlyIncome = response.data.monthlyIncome
          this.form.assets = response.data.assets
          this.form.incomeManagement = response.data.incomeManagement
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
      return this.$store.state.fieldItems.find(x => x.mainFieldValue === mainField).subFields
    }
  }
}
</script>
