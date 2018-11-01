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
                <select class="form-control" v-model="form.mainField">
                  <option v-for="option in fieldItems" v-bind:value="option.mainFieldValue" :key="option.mainFieldValue">
                    {{ option.mainFieldName }}
                  </option>
                </select>
              </div>
              <div class="col-md-2">
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
              <label class="col-md-2 col-form-label">성별/나이</label>
              <label class="col-md-2 col-form-label">{{ "male" === form.gender ? "남" : "여"}} / {{ form.age }}</label>
              <label class="col-md-2 col-form-label"></label>
              <label class="col-md-2 col-form-label">직업</label>
              <div class="col-md-2">
                <select class="form-control" v-model="form.occupation">
                  <option value="administrator">관리자</option>
                  <option value="expert">전문가 및 관련</option>
                  <option value="office">사무</option>
                  <option value="service">서비스</option>
                  <option value="sale">판매</option>
                  <option value="agriculture">농림어업</option>
                  <option value="technician">기능원 및 관련</option>
                  <option value="engineer">장치 기계조작 및 조립</option>
                  <option value="student">학생</option>
                  <option value="soldier">전, 현직 군인</option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="form.mainField === 'finance'">
              <label class="col-md-2 col-form-label">가족형태</label>
              <div class="col-md-2">
                <select class="form-control" v-model="form.familyType">
                  <option value="single">미혼-1인가구</option>
                  <option value="family">미혼-가족과 거주</option>
                  <option value="others">미혼-기타형태 거주</option>
                  <option value="noChild">기혼-무자녀</option>
                  <option value="oneChild">기혼-1자녀</option>
                  <option value="twoChild">기혼-2자녀</option>
                  <option value="manyChild">기혼-3자녀 이상</option>
                </select>
              </div>
              <label class="col-md-2 col-form-label"></label>
              <label class="col-md-2 col-form-label">관심사</label>
              <div class="col-md-2">
                <select class="form-control" v-model="form.interest">
                  <option value="myHouse">내집마련</option>
                  <option value="weddingMoney">결혼자금</option>
                  <option value="savingMoney">목돈모으기</option>
                  <option value="selfImprovement">자기계발</option>
                  <option value="buildingPurchase">건물구입</option>
                  <option value="overseasFinancial">해외금융</option>
                  <option value="stockInvestment">주식투자</option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="form.mainField === 'finance'">
              <label class="col-md-2 col-form-label">월평균소득</label>
              <div class="col-md-2">
                <select class="form-control" v-model="form.montlyIncome">
                  <option value="under100">100 이하</option>
                  <option value="100To150">100~150</option>
                  <option value="150To200">150~200</option>
                  <option value="200To250">200~250</option>
                  <option value="250To300">250~300</option>
                  <option value="300To350">300~350</option>
                  <option value="350To400">350~400</option>
                  <option value="400To500">400~500</option>
                  <option value="500To600">500~600</option>
                  <option value="over600">600 이상</option>
                </select>
              </div>
              <label class="col-md-2 col-form-label"></label>
              <label class="col-md-2 col-form-label">보유자산</label>
              <div class="col-md-2">
                <select class="form-control" v-model="form.assets">
                  <option value="under1000">1000 이하</option>
                  <option value="1000to3000">1000~3000</option>
                  <option value="3000to5000">3000~5000</option>
                  <option value="5000to8000">5000~8000</option>
                  <option value="8000to1bil">8000~1억</option>
                  <option value="1bilto3bil">1억~3억</option>
                  <option value="3bilto5bil">3억~5억</option>
                  <option value="over5bil">5억 이상</option>
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
      form: {
        title: '',
        description: '',
        mainField: 'style',
        subField: '',
        createdBy: this.$session.get('user-id'),
        age: 31,
        gender: 'female',
        occupation: '',
        familyType: '',
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
    }
  }
}
</script>
