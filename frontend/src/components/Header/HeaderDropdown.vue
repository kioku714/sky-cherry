<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <div v-if="userName === ''">
        <img src="/static/img/header-cherry.png" class="header-icon"/>
      </div>
      <div v-else class="header-icon-text" v-bind:style="{ background: getBgColor() }">
        {{ name.substring(0, 1) }}
      </div>
    </template>
    <template slot="dropdown">
      <b-dropdown-item :to="{name: '질문하기', query: { sort: 'like' }}">
        <i class="fa fa-search" /> 질문검색
      </b-dropdown-item>
      <b-dropdown-item :to="{name: '질문 등록'}">
        <i class="fa fa-quora" /> 질문하기
      </b-dropdown-item>
      <b-dropdown-item :to="{name: 'Cherry Transfer'}">
        <i class="fa fa-dollar" /> Cherry Transfer
      </b-dropdown-item>
      <b-dropdown-item :to="{name: '프로필', query: { tab: 'notification' }}">
        <i class="fa fa-bell-o" /> 알림
        <!-- <b-badge variant="info">10</b-badge> -->
      </b-dropdown-item>
      <b-dropdown-item :to="{name: '프로필', query: { tab: 'info' }}">
        <i class="fa fa-user-o" /> 프로필
      </b-dropdown-item>
      <b-dropdown-item @click="logout">
        <i class="fa fa-lock" /> 로그아웃
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'HeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  created () {
    this.name = (this.$session.get('user-name') !== undefined) ? this.$session.get('user-name') : ''
    this.email = (this.$session.get('user-email') !== undefined) ? this.$session.get('user-email') : ''
  },
  data () {
    return {
      name: '',
      email: ''
    }
  },
  methods: {
    getBgColor () {
      var color = ''
      switch (this.email) {
        case 'test01@cj.net':
          color = '#6d0592'
          break
        case 'test02@cj.net':
          color = '#026466'
          break
        case 'test03@cj.net':
          color = '#d34836'
          break
        case 'test04@cj.net':
          color = '#ff0084'
          break
        case 'test05@cj.net':
          color = '#1769ff'
          break
        default:
          color = '#ad2552'
      }
      return color
    },
    logout (e) {
      e.preventDefault()
      this.$session.destroy()
      this.$router.push('/login')
    }
  }
}
</script>
