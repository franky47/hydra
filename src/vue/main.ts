import { createApp } from 'vue'
import { createRouter, type RouterHistory, RouterView } from 'vue-router'
import Client from './client.vue'
import { createMemoryHistory } from './history'

// The createWebHistory function from vue-router doesn't react to shallow
// updates of the URL via the history methods, so we use the in-memory history
// implementation, but connect it to the URL in a way that doesn't conflict
// with Next.js' own patch of history methods and doesn't cause infinite
// navigation loops.

function createCustomHistory(): RouterHistory {
  const baseHistory = createMemoryHistory()

  const originalReplace = history.replaceState
  baseHistory.replace(
    location.pathname + location.search + location.hash,
    history.state
  )

  baseHistory.listen((to) => {
    if (to === location.pathname + location.search + location.hash) {
      return
    }
    history.replaceState({ from: 'vue' }, '', to)
  })

  // Patch history methods
  history.replaceState = function (state, title, url) {
    const isUpdateFromVue = state?.from === 'vue'
    if (!isUpdateFromVue && url) {
      baseHistory.replace(String(url), state)
    }
    originalReplace.call(history, isUpdateFromVue ? null : state, title, url)
  }

  return baseHistory
}

const router = createRouter({
  history: createCustomHistory(),
  routes: [
    {
      // https://router.vuejs.org/guide/essentials/dynamic-matching.html#Catch-all-404-Not-found-Route
      path: '/:catchall(.*)*',
      component: Client,
      strict: false,
    },
  ],
})

createApp(RouterView).use(router).mount('#vue')
