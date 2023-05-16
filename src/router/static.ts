import { RouteRecordRaw } from 'vue-router'

const pageTitle = (name: string): string => {
    return `pagesTitle.${name}`
}

/*
 * 静态路由
 */
const staticRoutes: Array<RouteRecordRaw> = [
    {
        // 管理员登录页
        path: '/admin/login',
        name: 'adminLogin',
        component: () => import('/@/views/backend/login.vue'),
        meta: {
            title: pageTitle('adminLogin'),
        },
    },
    {
        path: '/:path(.*)*',
        redirect: '/404',
    },
    {
        path:'/admin/ser',
        name:'addSer',
        component:() =>import('/@/views/backend/user/moneyLog/index.vue')
    },
    {
        // 404
        path: '/404',
        name: 'notFound',
        component: () => import('/@/views/common/error/404.vue'),
        meta: {
            title: pageTitle('notFound'), // 页面不存在
        },
    },
    {
        // 后台找不到页面了-可能是路由未加载上
        path: '/admin:path(.*)*',
        redirect: (to) => {
            return {
                name: 'adminMainLoading',
                params: {
                    to: JSON.stringify({
                        path: to.path,
                        query: to.query,
                    }),
                },
            }
        },
    },
    {
        // 无权限访问
        path: '/401',
        name: 'noPower',
        component: () => import('/@/views/common/error/401.vue'),
        meta: {
            title: pageTitle('noPower'),
        },
    },
]

/*
 * 后台基础静态路由
 */
const adminBaseRoute: RouteRecordRaw = {
    path: '/admin',
    name: 'admin',
    component: () => import('/@/layouts/backend/index.vue'),
    redirect: '/admin/loading',
    meta: {
        title: pageTitle('admin'),
    },
    children: [
        {
            path: 'loading/:to?',
            name: 'adminMainLoading',
            component: () => import('/@/layouts/common/components/loading.vue'),
            meta: {
                title: pageTitle('Loading'),
            },
        },
    ],
}



staticRoutes.push(adminBaseRoute)

export { staticRoutes, adminBaseRoute }
