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
    </div>

</template>

<script setup lang="ts">
import {ref, provide, reactive} from 'vue'
import baTableClass from '/@/utils/baTable'
import {bucket, cluster, task} from '/@/api/controllerUrls'
import Table from '/@/components/table/index.vue'
import TableHeader from '/@/components/table/header/index.vue'
import { defaultOptButtons } from '/@/components/table'
import { baTableApi } from '/@/api/common'
import { useI18n } from 'vue-i18n'
import { saveAs } from 'file-saver';
import createIAxios from "/@/utils/IRequests";
import {TableColumn, TableRow} from "../../../../types/table";
import {ElMessage, ElNotification} from "element-plus";
import createDownloadAxios from "/@/utils/downloadFile";
const { t } = useI18n()
const tableRef = ref()

let getKubeConfigBtn: OptButton = {
    render: 'tipButton',
    name: 'kube',
    title: '获取kubeConfig文件',
    type: 'primary',
    icon: 'el-icon-Download',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        getKubeConfig(row.id)
    }
}
let openEndPointBtn: OptButton = {
    render: 'tipButton',
    name: 'endPoint',
    title: '打开集群外部访问',
    type: 'primary',
    icon: 'el-icon-Open',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        openEndPoint(row.id)
    }
}
let updateClusterInfoBtn: OptButton = {
    render: 'tipButton',
    name: 'updateInfo',
    title: '更新信息',
    type: 'primary',
    icon: 'el-icon-RefreshLeft',
    class: 'table-row-info',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        updateClusterInfo(row.id)
    }
}
let getCmd: OptButton = {
    render: 'tipButton',
    name: 'getCmd',
    title: '获取接管集群脚本',
    type: 'primary',
    icon: 'el-icon-ArrowDownBold',
    class: 'table-row-info',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        getKubeController(row.id)
    }
}
const getKubeConfig = (id:any) =>{
    createDownloadAxios(cluster + "kubeConfig",'GET',id).then(response => {
        const filename = response.headers['content-disposition'].split('filename=')[1];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url); // 释放URL对象
    }).catch(error => {
        ElNotification({
            type: 'error',
            message: "下载失败",
        })
    });
}
const getKubeController = (id:any) => {
    createIAxios(cluster + "createKubeController?id=" + id,"GET",null).then((res) =>{
        const blob = new Blob([res.data], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'execute.sh');
    })
}
const updateClusterInfo = (id:any) =>{
    createIAxios(cluster + "updateStatus","POST",{clusterId:id}).then((res) =>{
    })
}
const openEndPoint = (id:any) =>{
    createIAxios(cluster + "openEndpoint","POST",{clusterId:id}).then((res) =>{
        if (res.data.data.indexOf("成功") === -1){
            ElMessage.error(res.data.data)
        }else ElMessage.error(res.data.data)
    })
}
let optButtons = defaultOptButtons([])
optButtons.push(getKubeConfigBtn)
optButtons.push(openEndPointBtn)
optButtons.push(updateClusterInfoBtn)
optButtons.push(getCmd)
const baTable = new baTableClass(
    new baTableApi(cluster),
    {
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: 'key名称', prop: 'keyName', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '集群ID', prop: 'clusterId', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '集群名称', prop: 'clusterName', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '描述', prop: 'clusterDescription', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '集群系统', prop: 'clusterOs', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '集群类型', prop: 'clusterType', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: 'K8S版本', prop: 'clusterVersion', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '运行时类型', prop: 'containerRuntime', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '区域', prop: 'region', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '访问端点', prop: 'endpointInfo', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '安全组', prop: 'endpointSecurityGroup', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: t('operate'),render: 'buttons', buttons: optButtons },
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
    name: 'cluster',
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
