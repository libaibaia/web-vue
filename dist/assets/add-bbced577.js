import{h as $,K as j,r as M,p as C,B as U,C as s,W as q,l as I,T as _,U as x,k as o,o as D,q as n,m as B,N as f,M as b,t as y,Y as w}from"./vue-a98ef309.js";import{F as d}from"./index-03bd2479.js";import{i as V}from"./index-6f00a71d.js";import{b as p,v as L}from"./validate-594baa03.js";import{f as v,b as R,_ as G}from"./index-0c819fdc.js";const g="/admin/routine.config/",k=new Map([["index",g+"index"],["add",g+"add"],["edit",g+"edit"],["del",g+"del"]]);function ae(){return v({url:k.get("index"),method:"get"})}function H(r,u){return v({url:k.get(r),method:"post",data:u},{showSuccessMessage:!0})}function oe(r){return v({url:k.get("del"),method:"DELETE",params:{ids:r}},{showSuccessMessage:!0})}function ne(r,u){return v({url:g+"sendTestMail",method:"POST",data:Object.assign({},r,{testMail:u})},{showSuccessMessage:!0})}const Y={class:"title"},J=$({__name:"add",props:{modelValue:{type:Boolean,default:!1},configGroup:{default:()=>({})}},emits:["update:modelValue"],setup(r,{emit:u}){const T=()=>{u("update:modelValue",!1)},{t:l}=R(),m=j(),t=M({inputTypes:{},labelWidth:160,submitLoading:!1,addConfig:{name:"",group:"",title:"",tip:"",type:"",content:`key1=value1
key2=value2`,rule:"",extend:"",weigh:0}}),K=M({name:[p({name:"required",title:l("routine.config.Variable name")}),p({name:"varName",message:l("Please enter the correct field",{field:l("routine.config.Variable name")})})],group:[p({name:"required",trigger:"change",message:l("Please select field",{field:l("routine.config.Variable grouping")})})],title:[p({name:"required",title:l("routine.config.Variable title")})],type:[p({name:"required",trigger:"change",message:l("Please select field",{field:l("routine.config.Variable type")})})],weigh:[p({name:"integer",title:l("routine.config.number")})]}),O=()=>{let i={};for(const e in V)V[e]!="remoteSelect"&&(i[V[e]]=V[e]);t.inputTypes=i};let A=["radio","checkbox","select","selects"];const E=i=>{let e=document.querySelector(".add-item-content");e&&(A.includes(i)?e.style.display="flex":e.style.display="none")},c=i=>{i&&i.validate(e=>{e&&H("add",t.addConfig).then(S=>{u("update:modelValue",!1)})})};return O(),(i,e)=>{const S=y("el-form"),N=y("el-scrollbar"),h=y("el-button"),P=y("el-dialog"),z=w("drag"),F=w("zoom"),W=w("blur");return C(),U(P,{class:"ba-operate-dialog","close-on-click-modal":!1,"model-value":r.modelValue,onClose:T},{header:s(()=>[q((C(),I("div",Y,[_(x(o(l)("routine.config.Add configuration item")),1)])),[[z,[".ba-operate-dialog",".el-dialog__header"]],[F,".ba-operate-dialog"]])]),footer:s(()=>[D("div",{style:B("width: calc(100% - "+t.labelWidth/1.8+"px)")},[n(h,{onClick:T},{default:s(()=>[_(x(o(l)("Cancel")),1)]),_:1}),q((C(),U(h,{loading:t.submitLoading,onClick:e[13]||(e[13]=a=>c(m.value)),type:"primary"},{default:s(()=>[_(x(o(l)("add")),1)]),_:1},8,["loading"])),[[W]])],4)]),default:s(()=>[n(N,{class:"ba-table-form-scrollbar"},{default:s(()=>[D("div",{class:"ba-operate-form ba-add-form",style:B("width: calc(100% - "+t.labelWidth/2+"px)")},[n(S,{ref_key:"formRef",ref:m,onKeyup:e[12]||(e[12]=f(a=>c(m.value),["enter"])),rules:K,model:t.addConfig,"label-position":"left","label-width":120},{default:s(()=>[n(d,{label:o(l)("routine.config.Variable name"),type:"string",modelValue:t.addConfig.name,"onUpdate:modelValue":e[0]||(e[0]=a=>t.addConfig.name=a),prop:"name"},null,8,["label","modelValue"]),n(d,{label:o(l)("routine.config.Variable title"),type:"string",modelValue:t.addConfig.title,"onUpdate:modelValue":e[1]||(e[1]=a=>t.addConfig.title=a),prop:"title"},null,8,["label","modelValue"]),n(d,{label:o(l)("routine.config.Variable description"),type:"string",modelValue:t.addConfig.tip,"onUpdate:modelValue":e[2]||(e[2]=a=>t.addConfig.tip=a)},null,8,["label","modelValue"]),n(d,{label:o(l)("routine.config.Variable type"),type:"select",modelValue:t.addConfig.type,"onUpdate:modelValue":e[3]||(e[3]=a=>t.addConfig.type=a),prop:"type",data:{content:t.inputTypes},"input-attr":{onChange:E}},null,8,["label","modelValue","data","input-attr"]),n(d,{class:"add-item-content",label:o(l)("routine.config.Dictionary data"),type:"textarea",onKeyup:[e[4]||(e[4]=f(b(()=>{},["stop"]),["enter"])),e[5]||(e[5]=f(b(a=>c(m.value),["ctrl"]),["enter"]))],modelValue:t.addConfig.content,"onUpdate:modelValue":e[6]||(e[6]=a=>t.addConfig.content=a),"input-attr":{rows:3,placeholder:o(l)("routine.config.One line at a time, without quotation marks, for example: key1=value1")}},null,8,["label","modelValue","input-attr"]),n(d,{label:o(l)("routine.config.Validation rules"),type:"selects",modelValue:t.addConfig.rule,"onUpdate:modelValue":e[7]||(e[7]=a=>t.addConfig.rule=a),data:{content:o(L)}},null,8,["label","modelValue","data"]),n(d,{label:o(l)("routine.config.Extended properties"),type:"textarea",onKeyup:[e[8]||(e[8]=f(b(()=>{},["stop"]),["enter"])),e[9]||(e[9]=f(b(a=>c(m.value),["ctrl"]),["enter"]))],modelValue:t.addConfig.extend,"onUpdate:modelValue":e[10]||(e[10]=a=>t.addConfig.extend=a),"input-attr":{placeholder:o(l)("routine.config.One attribute per line without quotation marks")}},null,8,["label","modelValue","input-attr"]),n(d,{label:o(l)("weigh"),type:"number",modelValue:t.addConfig.weigh,"onUpdate:modelValue":e[11]||(e[11]=a=>t.addConfig.weigh=a),modelModifiers:{number:!0},prop:"weigh"},null,8,["label","modelValue"])]),_:1},8,["rules","model"])],4)]),_:1})]),_:1},8,["model-value"])}}});const Q=G(J,[["__scopeId","data-v-4e8cca85"]]),ie=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));export{Q as A,ne as a,ie as b,oe as d,ae as i,H as p};
