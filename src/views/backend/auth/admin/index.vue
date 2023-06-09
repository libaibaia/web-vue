<template>
    <div class="default-main ba-table-box">
        <el-alert class="ba-table-alert" v-if="baTable.table.remark" :title="baTable.table.remark" type="info" show-icon />

        <!-- 表格顶部菜单 -->
        <TableHeader
            :buttons="['refresh', 'add', 'edit', 'delete', 'quickSearch', 'columnDisplay']"
            :quick-search-placeholder="t('quick Search Placeholder', { fields: t('auth.admin.username') + '/' + t('auth.admin.nike') })"
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
import { user } from '/@/api/controllerUrls'
import PopupForm from './popupForm.vue'
import Table from '/@/components/table/index.vue'
import TableHeader from '/@/components/table/header/index.vue'
import { defaultOptButtons } from '/@/components/table'
import { baTableApi } from '/@/api/common'
import { useAdminInfo } from '/@/stores/adminInfo'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const adminInfo = useAdminInfo()

const optButtons = defaultOptButtons(['edit', 'delete'])
optButtons[1].display = (row) => {
    return row.id != adminInfo.id
}

const baTable = new baTableClass(
    new baTableApi(user),
    {
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: t('id'), prop: 'id', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query'), width: 70 },
            { label: t('auth.admin.username'), prop: 'username', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: t('auth.admin.username'), prop: 'username', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: t('auth.admin.nike'), prop: 'nike', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: t('auth.admin.head portrait'), prop: 'avatar', align: 'center', render: 'image', operator: false },
            { label: t('auth.admin.mailbox'), prop: 'email', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: t('auth.admin.mobile'), prop: 'mobile', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            {
                label: t('auth.admin.Last login'),
                prop: 'lastlogintime',
                align: 'center',
                render: 'datetime',
                sortable: 'custom',
                operator: 'RANGE',
                width: 160,
            },
            { label: t('createtime'), prop: 'createtime', align: 'center', render: 'datetime', sortable: 'custom', operator: 'RANGE', width: 160 },
            {
                label: t('state'),
                prop: 'status',
                align: 'center',
                render: 'tag',
                custom: { '0': 'danger', '1': 'success' },
                replaceValue: { '0': t('Disable'), '1': t('Enable') },
            },
            {
                label: t('operate'),
                align: 'center',
                width: '100',
                render: 'buttons',
                buttons: optButtons,
                operator: false,
            },
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

baTable.mount()
baTable.getIndex()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'auth/admin',
})
</script>

<style scoped lang="scss">
.avatar-uploader {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: var(--el-border-radius-small);
    box-shadow: var(--el-box-shadow-light);
    border: 1px dashed var(--el-border-color);
    cursor: pointer;
    overflow: hidden;
    width: 110px;
    height: 110px;
}
.avatar-uploader:hover {
    border-color: var(--el-color-primary);
}
.avatar {
    width: 110px;
    height: 110px;
    display: block;
}
.image-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
