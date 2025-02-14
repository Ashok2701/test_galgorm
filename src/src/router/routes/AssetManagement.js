import { lazy } from "react"

const AppRoutes = [
  {
    path: '/asset/list',
    exact: true,
    // appLayout: true,
    className: 'asset',
    component: lazy(() => import('../../views/asset-management/asset-tracking')),
    meta: {
      navLink: '/asset'
    }
  },
  {
      path: '/asset/list/:id',
      exact: true,
      // appLayout: true,
      className: 'asset',
      component: lazy(() => import('../../views/asset-management/asset-tracking/show')),
      meta: {
        navLink: '/asset'
      }
    },
  {
    path: '/asset/request',
    exact: true,
    // appLayout: true,
    className: 'asset',
    component: lazy(() => import('../../views/asset-management/asset-request/')),
    meta: {
      navLink: '/asset'
    }
  },
  {
    path: '/asset/request/edit/:id',
    exact: true,
    // appLayout: true,
    className: 'asset',
    component: lazy(() => import('../../views/asset-management/asset-request/create')),
    meta: {
      navLink: '/asset'
    }
  }
]

export default AppRoutes