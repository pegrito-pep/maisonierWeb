(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f37bc6f"],{"0cf1":function(t,e,a){"use strict";a("43e5")},"43e5":function(t,e,a){},"7c54":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("page-description",{attrs:{title:"Profil",description:"Profil utilisateur",icon:"user",path:[]}}),a("b-row",[a("b-col",{attrs:{lg:"4",md:"5"}},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"text-center"},[a("b-img",t._b({attrs:{src:t.user.avatar,rounded:"circle",alt:"Circle image"}},"b-img",t.mainProps,!1)),a("h4",{staticClass:"card-title mt-10"},[""!=t.user.profil.titre?a("span",[t._v(t._s(t.user.profil.titre+" "))]):t._e(),t._v(t._s(t.user.nom+" "+t.user.prenom))]),a("p",{staticClass:"card-subtitle font-weight-bold",class:t.user.isCertified?"text-succes":"text-danger"},[t._v(t._s(t.user.code)+" "),t.user.isCertified?t._e():a("b-button",{staticClass:"btn-icon my-1",attrs:{variant:"warning",id:"certified-infos"}},[a("i",{staticClass:"ik ik-award",attrs:{"aria-hidden":"true"}})])],1),a("b-tooltip",{attrs:{target:"certified-infos",placement:"right",noninteractive:"",variant:"danger"}},[a("h4",[t._v("Certifier mes informations")]),t._v(" celà consiste à envoyer mes informations pour étude aux administrateurs de la plateforme. Bien vouloir cliquer sur le bouton pour certifier vos infomations")]),a("div",{staticClass:"row text-center justify-content-md-center"},[a("div",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.top",value:"Le nombre de mes locataires",expression:"'Le nombre de mes locataires'",modifiers:{top:!0}}],staticClass:"col-4",attrs:{id:"nombre-locataires"}},[a("a",{staticClass:"link",attrs:{href:"javascript:void(0)"}},[a("i",{staticClass:"ik ik-user"}),t._v(" "),a("font",{staticClass:"font-medium"},[t._v("254")])],1)]),a("div",{staticClass:"col-4",attrs:{id:"nombre-logements-libres"}},[a("a",{staticClass:"link",attrs:{href:"javascript:void(0)"}},[a("i",{staticClass:"fas fa-home"}),a("font",{staticClass:"text-danger"},[t._v(" 02")])],1)]),a("b-tooltip",{attrs:{target:"nombre-logements-libres",placement:"bottom",noninteractive:"",variant:"danger"}},[t._v("Le nombre de mes logements libres et sans annonce publié")])],1)],1)]),a("hr",{staticClass:"mb-0"}),a("div",{staticClass:"card-body"},[a("small",{staticClass:"text-muted d-block"},[t._v("E-mail")]),a("h6",[t._v(t._s(t.user.email))]),a("small",{staticClass:"text-muted d-block pt-10"},[t._v("N° Téléphone")]),a("h6",[t._v(t._s(t.user.tel))]),a("small",{staticClass:"text-muted d-block pt-30"},[t._v("Le maisonier sur les réseaux sociaux")]),a("br"),a("button",{staticClass:"btn btn-icon btn-facebook",attrs:{id:"facebook-maisonier"}},[a("i",{staticClass:"fab fa-facebook-f"})]),a("b-tooltip",{attrs:{target:"facebook-maisonier",placement:"top",noninteractive:"",variant:"primary"}},[t._v("Accéder à la page Facebook du Maisonier")]),a("button",{staticClass:"btn btn-icon btn-twitter ml-1",attrs:{id:"twitter-maisonier"}},[a("i",{staticClass:"fab fa-twitter"})]),a("b-tooltip",{attrs:{target:"twitter-maisonier",placement:"bottom",noninteractive:"",variant:"secondary"}},[t._v("Accéder au compte Twitter du Maisonier")]),a("button",{staticClass:"btn btn-icon btn-instagram ml-1",attrs:{id:"instagram-maisonier"}},[a("i",{staticClass:"fab fa-instagram"})]),a("b-tooltip",{attrs:{target:"instagram-maisonier",placement:"top",noninteractive:"",variant:"success"}},[t._v("Accéder au compte Instagram du Maisonier")]),a("button",{staticClass:"btn btn-icon ml-1",staticStyle:{background:"#E90D39"},attrs:{id:"youtube-maisonier"}},[a("i",{staticClass:"fab fa-youtube",staticStyle:{color:"white"}})]),a("b-tooltip",{attrs:{target:"youtube-maisonier",placement:"right",noninteractive:"",variant:"danger"}},[t._v("Accéder à la chaine youtube du Maisonier")])],1)])]),a("b-col",{attrs:{lg:"8",md:"7"}},[a("div",{staticClass:"card"},[a("ul",{staticClass:"nav nav-pills custom-pills",attrs:{id:"pills-tab",role:"tablist"}},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{id:"pills-profile-tab","data-toggle":"pill",href:"#current-month",role:"tab","aria-controls":"pills-profile","aria-selected":"false"}},[t._v("Activité")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link  active",attrs:{id:"pills-setting-tab","data-toggle":"pill",href:"#previous-month",role:"tab","aria-controls":"pills-setting-tab","aria-selected":"false"}},[t._v("Mes informations")])])]),a("div",{staticClass:"tab-content",attrs:{id:"pills-tabContent"}},[a("div",{staticClass:"tab-pane fade",attrs:{id:"current-month",role:"tabpanel","aria-labelledby":"pills-timeline-tab"}}),a("div",{staticClass:"tab-pane fade show active ",attrs:{id:"previous-month",role:"tabpanel","aria-labelledby":"pills-setting-tab"}},[a("div",{staticClass:"card-body"},[a("form",{staticClass:"form-horizontal",on:{submit:function(e){return e.preventDefault(),t.sendUserDataForm.apply(null,arguments)}}},[a("transition",{attrs:{"enter-active-class":"animated zoomIn"}},[a("div",[a("b-row",[a("b-col",[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"example-name"}},[t._v("Nom(s)")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.updateUser.nom,expression:"updateUser.nom"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Ex: TAGNE",id:"example-name"},domProps:{value:t.updateUser.nom},on:{input:function(e){e.target.composing||t.$set(t.updateUser,"nom",e.target.value)}}})])]),a("b-col",[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"example-name"}},[t._v("Prénom(s)")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.updateUser.prenom,expression:"updateUser.prenom"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Ex: Miguel Pedro",id:"example-name"},domProps:{value:t.updateUser.prenom},on:{input:function(e){e.target.composing||t.$set(t.updateUser,"prenom",e.target.value)}}})])])],1),a("b-row",[a("b-col",[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"example-email"}},[t._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.updateUser.email,expression:"updateUser.email"}],staticClass:"form-control",attrs:{type:"email",placeholder:"Ex: tagnemiguel@gmail.com",id:"example-email"},domProps:{value:t.updateUser.email},on:{input:function(e){e.target.composing||t.$set(t.updateUser,"email",e.target.value)}}})])]),a("b-col",[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"example-phone"}},[t._v("N° de Téléphone")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.updateUser.tel,expression:"updateUser.tel"}],staticClass:"form-control",attrs:{type:"tel",id:"example-phone",placeholder:"Ex: 693803726"},domProps:{value:t.updateUser.tel},on:{input:function(e){e.target.composing||t.$set(t.updateUser,"tel",e.target.value)}}})])])],1),a("b-row",[a("b-col",[a("b-form-group",{attrs:{label:"Date de Naissance"}},[a("date-picker",{staticClass:"w-100",attrs:{placeholder:"Selectionnez une date",format:"dddd, DD MMMM YYYY",valueType:"YYYY-MM-DD",clearable:!1},model:{value:t.updateUser.dateNaiss,callback:function(e){t.$set(t.updateUser,"dateNaiss",e)},expression:"updateUser.dateNaiss"}})],1)],1),a("b-col",[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"example-phone"}},[t._v("Proféssion")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.updateUser.profession,expression:"updateUser.profession"}],staticClass:"form-control",attrs:{type:"text",id:"example-phone",placeholder:"Ex: Architecte"},domProps:{value:t.updateUser.profession},on:{input:function(e){e.target.composing||t.$set(t.updateUser,"profession",e.target.value)}}})])])],1),a("b-row",[a("b-col",[a("b-form-group",{staticClass:"ml-4",attrs:{label:"Photo de profil"}},[a("div",{staticClass:"photo-cite d-flex justify-content-center align-items-center border rounded-circle mx-auto",style:"background-image: url("+t.updateUser.photo+");"},[a("b-button",{staticClass:"btn-icon",attrs:{variant:"light"},on:{click:function(e){return e.preventDefault(),t.$refs.photoCite.click()}}},[a("i",{staticClass:"fa fa-camera-retro fa-lg text-muted"})]),a("input",{ref:"photoCite",staticClass:"d-none",attrs:{type:"file"},on:{change:t.onFileSelected}})],1)])],1),a("b-col",[a("b-row",[a("b-col",[a("b-form-group",{staticClass:"ml-4",attrs:{label:"Genre"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.ariaDescribedby;return[a("b-form-radio-group",{attrs:{id:"radio-slots",options:t.options,"aria-describedby":s,name:"radio-options-slots"},model:{value:t.updateUser.genre,callback:function(e){t.$set(t.updateUser,"genre",e)},expression:"updateUser.genre"}})]}}])})],1)],1),a("b-row",[a("b-col",[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"example-phone"}},[t._v("N° de Téléphone secondaire")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.updateUser.tel2,expression:"updateUser.tel2"}],staticClass:"form-control",attrs:{type:"tel",id:"example-phone",placeholder:"Ex: 667134414"},domProps:{value:t.updateUser.tel2},on:{input:function(e){e.target.composing||t.$set(t.updateUser,"tel2",e.target.value)}}})])])],1),a("b-row",[a("b-col",[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"example-email"}},[t._v("Email Secondaire")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.updateUser.email2,expression:"updateUser.email2"}],staticClass:"form-control",attrs:{type:"email",placeholder:"Ex: laplace@yahoo.fr",id:"example-email"},domProps:{value:t.updateUser.email2},on:{input:function(e){e.target.composing||t.$set(t.updateUser,"email2",e.target.value)}}})])])],1)],1)],1)],1)]),a("button",{staticClass:"btn btn-secondary btn-rounded mr-4",attrs:{type:"button"},on:{click:t.activeUpdateForm}},[t._v("Modifier mon mot de passe")]),a("transition",{attrs:{"enter-active-class":"animated zoomIn"}},[2==t.step?a("div",[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"example-password"}},[t._v("Mot de passe Actuel")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.actualmdp,expression:"actualmdp"}],staticClass:"form-control",attrs:{type:"password",value:"password",name:"example-password",id:"example-password"},domProps:{value:t.actualmdp},on:{input:function(e){e.target.composing||(t.actualmdp=e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"example-password"}},[t._v("Nouveau mot de passe")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newmdp,expression:"newmdp"}],staticClass:"form-control",attrs:{type:"password",value:"password",name:"example-password",id:"example-password"},domProps:{value:t.newmdp},on:{input:function(e){e.target.composing||(t.newmdp=e.target.value)}}})])]):t._e()]),a("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[t._v("Mettre à jour"),t.submitted?a("b-spinner",{attrs:{small:""}}):t._e()],1)],1)])])])])])],1)],1)},i=[],r=a("2f62"),o=a("ec45"),l=(a("411c"),a("0edd"),{data:()=>({submitted:!1,step:1,updateUser:{nom:"",prenom:"",tel:"",tel2:"",email:"",email2:"",profession:"",dateNaiss:"",genre:"",photo:""},actualmdp:"",newmdp:"",url:null,options:[{text:"Monsieur",value:"M"},{text:"Mme",value:"Mme"},{text:"Mademoiselle",value:"Mlle"}],mainProps:{width:150,height:150,class:"m1"}}),components:{DatePicker:o["default"]},computed:{...Object(r["b"])(["user"])},...Object(r["c"])(["user"]),mounted(){console.log("=================================================="),console.log(this.user),console.log("=================================================="),this.updateUser.nom=this.user.nom,this.updateUser.prenom=this.user.prenom,this.updateUser.email=this.user.email,this.updateUser.dateNaiss=this.user.dateNaiss,this.updateUser.profession=this.user.profil.profession,this.updateUser.tel=this.user.tel,this.updateUser.tel2=this.user.profil.tel2},methods:{onFileSelected(t){let e=t.target.files[0],a=new FileReader,s=this.updateUser;a.onload=function(){s.photo=this.result,console.log("result",result)},a.readAsDataURL(e)},activeUpdateForm(){this.step=2,console.log("step",this.step)},sendUserDataForm(){this.submitted=!0;const t={nom:this.updateUser.nom,prenom:this.updateUser.prenom,dateNaiss:this.updateUser.dateNaiss,avatar:this.updateUser.photo,email:this.updateUser.email,tel:this.updateUser.tel,mdp:this.newmdp};axios.put("account/profil",t).then(t=>(this.submitted=!1,console.log("response ok",t),this.updateUser.nom="",this.updateUser.prenom="",this.updateUser.dateNaiss="",this.updateUser.photo="",this.updateUser.email="",this.updateUser.email2="",this.updateUser.tel2="",this.updateUser.photo="",this.actualmdp="",this.newmdp="",this.updateUser.genre="",this.user.nom=t.result.nom,this.user.prenom=t.result.prenom,this.user.tel=t.result.tel,this.user.email=t.result.email,this.user.avatar=t.result.avatar,this.step=1,App.notifySuccess(t.message))).catch(t=>{this.submitted=!1,App.notifyError(t.message)})}}}),n=l,p=(a("0cf1"),a("2877")),d=Object(p["a"])(n,s,i,!1,null,"1ec1ae8e",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-4f37bc6f.a07b99f8.js.map