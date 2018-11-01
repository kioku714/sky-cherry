<template>
  <div class="animated fadeIn">
      <b-row>
        <b-col sm="2">
          <div>
            <b-img center rounded="circle" blank width="175" height="175" blank-color="#777" alt="img" class="m-1" />
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
                        <b-form-input plaintext id="genderAndAge" type="text" value="여/31"></b-form-input>
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
                        label-for="occupation"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-select id="occupation" v-model="form.occupation" :options="$store.state.famailyType" class="mb-3" />
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                        label="관심사 :"
                        label-for="occupation"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-select id="occupation" v-model="form.occupation" :options="$store.state.interest" class="mb-3" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group
                        label="월평균소득 :"
                        label-for="occupation"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-select id="occupation" v-model="form.occupation" :options="$store.state.monthlyIncome" class="mb-3" />
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group
                        label="보유자산 :"
                        label-for="occupation"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-select id="occupation" v-model="form.occupation" :options="$store.state.assets" class="mb-3" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="12">
                      <b-form-group label="소득운영현황">
                        <b-form-radio-group v-model="selected"
                                            :options="$store.state.assets"
                                            name="radioInline">
                        </b-form-radio-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="12">
                      <b-form-textarea id="textarea1"
                                      v-model="form.description"
                                      placeholder="질문을 입력하세요."
                                      :rows="9"
                                      :max-rows="9">
                      </b-form-textarea>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="알림">
              <b-list-group flush>
                <b-list-group-item>
                  <span class="text-success">blossommmm</span><span class="text-muted">님이 당신의 질문에 답하였습니다.</span> "제 보험 한번만 봐주세요.." <span class="text-warning">2 hours ago</span>
                </b-list-group-item>
                <b-list-group-item>
                  <span class="text-success">blossommmm</span><span class="text-muted">님이 당신의 질문에 답하였습니다.</span> "제 보험 한번만 봐주세요.." <span class="text-warning">2 hours ago</span>
                </b-list-group-item>
              </b-list-group>
            </b-tab>
            <b-tab title="질문" >
              <b-list-group v-if="!questions.length" flush>
                <b-list-group-item>
                    <span class="text-muted">활동 내역이 없습니다.</span>
                </b-list-group-item>
              </b-list-group>
              <b-list-group v-for="question in questions" :key="question.id" flush>
                <b-list-group-item>
                  "{{ question.title }}" <span class="text-muted" v-readMore:50="question.description"></span> <span class="text-warning">{{ $moment.utc(question.createdAt).local().fromNow() }}</span>
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
                    "{{ answer.question.title }}" <span class="text-muted" v-readMore:50="answer.description"></span> <span class="text-warning">{{ $moment.utc(answer.createdAt).local().fromNow() }}</span>
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
                <b-list-group-item v-if="like.onModel === 'Question'">
                    <span class="text-success">{{ like.on.createdBy.name }}</span><span class="text-muted">님의 질문을 좋아합니다.</span>"{{ like.on.title }}"<span class="text-muted" v-readMore:50="like.on.description"></span><span class="text-warning">{{ $moment.utc(like.createdAt).local().fromNow() }}</span>
                </b-list-group-item>
                <b-list-group-item v-else>
                    <span class="text-success">{{ like.on.createdBy.name }}</span><span class="text-muted">님의 답변을 좋아합니다.</span>"{{ like.on.qustion.title }}"<span class="text-muted" v-readMore:50="like.on.description"></span><span class="text-warning">{{ $moment.utc(like.createdAt).local().fromNow() }}</span>
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

export default {
  name: 'Profile',
  components: {},
  created () {
    console.log(this.$session.get('user-token'))
    // TODO: from params
    let userId = this.$route.params.userId
    if(!userId) {
      userId = this.$session.get('user-id')
    }

    this.fetchProfile(userId)
    this.fetchTokens(userId)
    this.fetchQuestions(userId)
    this.fetchAnswers(userId)
    this.fetchLikes(userId)
    this.fetchComments(userId)
  },
  data () {
    return {
      profile: {},
      tokens: 0,
      questions: [],
      answers: [],
      likes: [],
      comments: [],
      logs: [],
      form: {
        subField: '',
        age: 31,
        gender: 'female',
        occupation: '',
        description: ''
      }
    }
  },
  methods: {
    fetchProfile (userId) {
      this.$http.get('/api/users/' + userId)
        .then((response) => {
          this.profile = response.data
        })
    },
    fetchTokens (userId) {
      this.$http.get('/api/users/' + userId + '/tokens')
        .then((response) => {
          this.tokens = response.data.tokens
        })
    },
    fetchQuestions (userId) {
      this.questions = []
      this.$http.get('/api/questions', {
        params: {
          createdBy: userId
        }
      })
        .then((response) => {
          this.questions = response.data
        })
    },
    fetchAnswers (userId) {
      this.answers = []
      this.$http.get('/api/answers', {
        params: {
          createdBy: userId
        }
      })
        .then((response) => {
          this.answers = response.data
        })
    },
    fetchLikes (userId) {
      this.likes = []
      this.$http.get('/api/likes', {
        params: {
          createdBy: userId
        }
      })
        .then((response) => {
          this.likes = response.data
        })
    },
    fetchComments (userId) {
      this.comments = []
    },
    fetchLogs (userId) {
      this.logs = []
      this.$http.get('/api/logs', {
        params: {
          from: userId,
          to: userId
        }
      })
        .then((response) => {
          this.likes = response.data
        })
    }
  }
}
</script>
