import{h as C,r as B,K as m,z as O,p as d,l as F,k as e,B as u,S as T,q as r,C as n,W as _,T as y,U as g,o as x,m as P,N as H,$ as M,t as c,Y as f,X}from"./vue-a98ef309.js";import{b as Y,T as j,a as G}from"./index-6f00a71d.js";import{d as V}from"./controllerUrls-beb409f8.js";import J from"./popupForm-bc047862.js";import{b as Q,w as Z,g as ee}from"./index-0c819fdc.js";import{F as h}from"./index-03bd2479.js";import{c as oe}from"./IRequests-783be2cd.js";import{u as le}from"./baAccount-2dad18d3.js";import"./validate-594baa03.js";const te={class:"default-main ba-table-box"},ae={class:"title"},re=C({name:"bucket"}),_e=C({...re,setup(ne){const i=B({name:"",endpoint:""}),{t:l}=Q(),v=m(),k=m();let K={render:"tipButton",name:"upload",title:"上传文件",type:"primary",icon:"el-icon-UploadFilled",class:"table-row-edit",disabledTip:!1,click:(a,t)=>{i.name=a.name,i.endpoint=a.endPoint,z(a.id)}};B({name:""});let L={render:"tipButton",name:"fileLists",title:"下载全部文件",type:"primary",icon:"el-icon-Download",class:"table-row-edit",disabledTip:!1,click:(a,t)=>{S(a.id)}},b=Z([]);b.push(K),b.push(L);const o=new Y(new ee(V),{column:[{type:"selection",align:"center",operator:!1},{label:"id",prop:"id",align:"center",operator:"LIKE",operatorPlaceholder:l("Fuzzy query"),width:70},{label:"endPoint",prop:"endPoint",align:"center",operator:"LIKE",operatorPlaceholder:l("Fuzzy query")},{label:"所属区域",prop:"region",align:"center",operator:"LIKE",operatorPlaceholder:l("Fuzzy query")},{label:"拥有者账号",prop:"owner",align:"center",operator:"LIKE",operatorPlaceholder:l("Fuzzy query")},{label:"名称",prop:"name",align:"center",operator:"LIKE",operatorPlaceholder:l("Fuzzy query")},{label:l("operate"),align:"center",width:"130",render:"buttons",buttons:b}]});X("baTable",o),O(()=>{o.table.ref=v.value,o.mount(),o.getIndex()});const w=m(!1),q=le(),p=m(!1),z=a=>{p.value=!0,q.setBucketID(a)},S=a=>{oe(V+"file/download/all","POST",{bucketId:a}).then(t=>{})};return(a,t)=>{const E=c("el-alert"),D=c("el-form"),N=c("el-scrollbar"),I=c("el-button"),R=c("el-dialog"),$=f("drag"),A=f("zoom"),U=f("loading"),W=f("blur");return d(),F("div",te,[e(o).table.remark?(d(),u(E,{key:0,class:"ba-table-alert",title:e(o).table.remark,type:"info","show-icon":""},null,8,["title"])):T("",!0),r(j,{buttons:["refresh","quickSearch"],"quick-search-placeholder":"通过密钥名称搜索"}),r(G,{ref_key:"tableRef",ref:v},null,512),r(R,{class:"ba-operate-dialog","close-on-click-modal":!1,"model-value":p.value,onClose:t[4]||(t[4]=s=>p.value=!1),"destroy-on-close":!0},{header:n(()=>[_((d(),F("div",ae,[y(g(e(o).form.operate?e(l)(e(o).form.operate):""),1)])),[[$,[".ba-operate-dialog",".el-dialog__header"]],[A,".ba-operate-dialog"]])]),footer:n(()=>[x("div",{style:P("width: calc(100% - "+e(o).form.labelWidth/1.8+"px)")},[r(I,{onClick:t[2]||(t[2]=s=>p.value=!1)},{default:n(()=>[y(g(e(l)("Cancel")),1)]),_:1}),_((d(),u(I,{loading:e(o).form.submitLoading,onClick:t[3]||(t[3]=s=>p.value=!1),type:"primary"},{default:n(()=>[y(g(e(o).form.operateIds&&e(o).form.operateIds.length>1?e(l)("Save and edit next item"):e(l)("Save")),1)]),_:1},8,["loading"])),[[W]])],4)]),default:n(()=>[_((d(),u(N,{class:"ba-table-form-scrollbar"},{default:n(()=>[x("div",{class:M(["ba-operate-form","ba-"+e(o).form.operate+"-form"]),style:P("width: calc(100% - "+e(o).form.labelWidth/2+"px)")},[w.value?T("",!0):(d(),u(D,{key:0,ref_key:"formRef",ref:k,onKeyup:H(z,["enter"]),model:e(o).form.items,"label-position":"right","label-width":e(o).form.labelWidth+"px"},{default:n(()=>[r(h,{label:"存储桶名称",modelValue:i.name,"onUpdate:modelValue":t[0]||(t[0]=s=>i.name=s),type:"string",placeholder:e(l)("auth.admin.Administrator login")},null,8,["modelValue","placeholder"]),r(h,{label:"存储桶端点",modelValue:i.endpoint,"onUpdate:modelValue":t[1]||(t[1]=s=>i.endpoint=s),type:"string",placeholder:e(l)("Please input field",{field:e(l)("auth.admin.nike")})},null,8,["modelValue","placeholder"]),r(h,{label:"文件列表",type:"file"})]),_:1},8,["onKeyup","model","label-width"]))],6)]),_:1})),[[U,w.value]])]),_:1},8,["model-value"]),r(J,{ref_key:"formRef",ref:k},null,512)])}}});export{_e as default};
