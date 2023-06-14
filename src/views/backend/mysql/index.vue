<template>
    <div class="default-main ba-table-box">
        <el-alert class="ba-table-alert" v-if="baTable.table.remark" :title="baTable.table.remark" type="info" show-icon />

        <!-- 表格顶部菜单 -->
        <TableHeader
            :buttons="['refresh','quickSearch']"
            quick-search-placeholder="通过密钥名称搜索"
        />

        <!-- 表格 -->
        <!-- 要使用`el-table`组件原有的属性，直接加在Table标签上即可 -->
        <Table ref="tableRef" />
        <el-dialog v-model="dialogFormVisible" title="重置用户密码">
            <el-form >
                <el-form-item label="请选择用户" label-width="140px">
                    <el-select v-model="choseUser.name" placeholder="Please select a zone">
                        <el-option v-for="item in userLists.options" :label="item.label" :value="item.value"
                                   :key="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updatePostgresPassword">
          确认
        </el-button>
      </span>
            </template>
        </el-dialog>
        <!-- 表单 -->
        <PopupForm />
    </div>
</template>

<script setup lang="ts">
import {ref, provide, reactive} from 'vue'
import baTableClass from '/@/utils/baTable'
import {mysql} from '/@/api/controllerUrls'
import PopupForm from './popupForm.vue'
import Table from '/@/components/table/index.vue'
import TableHeader from '/@/components/table/header/index.vue'
import { defaultOptButtons } from '/@/components/table'
import { baTableApi } from '/@/api/common'
import { useI18n } from 'vue-i18n'
import createIAxios from "/@/utils/IRequests";
import BaInput from '/@/components/baInput/index.vue'
import {TableColumnCtx} from "element-plus/es/components/table/src/table-column/defaults";
import {TableColumn, TableRow} from "../../../../types/table";
const diaLogStatus = ref(false)
const { t } = useI18n()
const tableRef = ref()
const dialogFormVisible = ref(false)
const userLists = reactive({
    options: []
})
const choseUser = reactive({
    name:''
})
const getUserLists = ()=>{
    createIAxios("/api/databases/userLists","POST", {id: instanceInfo.id}).then((res) =>{
        userLists.options = res.lists
    })
}
const OpenWanService = ()=>{
    createIAxios("/api/databases/open","POST", {id: instanceInfo.id}).then((res) =>{
    })
}
const CloseWanService = ()=>{
    createIAxios("/api/databases/close","POST", {id: instanceInfo.id}).then((res) =>{
    })
}
const updatePostgresPassword = ()=>{
    createIAxios("/api/databases/user","POST", {username: choseUser.name,id:instanceInfo.id}).then((res) =>{
        dialogFormVisible.value = false
    })
}
const createUserReq = ()=>{
    createIAxios("/api/databases/user","POST", {id: instanceInfo.id}).then((res) =>{
    })
}
let openWan: OptButton = {
    render: 'tipButton',
    name: 'test',
    title: '开启外网访问',
    type: 'primary',
    icon: 'el-icon-Open',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        instanceInfo.id = row.id
        OpenWanService()
    }
}
let createUser: OptButton = {
    render: 'tipButton',
    name: 'test',
    title: '创建数据库用户',
    type: 'primary',
    icon: 'el-icon-DocumentAdd',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        instanceInfo.id = row.id
        console.log(row.type)
        if (row.type === "postgres") {
            getUserLists()
            dialogFormVisible.value = true
            console.log(userLists.options.length)
        }else {
            createUserReq()
        }
    }
}
let closeWan: OptButton = {
    render: 'tipButton',
    name: 'test',
    title: '关闭外网访问',
    type: 'primary',
    icon: 'el-icon-CircleClose',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        instanceInfo.id = row.id
        CloseWanService()
    }
}
let optButtons = defaultOptButtons([])
optButtons.push(openWan)
optButtons.push(closeWan)
optButtons.push(createUser)

const instanceInfo = reactive({
    //数据库中的实例id，不是腾讯云中实例ID
    id:'',
})
const baTable = new baTableClass(
    new baTableApi(mysql),
    {
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: 'key名称', prop: 'keyName', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: 'id', prop: 'id', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query'), width: 70 },
            { label: '实例ID', prop: 'instanceId', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '实例名称', prop: 'instanceName', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '类型', prop: 'type', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '外网域名', prop: 'domain', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '外网端口', prop: 'port', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '用户名', prop: 'user', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '密码', prop: 'password', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '区域', prop: 'region', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            {
                label: t('operate'),
                width: '150',
                render: 'buttons',
                buttons: optButtons,
                operator: false,
            },
        ],
        dblClickNotEditColumn: [undefined],
    },
    {
        defaultItems: {
            gender: 0,
            money: '0',
            score: '0',
            status: 'enable',
        },
    }
)

baTable.mount()
baTable.getIndex()
provide('baTable', baTable)
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'mysql',
})
</script>

<style scoped lang="scss">
.exec-message {
    color: var(--ba-bg-color-overlay);
    font-size: 12px;
    line-height: 16px;
    padding: 6px;
    background-color: #424251;
    margin-top: 10px;
    min-height: 30px;
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: #c8c9cc;
        border-radius: 4px;
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    &::-webkit-scrollbar-track {
        background: var(--ba-bg-color);
    }
    &:hover {
        &::-webkit-scrollbar-thumb:hover {
            background: #909399;
        }
    }
}
</style>
