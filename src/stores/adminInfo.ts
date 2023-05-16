import { defineStore } from 'pinia'
import { ADMIN_INFO } from '/@/stores/constant/cacheKey'
import { AdminInfo } from '/@/stores/interface'

export const useAdminInfo = defineStore('adminInfo', {
    state: (): AdminInfo => {
        return {
            id: 0,
            username: '',
            nike: '',
            avatar: '',
            lastlogintime: '',
            tokenValue: '',
            refreshToken: '',
            // 是否是superAdmin，用于判定是否显示终端按钮等，不做任何权限判断
            super: false,
        }
    },
    actions: {
        dataFill(state: AdminInfo) {
            this.$state = { ...this.$state, ...state }
        },
        removeToken() {
            this.tokenValue = ''
            this.refreshToken = ''
        },
        setToken(token: string, type: 'tokenValue' | 'refreshToken') {
            this[type] = token
        },
        getToken(type: 'auth' | 'refresh' = 'auth') {
            return type === 'auth' ? this.tokenValue : this.refreshToken
        },
        setSuper(val: boolean) {
            this.super = val
        },
    },
    persist: {
        key: ADMIN_INFO,
    },
})
