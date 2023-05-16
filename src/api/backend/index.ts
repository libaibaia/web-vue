import createAxios from '/@/utils/axios'
import { useAdminInfo } from '/@/stores/adminInfo'
import createIAxios from "/@/utils/IRequests";
import router from "/@/router";

const controllerUrl = ''

export function index() {
    return createAxios({
        url: 'api',
        method: 'get',
    })
}

export function login(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + '/api/user/login',
        data: params,
        method: method,
    }) as ApiPromise
}

export function logout() {
    const adminInfo = useAdminInfo()
    return createIAxios("/api/user/logout","GET",null).then((res) =>{
        window.localStorage.removeItem("Authorization")
    })
    // return createAxios({
    //     url: controllerUrl + 'logout',
    //     method: 'POST',
    //     data: {
    //         refresh_token: adminInfo.getToken('refresh'),
    //     },
    // })
}
