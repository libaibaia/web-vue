import{c as s}from"./controllerUrls-beb409f8.js";import{_ as c}from"./popupForm.vue_vue_type_script_setup_true_lang-304496fc.js";import{b as m,T as p,a as d}from"./index-6f00a71d.js";import{b,g as f,w as h}from"./index-0c819fdc.js";import{h as i,K as _,z as g,p as o,l as k,k as n,B as w,S as y,q as l,t as v,X as x}from"./vue-a98ef309.js";import"./index-03bd2479.js";import"./validate-594baa03.js";import"./baAccount-2dad18d3.js";import"./IRequests-783be2cd.js";const T={class:"default-main ba-table-box"},q=i({name:"auth/menu"}),z=i({...q,setup(B){const{t:e}=b(),r=_(),t=new m(new f(s),{expandAll:!1,dblClickNotEditColumn:[void 0,"keepalive","status"],column:[{type:"selection",align:"center"},{label:e("auth.menu.title"),prop:"title",align:"left",width:"200"},{label:e("auth.menu.Icon"),prop:"icon",align:"center",width:"60",render:"icon",default:"el-icon-Minus"},{label:e("auth.menu.name"),prop:"name",align:"center","show-overflow-tooltip":!0},{label:e("auth.menu.type"),prop:"type",align:"center",render:"tag",custom:{menu:"danger",menu_dir:"success",button:"info"},replaceValue:{menu:e("auth.menu.type menu"),menu_dir:e("auth.menu.type menu_dir"),button:e("auth.menu.type button")}},{label:e("auth.menu.cache"),prop:"keepalive",align:"center",width:"80",render:"switch"},{label:e("state"),prop:"status",align:"center",width:"80",render:"switch"},{label:e("updatetime"),prop:"updatetime",align:"center",width:"160",render:"datetime"},{label:e("operate"),align:"center",width:"130",render:"buttons",buttons:h()}],dragSortLimitField:"pid"},{defaultItems:{type:"menu",menuType:"tab",extend:"none",keepalive:0,status:"1",icon:"el-icon-Minus"}},{getIndex:()=>{var a;t.table.expandAll=!!((a=t.table.filter)!=null&&a.quick_search)},requestEdit:()=>{t.form.items&&!t.form.items.icon&&(t.form.items.icon="el-icon-Minus")}});return x("baTable",t),g(()=>{var a;t.table.ref=r.value,t.mount(),(a=t.getIndex())==null||a.then(()=>{t.dragSort()})}),(a,C)=>{const u=v("el-alert");return o(),k("div",T,[n(t).table.remark?(o(),w(u,{key:0,class:"ba-table-alert",title:n(t).table.remark,type:"info","show-icon":""},null,8,["title"])):y("",!0),l(p,{buttons:["refresh","add","edit","delete","unfold","quickSearch"],"quick-search-placeholder":n(e)("quick Search Placeholder",{fields:n(e)("auth.menu.title")})},null,8,["quick-search-placeholder"]),l(d,{ref_key:"tableRef",ref:r,pagination:!1},null,512),l(c)])}}});export{z as default};
