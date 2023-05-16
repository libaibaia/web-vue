<template>
    <!-- 对话框表单 -->
    <el-dialog
        class="ba-operate-dialog"
        :close-on-click-modal="false"
        :model-value="baTable.form.operate ? true : false"
        @close="baTable.toggleForm"
        :destroy-on-close="true"
    >
        <template #header>
            <div class="title" v-drag="['.ba-operate-dialog', '.el-dialog__header']" v-zoom="'.ba-operate-dialog'">
                {{ baTable.form.operate ? t(baTable.form.operate) : '' }}
            </div>
        </template>
        <el-scrollbar v-loading="baTable.form.loading" class="ba-table-form-scrollbar">
            <div
                class="ba-operate-form"
                :class="'ba-' + baTable.form.operate + '-form'"
                :style="'width: calc(100% - ' + baTable.form.labelWidth! / 2 + 'px)'"
            >
                <el-form
                    ref="formRef"
                    @keyup.enter="baTable.onSubmit(formRef)"
                    :model="formData.data"
                    label-position="right"
                    :label-width="baTable.form.labelWidth + 'px'"
                    :rules="rules"
                    v-if="!baTable.form.loading"
                >
                    <el-form-item prop="secretId" label="secretId">
                        <el-input
                            v-model="formData.data.secretid"
                            type="string"
                            :placeholder="t('Please input field', { field: '请输入secretID' })"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="secretKey" label="secretKey">
                        <el-input
                            v-model="formData.data.secretkey"
                            type="string"
                            :placeholder="t('Please input field', { field: '请输入secretKey' })"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="token" label="token">
                        <el-input
                            v-model="formData.data.token"
                            type="string"
                            :placeholder="t('Please input field', { field: '请输入token' })"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="type" label="厂商类型">
                        <el-select v-model="formData.data.type" placeholder="请选择">
                            <el-option v-for="item in options" :key="item" :label="item.label" :value="item.values">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <FormItem
                        :label="t('state')"
                        type="radio"
                        :data="{ content: { '0': t('Disable'), '1': t('Enable') }, childrenAttr: { border: true } }"
                    />
                </el-form>
            </div>
        </el-scrollbar>
        <template #footer>
            <div :style="'width: calc(100% - ' + baTable.form.labelWidth! / 1.8 + 'px)'">
                <el-button @click="baTable.toggleForm('')">{{ t('Cancel') }}</el-button>
                <el-button v-blur :loading="baTable.form.submitLoading" @click="postData" type="primary">
                    {{ baTable.form.operateIds && baTable.form.operateIds.length > 1 ? t('Save and edit next item') : t('Save') }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import type baTableClass from '/@/utils/baTable'
import FormItem from '/@/components/formItem/index.vue'
import { getMenuRules } from '/@/api/backend/auth/group'
import type { ElForm, ElTree, FormItemRule } from 'element-plus'
import { uuid } from '/@/utils/random'
import { buildValidatorData } from '/@/utils/validate'
import type Node from 'element-plus/es/components/tree/src/model/node'
import createIAxios from "/@/utils/IRequests";
import {aksk} from "/@/api/controllerUrls";

interface MenuRules {
    id: number
    title: string
    children: MenuRules[]
}
const treeRef = ref<InstanceType<typeof ElTree>>()
const formRef = ref<InstanceType<typeof ElForm>>()
const baTable = inject('baTable') as baTableClass

const { t } = useI18n()
const formData = reactive({
    data:{
        secretid:"",
        secretkey:"",
        type:"",
        token:''
    },
})
const rules = reactive({
    secretid:[{required:true,message:"请输入secretId",trigger:'blur'}],
    secretkey:[{required:true,message:"请输入secretKey",trigger:'blur'}],
})
const state: {
    treeKey: string
    defaultCheckedKeys: number[]
    menuRules: MenuRules[]
} = reactive({
    treeKey: uuid(),
    defaultCheckedKeys: [],
    menuRules: [],
})
const options =[
    {
        label:"腾讯",
        values: "Tencent"
    },
    {
        label:"阿里云",
        values: "AliYun"
    },
    {
        label:"未知",
        values: "no"
    },

]
const values = ref('')
const postData = () => {
    baTable.form.submitLoading = true
    createIAxios(aksk + "add","post",formData.data).then((res) =>{
        baTable.form.submitLoading = false
        console.log(res)
    }).catch((error)=>{
        baTable.form.submitLoading = false
    })
    baTable.toggleForm()

}
// getMenuRules().then((res) => {
//     state.menuRules = res.data.list
// })


// watch(
//     () => baTable.form.items!.rules,
//     () => {
//         if (baTable.form.items!.rules && baTable.form.items!.rules.length) {
//             if (baTable.form.items!.rules.includes('*')) {
//                 let arr: number[] = []
//                 for (const key in state.menuRules) {
//                     arr.push(state.menuRules[key].id)
//                 }
//                 state.defaultCheckedKeys = arr
//             } else {
//                 state.defaultCheckedKeys = baTable.form.items!.rules
//             }
//         } else {
//             state.defaultCheckedKeys = []
//         }
//         state.treeKey = uuid()
//     }
// )
</script>

<style scoped lang="scss">
:deep(.penultimate-node) {
    .el-tree-node__children {
        padding-left: 60px;
        white-space: pre-wrap;
        line-height: 12px;
        .el-tree-node {
            display: inline-block;
        }
        .el-tree-node__content {
            padding-left: 5px !important;
            padding-right: 5px;
            .el-tree-node__expand-icon {
                display: none;
            }
        }
    }
}
</style>
