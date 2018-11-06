<template>
  <div class="animated fadeIn">
      <b-row>
        <b-col sm="2">
          <div>
            <b-img center rounded="circle" blank fluid width="175" height="175" blank-color="#777" alt="img" class="m-1" />
            <p class="text-center"><strong>{{ profile.name }}</strong></p>
          </div>
          <div>
            <p class="text-center">LV 1 / SI : <strong>{{ profile.si }}</strong></p>
            <p class="text-center">Cherry : <strong>{{ tokens }}</strong></p>
            <p class="text-center">Questions : <strong>{{ questions.length }}</strong></p>
            <p class="text-center">Answers : <strong>{{ answers.length }}</strong></p>
            <p class="text-center">Likes : <strong>{{ likes.length }}</strong></p>
            <p class="text-center">Comments : <strong>{{ comments.length }}</strong></p>
          </div>
          <br/>
          <div class="text-center">
            <b-button variant="success" :to="{name: 'Cherry Transfer'}">Cherry Transfer</b-button>
          </div>
        </b-col>
        <b-col sm="10">
          <b-tabs>
            <b-tab title="CJONE" active>
              <h4 class="text-center transfer-title">TRANSFER GATEWAY</h4>
              <div class="col-sm-6 transfer-content">
                <b-row class="text-center">
                  <b-col sm="4" cols="4">
                    <div><img src="/static/img/logo-symbol.png" class="trasfer-cherry"></div>
                    <div class="transfer-text">{{ tokens }} CHERRY</div>
                    <div><b-form-input type="text" class="transfer-input"></b-form-input></div>
                  </b-col>
                  <b-col sm="4" cols="4">
                    <div><img src="/static/img/arrow.png" class="trasfer-arrow"></div>
                  </b-col>
                  <b-col sm="4" cols="4">
                    <div><img src="/static/img/money.png" class="trasfer-money"></div>
                    <div class="transfer-text">1200 POINT</div>
                    <div><b-form-input type="text" class="transfer-input"></b-form-input></div>
                  </b-col>
                </b-row>
                <div class="text-center"><b-button class="transfer-button">Got it!</b-button></div>
              </div>
            </b-tab>
            <b-tab title="Transfer">
              <h4 class="text-center transfer-title">TRANSFER GATEWAY</h4>
              <div class="col-sm-6 transfer-content">
                <b-row class="text-center">
                  <b-col sm="4" cols="4">
                    <div><img src="/static/img/logo-symbol.png" class="trasfer-cherry"></div>
                    <div class="transfer-text">{{ tokens }} CHERRY</div>
                  </b-col>
                  <b-col sm="4" cols="4">
                    <div><img src="/static/img/arrow.png" class="trasfer-arrow"></div>
                  </b-col>
                  <b-col sm="4" cols="4">
                    <div><img src="/static/img/money.png" class="trasfer-money"></div>
                    <div class="transfer-text">{{ tokens / 2200 }} ETH</div>
                  </b-col>
                </b-row>
              </div>
              <b-row class="text-center">
                {{ profile.keyStore.address }}
              </b-row>
              <b-row class="text-center">
                {{ coins }}
              </b-row>
              <div class="text-center">
                <b-button class="transfer-button" @click="sendTokenExchange()">Preview</b-button>
              </div>
            </b-tab>
            <b-tab title="History">
              <c-table sm="9" ref="table" v-if="receipts.length > 0" striped :rows="receipts" :columns="receiptFields" caption="<i class='fa fa-align-justify'></i> Transfer Results"></c-table>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import cTable from './base/Table.vue'

export default {
  name: 'CherryTransfer',
  components: {cTable},
  created () {
    if (!this.$route.params.userId) {
      let userId = this.$session.get('user-id')
      this.$router.push('/cherry-transfer/' + userId)
    }
    this.fetchProfile()
    this.fetchTokens()
    this.fetchCoins()
    this.fetchQuestions()
    this.fetchAnswers()
    this.fetchLikes()
    this.fetchComments()
    this.fetchReceiptesData()
  },
  data () {
    return {
      form: {
        occupation: '',
        familyType: '',
        interest: '',
        monthlyIncome: '',
        assets: '',
        incomeManagement: '',
        description: ''
      },
      tokens: 0,
      coins: 0,
      receipts: [],
      receiptFields: [
        {key: 'eventFrom', label: '발신자'},
        {key: 'eventTo', label: '수신자'},
        {key: 'value', label: '전송토큰'},
        {key: 'tx', label: '상세이력'}
      ]
    }
  },
  methods: {
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
          this.form.description = response.data.description
        })
    },
    fetchTokens () {
      this.$http.get('/api/users/' + this.$route.params.userId + '/tokens')
        .then((response) => {
          this.tokens = response.data.tokens
        })
    },
    fetchCoins () {
      this.$http.get('/api/users/' + this.$route.params.userId + '/coins')
        .then((response) => {
          this.coins = response.data.coins
        })
    },
    fetchQuestions () {
      this.questions = []
      this.$http.get('/api/questions', {
        params: {
          createdBy: this.$route.params.userId
        }
      })
        .then((response) => {
          this.questions = response.data
        })
    },
    fetchAnswers () {
      this.answers = []
      this.$http.get('/api/answers', {
        params: {
          createdBy: this.$route.params.userId
        }
      })
        .then((response) => {
          this.answers = response.data
        })
    },
    fetchLikes () {
      this.likes = []
      this.$http.get('/api/likes', {
        params: {
          createdBy: this.$route.params.userId
        }
      })
        .then((response) => {
          this.likes = response.data
        })
    },
    fetchComments () {
      this.comments = []
    },
    fetchReceiptesData () {
      this.receipts = []
      this.$http.get('/api/contracts/receipts')
        .then((response) => {
          this.receipts = response.data.reverse()
        })
    },
    sendTokenExchange () {
      var request = {
        token: this.tokens
      }
      this.$http.post('/api/contracts/tokenExchange', request)
        .then((response) => {
          alert('토큰 전송 완료')
        })
    }
  }
}
</script>
