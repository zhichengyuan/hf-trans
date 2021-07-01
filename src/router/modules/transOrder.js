/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import i18n from '@/i18n/i18n'
const transOrderRouter = {
  path: '/transOrder',
  component: Layout,
  redirect: 'noRedirect',
  name: 'transOrder',
  meta: {
    title: i18n.t('message.运单管理'),
    icon: 'chart',
    roles: ['admin','b',"B"]
  },
  children: [{
      path: 'addTransOrder',
      component: () =>
        import('@/views/transOrder/addTransOrder'),
      name: 'addTransOrder',
      meta: {
        title: '新增运单',
        noCache: true,
        roles: ['admin','b']
      }
    },
    {
      path: 'transOrderList',
      component: () =>
        import('@/views/transOrder/transOrderList'),
      name: 'transOrderList',
      meta: {
        title: i18n.t('message.运单列表'),
        noCache: true,
        roles: ['admin','b','B']
      }
    },
    
  ]
}

export default transOrderRouter
