import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Recommend from '@/page/recommend/recommend';
import Singer from '@/page/singer/singer';
import SingerDetail from '@/page/singer/singer-detail/singer-detail';
import Rank from '@/page/rank/rank';
import Search from '@/page/search/search';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'// redirect默认的router
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    }
  ]
})
