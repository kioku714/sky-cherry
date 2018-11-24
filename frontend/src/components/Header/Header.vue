<template>
  <header class="app-header navbar">
    <button :title="$store.state.version" class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link :title="$store.state.version" class="navbar-brand" to="/"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '질문하기', query: { sort: 'like' }}">
          <span class="fa fa-search fa-lg"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '질문 등록'}">
          <span class="fa fa-quora fa-lg"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: 'Cherry Transfer', params: { userId: $session.get('user-id')}}">
          <span class="fa fa-dollar fa-lg"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '프로필', params: { userId: $session.get('user-id')}, query: { tab: 'notification' }}">
          <span class="fa fa-bell-o fa-lg"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '프로필', params: { userId: $session.get('user-id')}, query: { tab: 'info' }}">
          <span class="fa fa-user-o fa-lg"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <b-link v-if="$session.get('user-id')" @click="signout">
          <span class="fa fa-sign-out fa-lg"></span>
        </b-link>
        <b-link v-else :to="{name: 'Login'}">
          <span class="fa fa-sign-in fa-lg"></span>
        </b-link>
      </li>
      <li class="nav-item dropdown d-lg-none">
        <HeaderDropdown/>
      </li>
    </ul>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </header>
</template>
<script>
import HeaderDropdown from './HeaderDropdown.vue'

export default {
  name: 'Header',
  components: {
    HeaderDropdown
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    signout (e) {
      e.preventDefault()
      this.$session.destroy()
      location.reload()
    }
  }
}
</script>
