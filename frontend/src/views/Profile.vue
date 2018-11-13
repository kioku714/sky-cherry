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
          <div class="text-center">
            <b-button variant="success" :to="{name: 'Cherry Transfer'}">Cherry Transfer</b-button>
          </div>
        </b-col>
        <b-col sm="10">
          <b-tabs>
            <b-tab title="정보" active>
              <b-row>
                <b-col sm="12">
                  <b-row>
                    <b-col sm="6">
                      <b-form-group
                        label="성별/나이 :"
                        label-for="genderAndAge"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-input plaintext id="genderAndAge" type="text" v-bind:value="('male' === profile.gender ? '남' : '여') + '/' + $moment({}).diff($moment(profile.birthday), 'years')"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                        label="직업 :"
                        label-for="occupation"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-select id="occupation" v-model="form.occupation" :options="$store.state.occupation" class="mb-3" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group
                        label="가족형태 :"
                        label-for="familyType"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-select id="familyType" v-model="form.familyType" :options="$store.state.familyType" class="mb-3" />
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                        label="관심사 :"
                        label-for="interest"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-select id="interest" v-model="form.interest" :options="$store.state.interest" class="mb-3" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group
                        label="월평균소득 :"
                        label-for="monthlyIncome"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-select id="monthlyIncome" v-model="form.monthlyIncome" :options="$store.state.monthlyIncome" class="mb-3" />
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                        label="보유자산 :"
                        label-for="assets"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-select id="assets" v-model="form.assets" :options="$store.state.assets" class="mb-3" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="12">
                      <b-form-group
                        label="소득운영현황"
                        label-for="incomeManagement"
                        :horizontal="true">
                        <b-form-radio-group v-model="form.incomeManagement"
                                            :options="$store.state.incomeManagement"
                                            name="radioInline">
                        </b-form-radio-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="12">
                      <b-form-textarea v-model="form.description"
                                       placeholder="자기소개를 입력하세요."
                                       :rows="9"
                                       :max-rows="9">
                      </b-form-textarea>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="12">
                  <br/>
                  <div class="text-right">
                    <b-button v-on:click="updateProfile">저장</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="알림">
              <!-- <b-list-group v-if="!notifications.length" flush>
                <b-list-group-item>
                    <span class="text-muted">활동 내역이 없습니다.</span>
                </b-list-group-item>
              </b-list-group> -->
              <b-list-group v-for="notification in notifications" :key="notification.id" flush>
                <b-list-group-item v-if="notification.answer">
                  <b-link class="text-success" :to="{ name: '프로필', params: { userId: notification.answer.createdBy._id }}">{{ notification.answer.createdBy.name }}</b-link><span class="text-muted">님이 당신의 질문에 답하였습니다.</span>
                  <b-link class="text-dark" :to="{ name: '질문 상세', params: { questionId: notification._id }}">"{{ notification.title }}"</b-link>
                  <span class="text-warning">{{ $moment.utc(notification.answer.createdAt).local().fromNow() }}</span>
                </b-list-group-item>
                <b-list-group-item v-else>
                  <b-link class="text-success" :to="{ name: '프로필', params: { userId: notification.like.createdBy._id }}">{{ notification.like.createdBy.name }}</b-link><span class="text-muted">님이 당신의 질문을 좋아합니다.</span>
                  <b-link class="text-dark" :to="{ name: '질문 상세', params: { questionId: notification._id }}">"{{ notification.title }}"</b-link>
                  <span class="text-warning">{{ $moment.utc(notification.like.createdAt).local().fromNow() }}</span>
                </b-list-group-item>
              </b-list-group>
              <!-- <b-list-group flush>
                <b-list-group-item>
                  <span class="text-success">blossommmm</span><span class="text-muted">님이 당신의 질문에 답하였습니다.</span> "제 보험 한번만 봐주세요.." <span class="text-warning">2 hours ago</span>
                </b-list-group-item>
                <b-list-group-item>
                  <span class="text-success">blossommmm</span><span class="text-muted">님이 당신의 질문에 답하였습니다.</span> "제 보험 한번만 봐주세요.." <span class="text-warning">2 hours ago</span>
                </b-list-group-item>
              </b-list-group> -->
            </b-tab>
            <b-tab title="질문" >
              <b-list-group v-if="!questions.length" flush>
                <b-list-group-item>
                    <span class="text-muted">활동 내역이 없습니다.</span>
                </b-list-group-item>
              </b-list-group>
              <b-list-group v-for="question in questions" :key="question.id" flush>
                <b-list-group-item>
                  <b-link class="text-dark" :to="{ name: '질문 상세', params: { questionId: question._id }}">"{{ question.title }}"</b-link>
                  <span class="text-muted">{{ getDescription(question.description) }}<b-link class="text-muted" v-show="question.description.length > maxDescriptionLength" :to="{ name: '질문 상세', params: { questionId: question._id }}">more</b-link></span>
                  <span class="text-warning">{{ $moment.utc(question.createdAt).local().fromNow() }}</span>
                </b-list-group-item>
              </b-list-group>
            </b-tab>
            <b-tab title="답변">
              <b-list-group v-if="!answers.length" flush>
                <b-list-group-item>
                    <span class="text-muted">활동 내역이 없습니다.</span>
                </b-list-group-item>
              </b-list-group>
              <b-list-group v-for="answer in answers" :key="answer.id" flush>
                <b-list-group-item>
                  <b-link class="text-dark" :to="{ name: '질문 상세', params: { questionId: answer.question._id }}">"{{ answer.question.title }}"</b-link>
                  <span class="text-muted">{{ getDescription(answer.description) }}<b-link class="text-muted" v-show="answer.description.length > maxDescriptionLength" :to="{ name: '질문 상세', params: { questionId: answer.question._id }}">more</b-link></span>
                  <span class="text-warning">{{ $moment.utc(answer.createdAt).local().fromNow() }}</span>
                </b-list-group-item>
              </b-list-group>
            </b-tab>
            <b-tab title="좋아요">
              <b-list-group v-if="!likes.length" flush>
                <b-list-group-item>
                    <span class="text-muted">활동 내역이 없습니다.</span>
                </b-list-group-item>
              </b-list-group>
              <b-list-group v-for="like in likes" :key="like.id" flush>
                <b-list-group-item v-if="like.questionOrAnswerModel === 'Question'">
                    <b-link class="text-success" :to="{ name: '프로필', params: { userId: like.questionOrAnswer.createdBy._id }}">{{ like.questionOrAnswer.createdBy.name }}</b-link><span class="text-muted">님의 질문을 좋아합니다.</span>
                    <b-link class="text-dark" :to="{ name: '질문 상세', params: { questionId: like.questionOrAnswer._id }}">"{{ like.questionOrAnswer.title }}"</b-link>
                    <span class="text-muted">{{ getDescription(like.questionOrAnswer.description) }}<b-link class="text-muted" v-show="like.questionOrAnswer.description.length > maxDescriptionLength" :to="{ name: '질문 상세', params: { questionId: like.questionOrAnswer._id }}">more</b-link></span>
                    <span class="text-warning">{{ $moment.utc(like.createdAt).local().fromNow() }}</span>
                </b-list-group-item>
                <b-list-group-item v-else>
                    <b-link class="text-success" :to="{ name: '프로필', params: { userId: like.questionOrAnswer.createdBy._id }}">{{ like.questionOrAnswer.createdBy.name }}</b-link><span class="text-muted">님의 답변을 좋아합니다.</span>
                    <b-link class="text-dark" :to="{ name: '질문 상세', params: { questionId: like.questionOrAnswer.question._id }}">"{{ like.questionOrAnswer.question.title }}"</b-link>
                    <span class="text-muted">{{ getDescription(like.questionOrAnswer.description) }}<b-link class="text-muted" v-show="like.questionOrAnswer.description.length > maxDescriptionLength" :to="{ name: '질문 상세', params: { questionId: like.questionOrAnswer.question._id }}">more</b-link></span>
                    <span class="text-warning">{{ $moment.utc(like.createdAt).local().fromNow() }}</span>
                </b-list-group-item>
              </b-list-group>
            </b-tab>
            <b-tab title="댓글">
              <b-list-group v-if="!comments.length" flush>
                <b-list-group-item>
                    <span class="text-muted">활동 내역이 없습니다.</span>
                </b-list-group-item>
              </b-list-group>
              <b-list-group v-for="comment in comments" :key="comment.id" flush>
                <b-list-group-item>
                    "{{ comment.question.title }}" <span class="text-muted" v-readMore:50="comment.description"></span> <span class="text-warning">{{ $moment.utc(comment.createdAt).local().fromNow() }}</span>
                </b-list-group-item>
              </b-list-group>
            </b-tab>
            <b-tab title="Cherry">
              <b-list-group v-if="!logs.length" flush>
                <b-list-group-item>
                    <span class="text-muted">활동 내역이 없습니다.</span>
                </b-list-group-item>
              </b-list-group>
              <b-list-group v-for="log in logs" :key="log.id" flush>
                <b-list-group-item>
                    // TODO
                </b-list-group-item>
              </b-list-group>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import striptags from 'striptags'

export default {
  name: 'Profile',
  components: {},
  created () {
    if (!this.$route.params.userId) {
      let userId = this.$session.get('user-id')
      this.$router.push('/profiles/' + userId)
    }

    this.fetchProfile()
    this.fetchTokens()
    this.fetchNotifications()
    this.fetchQuestions()
    this.fetchAnswers()
    this.fetchLikes()
    this.fetchComments()
  },
  data () {
    return {
      maxDescriptionLength: 50,
      profile: {},
      tokens: 0,
      questions: [],
      answers: [],
      likes: [],
      comments: [],
      logs: [],
      form: {
        occupation: '',
        familyType: '',
        interest: '',
        monthlyIncome: '',
        assets: '',
        incomeManagement: '',
        description: ''
      }
    }
  },
  methods: {
    getDescription (description) {
      description = striptags(description)
      if (description.length > this.maxDescriptionLength) {
        return description.substr(0, this.maxDescriptionLength) + '...'
      }
      return description
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
          this.form.description = response.data.description
        })
    },
    fetchTokens () {
      this.$http.get('/api/users/' + this.$route.params.userId + '/tokens')
        .then((response) => {
          this.tokens = response.data.tokens
        })
    },
    fetchNotifications () {
      this.notifications = []
      this.$http.get('/api/notifications')
        .then((response) => {
          this.notifications = response.data
        }).then(() => {
          var self = this
          this.notifications = this.notifications.slice().sort(function (a, b) {
            var compare1 = b.answer ? b.answer.createdAt : b.like.createdAt
            var compare2 = a.answer ? a.answer.createdAt : a.like.createdAt
            return self.$moment(compare1).valueOf() - self.$moment(compare2).valueOf()
          })
        }).catch((e) => {
          console.error(e)
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
    fetchLogs () {
      this.logs = []
      this.$http.get('/api/logs', {
        params: {
          from: this.$route.params.userId,
          to: this.$route.params.userId
        }
      })
        .then((response) => {
          this.logs = response.data
        })
    },
    updateProfile () {
      this.$http.put('/api/users/' + this.$route.params.userId, this.form)
        .then((response) => {
          this.fetchProfile()
        })
    }
  }
}
</script>
