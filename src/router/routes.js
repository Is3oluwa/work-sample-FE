
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/HomePage.vue') },
      { path: '/login', component: () => import('src/pages/LoginPage.vue') },
      { path: '/orders', component: () => import('src/pages/OrdersPage.vue') },
      { path: '/signup', component: () => import('src/pages/SignUpPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
