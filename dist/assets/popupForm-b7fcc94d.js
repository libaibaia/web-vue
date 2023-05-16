import{h as z,p as s,B as f,C as i,W as c,l as B,T as b,U as u,k as e,o as g,q as r,m as y,N as T,$ as W,a2 as j,t as d,Y as p}from"./vue-a98ef309.js";import{X as P,b as I,_ as M}from"./index-0c819fdc.js";const N=(h,l,t)=>["gif","jpg","jpeg","bmp","png","webp"].includes(t)?h.full_url:P(t),O={class:"title"},$={class:"block-help"},q=z({__name:"popupForm",setup(h){const l=j("baTable"),{t}=I();return(V,o)=>{const v=d("el-image"),m=d("el-form-item"),n=d("el-input"),w=d("el-form"),S=d("el-scrollbar"),_=d("el-button"),U=d("el-dialog"),x=p("drag"),C=p("zoom"),F=p("loading"),k=p("blur");return s(),f(U,{class:"ba-operate-dialog","close-on-click-modal":!1,"model-value":!!e(l).form.operate,onClose:e(l).toggleForm},{header:i(()=>[c((s(),B("div",O,[b(u(e(l).form.operate?e(t)(e(l).form.operate):""),1)])),[[x,[".ba-operate-dialog",".el-dialog__header"]],[C,".ba-operate-dialog"]])]),footer:i(()=>[g("div",{style:y("width: calc(100% - "+e(l).form.labelWidth/1.8+"px)")},[r(_,{onClick:o[12]||(o[12]=a=>e(l).toggleForm(""))},{default:i(()=>[b(u(e(t)("Cancel")),1)]),_:1}),c((s(),f(_,{loading:e(l).form.submitLoading,onClick:o[13]||(o[13]=a=>e(l).onSubmit()),type:"primary"},{default:i(()=>[b(u(e(l).form.operateIds.length>1?e(t)("Save and edit next item"):e(t)("Save")),1)]),_:1},8,["loading"])),[[k]])],4)]),default:i(()=>[c((s(),f(S,{class:"ba-table-form-scrollbar"},{default:i(()=>[g("div",{class:W(["ba-operate-form","ba-"+e(l).form.operate+"-form"]),style:y("width: calc(100% - "+e(l).form.labelWidth/2+"px)")},[r(w,{onKeyup:o[10]||(o[10]=T(a=>e(l).onSubmit(),["enter"])),modelValue:e(l).form.items,"onUpdate:modelValue":o[11]||(o[11]=a=>e(l).form.items=a),"label-position":"right","label-width":e(l).form.labelWidth+"px"},{default:i(()=>[r(m,{label:e(t)("utils.preview")},{default:i(()=>[r(v,{class:"preview-img","preview-src-list":[e(l).form.items.full_url],src:e(N)(e(l).form.items,{},e(l).form.items.suffix)},null,8,["preview-src-list","src"])]),_:1},8,["label"]),r(m,{label:e(t)("utils.Breakdown")},{default:i(()=>[r(n,{modelValue:e(l).form.items.topic,"onUpdate:modelValue":o[0]||(o[0]=a=>e(l).form.items.topic=a),type:"string",placeholder:e(t)("routine.attachment.The file is saved in the directory, and the file will not be automatically transferred if the record is modified"),readonly:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(m,{label:e(t)("routine.attachment.Physical path")},{default:i(()=>[r(n,{modelValue:e(l).form.items.url,"onUpdate:modelValue":o[1]||(o[1]=a=>e(l).form.items.url=a),type:"string",placeholder:e(t)("routine.attachment.File saving path Modifying records will not automatically transfer files"),readonly:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(m,{label:e(t)("routine.attachment.image width")},{default:i(()=>[r(n,{modelValue:e(l).form.items.width,"onUpdate:modelValue":o[2]||(o[2]=a=>e(l).form.items.width=a),type:"number",placeholder:e(t)("routine.attachment.Width of picture file")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(m,{label:e(t)("routine.attachment.Picture height")},{default:i(()=>[r(n,{modelValue:e(l).form.items.height,"onUpdate:modelValue":o[3]||(o[3]=a=>e(l).form.items.height=a),type:"number",placeholder:e(t)("routine.attachment.Height of picture file")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(m,{label:e(t)("utils.Original name")},{default:i(()=>[r(n,{modelValue:e(l).form.items.name,"onUpdate:modelValue":o[4]||(o[4]=a=>e(l).form.items.name=a),type:"string",placeholder:e(t)("routine.attachment.Original file name")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(m,{label:e(t)("routine.attachment.file size")},{default:i(()=>[r(n,{modelValue:e(l).form.items.size,"onUpdate:modelValue":o[5]||(o[5]=a=>e(l).form.items.size=a),type:"number",placeholder:e(t)("routine.attachment.File size (bytes)")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(m,{label:e(t)("routine.attachment.mime type")},{default:i(()=>[r(n,{modelValue:e(l).form.items.mimetype,"onUpdate:modelValue":o[6]||(o[6]=a=>e(l).form.items.mimetype=a),type:"string",placeholder:e(t)("routine.attachment.File MIME type")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(m,{label:e(t)("utils.Upload (Reference) times")},{default:i(()=>[r(n,{modelValue:e(l).form.items.quote,"onUpdate:modelValue":o[7]||(o[7]=a=>e(l).form.items.quote=a),type:"number",placeholder:e(t)("routine.attachment.Upload (Reference) times of this file")},null,8,["modelValue","placeholder"]),g("span",$,u(e(t)("routine.attachment.When the same file is uploaded multiple times, only one attachment record will be saved and added")),1)]),_:1},8,["label"]),r(m,{label:e(t)("routine.attachment.Storage mode")},{default:i(()=>[r(n,{modelValue:e(l).form.items.storage,"onUpdate:modelValue":o[8]||(o[8]=a=>e(l).form.items.storage=a),type:"string",placeholder:e(t)("routine.attachment.Storage mode"),readonly:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),r(m,{label:e(t)("routine.attachment.SHA1 code")},{default:i(()=>[r(n,{modelValue:e(l).form.items.sha1,"onUpdate:modelValue":o[9]||(o[9]=a=>e(l).form.items.sha1=a),type:"string",placeholder:e(t)("routine.attachment.SHA1 encoding of file"),readonly:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["modelValue","label-width"])],6)]),_:1})),[[F,e(l).form.loading]])]),_:1},8,["model-value","onClose"])}}});const D=M(q,[["__scopeId","data-v-ee322e60"]]),A=Object.freeze(Object.defineProperty({__proto__:null,default:D},Symbol.toStringTag,{value:"Module"}));export{D as P,A as a,N as p};