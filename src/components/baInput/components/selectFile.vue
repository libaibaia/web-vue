<template>
    <div>
        <el-dialog
            @close="emits('update:modelValue', false)"
            width="60%"
            :model-value="modelValue"
            class="ba-upload-select-dialog"
            title="文件列表"
            :append-to-body="true"
            :destroy-on-close="true"
            top="4vh"
        >
            <TableHeader
                :buttons="['refresh','quickSearch']"
                :quick-search-placeholder="t('quick Search Placeholder', { fields: '文件前缀' })"
            >
            </TableHeader>

            <Table ref="tableRef" @selection-change="onSelectionChange" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, provide, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import Table from '/@/components/table/index.vue'
import TableHeader from '/@/components/table/header/index.vue'
import baTableClass from '/@/utils/baTable'
import { defaultOptButtons } from '/@/components/table'
import { routineAttachment } from '/@/api/controllerUrls'
import { previewRenderFormatter } from '/@/views/backend/routine/attachment'
import { baTableApi } from '/@/api/common'
import {useBaAccount} from "/@/stores/baAccount";
import {TableColumn, TableRow} from "../../../../types/table";
import createIAxios from "/@/utils/IRequests";

interface Props {
    type?: 'image' | 'file'
    limit?: number
    modelValue: boolean
    returnFullUrl?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'file',
    limit: 0,
    modelValue: false,
    returnFullUrl: false,
})

const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'choice', value: string[]): void
}>()
let optButtons = defaultOptButtons([])
const downloadFileFun = (id:any,key:any)=>{
    createIAxios(routineAttachment + "download","POST",{key:key,bucketId:id}).then((res) =>{
        window.open(res.url,"_blank")
    })
}
let downloadFile: OptButton = {
    render: 'tipButton',
    name: 'fileLists',
    title: '下载文件',
    type: 'primary',
    icon: 'el-icon-Download',
    class: 'table-row-edit',
    disabledTip: false,
    click:(row: TableRow, field: TableColumn)=>{
        downloadFileFun(row.bucketId,row.key)
    }
}
optButtons.push(downloadFile)
const tableRef = ref()
const { t } = useI18n()
const state = reactive({
    ready: false,
    tableSelectable: true,
})

const optBtn: OptButton[] = [
    {
        render: 'tipButton',
        name: 'choice',
        text: '文件列表',
        type: 'primary',
        icon: 'fa fa-check',
        class: 'table-row-choice',
        disabledTip: false,
        click: (row: TableRow) => {
            const elTableRef = tableRef.value.getRef()
            elTableRef.clearSelection()
            emits('choice', props.returnFullUrl ? [row.full_url] : [row.url])
        },
    },
]
const baTable = new baTableClass(new baTableApi(routineAttachment), {
    column: [
        {
            type: 'selection',
            selectable: (row: TableRow) => {
                if (props.limit == 0) return true
                if (baTable.table.selection) {
                    for (const key in baTable.table.selection) {
                        if (row.id == baTable.table.selection[key].id) {
                            return true
                        }
                    }
                }
                return state.tableSelectable
            },
            align: 'center',
            operator: false,
        },
        { label: '存储桶ID', prop: 'bucketId', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query'), width: 150 },
        { label: '存储桶名称', prop: 'bucketName', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query'), width: 150 },
        { label: '文件名称', prop: 'key', align: 'center', operator: 'LIKE', operatorPlaceholder: t('Fuzzy query') ,width: 150 },
        {
            label: 'url',
            prop: 'url',
            align: 'center',
            operator: 'LIKE',
            'show-overflow-tooltip': true,
            operatorPlaceholder: t('Fuzzy query'),
        },
        {
            label: '拥有者',
            prop: 'owner',
            align: 'center',
            'show-overflow-tooltip': true,
            operator: 'LIKE',
            operatorPlaceholder: t('Fuzzy query'),
        },
        { label: t('operate'), align: 'center', width: '130', render: 'buttons', buttons: optButtons },
    ],
    defaultOrder: { prop: 'lastuploadtime', order: 'desc' },

})

provide('baTable', baTable)
let u = useBaAccount()
const getIndex = () => {
    if (props.type == 'image') {
        baTable.table.filter!.search = [{ field: 'mimetype', val: 'image', operator: 'LIKE' }]
    }
    baTable.table.ref = tableRef.value
    baTable.table.filter!.id = u.bucketID
    baTable.getIndex()?.then(() => {
        baTable.initSort()
    })
    state.ready = true
}

const onChoice = () => {
    if (baTable.table.selection?.length) {
        let files: string[] = []
        for (const key in baTable.table.selection) {
            files.push(props.returnFullUrl ? baTable.table.selection[key].full_url : baTable.table.selection[key].url)
        }
        emits('choice', files)
        const elTableRef = tableRef.value.getRef()
        elTableRef.clearSelection()
    }
}

const onSelectionChange = (selection: TableRow[]) => {
    if (props.limit == 0) return
    if (selection.length > props.limit) {
        const elTableRef = tableRef.value.getRef()
        elTableRef.toggleRowSelection(selection[selection.length - 1], false)
    }
    state.tableSelectable = !(selection.length >= props.limit)
}

onMounted(() => {
    baTable.mount()
})

watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal && !state.ready) {
            nextTick(() => {
                getIndex()
            })
        }
    }
)
</script>

<style>
.ba-upload-select-dialog .el-dialog__body {
    padding: 10px 20px;
}
.table-header-operate-text {
    margin-left: 6px;
}
.ml-10 {
    margin-left: 10px;
}
.selection-count {
    color: var(--el-color-primary);
    font-weight: bold;
}
</style>
