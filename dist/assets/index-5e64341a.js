import{b as N,T as U,a as R}from"./index-6f00a71d.js";import{m as W}from"./controllerUrls-beb409f8.js";import A from"./popupForm-e618126a.js";import{b as D,w as $,g as H,_ as Q}from"./index-0c819fdc.js";import{c}from"./IRequests-783be2cd.js";import{h as k,K as _,r as f,p as u,l as h,k as g,B as v,S as X,q as a,C as s,o as j,T as z,Q as G,R as J,t as n,X as M}from"./vue-a98ef309.js";import"./baAccount-2dad18d3.js";import"./validate-594baa03.js";import"./index-03bd2479.js";const Y={class:"default-main ba-table-box"},Z={class:"dialog-footer"},ee=k({name:"mysql"}),te=k({...ee,setup(oe){_(!1);const{t}=D(),P=_(),i=_(!1),m=f({options:[]}),b=f({name:""}),I=()=>{c("/api/databases/userLists","POST",{id:l.id}).then(e=>{m.options=e.lists})},T=()=>{c("/api/databases/open","POST",{id:l.id}).then(e=>{})},q=()=>{c("/api/databases/close","POST",{id:l.id}).then(e=>{})},L=()=>{c("/api/databases/user","POST",{username:b.name,id:l.id}).then(e=>{i.value=!1})},x=()=>{c("/api/databases/user","POST",{id:l.id}).then(e=>{})};let C={render:"tipButton",name:"test",title:"开启外网访问",type:"primary",icon:"el-icon-Open",class:"table-row-edit",disabledTip:!1,click:(e,o)=>{l.id=e.id,T()}},F={render:"tipButton",name:"test",title:"创建数据库用户",type:"primary",icon:"el-icon-DocumentAdd",class:"table-row-edit",disabledTip:!1,click:(e,o)=>{l.id=e.id,console.log(e.type),e.type==="postgres"?(I(),i.value=!0,console.log(m.options.length)):x()}},w={render:"tipButton",name:"test",title:"关闭外网访问",type:"primary",icon:"el-icon-CircleClose",class:"table-row-edit",disabledTip:!1,click:(e,o)=>{l.id=e.id,q()}},d=$([]);d.push(C),d.push(w),d.push(F);const l=f({id:""}),p=new N(new H(W),{column:[{type:"selection",align:"center",operator:!1},{label:"id",prop:"id",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query"),width:70},{label:"实例ID",prop:"instanceId",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:"实例名称",prop:"instanceName",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:"类型",prop:"type",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:"外网域名",prop:"domain",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:"外网端口",prop:"port",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:"用户名",prop:"user",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:"密码",prop:"password",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:"区域",prop:"region",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:t("operate"),width:"100",render:"buttons",buttons:d,operator:!1}],dblClickNotEditColumn:[void 0]},{defaultItems:{gender:0,money:"0",score:"0",status:"enable"}});return p.mount(),p.getIndex(),M("baTable",p),(e,o)=>{const E=n("el-alert"),V=n("el-option"),B=n("el-select"),K=n("el-form-item"),S=n("el-form"),y=n("el-button"),O=n("el-dialog");return u(),h("div",Y,[g(p).table.remark?(u(),v(E,{key:0,class:"ba-table-alert",title:g(p).table.remark,type:"info","show-icon":""},null,8,["title"])):X("",!0),a(U,{buttons:["refresh","quickSearch"],"quick-search-placeholder":"通过密钥名称搜索"}),a(R,{ref_key:"tableRef",ref:P},null,512),a(O,{modelValue:i.value,"onUpdate:modelValue":o[2]||(o[2]=r=>i.value=r),title:"重置用户密码"},{footer:s(()=>[j("span",Z,[a(y,{onClick:o[1]||(o[1]=r=>i.value=!1)},{default:s(()=>[z("取消")]),_:1}),a(y,{type:"primary",onClick:L},{default:s(()=>[z(" 确认 ")]),_:1})])]),default:s(()=>[a(S,null,{default:s(()=>[a(K,{label:"请选择用户","label-width":"140px"},{default:s(()=>[a(B,{modelValue:b.name,"onUpdate:modelValue":o[0]||(o[0]=r=>b.name=r),placeholder:"Please select a zone"},{default:s(()=>[(u(!0),h(G,null,J(m.options,r=>(u(),v(V,{label:r.label,value:r.value,key:r.key},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(A)])}}});const ue=Q(te,[["__scopeId","data-v-b3922405"]]);export{ue as default};