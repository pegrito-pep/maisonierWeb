(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15dd5320"],{"317c":function(t,e,s){},"5dc4":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"auth-wrapper"},[s("div",{staticClass:"container-fluid h-100"},[s("b-row",{staticClass:"flex-row h-100 bg-white"},[s("div",{staticClass:"col-xl-8 col-lg-6 col-md-5 p-0 d-md-block d-lg-block d-sm-none d-none"},[s("div",{staticClass:"lavalite-bg",staticStyle:{"background-image":"url('/img/banner.png')"}},[s("div",{staticClass:"lavalite-overlay"})])]),s("div",{staticClass:"col-xl-4 col-lg-6 col-md-7 my-auto p-0"},[s("div",{staticClass:"authentication-form mx-auto"},[s("div",{staticClass:"mt-n5 mb-4 d-flex justify-content-center align-items-center flex-column"},[s("b-link",{attrs:{to:{name:"home"}}},[s("b-img",{staticStyle:{width:"4em",height:"4em"},attrs:{src:"/img/logo-m0.png"}})],1),s("span",{staticClass:"defineFont"},[t._v("Veuillez consulter votre boite mail pour avoir votre code d'activation")])],1),s("form",{attrs:{action:""},on:{submit:function(e){return e.preventDefault(),t.sendForm.apply(null,arguments)}}},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Code d'activation",required:""},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),s("i",{staticClass:"fa fa-key"})]),s("div",{staticClass:"sign-btn text-center"},[s("b-button",{staticClass:"btn-theme",attrs:{type:"submit",disabled:t.submitted}},[t._v("Valider "),t.submitted?s("b-spinner",{attrs:{small:""}}):t._e()],1)],1)]),s("div",{staticClass:"register"},[s("p",[t._v("Pas de compte? "),s("b-link",{attrs:{to:{name:"register"}}},[t._v("Créer un compte maintenant")])],1)])])])])],1)])},i=[],o={name:"Login",data:()=>({submitted:!1,code:null}),methods:{sendForm(){this.submitted=!0,axios.post("check-otp",{login:storage.get("user-email"),code:this.code}).then(t=>{storage.remove("user-email"),this.$router.push({name:"login"})}).catch(t=>{this.submitted=!1,App.notifyError(t.message)})}}},n=o,l=(s("ddc6"),s("2877")),c=Object(l["a"])(n,a,i,!1,null,"a3020a94",null);e["default"]=c.exports},ddc6:function(t,e,s){"use strict";s("317c")}}]);
//# sourceMappingURL=chunk-15dd5320.1585f8dd.js.map