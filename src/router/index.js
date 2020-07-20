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
      redirect: '/note-list-editor',
      children: [
        {
          name: 'note-list-editor',
          component: resolve('note'),
          path: 'note-list-editor',
        },
        {
          path: 'tag-manager',
          component: resolve('tag-manager'),
          name: 'tag-manager',
          meta: {
            breadcrumb: []
          },
        },
        {
          path: 'tag-manager/create-or-update-tag/:id?',
          component: resolve('create-or-update-tag'),
          name: 'create-or-update-tag',
          meta: {
            breadcrumb: []
          },
        },
        {
          name: 'oss-manager',
          component: resolve('oss-page'),
          path: 'oss-manager',
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
