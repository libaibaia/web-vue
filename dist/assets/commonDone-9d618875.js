import{s as n}from"./store-532afdd0.js";import{m as d,b as E}from"./index-fb6fea29.js";import{b as A,G as C,J as L,_ as w}from"./index-0c819fdc.js";import{F as B}from"./index-03bd2479.js";import{j as N}from"./baAccount-2dad18d3.js";import{h as V,r as j,p as s,l,o as a,k as e,U as o,W as f,S as m,T as i,q as y,C as S,B as M,aj as W,t as g,Y as D}from"./vue-a98ef309.js";import"./index-6f00a71d.js";import"./controllerUrls-beb409f8.js";import"./IRequests-783be2cd.js";const P={class:"install-done"},U={class:"install-done-title"},F={key:0},R={key:1},q={key:2},z={key:3},G={class:"install-tis-box"},J={key:0,class:"depend-box"},O={key:0,class:"depend-loading"},Y={class:"depend-tis"},H={key:0},K={class:"color-red"},Q={key:0},X={key:1},Z={key:1,class:"color-green"},$={key:2,class:"exec-fail color-red"},ee={key:1,class:"depend-tis"},te={key:2},oe={key:0,class:"install-tis-box"},ne={class:"install-tis"},se={class:"install-tis-box"},le={class:"install-tis"},ae={class:"install-tis-box"},de={class:"install-form"},ie=V({__name:"commonDone",setup(me){const{t}=A(),c=C(),u=j({rebuild:0}),r=()=>{c.toggle(!0)},b=()=>{n.dialog.common=!1,u.rebuild==1&&(c.toggle(!0),c.addTaskPM("web-build",!1,"",_=>{_==L.Success&&c.toggle(!1)}))},k=()=>{W.confirm(t("module.Is the command that failed on the WEB terminal executed manually or in other ways successfully?"),t("Reminder"),{confirmButtonText:t("module.yes"),cancelButtonText:t("Cancel"),type:"warning"}).then(()=>{n.loading.common=!0,N(n.common.uid).then(()=>{E(),n.loading.common=!1})})};return(_,p)=>{const v=g("el-link"),I=g("el-button"),h=D("loading"),T=D("blur");return s(),l("div",P,[a("div",U,[e(n).common.moduleState==e(d).INSTALLED?(s(),l("span",F,o(e(t)("module.Congratulations, module installation is complete")),1)):e(n).common.moduleState==e(d).DISABLE?(s(),l("span",R,o(e(t)("module.Module is disabled")),1)):e(n).common.moduleState==e(d).DEPENDENT_WAIT_INSTALL?(s(),l("span",q,o(e(t)("module.Congratulations, the code of the module is ready")),1)):(s(),l("span",z,o(e(t)("module.Unknown state")),1))]),a("div",G,[e(n).common.dependInstallState!="none"?(s(),l("div",J,[e(n).common.dependInstallState=="executing"?f((s(),l("div",O,null,512)),[[h,!0]]):m("",!0),a("div",Y,[e(n).common.dependInstallState=="executing"?(s(),l("div",H,[a("span",K,o(e(t)("module.Do not refresh the page!")),1),e(n).common.moduleState==e(d).DISABLE?(s(),l("span",Q,o(e(t)("module.New adjustment of dependency detected")),1)):e(n).common.moduleState==e(d).DEPENDENT_WAIT_INSTALL?(s(),l("span",X,o(e(t)("module.This module adds new dependencies")),1)):m("",!0),i("， "),a("span",null,o(e(t)("module.The built-in terminal of the system is automatically installing these dependencies, please wait~")),1),a("span",{class:"span-a",onClick:r},o(e(t)("module.View progress")),1)])):m("",!0),e(n).common.dependInstallState=="success"?(s(),l("div",Z,o(e(t)("module.Dependency installation completed~")),1)):m("",!0),e(n).common.dependInstallState=="fail"?(s(),l("div",$,[i(o(e(t)("module.Dependency installation fail 1"))+" ",1),a("span",{class:"span-a",onClick:r},o(e(t)("module.Dependency installation fail 2")),1),i(" "+o(e(t)("module.Dependency installation fail 3"))+" ",1),y(v,{target:"_blank",type:"primary",href:"https://wonderful-code.gitee.io/guide/install/manualOperation.html"},{default:S(()=>[i(o(e(t)("module.Dependency installation fail 4")),1)]),_:1})])):m("",!0)])])):e(n).common.moduleState==e(d).INSTALLED?(s(),l("div",ee,o(e(t)("module.This module does not add new dependencies")),1)):(s(),l("div",te,o(e(t)("module.There is no adjustment for system dependency")),1))]),e(n).common.dependInstallState=="fail"?(s(),l("div",oe,[a("div",ne,[i(o(e(t)("module.Dependency installation fail 5"))+" ",1),a("span",{class:"span-a",onClick:k},o(e(t)("module.Dependency installation fail 6")),1),i(" "+o(e(t)("module.Dependency installation fail 7")),1)])])):m("",!0),a("div",se,[a("div",le,o(e(t)("module.please"))+o(e(n).common.moduleState==e(d).DISABLE?"":e(t)("module.After installation 1"))+" "+o(e(t)("module.Manually clean up the system and browser cache, and refresh the page")),1)]),a("div",ae,[a("div",de,[y(B,{label:(e(n).common.moduleState==e(d).DISABLE?"":e(t)("module.After installation 2"))+e(t)("module.Automatically execute reissue command?"),modelValue:u.rebuild,"onUpdate:modelValue":p[0]||(p[0]=x=>u.rebuild=x),type:"radio",data:{content:{0:e(t)("module.no"),1:e(t)("module.yes")},childrenAttr:{border:!0}}},null,8,["label","modelValue","data"])])]),f((s(),M(I,{class:"install-done-button",disabled:!(e(n).common.dependInstallState!="executing"||e(n).common.moduleState==e(d).INSTALLED),size:"large",type:"primary",onClick:b},{default:S(()=>[i(o(e(n).common.moduleState==e(d).DISABLE?e(t)("complete"):e(t)("module.End of installation")),1)]),_:1},8,["disabled"])),[[T],[h,e(n).loading.common]])])}}});const ge=w(ie,[["__scopeId","data-v-d14368ec"]]);export{ge as default};
