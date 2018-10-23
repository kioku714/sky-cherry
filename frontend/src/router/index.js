import Vue from 'vue'
import Router from 'vue-router'
import PickNews from '@/views/PickNews'
import BeautyNews from '@/views/BeautyNews'
import GourmetNews from '@/views/GourmetNews'
import MovieNews from '@/views/MovieNews'
import FinancialTechnologyNews from '@/views/FinancialTechnologyNews'
import TrendNews from '@/views/TrendNews'
import Questions from '@/views/Questions'
import Column from '@/views/Column'
import Live from '@/views/Live'
import Tags from '@/views/Tags'
import NewQuestion from '@/views/NewQuestion'
import CherryTransfer from '@/views/CherryTransfer'
import Profile from '@/views/Profile'

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
          path: '/news/pick',
          name: 'SKY\'s Pick',
          component: PickNews
        },
        {
          path: '/news/beauty',
          name: '뷰티',
          component: BeautyNews
        },
        {
          path: '/news/gourmet',
          name: '고메',
          component: GourmetNews
        },
        {
          path: '/news/movie',
          name: '영화',
          component: MovieNews
        },
        {
          path: '/news/financial-technology',
          name: '재태크',
          component: FinancialTechnologyNews
        },
        {
          path: '/news/trend',
          name: '트렌드',
          component: TrendNews
        },
        {
          path: '/questions',
          name: '질문하기',
          component: Questions
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
        },
        {
          path: '/new-question',
          name: '질문 등록',
          component: NewQuestion
        },
        {
          path: '/cherry-transfer',
          name: 'Cherry Transfer',
          component: CherryTransfer
        },
        {
          path: '/profile',
          name: '프로필',
          component: Profile
        }
      ]
    }
  ]
})
