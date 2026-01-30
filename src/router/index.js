import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'



export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory =
  import.meta.env.SSR
    ? createMemoryHistory
    : import.meta.env.VITE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

const Router = createRouter({
  history: createHistory(import.meta.env.VITE_ROUTER_BASE),
  routes,
})

  return Router
})
