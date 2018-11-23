<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <div v-if="name === ''">
        <img src="/static/img/header-cherry.png" class="mr-2" v-bind:style="{ width: '30px' }"/>
      </div>
      <div v-else class="header-icon-text mr-2" v-bind:style="{ background: getBgColor() }">
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
      <b-dropdown-item :to="{name: '프로필', params: { userId: $session.get('user-id')}, query: { tab: 'notification' }}" exact>
        <i class="fa fa-bell-o" /> 알림
      </b-dropdown-item>
      <b-dropdown-item :to="{name: '프로필', params: { userId: $session.get('user-id')}, query: { tab: 'info' }}" exact>
        <i class="fa fa-user-o" /> 프로필
      </b-dropdown-item>
      <b-dropdown-item v-if="$session.get('user-id')" @click="signout">
        <i class="fa fa-sign-out" /> 로그아웃
      </b-dropdown-item>
      <b-dropdown-item v-else :to="{name: 'Login'}">
        <i class="fa fa-sign-in" /> 로그인
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
      if (this.email === 'test01@cj.net' || this.email === 'bittermoon@cj.net') {
        return '#6d0592'
      } else if (this.email === 'test02@cj.net' || this.email === 'chris@cj.net') {
        return '#026466'
      } else if (this.email === 'test03@cj.net' || this.email === 'miin_dong@cj.net') {
        return '#d34836'
      } else if (this.email === 'test04@cj.net' || this.email === 'hyungn11@cj.net') {
        return '#ff0084'
      } else if (this.email === 'test05@cj.net' || this.email === 'autumn091@cj.net') {
        return '#1769ff'
      } else {
        return '#ad2552'
      }
    },
    signout (e) {
      e.preventDefault()
      this.$session.destroy()
      location.reload()
    }
  }
}
</script>
