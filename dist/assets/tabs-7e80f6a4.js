import{s as t}from"./store-532afdd0.js";import{i as I,h as B,m as D,c as v}from"./index-fb6fea29.js";import{p as S,_ as L}from"./index-0c819fdc.js";import{h as U,p as s,l as o,W as $,k as a,B as r,C as i,Q as p,R as u,t as n,Y as z,o as l,q as g,T as m,U as c,S as E}from"./vue-a98ef309.js";import"./baAccount-2dad18d3.js";const q=["onClick"],A={class:"goods-footer"},F={key:0,class:"goods-tag"},Q={class:"goods-title"},R={class:"goods-data"},W={class:"download-count"},Y={key:0,class:"goods-price"},j={class:"original-price"},G={class:"current-price"},H={key:1,class:"goods-price"},J=U({__name:"tabs",setup(K){const h=()=>{I()};return(b,y)=>{const k=n("el-image"),f=n("el-tag"),T=n("Icon"),C=n("el-empty"),w=n("el-tab-pane"),x=n("el-tabs"),N=z("loading");return s(),o("div",null,[$((s(),r(x,{"element-loading-text":b.$t("module.Loading"),modelValue:a(t).table.params.activeTab,"onUpdate:modelValue":y[0]||(y[0]=d=>a(t).table.params.activeTab=d),type:"border-card",class:"store-tabs",onTabChange:h},{default:i(()=>[(s(!0),o(p,null,u(a(t).table.category,d=>(s(),r(w,{name:d.id.toString(),key:d.id,label:d.name,class:"store-tab-pane"},{default:i(()=>[a(t).table.modules[a(t).table.params.activeTab]&&a(t).table.modules[a(t).table.params.activeTab].length>0?(s(!0),o(p,{key:0},u(a(t).table.modules[a(t).table.params.activeTab],e=>(s(),o("div",{class:"goods",key:e.uid},[l("div",{onClick:_=>a(B)(e.uid),class:"goods-item suspension"},[g(k,{loading:"lazy",fit:"contain",class:"goods-img",src:e.logo?e.logo:a(S)("/static/images/local-module-logo.png")},null,8,["src"]),l("div",A,[e.tags&&e.tags.length>0?(s(),o("div",F,[(s(!0),o(p,null,u(e.tags,(_,V)=>(s(),r(f,{type:_.type,key:V},{default:i(()=>[m(c(_.name),1)]),_:2},1032,["type"]))),128))])):E("",!0),l("div",Q,c(e.title),1),l("div",R,[l("span",W,[g(T,{name:"fa fa-download",color:"#c0c4cc",size:"13"}),m(" "+c(e.downloads?e.downloads:"-"),1)]),e.state===a(D).UNINSTALLED?(s(),o("span",Y,[l("span",j,c(a(v)(e.original_price,e.currency_select)),1),l("span",G,c(a(v)(e.present_price,e.currency_select)),1)])):(s(),o("div",H,[g(f,{effect:"dark",type:e.stateTag.type},{default:i(()=>[m(c(e.stateTag.text),1)]),_:2},1032,["type"])]))])])],8,q)]))),128)):(s(),r(C,{key:1,class:"modules-empty",description:b.$t("module.No more")},null,8,["description"]))]),_:2},1032,["name","label"]))),128))]),_:1},8,["element-loading-text","modelValue"])),[[N,a(t).loading.table]])])}}});const ee=L(J,[["__scopeId","data-v-3f1791bf"]]);export{ee as default};
