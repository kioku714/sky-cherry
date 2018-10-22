import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import QuestionList from '@/views/QuestionList'

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
          path: 'questionList',
          name: '질문',
          component: QuestionList
        }
      ]
    }
  ]
})
