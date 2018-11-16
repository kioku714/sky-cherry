<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="/"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '질문하기', query: { sort: 'like' }}">
          <span class="fa fa-search"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '질문 등록'}">
          <span class="fa fa-quora"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: 'Cherry Transfer'}">
          <span class="fa fa-dollar"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '프로필', params: { userId: $session.get('user-id')}, query: { tab: 'notification' }}">
          <span class="fa fa-bell-o"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '프로필', params: { userId: $session.get('user-id')}, query: { tab: 'info' }}">
          <span class="fa fa-user-o"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <b-link v-if="$session.get('user-id')" @click="signout">
          <span class="fa fa-sign-out"></span>
        </b-link>
        <b-link v-else :to="{name: 'Login'}">
          <span class="fa fa-sign-in"></span>
        </b-link>
      </li>
      <li class="nav-item dropdown d-lg-none">
        <HeaderDropdown/>
      </li>
    </ul>
    <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
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
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
    signout (e) {
      e.preventDefault()
      this.$session.destroy()
      location.reload()
    }
  }
}
</script>
