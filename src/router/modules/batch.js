/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import i18n from '@/i18n/i18n'
const batchRouter = {
  path: '/batch',
  component: Layout,
  redirect: 'noRedirect',
  name: 'batch',
  meta: {
    title: '批次管理',
    icon: 'chart',
    roles: ['admin']
  },
  children: [{
      path: '/batchL',
      component: () =>
        import('@/views/batch/batchList'),
      name: 'batchL',
      meta: {
        title: '批次列表',
        noCache: true,
        roles: ['admin']
      }
    },
  ]
}

export default batchRouter
