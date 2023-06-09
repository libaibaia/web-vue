<template>
    <!-- 对话框表单 -->
    <el-dialog
        class="ba-operate-dialog"
        :close-on-click-modal="false"
        :destroy-on-close="true"
        :model-value="baTable.form.operate ? true : false"
        @close="baTable.toggleForm"
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
                    v-if="!baTable.form.loading"
                >
                    <el-form-item prop="username" :label="t('user.user.User name')">
                        <el-input
                            v-model="baTable.form.items!.username"
                            type="string"
                            :placeholder="t('Please input field', { field: t('user.user.User name') + '(' + t('user.user.Login account') + ')' })"
                        ></el-input>
                    </el-form-item>
                    <el-form-item v-if="baTable.form.operate == 'edit'" :label="t('user.user.balance')">
                        <el-input v-model="baTable.form.items!.money" readonly>
                            <template #append>
                                <el-button @click="changeAccount('money')">{{ t('user.user.Adjustment balance') }}</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="baTable.form.operate == 'edit'" :label="t('user.user.integral')">
                        <el-input v-model="baTable.form.items!.score" readonly>
                            <template #append>
                                <el-button @click="changeAccount('score')">{{ t('user.user.Adjust integral') }}</el-button>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" :label="t('user.user.password')">
                        <el-input
                            v-model="baTable.form.items!.password"
                            type="password"
                            :placeholder="
                                baTable.form.operate == 'add'
                                    ? t('Please input field', { field: t('user.user.password') })
                                    : t('user.user.Please leave blank if not modified')
                            "
                        ></el-input>
                    </el-form-item>
                    <FormItem
                        :label="t('state')"
                        v-model="baTable.form.items!.status"
                        type="radio"
                        :data="{ content: { disable: t('Disable'), enable: t('Enable') }, childrenAttr: { border: true } }"
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
import { ref, reactive, inject, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type baTableClass from '/@/utils/baTable'
import { regularPassword } from '/@/utils/validate'
import type { ElForm, FormItemRule } from 'element-plus'
import FormItem from '/@/components/formItem/index.vue'
import { bucket } from '/@/api/controllerUrls'
import createIAxios from '/@/utils/IRequests'
import router from '/@/router'
import { buildValidatorData } from '/@/utils/validate'
const formRef = ref<InstanceType<typeof ElForm>>()
const baTable = inject('baTable') as baTableClass

const { t } = useI18n()


const changeAccount = (type: string) => {
    baTable.toggleForm()
    router.push({
        name: type == 'money' ? 'user/moneyLog' : 'user/scoreLog',
        query: {
            user_id: baTable.form.items!.id,
        },
    })
}

watch(
    () => baTable.form.operate,
    (newVal) => {
        rules.password![0].required = newVal == 'add'
    }
)

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
