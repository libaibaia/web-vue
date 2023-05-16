import createAxios from '/@/utils/axios'

const controllerUrl = '/api/user/'
export const actionUrl = new Map([
    ['index', controllerUrl + 'userInfo'],
    ['edit', controllerUrl + 'edit'],
    ['log', controllerUrl + 'log'],
])

export function index() {
    return createAxios({
        url: actionUrl.get('index'),
        method: 'get',
    })
}

export function log(filter: anyObj = {}): ApiPromise<TableDefaultData> {
    return createAxios({
        url: actionUrl.get('log'),
        method: 'get',
        params: filter,
    }) as ApiPromise
}

export function postData(data: anyObj) {
    return createAxios(
        {
            url: actionUrl.get('edit'),
            method: 'post',
            data: data,
        },
        {
            showSuccessMessage: true,
        }
    )
}
