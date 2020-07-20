import Vue from 'vue'
import router from '@router'
import app from '@app'
import request from '@request'
import progress from '@components/progress'

Vue.config.productionTip = false

router.beforeResolve(async (to, from, next) => {
  progress.start()
  try {
    const auth = await request.get('/api/checkLoginStatus')
    if (!auth.success && to.path !== '/login') {
      progress.fail()
      next('/login')
    }
    if (auth.success && to.path == '/login') {
      next('/')
    }
    const matchedComponents = router.getMatchedComponents(to)
    if (!matchedComponents.length) return next()
    const asyncHooks = matchedComponents.map(c => c.asyncData).filter(_ => _)
    console.log(asyncHooks)
    const promise = Promise.all(
      asyncHooks.map(hook => hook())
    )
    const resolveFn = () => {
      progress.finish()
      next()
    }

    const rejectFn = (err) => {
      progress.fail()
      next(err)
    }
    return promise.then(resolveFn).catch(rejectFn)
  } catch (err) {
    if (to.path !== '/login') next('/login')
    next()
  }
  // next()
  progress.finish()
})

new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
