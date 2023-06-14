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

        <!-- 表单 -->
<!--        <PopupForm />-->
<!--        下面的dialog不能放到根元素，否则导致组件无法显示-->
        <el-dialog v-model="dialogVisible" title="执行命令" width="30%" draggable>
            <label>阿里云服务器执行命令因为获取结果需要延迟获取，后台设置了10秒延迟，只要不报错可以多等会</label>
            <span>
        <el-form :model="instanceInfo"  ref="navigation" label-position="left"   label-width="80px">
             <el-form-item label="ID" prop="id">
               <el-input v-model="instanceInfo.id"  disabled></el-input>
             </el-form-item>
            <el-form-item label="实例ID" prop="instanceId">
               <el-input v-model="instanceInfo.instanceId" disabled></el-input>
             </el-form-item>
            <el-form-item label="所属区域" prop="region">
               <el-input v-model="instanceInfo.region" disabled></el-input>
             </el-form-item>
            <el-form-item label="执行参数" prop="execArgs">
               <el-input v-model="instanceInfo.execArgs"></el-input>
             </el-form-item>
            <div class="exec-message">
                <div class="message-item">{{ instanceInfo.execRes}}</div>
            </div>
    </el-form>
        </span>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="getExecRes">
          执行
        </el-button>
      </span>
            </template>
        </el-dialog>
        <el-dialog
            v-model="createPairKey.status"
            title="Tips"
            width="30%"
        >
         <span>
              <span style="color: red;align-content: center">!!!!是否确认生成密钥对，创建后自动导入对应实例，期间服务器会重启，且关闭密码登录,只能使用密钥登录，另外原密钥会被替换成新的，当然初次数据库会保存原来的密钥信息，可以还原</span>
        <el-form  ref="navigation" label-position="left"   label-width="80px">
            <el-form-item label="实例ID" prop="instanceId">
               <el-input v-model="instanceInfo.instanceId" disabled></el-input>
             </el-form-item>
            <el-form-item prop="keyPairName" label="key名称" >
               <el-input v-model="instanceInfo.keyPairName"></el-input>
             </el-form-item>
            <el-form-item prop="keyPairName" label="key内容" >
               <el-input type="textArea" v-model="instanceInfo.key"></el-input>
             </el-form-item>
    </el-form>
        </span>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="createPairKey.status = false">取消</el-button>
        <el-button type="primary" @click="createPairKeys">
          确认
        </el-button>
      </span>
            </template>
        </el-dialog>
    </div>

</template>

<script setup lang="ts">
import {ref, provide, reactive} from 'vue'
import baTableClass from '/@/utils/baTable'
import { instance } from '/@/api/controllerUrls'
import Table from '/@/components/table/index.vue'
import TableHeader from '/@/components/table/header/index.vue'
import { defaultOptButtons } from '/@/components/table'
import { baTableApi } from '/@/api/common'
import { useI18n } from 'vue-i18n'
import createIAxios from "/@/utils/IRequests";
import {TableColumn, TableRow} from "../../../../types/table";
const { t } = useI18n()
const tableRef = ref()

const dialogVisible = ref(false)
let execBtn: OptButton = {
    render: 'tipButton',
    name: 'test',
    title: '执行命令',
    type: 'primary',
    icon: 'local-terminal',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        instanceInfo.instanceId = row.instanceId
        instanceInfo.id = row.id
        instanceInfo.region = row.region
        instanceInfo.execRes = ''
        instanceInfo.execArgs = ''
        dialogVisible.value = true
    }
}
const createPairKey = reactive({
    status:false,
    ConfirmCreatePairKey:false
})
let createPairKeyBtn : OptButton = {
    render: 'tipButton',
    name: '生成密钥对',
    title: '生成密钥对',
    type: 'primary',
    icon: 'el-icon-Key',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        instanceInfo.instanceId = row.instanceId
        instanceInfo.id = row.id
        createPairKey.status = true
    }
}
let restoreKey : OptButton = {
    render: 'tipButton',
    name: '还原密钥对',
    title: '还原密钥对',
    type: 'primary',
    icon: 'el-icon-Key',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        createIAxios("/api/instance/restoreKey?id=" + row.id,"GET",null).then((res) =>{
        })
    }
}
let optButtons = defaultOptButtons([])
optButtons.push(execBtn)
optButtons.push(restoreKey)
optButtons.push(createPairKeyBtn)
const getExecRes = ()=>{
    createIAxios("/api/instance/exec","POST",instanceInfo).then((res) =>{
        instanceInfo.execRes = res.execResult
    })
}
const createPairKeys = ()=>{
    createIAxios("/api/instance/pair","POST",{id:instanceInfo.id,keyName:instanceInfo.keyPairName,key:instanceInfo.key}).then((res) =>{
        createPairKey.status = false
    })

}
const instanceInfo = reactive({
    //数据库中的实例id，不是腾讯云中实例ID
    id:'',
    instanceId:'',
    region:'',
    execArgs:'',
    execRes:'',
    keyPairName:'',
    key:''
})
const baTable = new baTableClass(
    new baTableApi(instance),
    {
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: 'id', prop: 'id', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query'), width: 70 },
            { label: 'key名称', prop: 'keyName', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '实例ID', prop: 'instanceId', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '所属区域', prop: 'region', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '原始密钥对', prop: 'originalKeyPair', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '公钥', prop: 'publicKey', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '私钥', prop: 'privateKey', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '是否可执行命令', prop: 'isCommand', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: 'IP', prop: 'ip', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: 'type', prop: 'type', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            {
                label: t('operate'),
                width: '180',
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
    name: 'instance',
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
