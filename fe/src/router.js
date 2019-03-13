import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
// import Home from './views/Home.vue'
// import User from './views/User.vue'
// import Sign from './views/Sign.vue'
Vue.use(Router)

Vue.prototype.$axios = axios
const apiRootPath = 'http://localhost:3000/api/'
Vue.prototype.$apiRootPath = apiRootPath

const pageCheck = (to, from, next) => {
  // console.log(axios.post(`${apiRootPath}page`))
  // console.log(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token')}});
  axios.post(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token')}})
  .then((result) => {
    if(!result.data.success) throw new Error(result.data.msg)
    next()
  })
  .catch((error) => {
    next(`/block/${error.message}`)
  })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   icon: 'home',
    //   title: 'lv0',
    //   to: {
    //     path: '/'
    //   }
    // },
    {
      path: '/',
      name: 'lv0',
      component: () => import('./views/lv0'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv1',
      name: 'lv1',
      component: () => import('./views/lv1'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv2',
      name: 'lv2',
      component: () => import('./views/lv2'),
      beforeEnter: pageCheck
    },
    {
      path: '/lv3',
      name: 'lv3',
      component: () => import('./views/lv3'),
      beforeEnter: pageCheck
    },
    {
      path: '/user',
      name: '사용자',
      component: () => import('./views/User')
    },
    {
      path: '/page',
      name: '페이지',
      component: () => import('./views/Page')

    },
    {
      path: '/block/:msg',
      name: '차단',
      component: () => import('./views/Block')
    },
    {
      path: '/sign',
      name: '로그인',
      component: () => import('./views/Sign')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404')
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    // {
    //   path: '*',
    //   name: 'e404',
    //   component: () => import('./views/e404.vue')
    // },
    // {
    //   path: '/page',
    //   name: '페이지',
    //   component: () => import('./views/Page')
    // },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: User
    // },
    // {
    //   path: '/sign',
    //   name: 'sign',
    //   component: Sign
    // },
    // {
    //   path: '/header',
    //   name: 'header',
    //   component: () => import('./views/Header.vue'),
    //   // beforeEnter : authCheck
    //   beforeEnter: (to, from, next) => {
    //     console.log(to)
    //     console.log(from)
    //     if (!localStorage.getItem('token')) return next('block')
    //     next()
    //   }
    // },
    // {
    //   path: '/block',
    //   name: 'block',
    //   component: () => import('./views/Block.vue')
    // }
  ]
})
