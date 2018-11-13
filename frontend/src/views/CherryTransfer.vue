<template>
  <div class="animated fadeIn">
      <b-row>
        <b-col sm="2">
          <div>
            <b-img center rounded="circle" blank fluid width="175" height="175" blank-color="#777" alt="img" class="m-1" />
            <p class="text-center"><strong>{{ profile.name }}</strong></p>
          </div>
          <div>
            <p class="text-center">LV: <strong>{{ profile.level }}</strong> / SI : <strong>{{ profile.si }}</strong></p>
            <p class="text-center">Cherry : <strong>{{ tokens }}</strong></p>
            <p class="text-center">Questions : <strong>{{ questions.length }}</strong></p>
            <p class="text-center">Answers : <strong>{{ answers.length }}</strong></p>
            <p class="text-center">Likes : <strong>{{ likes.length }}</strong></p>
            <p class="text-center">Comments : <strong>{{ comments.length }}</strong></p>
          </div>
          <br/>
          <div class="text-center mb-4">
            <b-button variant="success" :to="{name: 'Cherry Transfer'}"  v-bind:style="{ borderRadius: '.3rem', backgroundColor: '#4dbd74', borderColor: '#4dbd74' }">Cherry Transfer</b-button>
          </div>
        </b-col>
        <b-col sm="10">
          <b-tabs>
            <b-tab title="CJONE" active>
              <h4 class="text-center">Transfer Gateway</h4>
              <b-row>
                <b-col sm="6" class="pt-3" v-bind:style="{ margin: 'auto' }">
                  <b-row class="text-center">
                    <b-col sm="4" cols="4">
                      <div>
                        <b-img src="/static/img/logo-symbol.png" width="95" fluid center/>
                      </div>
                      <div class="mt-3">{{ tokens }} Cherry</div>
                      <div>
                        <b-form-input type="text" class="text-center mt-2" value="11"></b-form-input>
                      </div>
                    </b-col>
                    <b-col sm="4" cols="4">
                      <b-img src="/static/img/exchange.png" width="40" class="mt-4" fluid center/>
                    </b-col>
                    <b-col sm="4" cols="4">
                      <div>
                        <b-img src="/static/img/point.png" width="95" fluid center/>
                      </div>
                      <div class="mt-3">1200 Point</div>
                      <div>
                        <b-form-input type="text" class="text-center mt-2" value="1100"></b-form-input>
                      </div>
                    </b-col>
                  </b-row>
                  <div class="text-center">
                    <b-button class="transfer-button">Got it!</b-button>
                  </div>
                  <b-row class="mt-4">
                    <b-col>
                      <b-img src="/static/img/cherry-transfer-comment.png" fluid center/>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="Transfer">
              <h4 class="text-center">Transfer Gateway</h4>
              <b-row>
                <b-col sm="6" class="pt-3" v-bind:style="{ margin: 'auto' }">
                  <b-row class="text-center">
                    <b-col sm="4" cols="4">
                      <div>
                        <b-img src="/static/img/logo-symbol.png" width="95" fluid center/>
                      </div>
                      <div class="mt-3">{{ tokens }} Cherry</div>
                    </b-col>
                    <b-col sm="4" cols="4">
                      <b-img src="/static/img/exchange.png" width="40" class="mt-4" fluid center/>
                    </b-col>
                    <b-col sm="4" cols="4">
                      <div>
                        <b-img src="/static/img/ethereum.png" width="95" fluid center/>
                      </div>
                      <div class="mt-3">{{ (tokens / 2200 ).toFixed(3) }} ETH</div>
                    </b-col>
                  </b-row>
                  <b-row class="mt-4 mb-2">
                    <b-col>
                      <b-img src="/static/img/wallet.png" fluid center/>
                    </b-col>
                    <b-col cols="9" sm="9" class="text-left">
                      <div class="word-wrap">{{ profile.keyStore.address }}</div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-img src="/static/img/ethereum-thumbnail.png" fluid center/>
                    </b-col>
                    <b-col cols="9" sm="9" class="text-left">{{ coins }}</b-col>
                  </b-row>
                  <div class="text-center">
                    <b-button class="transfer-button" @click="sendTokenExchange()">Preview</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="History">
              <h4 class="text-center">Transfer Result</h4>
              <c-table sm="9" ref="table" v-if="receipts.length > 0" striped :rows="receipts" :columns="receiptFields" caption=""></c-table>
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
          this.fetchTokens()
          this.fetchCoins()
        })
    }
  }
}
</script>
