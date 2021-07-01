/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import i18n from '@/i18n/i18n'
const staffRouter = {
  path: '/staff',
  component: Layout,
  redirect: 'noRedirect',
  name: 'staff',
  meta: {
    title:i18n.t('message.人员管理'),
    icon: 'chart',
    roles: ['admin','B']
  },
  children: [{
      path: 'staffM',
      component: () =>
        import('@/views/staff'),
      name: 'staffM',
      meta: {
        title:i18n.t('message.人员列表'),
        noCache: true,
        roles: ['admin','B']
      }
    },
  ]
}

export default staffRouter
