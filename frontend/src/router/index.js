import Vue from 'vue'
import Router from 'vue-router'
import News from '@/views/News'
import Question from '@/views/Question'
import Column from '@/views/Column'
import Live from '@/views/Live'
import Tags from '@/views/Tags'
import NewsDetail from '@/views/NewsDetail'

// Containers
import Full from '@/containers/Full'

Vue.use(Router)

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
          component: News
        },
        {
          path: 'news/:category/:id',
          name: '체리카드 상세',
          component: NewsDetail
        },
        {
          path: '/question',
          name: '질문하기',
          component: Question
        },
        {
          path: '/serial/column',
          name: '컬럼',
          component: Column
        },
        {
          path: '/serial/live',
          name: 'Live',
          component: Live
        },
        {
          path: '/tags',
          name: 'Tags',
          component: Tags
        }
      ]
    }
  ]
})
