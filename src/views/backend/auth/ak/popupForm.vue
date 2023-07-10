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
                    :model="baTable.form.items"
                    label-position="right"
                    :label-width="baTable.form.labelWidth + 'px'"
                    :rules="rules"
                    v-if="!baTable.form.loading"
                >
                    <el-form-item prop="name" label="名称">
                        <el-input
                            v-model="baTable.form.items!.name"
                            type="string"
                            :placeholder="t('Please input field', { field: '名称' })"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="secretid" label="secretid">
                        <el-input
                            v-model="baTable.form.items!.secretid"
                            type="string"
                            :placeholder="t('Please input field', { field: 'secretID' })"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="secretkey" label="secretkey">
                        <el-input
                            v-model="baTable.form.items!.secretkey"
                            type="string"
                            :placeholder="t('Please input field', { field: 'secretKey' })"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="token" label="token">
                        <el-input
                            v-model="baTable.form.items!.token"
                            type="string"
                            :placeholder="t('Please input field', { field: 'token' })"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="bucketName" label="bucketName">
                        <el-input
                            v-model="baTable.form.items!.bucketName"
                            type="string"
                            :placeholder="t('Please input field', { field: '存储桶名称，逗号分割，如果不具备listBucket权限则无法列举存储桶' })"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="remark" label="描述信息">
                        <el-input
                            v-model="baTable.form.items!.remark"
                            type="string"
                            :placeholder="t('Please input field', { field: '备注信息' })"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="type" label="厂商类型">
                        <el-select v-model="baTable.form.items!.type" placeholder="请选择">
                            <el-option v-for="item in options" :key="item" :label="item.label" :value="item.values">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <FormItem
                        :label="t('state')"
                        v-model="baTable.form.items!.status"
                        type="radio"
                        :data="{ content: { '0': '立即检测', '1': '手动执行' }, childrenAttr: { border: true } }"
                    />
                </el-form>
            </div>
        </el-scrollbar>
        <template #footer>
            <div :style="'width: calc(100% - ' + baTable.form.labelWidth! / 1.8 + 'px)'">
                <el-button @click="baTable.toggleForm('')">{{ t('Cancel') }}</el-button>
                <el-button v-blur :loading="baTable.form.submitLoading" @click="baTable.onSubmit(formRef)" type="primary">
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
        id:"",
        secretid:"",
        secretkey:"",
        type:"",
        token:'',
        bucketName:'',
        remark:'',
        name:'',
        status: false
    },
})
const rules = reactive({
    secretid:[{required:true,message:"请输入secretId",trigger:'blur'}],
    secretkey:[{required:true,message:"请输入secretKey",trigger:'blur'}],
    type:[{required:true,message:"请选择类型",trigger:'blur'}],
    name:[{required:true,message:"请输入名称",trigger:'blur'}],
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
        label:"亚马逊",
        values: "AWS"
    },
    {
        label:"华为",
        values: "HUAWEI"
    },
    {
        label:"阿里云",
        values: "AliYun"
    },
    {
        label:"七牛",
        values: "QINiu"
    }
]

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
