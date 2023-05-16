import{b as B,T as E,a as U}from"./index-6f00a71d.js";import{i as A}from"./controllerUrls-beb409f8.js";import{b as F,w as L,g as R,_ as S}from"./index-0c819fdc.js";import{c as V}from"./IRequests-783be2cd.js";import{h as z,K as k,r as x,p as P,l as D,k as v,B as O,S as $,q as a,C as o,o as s,T as y,U as H,t as p,O as X,P as j,X as G}from"./vue-a98ef309.js";import"./baAccount-2dad18d3.js";const K=m=>(X("data-v-fc40314f"),m=m(),j(),m),J={class:"default-main ba-table-box"},M=K(()=>s("label",null,"阿里云服务器执行命令因为获取结果需要延迟获取，后台设置了10秒延迟，只要不报错可以多等会",-1)),Q={class:"exec-message"},W={class:"message-item"},Y={class:"dialog-footer"},Z=K(()=>s("span",{style:{color:"red","align-content":"center"}},"!!!!是否确认生成密钥对，创建后自动导入对应实例，期间服务器会重启，且关闭密码登录,只能使用密钥登录",-1)),ee={class:"dialog-footer"},le=z({name:"instance"}),ae=z({...le,setup(m){const{t:r}=F(),C=k(),f=k(!1);let T={render:"tipButton",name:"test",title:"执行命令",type:"primary",icon:"local-terminal",class:"table-row-edit",disabledTip:!1,click:(n,l)=>{e.instanceId=n.instanceId,e.id=n.id,e.region=n.region,e.execRes="",e.execArgs="",f.value=!0}};const u=x({status:!1,ConfirmCreatePairKey:!1});let h={render:"tipButton",name:"生成密钥对",title:"生成密钥对",type:"primary",icon:"el-icon-Key",class:"table-row-edit",disabledTip:!1,click:(n,l)=>{e.instanceId=n.instanceId,e.id=n.id,u.status=!0}},_=L([]);_.push(T),_.push(h);const N=()=>{V("/api/instance/exec","POST",e).then(n=>{e.execRes=n.execResult})},q=()=>{V("/api/instance/pair","POST",{id:e.id,keyName:e.keyPairName,key:e.key}).then(n=>{u.status=!1})},e=x({id:"",instanceId:"",region:"",execArgs:"",execRes:"",keyPairName:"",key:""}),c=new B(new R(A),{column:[{type:"selection",align:"center",operator:!1},{label:"id",prop:"id",align:"center",operator:"LIKE",operatorPlaceholder:r("Fuzzy query"),width:70},{label:"实例ID",prop:"instanceId",align:"center",operator:"LIKE",operatorPlaceholder:r("Fuzzy query")},{label:"所属区域",prop:"region",align:"center",operator:"LIKE",operatorPlaceholder:r("Fuzzy query")},{label:"公钥",prop:"publicKey",align:"center",operator:"LIKE",operatorPlaceholder:r("Fuzzy query")},{label:"私钥",prop:"privateKey",align:"center",operator:"LIKE",operatorPlaceholder:r("Fuzzy query")},{label:"是否可执行命令",prop:"isCommand",align:"center",operator:"LIKE",operatorPlaceholder:r("Fuzzy query")},{label:"IP",prop:"ip",align:"center",operator:"LIKE",operatorPlaceholder:r("Fuzzy query")},{label:"type",prop:"type",align:"center",operator:"LIKE",operatorPlaceholder:r("Fuzzy query")},{label:r("operate"),width:"100",render:"buttons",buttons:_,operator:!1}],dblClickNotEditColumn:[void 0]},{defaultItems:{gender:0,money:"0",score:"0",status:"enable"}});return c.mount(),c.getIndex(),G("baTable",c),(n,l)=>{const w=p("el-alert"),i=p("el-input"),d=p("el-form-item"),g=p("el-form"),b=p("el-button"),I=p("el-dialog");return P(),D("div",J,[v(c).table.remark?(P(),O(w,{key:0,class:"ba-table-alert",title:v(c).table.remark,type:"info","show-icon":""},null,8,["title"])):$("",!0),a(E,{buttons:["refresh","quickSearch"],"quick-search-placeholder":"通过密钥名称搜索"}),a(U,{ref_key:"tableRef",ref:C},null,512),a(I,{modelValue:f.value,"onUpdate:modelValue":l[5]||(l[5]=t=>f.value=t),title:"执行命令",width:"30%",draggable:""},{footer:o(()=>[s("span",Y,[a(b,{onClick:l[4]||(l[4]=t=>f.value=!1)},{default:o(()=>[y("取消")]),_:1}),a(b,{type:"primary",onClick:N},{default:o(()=>[y(" 执行 ")]),_:1})])]),default:o(()=>[M,s("span",null,[a(g,{model:e,ref:"navigation","label-position":"left","label-width":"80px"},{default:o(()=>[a(d,{label:"ID",prop:"id"},{default:o(()=>[a(i,{modelValue:e.id,"onUpdate:modelValue":l[0]||(l[0]=t=>e.id=t),disabled:""},null,8,["modelValue"])]),_:1}),a(d,{label:"实例ID",prop:"instanceId"},{default:o(()=>[a(i,{modelValue:e.instanceId,"onUpdate:modelValue":l[1]||(l[1]=t=>e.instanceId=t),disabled:""},null,8,["modelValue"])]),_:1}),a(d,{label:"所属区域",prop:"region"},{default:o(()=>[a(i,{modelValue:e.region,"onUpdate:modelValue":l[2]||(l[2]=t=>e.region=t),disabled:""},null,8,["modelValue"])]),_:1}),a(d,{label:"执行参数",prop:"execArgs"},{default:o(()=>[a(i,{modelValue:e.execArgs,"onUpdate:modelValue":l[3]||(l[3]=t=>e.execArgs=t)},null,8,["modelValue"])]),_:1}),s("div",Q,[s("div",W,H(e.execRes),1)])]),_:1},8,["model"])])]),_:1},8,["modelValue"]),a(I,{modelValue:u.status,"onUpdate:modelValue":l[10]||(l[10]=t=>u.status=t),title:"Tips",width:"30%"},{footer:o(()=>[s("span",ee,[a(b,{onClick:l[9]||(l[9]=t=>u.status=!1)},{default:o(()=>[y("取消")]),_:1}),a(b,{type:"primary",onClick:q},{default:o(()=>[y(" 确认 ")]),_:1})])]),default:o(()=>[s("span",null,[Z,a(g,{ref:"navigation","label-position":"left","label-width":"80px"},{default:o(()=>[a(d,{label:"实例ID",prop:"instanceId"},{default:o(()=>[a(i,{modelValue:e.instanceId,"onUpdate:modelValue":l[6]||(l[6]=t=>e.instanceId=t),disabled:""},null,8,["modelValue"])]),_:1}),a(d,{prop:"keyPairName",label:"key名称"},{default:o(()=>[a(i,{modelValue:e.keyPairName,"onUpdate:modelValue":l[7]||(l[7]=t=>e.keyPairName=t)},null,8,["modelValue"])]),_:1}),a(d,{prop:"keyPairName",label:"key内容"},{default:o(()=>[a(i,{type:"textArea",modelValue:e.key,"onUpdate:modelValue":l[8]||(l[8]=t=>e.key=t)},null,8,["modelValue"])]),_:1})]),_:1},512)])]),_:1},8,["modelValue"])])}}});const de=S(ae,[["__scopeId","data-v-fc40314f"]]);export{de as default};
