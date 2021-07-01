/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import i18n from '@/i18n/i18n'
const warehouseRouter = {
  path: '/consumption',
  component: Layout,
  redirect: 'noRedirect',
  name: 'consumption',
  meta: {
    title: i18n.t('message.账户管理'),
    icon: 'chart',
    roles: ['admin','B','o']
  },
  children: [{
      path: 'records',
      component: () =>
        import('@/views/myAccount/records'),
      name: 'records',
      meta: {
        title: i18n.t('message.收款记录'),
        noCache: true,
        roles: ['admin']
      }
    },
    {
      path: 'calculation',
      component: () =>
        import('@/views/myAccount/calculation'),
      name: 'calculation',
      meta: {
        title: i18n.t('message.运单试算'),
        noCache: true,
        roles: ['B']
      }
    },
    {
      path: 'recharge',
      component: () =>
        import('@/views/myAccount/recharge'),
      name: 'recharge',
      meta: {
        title: i18n.t('message.充值中心'),
        noCache: true,
        roles: ['B']
      }
    },
    {
      path: 'consumptionRecords',
      component: () =>
        import('@/views/myAccount/consumptionRecords'),
      name: 'consumptionRecords',
      meta: {
        title: i18n.t('message.消费记录'),
        noCache: true,
        roles: ['B']
      }
    },
    
  
  ]
}

export default warehouseRouter
