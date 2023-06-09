import { defineStore } from 'pinia'
import { BA_ACCOUNT } from '/@/stores/constant/cacheKey'
import { UserInfo } from '/@/stores/interface'
import { postLogout } from '/@/api/backend/module'
import { Local } from '/@/utils/storage'
import router from '../router'

export const useBaAccount = defineStore('baAccount', {
    state: (): UserInfo => {
        return {
            id: 0,
            isTrue: false,
            username: '',
            nike: '',
            email: '',
            mobile: '',
            avatar: '',
            gender: 0,
            birthday: '',
            money: 0,
            score: 0,
            lastlogintime: '',
            lastloginip: '',
            jointime: '',
            motto: '',
            token: '',
            refreshToken: '',
            bucketID:''
        }
    },
    actions: {
        dataFill(state: UserInfo) {
            this.$state = state
        },
        setBucketID(ID:any){
            this.bucketID = ID
        },
        removeToken() {
            this.token = ''
            this.refreshToken = ''
        },
        getGenderIcon() {
            let icon = { name: 'fa fa-transgender-alt', color: 'var(--el-text-color-secondary)' }
            switch (this.gender) {
                case 1:
                    icon = { name: 'fa fa-mars-stroke-v', color: 'var(--el-color-primary)' }
                    break
                case 2:
                    icon = { name: 'fa fa-mars-stroke', color: 'var(--el-color-danger)' }
                    break
            }
            return icon
        },
        setToken(token: string, type: 'token' | 'refreshToken') {
            this[type] = token
        },
        getToken(type: 'auth' | 'refresh' = 'auth') {
            return type === 'auth' ? this.token : this.refreshToken
        },
        setIstrue(value:boolean){
            this.isTrue = value
        },
        getIsTrue(){
          return this.isTrue
        },
        logout() {
            postLogout().then((res) => {
                if (res.code == 1) {
                    Local.remove(BA_ACCOUNT)
                    router.go(0)
                }
            })
        },
    },
    persist: {
        key: BA_ACCOUNT,
    },
})
