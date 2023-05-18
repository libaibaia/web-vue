<template>
    <div class="default-main ba-table-box">
        <el-alert class="ba-table-alert" v-if="baTable.table.remark" :title="baTable.table.remark" type="info" show-icon />

        <!-- 表格顶部菜单 -->
        <TableHeader
            :buttons="['refresh', 'add', 'delete','stopAllTask','start','quickSearch']"
            quick-search-placeholder="根据名称搜索"
        />

        <!-- 表格 -->
        <!-- 要使用`el-table`组件原有的属性，直接加在Table标签上即可 -->
        <Table ref="tableRef" pagination="true" />
        <!-- 表单 -->
        <PopupForm ref="formRef" />
        <el-dialog
            v-model="dialogVisible"
            title="权限列表"
            width="30%"
        >
            <el-scrollbar height="400px">
                <el-form v-for="(item,index) in permListInfo.lists">
                    <el-form-item  :label="item.policyName">
                        <el-input v-model="item.remark" disabled></el-input>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref, provide, reactive} from 'vue'
import baTableClass from '/@/utils/baTable'
import { baTableApi } from '/@/api/common'
import { aksk } from '/@/api/controllerUrls'
import Table from '/@/components/table/index.vue'
import TableHeader from '/@/components/table/header/index.vue'
import PopupForm from './popupForm.vue'
import { defaultOptButtons } from '/@/components/table'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash-es'
import { getArrayKey } from '/@/utils/common'
import createIAxios from "/@/utils/IRequests";
import {TableColumn, TableRow} from "../../../../../types/table";
import {ElMessage} from "element-plus";



const formRef = ref()
const tableRef = ref()
const { t } = useI18n()
const dialogVisible = ref(false)
let restartBtn: OptButton = {
    render: 'tipButton',
    name: 'restart',
    title: '重新检测',
    type: 'primary',
    icon: 'el-icon-RefreshLeft',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        restInfo.akId = row.id
        restartList()
    }
}

const permListInfo = reactive({
    lists:[]
})
//列出权限列表
let getAttachedUserPolicies: OptButton = {
    render: 'tipButton',
    name: 'restart',
    title: '列出权限列表',
    type: 'primary',
    icon: 'el-icon-ChatLineSquare',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        restInfo.akId = row.id
        getPermLists()
    }
}
let createConsoleUser: OptButton = {
    render: 'tipButton',
    name: 'createConsoleUser',
    title: '创建控制台用户',
    type: 'primary',
    icon: 'el-icon-Plus',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        restInfo.akId = row.id
        creatConsoleUser()
    }
}
const restInfo = reactive({
    akId:'',
})
const restartList = () =>{
    createIAxios(aksk + "restart","POST",{id:restInfo.akId}).then((res) =>{
    })
}
const creatConsoleUser = () =>{
    createIAxios("api/console/binduser","POST",{id:restInfo.akId,}).then((res) =>{
    })
}
const getPermLists = () => {
    createIAxios(aksk + "perm","POST",{id:restInfo.akId}).then((res) =>{
        permListInfo.lists = res.lists
        if (permListInfo.lists.length <= 0){
            ElMessage.warning("策略列表为空")
        }
        else {
            dialogVisible.value = true
            console.log(permListInfo.lists)
        }
    })
}
let optButtons = defaultOptButtons(['edit','delete'])
optButtons.push(restartBtn)
optButtons.push(createConsoleUser)
optButtons.push(getAttachedUserPolicies)

const baTable: baTableClass = new baTableClass(
    new baTableApi(aksk),
    {
        expandAll: true,
        dblClickNotEditColumn: [undefined],
        column: [
            { type: 'selection', align: 'center' },
            { label: '名称', prop: 'name', align: 'center' },
            { label: 'SecretId', prop: 'secretid', align: 'center', width: '230' },
            { label: 'SecretKey', prop: 'secretkey', align: 'center',width: '270'},
            { label: '厂商', prop: 'type', align: 'center', width: '160' },
            { label: 'token', prop: 'token', align: 'center', width: '160',},
            { label: '任务状态', prop: 'taskStatus', align: 'center', width: '200',},
            { label: '创建时间', prop: 'createTime', align: 'center'},
            { label: '更新时间', prop: 'updateTime', align: 'center'},
            { label: '描述', prop: 'remark', align: 'center',},
            { label: t('operate'), align: 'center', render: 'buttons', buttons: optButtons },
        ],
    },
    {
    },
    {
        // 提交前
        onSubmit: ({ formEl, items }) => {
            var items = cloneDeep(items)


            for (const key in items) {
                if (items[key] === null) {
                    delete items[key]
                }
            }

            // 表单验证通过后执行的api请求操作
            let submitCallback = () => {
                baTable.form.submitLoading = true
                baTable.api
                    .postData(baTable.form.operate!, items)
                    .then((res) => {
                        baTable.onTableHeaderAction('refresh', {})
                        baTable.form.submitLoading = false
                        baTable.form.operateIds?.shift()
                        if (baTable.form.operateIds!.length > 0) {
                            baTable.toggleForm('edit', baTable.form.operateIds)
                        } else {
                            baTable.toggleForm()
                        }
                        baTable.runAfter('onSubmit', { res })
                    })
                    .catch(() => {
                        baTable.form.submitLoading = false
                    })
            }

            if (formEl) {
                baTable.form.ref = formEl
                formEl.validate((valid) => {
                    if (valid) {
                        submitCallback()
                    }
                })
            } else {
                submitCallback()
            }
            return false
        },
        // 双击编辑前
        onTableDblclick: ({ row }) => {
            return baTable.table.extend!['adminGroup'].indexOf(row.id) === -1
        },
    },
    {
        getIndex: ({ res }) => {
            baTable.table.extend!['adminGroup'] = res.lists
            let buttonsKey = getArrayKey(baTable.table.column, 'render', 'buttons')
            baTable.table.column[buttonsKey].buttons!.forEach((value: OptButton) => {
                value.display = (row) => {
                    return res.lists.indexOf(row.id) === -1
                }
            })
        },
    }
)

provide('baTable', baTable)

onMounted(() => {
    baTable.table.ref = tableRef.value
    baTable.mount()
    baTable.getIndex()
    // createIAxios(aksk,"GET",null).then((res) =>{
    //     console.log(tableRef.value)
    //     baTable.table.data = res.lists
    // })
})
</script>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'auth/group',
})

</script>

<style scoped lang="scss"></style>
