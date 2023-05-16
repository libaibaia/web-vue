import axios from 'axios'
import createAxios from "/@/utils/axios";

export default function createIAxios(url : string,method:string,data :any | null) {
    return createAxios(
        {
            url: url,
            method: method,
            data: data,
        },
        {
            showSuccessMessage: true,
        }
    )
}

