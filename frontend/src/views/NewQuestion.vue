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
              <div class="col-md-5">
                <select class="form-control" v-model="form.mainField">
                  <option value="1">Option #1</option>
                  <option value="financialTechnology">제테크</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </select>
              </div>
              <div class="col-md-5">
                <select class="form-control" v-model="form.subField">
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </select>
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
              <label class="col-md-2 col-form-label" for="email-input">성별/나이</label>
              <label class="col-md-4 col-form-label" for="email-input">{{ "male" === form.gender ? "남" : "여"}} / {{ form.age }}</label>
              <label class="col-md-2 col-form-label" for="email-input">직업</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.occupation">
                  <option value="officer">사무직</option>
                  <option value="ceo">사장님</option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="form.mainField === 'financialTechnology'">
              <label class="col-md-2 col-form-label" for="email-input">가족형태</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.familtyType">
                  <option value="familtyType1">1인가구</option>
                  <option value="familtyType2">2인가구</option>
                  <option value="familtyType3">3인가구</option>
                  <option value="familtyType4">4인가구</option>
                  <option value="familtyType5">5인가구</option>
                  <option value="familtyType6">6인가구</option>
                  <option value="familtyType7">7인가구</option>
                </select>
              </div>
              <label class="col-md-2 col-form-label" for="email-input">관심사</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.interest">
                  <option value="interest1">결혼자금</option>
                  <option value="interest2">Option #1</option>
                  <option value="interest3">Option #2</option>
                  <option value="interest4">Option #3</option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="form.mainField === 'financialTechnology'">
              <label class="col-md-2 col-form-label" for="email-input">월평균소득</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.montlyIncome">
                  <option value="montlyIncome1">~150</option>
                  <option value="montlyIncome2">150~200</option>
                  <option value="montlyIncome3">200~250</option>
                  <option value="montlyIncome4">250~300</option>
                  <option value="montlyIncome5">300~350</option>
                  <option value="montlyIncome6">350~400</option>
                  <option value="montlyIncome7">300~350</option>
                  <option value="montlyIncome8">350~</option>
                </select>
              </div>
              <label class="col-md-2 col-form-label" for="email-input">보유자산</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.assets">
                  <option value="assets1">~1000만</option>
                  <option value="assets2">5000만</option>
                  <option value="assets3">8000만~1억</option>
                  <option value="assets4">1억~</option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="form.mainField === 'financialTechnology'">
                <label class="col-md-2 col-form-label">소득운용현황</label>
                <div class="col-md-10 col-form-label">
                  <b-form-radio-group
                    plain
                    :options="[
                      {text: '예/적금 ',value: 'deposit'},
                      {text: '주식 ',value: 'stock'},
                      {text: '펀드 ',value: 'fund'},
                      {text: '보험 ',value: 'insurance'},
                      {text: '부동산 ',value: 'realty'},
                      {text: '기타 ',value: 'etc'}
                    ]"
                    checked="1"
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
            <i class="fa fa-dot-circle-o"></i> 등록
          </button>
          <button class="btn btn-sm btn-danger" type="reset" v-on:click="cancel">
            <i class="fa fa-ban"></i> 취소
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
      form: {
        title: '',
        description: '',
        mainField: 'financialTechnology',
        subField: '',
        age: 31,
        gender: 'female',
        occupation: '',
        familtyType: '',
        interest: '',
        montlyIncome: '',
        assets: '',
        incomeManagement: '',
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
    getTags () {
      return this.tags.map(x => x.text)
    },
    addTagStyle (obj) {
      obj.tag.style='font-size: 12px; color: #3c4859; background-color: transparent; border: solid 1px #8894a5; border-radius: .5rem;'
      obj.addTag()
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
