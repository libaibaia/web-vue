<template>
    <div class="default-main ba-table-box">
        <el-alert class="ba-table-alert" v-if="baTable.table.remark" :title="baTable.table.remark" type="info" show-icon />

        <!-- 表格顶部菜单 -->
        <TableHeader
            :buttons="['refresh', 'delete','quickSearch']"
            quick-search-placeholder="通过密钥名称搜索"
        />

        <!-- 表格 -->
        <!-- 要使用`el-table`组件原有的属性，直接加在Table标签上即可 -->
        <Table ref="tableRef" />

        <!-- 表单 -->
        <PopupForm ref="formRef" />
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref, provide, reactive} from 'vue'
import baTableClass from '/@/utils/baTable'
import {bucket, task} from '/@/api/controllerUrls'
import PopupForm from './popupForm.vue'
import Table from '/@/components/table/index.vue'
import TableHeader from '/@/components/table/header/index.vue'
import { defaultOptButtons } from '/@/components/table'
import type { ElForm, FormItemRule } from 'element-plus'
import FormItem from '/@/components/formItem/index.vue'
import { baTableApi } from '/@/api/common'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash-es'
import createIAxios from "/@/utils/IRequests";
import {TableColumn, TableRow} from "../../../../types/table";
import {useBaAccount} from "/@/stores/baAccount";
import header from "/@/layouts/backend/components/header.vue";
import axios from "axios";
import {getUrl} from "/@/utils/axios";
const localBucketInfo = reactive({
    name:'',
    endpoint:''
})
const { t } = useI18n()
const tableRef = ref()
const formRef = ref()
let downloadFile: OptButton = {
    render: 'tipButton',
    name: 'fileLists',
    title: '下载文件',
    type: 'primary',
    icon: 'el-icon-Download',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        downloadFileFun(row.id)
    }
}
let optButtons = defaultOptButtons([])
optButtons.push(downloadFile)
const baTable = new baTableClass(
    new baTableApi(task),
    {
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: 'id', prop: 'id', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query'), width: 70 },
            { label: '用户id', prop: 'userId', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '状态', prop: 'status', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '所属存储桶', prop: 'bucket', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '文件名称', prop: 'filename', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: t('operate'), align: 'center', width: '130', render: 'buttons', buttons: optButtons },
        ],
    },
)

provide('baTable', baTable)
onMounted(() => {
    baTable.table.ref = tableRef.value
    baTable.mount()
    baTable.getIndex()
})
const loadingStatus = ref(false)

const bucketInfo = useBaAccount()
const dialogVisible = ref(false)
const uploadFile = (id:any)=>{
    dialogVisible.value = true
    bucketInfo.setBucketID(id)
}
const downloadFileFun = (id:any) =>{
    const url = getUrl() + task + `download?id=${id}`;
    axios({
        method: 'get',
        url: url,
        responseType: 'blob'
    }).then(response => {
        console.log(response.headers['content-disposition'])
        const filename = response.headers['content-disposition'].split('filename=')[1];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url); // 释放URL对象
    }).catch(error => {
        console.log(error);
    });
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'task',
})
</script>

<style scoped lang="scss"></style>
