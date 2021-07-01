/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import i18n from '@/i18n/i18n'
const consigneeRouter = {
  path: '/consignee',
  component: Layout,
  redirect: 'noRedirect',
  name: 'consignee',
  meta: {
    title: '收货人管理',
    icon: 'chart',
    roles: ['admin','b']
  },
  children: [{
      path: 'consigneeM',
      component: () =>
        import('@/views/consignee'),
      name: 'consigneeM',
      meta: {
        title:'收货人列表',
        noCache: true,
        roles: ['admin','b']
      }
    },
  ]
}

export default consigneeRouter
