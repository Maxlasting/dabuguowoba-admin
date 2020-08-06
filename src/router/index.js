import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const resolve = (page) => () => import(`@views/${page}.vue`)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve('enter-layout'),
      redirect: '',
      children: [
        {
          name: 'note',
          component: resolve('note'),
          path: '',
        },
        {
          path: 'create-or-update-tag',
          component: resolve('create-or-update-tag'),
          name: 'tag',
          meta: {
            breadcrumb: []
          },
        },
      ]
    },
    {
      name: 'login',
      component: resolve('login'),
      path: '/login',
    },
    {
      name: 'write',
      component: resolve('write'),
      path: '/write',
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
