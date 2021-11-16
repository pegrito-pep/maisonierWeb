(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-861a2984"],{"585b":function(t,e,i){t.exports=i.p+"img/rubrique.f66e4cbc.jpg"},a321:function(t,e,i){},dba4:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container-fluid"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-12"},[i("div",{staticClass:"mb-2 clearfix"},[i("div",{staticClass:"collapse d-md-block display-options",attrs:{id:"displayOptions"}},[i("div",{staticClass:"d-block d-md-inline-block"},[i("SearchForm",{model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),i("div",{staticClass:"float-md-right"},[i("btnAdd",{attrs:{message:"Créer un article"},on:{click:function(){t.modal.action="add",t.$bvModal.show("modal-article")}}})],1)])]),i("div",{staticClass:"separator mb-20"}),i("b-overlay",{attrs:{show:t.showOverlay,rounded:"sm"}},[t.articles.length||1!=t.source?t._e():i("b-alert",{staticClass:"text-center",attrs:{variant:"info",show:""}},[i("i",{staticClass:"fa fa-exclamation-triangle fa-3x"}),t._v(" "),i("br"),i("span",{staticClass:"h4 d-inline-flex ml-2"},[t._v("Aucun article crée pour le moment")]),i("br"),i("b-button",{staticClass:"my-2",attrs:{size:"lg",variant:"outline-info",disabled:t.submitted},on:{click:t.generateArticles}},[t._v("Générer des articles automatiquement "),t.submitted?i("b-spinner",{attrs:{small:""}}):t._e()],1),i("p",[t._v("Un article est une disposition d'un texte législatif qui a pour objet d'énoncer une règle de droit ou qui en indique les éléments ou les modalités d'application. Un article de loi peut contenir une règle de droit absolue, impérative ou supplétive")])],1),t.articles.length||2!=t.source?i("b-row",{staticClass:"layout-wrap"},t._l(t.items,(function(e,a){return i("b-col",{key:e.idArticle||a,staticClass:"animated flipInX mb-4",attrs:{xl:"3",lg:"4",cols:"12",sm:"6"}},[i("app-article",{attrs:{article:e},on:{makeUpdate:t.updateArticle,deleted:t.removeArticle,showDetails:t.showDetails}})],1)})),1):i("b-alert",{staticClass:"text-center",attrs:{variant:"info",show:""}},[i("i",{staticClass:"fa fa-exclamation-triangle fa-3x"}),t._v(" "),i("br"),i("span",{staticClass:"h4 d-inline-flex ml-2"},[t._v("Aucun résultat trouvé")])]),i("paginator",{attrs:{hr:"top",offset:t.offset,total:t.articles.length,limit:t.perPage,page:t.currentPage},on:{pageChanged:function(e){t.currentPage=e},limitChanged:function(e){t.perPage=e}}})],1)],1)]),i("b-modal",{attrs:{id:"modal-article",size:"sm","ok-only":"","ok-title":"Valider"},on:{hidden:t.resetModal,ok:t.submitModal}},[i("b-overlay",{attrs:{show:t.showOverlayModal,rounded:"sm"},scopedSlots:t._u([{key:"modal-title",fn:function(){return["add"==t.modal.action?i("span",[t._v("Ajouter un article")]):t._e(),"edit"==t.modal.action?i("span",[t._v("Edition de l'article")]):t._e()]},proxy:!0}])},[i("b-form-group",{attrs:{label:"Titre  de l'article"}},[i("b-form-input",{attrs:{placeholder:"Ex: OBJET-USAGE DES LIEUX",trim:""},model:{value:t.modal.titreArticle,callback:function(e){t.$set(t.modal,"titreArticle",e)},expression:"modal.titreArticle"}})],1),i("b-form-group",{attrs:{label:"Numéro"}},[i("b-form-input",{attrs:{placeholder:"Ex: 1",trim:""},model:{value:t.modal.numArticle,callback:function(e){t.$set(t.modal,"numArticle",e)},expression:"modal.numArticle"}})],1)],1)],1),t.article?i("div",{staticClass:"modal fade edit-layout-modal",attrs:{id:"editLayoutItem",tabindex:"-1",role:"dialog","aria-labelledby":"editLayoutItemLabel","aria-hidden":"true"}},[i("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[i("div",{staticClass:"modal-content"},[i("div",{staticClass:"modal-header"},[i("h5",{staticClass:"modal-title",attrs:{id:"editLayoutItemLabel"}},[t._v("Détails de l'article : "),i("b",[t._v(t._s(t.article.titreArticle))]),t._v(".")]),t._m(0)]),i("div",{staticClass:"modal-body pt-2"},[i("details-article",{attrs:{article:t.article}})],1)])])]):t._e()],1)},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[i("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])}],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:" list-item list-item-grid"},[a("div",{staticClass:"card d-flex flex-row mb-3"},[a("a",{staticClass:"d-flex card-img",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.showDetails.apply(null,arguments)}}},[a("img",{staticClass:"list-thumbnail responsive border-0",staticStyle:{height:"10em"},attrs:{src:i("e9cd"),alt:""}}),t.isNew?a("span",{staticClass:"badge badge-pill badge-primary position-absolute badge-top-left"},[t._v("New")]):t._e()]),a("div",{staticClass:"d-flex flex-grow-1 min-width-zero card-content"},[a("div",{staticClass:"card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"},[a("div",{staticClass:"text-center"},[a("h5",{staticClass:"text-red text-small mt-0 truncate"},[t._v(t._s(t.article.titreArticle))]),a("span",{staticClass:"d-inline-block text-muted"},[t._v("Numéro Article: "),a("b",[t._v(t._s(t.article.numArticle))])])]),a("p",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:t.dateCreation,expression:"dateCreation",modifiers:{bottom:!0}}],staticClass:"mt-3 mb-1 text-muted text-small date w-15 w-xs-100"},[t._v(t._s(t.$date(t.article.createdAt).format("DD.MM.YYYY")))])]),a("div",{staticClass:"list-actions"},[a("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.showDetails.apply(null,arguments)}}},[a("i",{staticClass:"ik ik-eye"})]),a("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.$emit("makeUpdate",t.article)}}},[a("i",{staticClass:"ik ik-edit-2"})]),a("a",{staticClass:"list-delete",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.remove.apply(null,arguments)}}},[a("i",{staticClass:"ik ik-trash-2"})])])])])])},l=[],o={props:{article:{type:Object,required:!0},isSub:{type:Boolean,default:!1}},computed:{dateCreation(){const t=this.$date(this.article.createdAt);return`Créée le ${t.format("dddd, DD MMMM YYYY")} à ${t.format("HH:mm")}`},isNew(){return dayjs().diff(this.article.createdAt,"hour")<=1}},methods:{showDetails(){if(this.isSub)return!1;this.$emit("showDetails",this.article),console.log(this.article)},remove(){App.confirm(`Voullez vous vraiment supprimer l'article " <b>${this.article.titreArticle}</b> " ?`,{confirm:()=>{axios.delete("articles/"+this.article.idArticle).then(t=>t.success?(this.$emit("deleted",this.article.idArticle),App.notifySuccess(t.message)):App.notifyError(t.message))}})}}},c=o,n=(i("f136"),i("2877")),d=Object(n["a"])(c,r,l,!1,null,null,null),u=d.exports,m=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ul",{staticClass:"nav nav-tabs"},[i("li",{staticClass:"nav-item"},[i("a",{staticClass:"nav-link",class:{active:"rubriques"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="rubriques"}}},[t._v("Rubriques")])]),i("li",{staticClass:"nav-item"},[i("a",{staticClass:"nav-link",class:{active:"add-rubriques"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="add-rubriques"}}},[t._v("Ajouter des rubriques")])])]),i("div",{staticClass:"tab-content mt-3"},[i("div",{staticClass:"tab-pane fade show active"},["rubriques"==t.section?i("div",[t.article.rubriques.length?i("div",{staticStyle:{height:"75vh"}},[i("paginator",{attrs:{"no-control":"",hr:"bottom",total:t.article.rubriques.length,limit:t.perPage,page:t.currentPage},on:{pageChanged:function(e){t.currentPage=e},limitChanged:function(e){t.perPage=e}}}),i("div",{staticStyle:{height:"90%","overflow-y":"auto","overflow-x":"hidden"}},[i("b-row",{staticClass:"layout-wrap"},t._l(t.items,(function(e,a){return i("b-col",{key:e.idRubrique||a,attrs:{cols:"6"}},[i("rubriques",{attrs:{rubrique:e,"is-sub":""},on:{deleted:t.removeRubrique}})],1)})),1)],1)],1):i("b-alert",{attrs:{variant:"info",show:""}},[i("i",{staticClass:"fa fa-exclamation-triangle fa-3x float-left"}),i("span",{staticClass:"h4 d-inline-flex ml-2"},[t._v("Aucune rubriques enregistré pour le moment")])])],1):t._e(),i("div",{directives:[{name:"show",rawName:"v-show",value:"add-rubriques"==t.section,expression:"section == 'add-rubriques'"}]},[i("div",{staticStyle:{height:"75vh"},attrs:{id:t.repeaterId}},[i("div",{staticClass:"d-flex flex-column justify-content-between",staticStyle:{height:"90%","overflow-y":"auto","overflow-x":"hidden"}},[i("div",{attrs:{"data-repeater-list":"group"}},[i("b-row",{attrs:{"data-repeater-item":""}},[i("b-col",{attrs:{cols:"12",md:"6",lg:"6"}},[i("b-form-group",{attrs:{label:"description de la rubrique"}},[i("b-form-textarea",{staticClass:"mb-2",attrs:{placeholder:"Ex: Ils ne pourront être utilisé même temporairement à d'autres usages que celui ainsi arrêté sous peine de résiliation de plein droit de bail, suivi d'un délaissement immédiat à la première demande du bailleur .",rows:"8",name:"description"}})],1)],1),i("b-col",{attrs:{md:"4",lg:"4"}},[i("b-form-group",{attrs:{label:"A t'elle une valeur ?"}},[i("div",{staticClass:"form-radio"},[i("form",[i("div",{staticClass:"radio radio-outline radio-inline"},[i("label",[i("input",{attrs:{type:"radio",name:"valeur",checked:"checked"}}),i("i",{staticClass:"helper"}),t._v("Oui ")])]),i("div",{staticClass:"radio radio-outline radio-inline"},[i("label",[i("input",{attrs:{type:"radio",name:"valeur"}}),i("i",{staticClass:"helper"}),t._v("Non ")])])])])])],1),i("b-col",[i("b-form-group",{attrs:{label:"Action"}},[i("b-button",{attrs:{"data-repeater-delete":"",variant:"outline-danger"}},[i("i",{staticClass:"fa fa-times"})])],1)],1)],1)],1)]),i("div",{staticClass:"d-flex justify-content-end align-items-center mt-5"},[i("b-button",{attrs:{variant:"outline-primary","data-repeater-create":""}},[t._v("Ajouter un élément")]),i("b-button",{staticClass:"ml-2",attrs:{variant:"danger",disabled:t.submitted},on:{click:t.addRubriques}},[t._v("Valider "),t.submitted?i("b-spinner",{attrs:{small:""}}):t._e()],1)],1)])])])])])},p=[],h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"shadow list-item list-item-grid"},[a("div",{staticClass:"card d-flex flex-row mb-3"},[a("a",{staticClass:"d-flex card-img",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.showDetails.apply(null,arguments)}}},[a("img",{staticClass:"list-thumbnail responsive border-0",staticStyle:{height:"10em"},attrs:{src:i("585b"),alt:""}}),t.isNew?a("span",{staticClass:"badge badge-pill badge-primary position-absolute badge-top-left"},[t._v("New")]):t._e()]),a("div",{staticClass:"d-flex flex-grow-1 min-width-zero card-content"},[a("div",{staticClass:"card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"},[a("div",{staticClass:"text-center"},[a("span",{staticClass:"d-inline-block text-muted"},[t._v("Rubrique: "),a("b",[t._v(t._s(t.rubrique.descRubrique))])])]),t.isSub?a("p",{staticClass:"text-muted mt-3 mb-1 date w-15 w-xs-100 text-small"},[t._v(t._s(t.$date(t.rubrique.createdAt).format("DD.MM.YYYY")))]):a("p",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:t.dateCreation,expression:"dateCreation",modifiers:{bottom:!0}}],staticClass:"mt-3 mb-1 text-muted text-small date w-15 w-xs-100"},[t._v(t._s(t.$date(t.rubrique.createdAt).format("DD.MM.YYYY")))])]),a("div",{staticClass:"list-actions"},[a("a",{staticClass:"list-delete",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.remove.apply(null,arguments)}}},[a("i",{staticClass:"ik ik-trash-2"})])])])])])},b=[],f={props:{rubrique:{type:Object,required:!0},isSub:{type:Boolean,default:!1}},computed:{dateCreation(){const t=this.$date(this.rubrique.createdAt);return`Créée le ${t.format("dddd, DD MMMM YYYY")} à ${t.format("HH:mm")}`},isNew(){return dayjs().diff(this.rubrique.createdAt,"week")<=1}},methods:{showDetails(){if(this.isSub)return!1;this.$emit("showDetails",this.rubrique)},accessTo(){$("#editLayoutItem").modal("hide"),this.$router.push({name:"rubriques",query:{target:this.rubrique.idRubrique}})},remove(){App.confirm(`Voullez vous vraiment supprimer le batiment " <b>${this.batiment.nomBatiment}</b> " ?`,{confirm:()=>{axios.delete("batiments/"+this.batiment.idBatiment).then(t=>t.success?(this.$emit("deleted",this.batiment.idBatiment),App.notifySuccess(t.message)):App.notifyError(t.message)).catch(t=>{App.notifyError(t.message)})}})}}},v=f,g=Object(n["a"])(v,h,b,!1,null,null,null),A=g.exports;const C=i("5a6f");var x={props:{article:{type:Object,required:!0}},components:{Rubriques:A},computed:{repeaterId(){return"repeat-added-batiment-form-"+this.article.idArticle},items(){return C.array_slice(this.article.rubriques,this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage}},data:()=>({section:"add-rubriques",submitted:!1,valeur:!1,options:[{text:"Oui",value:"true"},{text:"Non",value:"false"}],currentPage:1,perPage:10}),mounted(){this.section="rubriques",console.log(this.section),this.makeRepeater()},methods:{makeRepeater(){setTimeout(()=>{$("#"+this.repeaterId).repeater({isFirstItemUndeletable:!0})},500)},addRubriques(){let t=$("#"+this.repeaterId).repeaterVal().group;if(console.log(t),C.empty(t[0].description)||C.empty(t[0].valeur))return App.error("Vous devez remplir au moins les informations de la première rubrique");this.submitted=!0,console.log("rubrique",t),axios.post("rubriques",{rubriques:t,idArticle:this.article.idArticle}).then(t=>(this.submitted=!1,t.success?(this.article.rubriques.push(...t.result),this.$emit("rubriquesChanged",this.article.rubriques),this.section="rubriques",t.result.length?(storage.set("articles",null),App.notifySuccess(t.message)):App.notif("Aucune rubrique rajouté",{})):App.alertError(t.message)))},removeBatiment(t){this.cite.batiments=this.cite.batiments.filter(e=>e.idBatiment!=t),this.$emit("batimentsChanged",this.cite.batiments)}}},y=x,w=Object(n["a"])(y,m,p,!1,null,null,null),_=w.exports,q=i("fb87");const k=i("5a6f");var D={name:"Articles",components:{AppArticle:u,DetailsArticle:_,SearchForm:q["a"]},computed:{items(){return k.array_slice(this.articles,this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage}},data:()=>({articles:[],trueArticles:[],showOverlay:!0,showOverlayModal:!1,article:null,currentPage:1,perPage:10,search:null,modal:{action:"",titreArticle:"",numArticle:"",idArticle:"",rubriques:[]},submitted:!1,source:1}),watch:{search(t){k.empty(t)?this.articles=this.trueArticles:(this.source=2,this.articles=this.trueArticles.filter(e=>e.titreArticle.toLowerCase().includes(t.toLowerCase())))}},beforeMount(){this.getArticles()},methods:{generateArticles(){this.submitted=!0,axios.post("/articles/generate").then(t=>{t.success&&this.getArticles(),this.submitted=!1})},getArticles(){axios.get("articles").then(t=>t.result||[]).then(t=>{this.articles=this.trueArticles=t,this.showOverlay=!1})},showDetails(t){this.article=t,setTimeout(()=>{$("#editLayoutItem").modal("show"),$("#editLayoutItem").on("hide.bs.modal",t=>{this.article=null}),$("#editLayoutItem").on("hidden.bs.modal",t=>{this.article=null})},100)},removeArticle(t){this.articles=this.articles.filter(e=>e.idArticle!=t),this.trueArticles=this.trueArticles.filter(e=>e.idArticle!=t)},resetModal(){this.modal={action:"",nom:"",ref:"",rubriques:[]}},submitModal(t){this.showOverlayModal=!0;let e={titre:this.modal.titreArticle,numero:this.modal.numArticle,rubriques:this.modal.rubriques};if(t.preventDefault(),k.empty(this.modal.titreArticle)||k.empty(this.modal.numArticle))return App.error("Veuillez remplir tous les champs du formulaire");if("add"==this.modal.action&&axios.post("articles",e).then(t=>t.success?(this.articles=this.addNewArticle(this.articles,t.result),this.trueArticles=this.addNewArticle(this.trueArticles,t.result),this.$bvModal.hide("modal-article"),storage.set("articles",null),App.notifySuccess(t.message)):App.alertError(t.message)).catch(t=>{App.notifyError(t.message)}),"edit"==this.modal.action){let t={titre:this.modal.titreArticle,numero:this.modal.numArticle};axios.put("articles/"+this.modal.idArticle,t).then(t=>t.success?(this.articles=this.renameArticle(this.articles,this.modal),this.trueArticles=this.renameArticle(this.trueArticles,this.modal),this.$bvModal.hide("modal-article"),storage.set("articles",null),App.notifySuccess(t.message)):App.alertError(t.message)).catch(t=>(this.modal.submitted=!1,App.alertError(t.message)))}this.showOverlayModal=!1},updateArticle(t){this.modal={action:"edit",titreArticle:t.titreArticle,numArticle:t.numArticle,idArticle:t.idArticle},this.$bvModal.show("modal-article")},addNewArticle(t,e){let i=!1;for(let a=0;a<t.length;a++)if(t[a].idArticle==e.idArticle){i=!0;break}return i||t.push(e),t},renameArticle(t,e){return t.map(t=>(t.idArticle==e.idArticle&&(t.titreArticle=e.titreArticle,t.numArticle=e.numArticle),t))}}},S=D,M=Object(n["a"])(S,a,s,!1,null,null,null);e["default"]=M.exports},e9cd:function(t,e,i){t.exports=i.p+"img/article.dba34dba.jpeg"},f136:function(t,e,i){"use strict";i("a321")},fb87:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"search-sm d-inline-block float-md-left mr-1 mb-1 align-top"},[i("form",{attrs:{action:"",onSubmit:"return false"}},[i("b-form-input",{staticStyle:{height:"40px",width:"350px","border-radius":"5px"},attrs:{type:"text",placeholder:t.placeholder},on:{input:function(e){t.$emit("input",e)}},model:{value:t.val,callback:function(e){t.val=e},expression:"val"}}),t._m(0)],1)])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"btn btn-icon",staticStyle:{height:"40px",width:"50px"},attrs:{type:"submit"}},[i("i",{staticClass:"ik ik-search"})])}],r={name:"SearchForm",props:{placeholder:{type:String,default:"Rechercher..."},value:{default:null}},data:()=>({val:null}),mounted:()=>{console.log("ldldldld:  this.value"),console.log(JSON.parse(JSON.stringify((void 0).value)))}},l=r,o=i("2877"),c=Object(o["a"])(l,a,s,!1,null,"394c7419",null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-861a2984.2a700d62.js.map