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
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
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
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-2 col-form-label" for="email-input">가족형태</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.familtyType">
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </select>
              </div>
              <label class="col-md-2 col-form-label" for="email-input">관심사</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.interest">
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-2 col-form-label" for="email-input">월평균소득</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.montlyIncome">
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </select>
              </div>
              <label class="col-md-2 col-form-label" for="email-input">보유자산</label>
              <div class="col-md-4">
                <select class="form-control" v-model="form.assets">
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
                <label class="col-md-2 col-form-label">소득운용현황</label>
                <div class="col-md-10 col-form-label">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" id="inline-radio1" type="radio" value="option1" name="inline-radios">
                    <label class="form-check-label" for="inline-radio1">예/적금</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" id="inline-radio2" type="radio" value="option2" name="inline-radios">
                   <label class="form-check-label" for="inline-radio2">주식</label>
                  </div>
                  <div class="form-check form-check-inline">
                   <input class="form-check-input" id="inline-radio3" type="radio" value="option3" name="inline-radios">
                   <label class="form-check-label" for="inline-radio3">펀드</label>
                  </div>
                  <div class="form-check form-check-inline">
                   <input class="form-check-input" id="inline-radio3" type="radio" value="option3" name="inline-radios">
                   <label class="form-check-label" for="inline-radio3">보험</label>
                  </div>
                  <div class="form-check form-check-inline">
                   <input class="form-check-input" id="inline-radio3" type="radio" value="option3" name="inline-radios">
                   <label class="form-check-label" for="inline-radio3">부동산</label>
                  </div>
                  <div class="form-check form-check-inline">
                   <input class="form-check-input" id="inline-radio3" type="radio" value="option3" name="inline-radios">
                   <label class="form-check-label" for="inline-radio3">기타</label>
                  </div>
                </div>
              </div>
            <div class="form-group row">
              <div class="col-md-12">
                <vue-editor v-model="form.description" placeholder="질문을 입력하세요."></vue-editor>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <vue-tags-input
                  v-model="tag"
                  :tags="tags"
                  @tags-changed="newTags => tags = newTags"
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
import { VueEditor } from 'vue2-editor'

export default {
  name: 'NewQuestion',
  components: {
    VueEditor,
    VueTagsInput
  },
  created () {
  },
  data () {
    return {
      form: {
        title: '',
        description: '',
        mainField: '1',
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
      var question = {
        title: '이더리움이??',
        description: '엄마 친구가 보험설계사라 일단 이것 저것 가입하긴 했는데 제대로 가입 한게 맞나요? 보장 내용 한번만 봐주세요.. 전문가님의 조언이 필요합니다. 제 보험 내역은 아래와 같습니다.',
        mainField: '재테크',
        subField: '보험',
        age: 31,
        gender: 'female',
        occupation: '사무직',
        familtyType: '1인가구',
        interest: '결혼자금',
        montlyIncome: '300~350',
        assets: '8000만~1억',
        incomeManagement: '8000만~1억',
        tags: [
          '30대여자',
          '1인가구',
          '사무직'
        ]
      }
      this.$http.post('/api/questions', question)
        .then((response) => {
        })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
