import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import CherryCardList from '@/views/cherryCardList'
import CherryCardDetail from '@/views/CherryCardDetail'

// Containers
import Full from '@/containers/Full'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/main',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'main',
          name: 'Main',
          component: Main
        },
        {
          path: 'cherryCard',
          name: '체리카드',
          component: CherryCardList
        },
        {
          path: 'cherryCard/:id',
          name: '체리카드 상세',
          component: CherryCardDetail
        }
      ]
    }
  ]
})
