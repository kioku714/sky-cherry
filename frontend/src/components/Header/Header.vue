<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '뷰티'}">
          <span class="fa fa-search"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '뷰티'}">
          <span class="fa fa-quora"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '뷰티'}">
          <span class="fa fa-bitcoin"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '뷰티'}">
          <span class="fa fa-bell-o"></span>
        </router-link>
      </li>
      <li class="nav-item d-md-down-none">
        <router-link :to="{name: '뷰티'}">
          <span class="fa fa-user-o"></span>
        </router-link>
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
    }
  }
}
</script>
