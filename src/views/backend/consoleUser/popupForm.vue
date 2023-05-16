<template>
    <!-- 对话框表单 -->
</template>

<script setup lang="ts">
import { ref, reactive, inject, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type baTableClass from '/@/utils/baTable'
import { regularPassword, buildValidatorData } from '/@/utils/validate'
import type { ElForm, FormItemRule } from 'element-plus'
import FormItem from '/@/components/formItem/index.vue'
import { useAdminInfo } from '/@/stores/adminInfo'

const adminInfo = useAdminInfo()
const formRef = ref<InstanceType<typeof ElForm>>()
const baTable = inject('baTable') as baTableClass

const { t } = useI18n()

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
