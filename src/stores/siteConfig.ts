import { defineStore } from 'pinia'
import { SiteConfig } from '/@/stores/interface'

export const useSiteConfig = defineStore('siteConfig', {
    state: (): SiteConfig => {
        return {
            siteName: '',
            recordNumber: '',
            version: '',
            cdnUrl: '',
            apiUrl: '',
            upload: {
                mode: 'local',
                maxsize: 1024 * 1024 * 1024,
                mimetype: '*',
                savename: '',
            },
        }
    },
    actions: {
        dataFill(state: SiteConfig) {
            this.$state = state
        },
    },
})
