<template>
    <component :is="config.layout.layoutMode"></component>
<!--<AsideMenu></AsideMenu>-->
<!--    <el-main></el-main>-->
</template>

<script setup lang="ts">
import { useConfig } from '/@/stores/config'
import { useNavTabs } from '/@/stores/navTabs'
import { useTerminal } from '/@/stores/terminal'
import { useSiteConfig } from '/@/stores/siteConfig'
import { useAdminInfo } from '/@/stores/adminInfo'
import { useRoute } from 'vue-router'
import Default from '/@/layouts/backend/container/default.vue'
import Classic from '/@/layouts/backend/container/classic.vue'
import Streamline from '/@/layouts/backend/container/streamline.vue'
import Double from '/@/layouts/backend/container/double.vue'
import { onMounted, onBeforeMount } from 'vue'
import { Session } from '/@/utils/storage'
import { index } from '/@/api/backend'
import { handleAdminRoute, getFirstRoute, routePush } from '/@/utils/router'
import router from '/@/router/index'
import { adminBaseRoute } from '/@/router/static'
import { useEventListener } from '@vueuse/core'
import { BEFORE_RESIZE_LAYOUT } from '/@/stores/constant/cacheKey'
import { isEmpty } from 'lodash-es'
import AsideMenu from "/@/layouts/backend/components/aside.vue";
import {error} from "echarts/types/src/util/log";

const terminal = useTerminal()
const navTabs = useNavTabs()
const config = useConfig()
const route = useRoute()
const siteConfig = useSiteConfig()
const adminInfo = useAdminInfo()

onMounted(() => {
    // 判断本地是否有登录信息
    // if (!adminInfo.token) return router.push({ name: 'adminLogin' })

    init()
    onSetNavTabsMinWidth()
    useEventListener(window, 'resize', onSetNavTabsMinWidth)
})
onBeforeMount(() => {
    onAdaptiveLayout()
    useEventListener(window, 'resize', onAdaptiveLayout)
})

const init = () => {
    console.log("init")
    // let re = [
    //     {"id":1,"pid":0,"type":"menu","title":"控制台","name":"dashboard/dashboard","path":"dashboard","icon":"fa fa-dashboard","menu_type":"tab","url":"","component":"/src/views/backend/dashboard.vue","keepalive":"dashboard/dashboard","extend":"none"}
    // ]
    // handleAdminRoute(re)
    // index().then()
    // 此处响应控制加载动画
    // index().then()
    // let re = [{"id":1,"pid":0,"type":"menu","title":"控制台","name":"dashboard/dashboard","path":"dashboard","icon":"fa fa-dashboard","menu_type":"tab","url":"","component":"/src/views/backend/dashboard.vue","keepalive":"dashboard/dashboard","extend":"none"}]
    // handleAdminRoute(re)
    index().then((res) => {
        // siteConfig.dataFill(res.data.siteConfig)
        // terminal.changePort(res.data.terminal.installServicePort)
        // terminal.changePackageManager(res.data.terminal.npmPackageManager)
        // adminInfo.dataFill(res.data.adminInfo)
        // let re = {
        //     "id":1,
        //     "pid":0,
        //     "type":"menu",
        //     "title":'控制台',
        //     "name":'dashboard\/dashboard',
        //     "path":"dashboard",
        //     "icon":"fa fa-dashboard",
        //     "menu_type":"tab",
        //     "url":"",
        //     "component":"\/src\/views\/backend\/dashboard.vue",
        //     "keepalive":"dashboard\/dashboard",
        //     "extend":"none"
        // }
        // handleAdminRoute(re)
        if (res.data.menus) {
            handleAdminRoute(res.data.menus)

            // 预跳转到上次路径
            if (route.params.to) {
                const lastRoute = JSON.parse(route.params.to as string)
                if (lastRoute.path != adminBaseRoute.path) {
                    let query = !isEmpty(lastRoute.query) ? lastRoute.query : {}
                    routePush({ path: lastRoute.path, query: query })
                    return
                }
            }

            // 跳转到第一个菜单
            let firstRoute = getFirstRoute(navTabs.state.tabsViewRoutes)
            if (firstRoute) routePush(firstRoute.path)
        }
    }).catch(error =>{
        console.log(error)
    })
}

const onAdaptiveLayout = () => {
    let defaultBeforeResizeLayout = {
        layoutMode: config.layout.layoutMode,
        menuCollapse: config.layout.menuCollapse,
    }
    let beforeResizeLayout = Session.get(BEFORE_RESIZE_LAYOUT)
    if (!beforeResizeLayout) Session.set(BEFORE_RESIZE_LAYOUT, defaultBeforeResizeLayout)

    const clientWidth = document.body.clientWidth
    if (clientWidth < 1024) {
        config.setLayout('menuCollapse', true)
        config.setLayout('shrink', true)
        config.setLayoutMode('Classic')
    } else {
        let beforeResizeLayoutTemp = beforeResizeLayout || defaultBeforeResizeLayout

        config.setLayout('menuCollapse', beforeResizeLayoutTemp.menuCollapse)
        config.setLayout('shrink', false)
        config.setLayoutMode(beforeResizeLayoutTemp.layoutMode)
    }
}

// 在实例挂载后为navTabs设置一个min-width，防止宽度改变时闪现滚动条
const onSetNavTabsMinWidth = () => {
    const navTabs = document.querySelector('.nav-tabs') as HTMLElement
    if (!navTabs) {
        return
    }
    const navBar = document.querySelector('.nav-bar') as HTMLElement
    const navMenus = document.querySelector('.nav-menus') as HTMLElement
    const minWidth = navBar.offsetWidth - (navMenus.offsetWidth + 20)
    navTabs.style.width = minWidth.toString() + 'px'
}
</script>

<!-- 只有在 components 选项中的组件可以被动态组件使用-->
<script lang="ts">
export default {
    components: { Default, Classic, Streamline, Double },
}
</script>
