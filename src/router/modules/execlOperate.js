/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import i18n from '@/i18n/i18n'
const execlOperateRouter = {
  path: '/execlOperate',
  component: Layout,
  redirect: 'noRedirect',
  name: 'execlOperate',
  meta: {
    title: i18n.t('message.文件操作'),
    icon: 'chart',
    roles: ['admin']
  },
  children: [{
      path: '/execlOperateM',
      component: () =>
        import('@/views/execlOperate'),
      name: 'execlOperateM',
      meta: {
        title: i18n.t('message.表格'),
        noCache: true,
        roles: ['admin']
      }
    },
  ]
}

export default execlOperateRouter
