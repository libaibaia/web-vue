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
        <el-dialog
            class="ba-operate-dialog"
            :close-on-click-modal="false"
            :model-value="dialogVisible"
            @close="dialogVisible = false"
            :destroy-on-close="true"
        >
            <template #header>
                <div class="title" v-drag="['.ba-operate-dialog', '.el-dialog__header']" v-zoom="'.ba-operate-dialog'">
                    {{ baTable.form.operate ? t(baTable.form.operate) : '' }}
                </div>
            </template>
            <el-scrollbar v-loading="loadingStatus" class="ba-table-form-scrollbar">
                <div
                    class="ba-operate-form"
                    :class="'ba-' + baTable.form.operate + '-form'"
                    :style="'width: calc(100% - ' + baTable.form.labelWidth! / 2 + 'px)'"
                >
                    <el-form
                        ref="formRef"
                        @keyup.enter="uploadFile"
                        :model="baTable.form.items"
                        label-position="right"
                        :label-width="baTable.form.labelWidth + 'px'"
                        v-if="!loadingStatus"
                    >
                        <FormItem
                            label="存储桶名称"
                            v-model="localBucketInfo.name"
                            type="string"
                            :placeholder="t('auth.admin.Administrator login')"
                        />
                        <FormItem
                            label="存储桶端点"
                            v-model="localBucketInfo.endpoint"
                            type="string"
                            :placeholder="t('Please input field', { field: t('auth.admin.nike') })"
                        />
                        <FormItem label="文件列表" type="file" />
                    </el-form>
                </div>
            </el-scrollbar>
            <template #footer>
                <div :style="'width: calc(100% - ' + baTable.form.labelWidth! / 1.8 + 'px)'">
                    <el-button @click="dialogVisible = false">{{ t('Cancel') }}</el-button>
                    <el-button v-blur :loading="baTable.form.submitLoading" @click="dialogVisible = false" type="primary">
                        {{ baTable.form.operateIds && baTable.form.operateIds.length > 1 ? t('Save and edit next item') : t('Save') }}
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <!-- 表单 -->
        <PopupForm ref="formRef" />
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref, provide, reactive} from 'vue'
import baTableClass from '/@/utils/baTable'
import { bucket } from '/@/api/controllerUrls'
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
const localBucketInfo = reactive({
    name:'',
    endpoint:''
})
const { t } = useI18n()
const tableRef = ref()
const formRef = ref()
let uploadBtn: OptButton = {
    render: 'tipButton',
    name: 'upload',
    title: '上传文件',
    type: 'primary',
    icon: 'el-icon-UploadFilled',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        localBucketInfo.name = row.name
        localBucketInfo.endpoint = row.endPoint
        uploadFile(row.id)
    }
}
const files = reactive({
    name:''
})
let getFileListBtn: OptButton = {
    render: 'tipButton',
    name: 'fileLists',
    title: '导出文件列表',
    type: 'primary',
    icon: 'el-icon-Download',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        getFileLists(row.id)
    }
}
let optButtons = defaultOptButtons([])
optButtons.push(uploadBtn)
optButtons.push(getFileListBtn)
const baTable = new baTableClass(
    new baTableApi(bucket),
    {
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: 'id', prop: 'id', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query'), width: 70 },
            { label: 'endPoint', prop: 'endPoint', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '所属区域', prop: 'region', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '拥有者账号', prop: 'owner', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: '名称', prop: 'name', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') },
            { label: t('operate'), align: 'center', width: '120', render: 'buttons', buttons: optButtons },
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
const getFileLists = (id:any) =>{
    createIAxios(bucket + "file/download/all","POST",{bucketId:id}).then((res) =>{

    })
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'bucket',
})
</script>

<style scoped lang="scss"></style>
