/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import i18n from '@/i18n/i18n'
const staffRouter = {
  path: '/Logistics',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Logistics',
  meta: {
    title:i18n.t('message.物流查询'),
    icon: 'chart',
  },
  children: [{
      path: 'logQuery',
      component: () =>
        import('@/views/logQuery'),
      name: 'logQuery',
      meta: {
        title:i18n.t('message.快递状态'),
        noCache: true,
      }
    },
  ]
}

export default staffRouter
