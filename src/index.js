import Vue from 'vue'
import router from '@router'
import app from '@app'
import request from '@request'

Vue.config.productionTip = false

router.beforeResolve(async (to, from, next) => {
  try {
    const auth = await request.get('/api/user/checkLoginStatus')
    if (!auth.success && to.path !== '/login') {
      return next('/login')
    }
    if (auth.success && to.path == '/login') {
      return next('/')
    }
  } catch (err) {
    if (to.path !== '/login') return next('/login')
  } finally {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
