<template>
    <div class="default-main ba-table-box">
        <el-alert class="ba-table-alert" v-if="baTable.table.remark" :title="baTable.table.remark" type="info" show-icon />
        <TableHeader
            :buttons="['refresh','quickSearch']"
            quick-search-placeholder="通过secretID搜索"
        />
        <!-- 表格 -->
        <!-- 要使用`el-table`组件原有的属性，直接加在Table标签上即可 -->
        <Table />

        <!-- 表单 -->
        <PopupForm />
    </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import baTableClass from '/@/utils/baTable'
import {user, consoleUser} from '/@/api/controllerUrls'
import PopupForm from './popupForm.vue'
import Table from '/@/components/table/index.vue'
import TableHeader from '/@/components/table/header/index.vue'
import { defaultOptButtons } from '/@/components/table'
import { baTableApi } from '/@/api/common'
import { useAdminInfo } from '/@/stores/adminInfo'
import { useI18n } from 'vue-i18n'
import createIAxios from "/@/utils/IRequests";

const { t } = useI18n()
const adminInfo = useAdminInfo()

const optButtons = defaultOptButtons(['edit', 'delete'])
optButtons[1].display = (row) => {
    return row.id != adminInfo.id
}

const baTable = new baTableClass(
    new baTableApi(consoleUser),
    {
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: '用户名', prop: 'username', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query'), width: 70 },
            { label: '密码', prop: 'password', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '主账号信息', prop: 'owneruin', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: 'uin', prop: 'uin', align: 'center', operator: false },
            { label: '登录地址', prop:'loginurl', align: 'center', operator: false },
        ],
        dblClickNotEditColumn: [undefined, 'status'],
    },
    {
        defaultItems: {
            status: '1',
        },
    }
)

provide('baTable', baTable)
const getIndex = () =>{
    createIAxios(consoleUser + "lists","POST",null).then((res) =>{
        baTable.table.data = res.lists
    })
}
getIndex()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'consoleUser',
})
</script>

<style scoped lang="scss"></style>
