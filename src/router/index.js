import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Add from '@/components/Add'
import Edit from '@/components/Edit'
import Line from '@/components/Line'
import Bar from '@/components/Bar'
import Pie from '@/components/Pie'

const Babycare = resolve => require.ensure([], () => resolve(require('@/pages/index')), 'index')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { path: '/babycare/main' }
    },
    {
      path: '/babycare/',
      name: 'Babycare',
      component: Babycare,
      children: [
        {
          path: 'main',
          component: Main,
          name: 'Main'
        },
        {
          path: 'add',
          component: Add,
          name: 'Add'
        },
        {
          path: 'edit/id/:id',
          component: Edit,
          name: 'Edit'
        },
        {
          path: 'edit/id/',
          component: Edit,
          name: 'Edit'
        },
        {
          path: 'line',
          component: Line,
          name: 'Line'
        },
        {
          path: 'bar',
          component: Bar,
          name: 'Bar'
        },
        {
          path: 'pie',
          component: Pie,
          name: 'Pie'
        }
      ]
    }
  ]
})
