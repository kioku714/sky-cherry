import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import News from '@/views/News'
import NewsDetail from '@/views/NewsDetail'
import Questions from '@/views/Questions'
import Question from '@/views/Question'
import Column from '@/views/Column'
import Live from '@/views/Live'
import Tags from '@/views/Tags'
import NewQuestion from '@/views/NewQuestion'
import CherryTransfer from '@/views/CherryTransfer'
import Profile from '@/views/Profile'

// Containers
import Full from '@/containers/Full'

Vue.use(Router)

function requireAuth (to, from, next) {
  // get user-token from Local storage with vue-session
  var localSess = localStorage.getItem('vue-session-key')
  if (localSess) {
    localSess = JSON.parse(localSess)
    if (localSess['user-token']) {
      next()
      return
    }
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/news/pick',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'news/:category',
          name: '체리카드',
          component: News,
          beforeEnter: requireAuth
        },
        {
          path: 'news/:category/:id',
          name: '체리카드 상세',
          component: NewsDetail,
          beforeEnter: requireAuth
        },
        {
          path: '/questions',
          name: '질문하기',
          component: Questions,
          beforeEnter: requireAuth
        },
        {
          path: '/question/:questionId',
          name: '질문 상세',
          component: Question,
          beforeEnter: requireAuth
        },
        {
          path: '/new-question',
          name: '질문 등록',
          component: NewQuestion,
          beforeEnter: requireAuth
        },
        {
          path: '/serial/column',
          name: '컬럼',
          component: Column,
          beforeEnter: requireAuth
        },
        {
          path: '/serial/live',
          name: 'Live',
          component: Live,
          beforeEnter: requireAuth
        },
        {
          path: '/tags',
          name: 'Tags',
          component: Tags,
          beforeEnter: requireAuth
        },
        {
          path: '/cherry-transfer',
          name: 'Cherry Transfer',
          component: CherryTransfer,
          beforeEnter: requireAuth
        },
        {
          path: '/profile',
          name: '프로필',
          component: Profile,
          beforeEnter: requireAuth
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
