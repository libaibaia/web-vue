import{b as _,T as w,a as g}from"./index-6f00a71d.js";import{t as d}from"./controllerUrls-beb409f8.js";import z from"./popupForm-9363955e.js";import{b as L,w as T,g as B,R as F,T as R}from"./index-0c819fdc.js";import{u as q}from"./baAccount-2dad18d3.js";import{h as m,r as I,K as l,z as E,p as u,l as v,k as b,B as K,S as P,q as s,t as x,X as U}from"./vue-a98ef309.js";import"./IRequests-783be2cd.js";import"./index-03bd2479.js";import"./validate-594baa03.js";const C={class:"default-main ba-table-box"},A=m({name:"task"}),G=m({...A,setup(O){I({name:"",endpoint:""});const{t}=L(),c=l(),f=l();let h={render:"tipButton",name:"fileLists",title:"下载文件",type:"primary",icon:"el-icon-Download",class:"table-row-edit",disabledTip:!1,click:(a,n)=>{y(a.id)}},i=T([]);i.push(h);const o=new _(new B(d),{column:[{type:"selection",align:"center",operator:!1},{label:"id",prop:"id",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query"),width:70},{label:"用户id",prop:"userId",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:"状态",prop:"status",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:"所属存储桶",prop:"bucket",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:"文件名称",prop:"filename",align:"center",operator:"LIKE",operatorPlaceholder:t("Fuzzy query")},{label:t("operate"),align:"center",width:"130",render:"buttons",buttons:i}]});U("baTable",o),E(()=>{o.table.ref=c.value,o.mount(),o.getIndex()}),l(!1),q(),l(!1);const y=a=>{const n=R()+d+`download?id=${a}`;F({method:"get",url:n,responseType:"blob"}).then(e=>{console.log(e.headers["content-disposition"]);const k=e.headers["content-disposition"].split("filename=")[1],p=window.URL.createObjectURL(new Blob([e.data])),r=document.createElement("a");r.href=p,r.setAttribute("download",k),document.body.appendChild(r),r.click(),URL.revokeObjectURL(p)}).catch(e=>{console.log(e)})};return(a,n)=>{const e=x("el-alert");return u(),v("div",C,[b(o).table.remark?(u(),K(e,{key:0,class:"ba-table-alert",title:b(o).table.remark,type:"info","show-icon":""},null,8,["title"])):P("",!0),s(w,{buttons:["refresh","delete","quickSearch"],"quick-search-placeholder":"通过密钥名称搜索"}),s(g,{ref_key:"tableRef",ref:c},null,512),s(z,{ref_key:"formRef",ref:f},null,512)])}}});export{G as default};