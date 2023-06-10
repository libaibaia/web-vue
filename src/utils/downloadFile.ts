
import {task} from "/@/api/controllerUrls";
import createAxios from "/@/utils/axios";

export default function createDownloadAxios(url : string,method:string,data :any | null) {
    return createAxios(
        {
            method: method,
            url: url + "?id=" + data,
            responseType: 'blob',
            headers:{
                'Authorization': window.localStorage.getItem("Authorization")
            }
        },
        {
            showSuccessMessage: true,
            reductDataFormat:false
        }
    )
}
