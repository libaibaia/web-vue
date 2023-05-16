import{h as N,r as C,K as T,A as $,p,B as b,C as s,W as x,l as q,T as _,U as g,k as e,o as L,q as n,m as h,N as c,M as F,S as K,$ as W,a2 as j,t as i,Y as y}from"./vue-a98ef309.js";import{f as A,b as E,_ as O}from"./index-0c819fdc.js";import{u as R,i as Y}from"./controllerUrls-beb409f8.js";import{F as G}from"./index-03bd2479.js";import{b as V}from"./validate-594baa03.js";function H(v){return A({url:R+"add",method:"get",params:{userId:v}})}const J={class:"title"},Q=N({__name:"popupForm",setup(v){const{t}=E(),l=j("baTable"),S=C({user_id:[V({name:"required",message:t("Please select field",{field:t("user.moneyLog.User")})})],money:[V({name:"required",title:t("user.moneyLog.Change amount")}),{validator:(m,o,u)=>!o||parseFloat(o)==0?u(new Error(t("Please enter the correct field",{field:t("user.moneyLog.Change amount")}))):u(),trigger:"blur"}],memo:[V({name:"required",title:t("user.moneyLog.remarks")})]}),f=T(),a=C({userInfo:{},after:0}),I=()=>{!l.form.items.user_id||parseInt(l.form.items.user_id)<=0||H(l.form.items.user_id).then(m=>{a.userInfo=m.data.user,a.after=m.data.user.money})},U=m=>{if(!a.userInfo||typeof a.userInfo>"u"){a.after=0;return}let o=m==""?0:parseFloat(m);a.after=parseFloat((parseFloat(a.userInfo.money)+o).toFixed(2))};return $(()=>l.form.operate,m=>{m&&I()}),(m,o)=>{const u=i("el-input"),d=i("el-form-item"),w=i("el-form"),P=i("el-scrollbar"),k=i("el-button"),B=i("el-dialog"),z=y("drag"),D=y("zoom"),M=y("blur");return p(),b(B,{class:"ba-operate-dialog","close-on-click-modal":!1,"model-value":!!e(l).form.operate,onClose:e(l).toggleForm},{header:s(()=>[x((p(),q("div",J,[_(g(e(l).form.operate?e(t)(e(l).form.operate):""),1)])),[[z,[".ba-operate-dialog",".el-dialog__header"]],[D,".ba-operate-dialog"]])]),footer:s(()=>[L("div",{style:h("width: calc(100% - "+e(l).form.labelWidth/1.8+"px)")},[n(k,{onClick:o[10]||(o[10]=r=>e(l).toggleForm(""))},{default:s(()=>[_(g(e(t)("Cancel")),1)]),_:1}),x((p(),b(k,{loading:e(l).form.submitLoading,onClick:o[11]||(o[11]=r=>e(l).onSubmit(f.value)),type:"primary"},{default:s(()=>[_(g(e(l).form.operateIds.length>1?e(t)("Save and edit next item"):e(t)("Save")),1)]),_:1},8,["loading"])),[[M]])],4)]),default:s(()=>[n(P,{class:"ba-table-form-scrollbar"},{default:s(()=>[L("div",{class:W(["ba-operate-form","ba-"+e(l).form.operate+"-form"]),style:h("width: calc(100% - "+e(l).form.labelWidth/2+"px)")},[e(l).form.loading?K("",!0):(p(),b(w,{key:0,ref_key:"formRef",ref:f,onKeyup:o[9]||(o[9]=c(r=>e(l).onSubmit(f.value),["enter"])),model:e(l).form.items,"label-position":"right","label-width":e(l).form.labelWidth+"px",rules:S},{default:s(()=>[n(G,{type:"remoteSelect",prop:"user_id",label:e(t)("user.moneyLog.User ID"),modelValue:e(l).form.items.user_id,"onUpdate:modelValue":o[0]||(o[0]=r=>e(l).form.items.user_id=r),placeholder:e(t)("Click Select"),"input-attr":{pk:"user.id",field:"nike_text","remote-url":e(Y)+"index",onChange:I}},null,8,["label","modelValue","placeholder","input-attr"]),n(d,{label:e(t)("user.moneyLog.User name")},{default:s(()=>[n(u,{modelValue:a.userInfo.username,"onUpdate:modelValue":o[1]||(o[1]=r=>a.userInfo.username=r),disabled:""},null,8,["modelValue"])]),_:1},8,["label"]),n(d,{label:e(t)("user.moneyLog.User nike")},{default:s(()=>[n(u,{modelValue:a.userInfo.nike,"onUpdate:modelValue":o[2]||(o[2]=r=>a.userInfo.nike=r),disabled:""},null,8,["modelValue"])]),_:1},8,["label"]),n(d,{label:e(t)("user.moneyLog.Current balance")},{default:s(()=>[n(u,{modelValue:a.userInfo.money,"onUpdate:modelValue":o[3]||(o[3]=r=>a.userInfo.money=r),disabled:"",type:"number"},null,8,["modelValue"])]),_:1},8,["label"]),n(d,{prop:"money",label:e(t)("user.moneyLog.Change amount")},{default:s(()=>[n(u,{onInput:U,modelValue:e(l).form.items.money,"onUpdate:modelValue":o[4]||(o[4]=r=>e(l).form.items.money=r),type:"number",placeholder:e(t)("user.moneyLog.Please enter the balance change amount")},null,8,["modelValue","placeholder"])]),_:1},8,["label"]),n(d,{label:e(t)("user.moneyLog.Balance after change")},{default:s(()=>[n(u,{modelValue:a.after,"onUpdate:modelValue":o[5]||(o[5]=r=>a.after=r),type:"number",disabled:""},null,8,["modelValue"])]),_:1},8,["label"]),n(d,{prop:"memo",label:e(t)("user.moneyLog.remarks")},{default:s(()=>[n(u,{onKeyup:[o[6]||(o[6]=c(F(()=>{},["stop"]),["enter"])),o[7]||(o[7]=c(F(r=>e(l).onSubmit(f.value),["ctrl"]),["enter"]))],modelValue:e(l).form.items.memo,"onUpdate:modelValue":o[8]||(o[8]=r=>e(l).form.items.memo=r),type:"textarea",placeholder:e(t)("user.moneyLog.Please enter change remarks / description")},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1},8,["model","label-width","rules"]))],6)]),_:1})]),_:1},8,["model-value","onClose"])}}});const X=O(Q,[["__scopeId","data-v-376aff01"]]),re=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));export{X as P,H as a,re as p};