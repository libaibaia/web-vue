<template>
    <el-upload
        class="upload-demo"
        drag
        multiple
        :before-upload="handleBeforeUpload"
        :headers="{ Authorization: getHeaders() }"
        accept=".xlsx,.csv,.xls"
        style="align-content: center"
    >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            拖拽文件到这里或 <em>点击上传</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                仅支持excel文件
            </div>
        </template>
    </el-upload>
</template>

<script setup lang="ts">
import {ElMessage, UploadRawFile} from "element-plus";
import createAxios from "/@/utils/axios";

const getHeaders = () => {
    return window.localStorage.getItem('Authorization')
}
const handleBeforeUpload = (rawFile: UploadRawFile)=> {
    const formData = new FormData();
    formData.append('file', rawFile);
    createAxios({
        url: "api/ak/import",
        method: 'POST',
        data: formData,
    }).then(response => {
        if (response.status === 200 && response.code === 200) {
            ElMessage.success("上传成功")
            // 处理上传成功后的操作
        }
    }).catch(error => {
    });
}
</script>

<style scoped lang="scss">
.upload-wrapper {
    background-color: white;
    border: 2px solid blue;
    padding: 20px;
}
.upload-wrapper label {
    font-size: 25px;
    color: black;
}

</style>
