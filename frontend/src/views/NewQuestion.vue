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
                  <option v-for="option in fieldItems" v-bind:value="option.mainFieldValue" :key="option.mainFieldValue">
                    {{ option.mainFieldName }}
                  </option>
                </select>
              </div>
              <div class="col-md-5">
                <select class="form-control" v-model="form.subField">
                  <option v-for="option in getSubFieldItems(form.mainField)" v-bind:value="option.value" :key="option.value">
                    {{ option.text }}
                  </option>
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
                  <option value="administrator">관리자</option>
                  <option value="expert">전문가 및 관련</option>
                  <option value="office">사무</option>
                  <option value="service">서비스</option>
                  <option value="sale">판매</option>
                  <option value="ceo">농림어업</option>
                  <option value="ceo">기능원 및 관련</option>
                  <option value="engineer">장치 기계조작 및 조립</option>
                  <option value="student">학생</option>
                  <option value="soldier">전, 현직 군인</option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="form.mainField === 'finance'">
              <label class="col-md-2 col-form-label" for="email-input">가족형태</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.familtyType">
                  <option value="familtyType1">미혼-1인가구</option>
                  <option value="familtyType2">미혼-가족과 거주</option>
                  <option value="familtyType3">미혼-기타형태 거주</option>
                  <option value="familtyType4">기혼-무자녀</option>
                  <option value="familtyType5">기혼-1자녀</option>
                  <option value="familtyType6">기혼-2자녀</option>
                  <option value="familtyType7">기혼-3자녀 이상</option>
                </select>
              </div>
              <label class="col-md-2 col-form-label" for="email-input">관심사</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.interest">
                  <option value="interest1">내집마련</option>
                  <option value="interest2">결혼자금</option>
                  <option value="interest3">목돈모으기</option>
                  <option value="interest4">자기계발</option>
                  <option value="interest5">건물구입</option>
                  <option value="interest6">해외금융</option>
                  <option value="interest7">주식투자</option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="form.mainField === 'finance'">
              <label class="col-md-2 col-form-label" for="email-input">월평균소득</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.montlyIncome">
                  <option value="montlyIncome1">100 이하</option>
                  <option value="montlyIncome2">100~150</option>
                  <option value="montlyIncome3">150~200</option>
                  <option value="montlyIncome4">200~250</option>
                  <option value="montlyIncome5">250~300</option>
                  <option value="montlyIncome6">300~350</option>
                  <option value="montlyIncome7">350~400</option>
                  <option value="montlyIncome8">400~500</option>
                  <option value="montlyIncome9">500~600</option>
                  <option value="montlyIncome10">600 이상</option>
                </select>
              </div>
              <label class="col-md-2 col-form-label" for="email-input">보유자산</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.assets">
                  <option value="assets1">1000 이하</option>
                  <option value="assets2">1000~3000</option>
                  <option value="assets3">3000~5000</option>
                  <option value="assets4">5000~8000</option>
                  <option value="assets5">8000~1억</option>
                  <option value="assets6">1억~3억</option>
                  <option value="assets7">3억~5억</option>
                  <option value="assets8">5억 이상</option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="form.mainField === 'finance'">
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
        mainField: 'beauty',
        subField: '',
        age: 31,
        gender: 'female',
        occupation: '',
        familtyType: '',
        interest: '',
        montlyIncome: '',
        assets: '',
        incomeManagement: 'deposit',
        tags: []
      },
      tag: '',
      tags: [],
      fieldItems: [
        {
          mainFieldValue: 'beauty',
          mainFieldName: '뷰티',
          subFields: [
            {text: '스킨케어', value: 'skincare'},
            {text: '메이크업', value: 'makeup'},
            {text: '바디/헤어/향수', value: 'bodycare'},
            {text: '다이어트/운동', value: 'diet'},
            {text: '다이어트/운동', value: 'innerbeauty'}
          ]
        },
        {
          mainFieldValue: 'food',
          mainFieldName: '푸드',
          subFields: [
            {text: '브런치/카페', value: 'cafe'},
            {text: '맛집', value: 'restaurant'},
            {text: '술집', value: 'bar'}
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
            {text: '스포츠', value: 'sports'}
          ]
        },
        {
          mainFieldValue: 'finance',
          mainFieldName: '금융',
          subFields: [
            {text: '예/적금', value: 'deposit'},
            {text: '펀드', value: 'fund'},
            {text: '주식', value: 'stock'},
            {text: '보험', value: 'insurance'},
            {text: '부동산', value: 'realty'},
            {text: '기타', value: 'etc'}
          ]
        },
        {
          mainFieldValue: 'lifestyle',
          mainFieldName: '라이프스타일',
          subFields: [
            {text: '패션/잡화', value: 'fashion'},
            {text: '디지털', value: 'digital'},
            {text: '리빙', value: 'living'}
          ]
        }
      ]
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
      obj.tag.style = 'font-size: 12px; color: #3c4859; background-color: transparent; border: solid 1px #8894a5; border-radius: .5rem;'
      obj.addTag()
    },
    getSubFieldItems (mainField) {
      return this.fieldItems.find(x => x.mainFieldValue === mainField).subFields
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
