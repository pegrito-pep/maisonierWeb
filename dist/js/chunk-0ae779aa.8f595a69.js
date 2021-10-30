(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ae779aa","chunk-2d21a7b1"],{"18e7":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("page-description",{attrs:{path:[{label:"Mes cités",route:"cites"},{label:"Mes batiments",route:"batiments"},{label:"Mes logements",route:"logements"}]}}),i("Cites",{directives:[{name:"show",rawName:"v-show",value:""==t.path,expression:" path == ''"}]}),i("router-view")],1)},a=[],o=i("bc60"),n={components:{Cites:o["default"]},data:()=>({path:""}),created(){this.getPath()},mounted(){this.getPath()},updated(){this.getPath()},methods:{getPath(){this.path=this.$route.path.replace("/patrimoine","")}}},l=n,r=i("2877"),c=Object(r["a"])(l,s,a,!1,null,null,null);e["default"]=c.exports},bc60:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-12"},[i("div",{staticClass:"mb-2 clearfix"},[i("div",{staticClass:"collapse d-md-block display-options",attrs:{id:"displayOptions"}},[i("div",{staticClass:"d-block d-md-inline-block"},[i("SearchForm",{model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),i("div",{staticClass:"float-md-right"},[i("btnAdd",{attrs:{message:"Ajouter une cité"},on:{click:function(){t.modal.action="add",t.$bvModal.show("modal-cite")}}})],1)])]),i("div",{staticClass:"separator mb-20"}),i("b-overlay",{attrs:{show:t.showOverlay,rounded:"sm"}},[t.cites.length?i("b-row",{staticClass:"layout-wrap"},t._l(t.items,(function(e,s){return i("b-col",{key:e.idCite||s,staticClass:"animated flipInX mb-4",attrs:{xl:"3",lg:"4",cols:"12",sm:"6"}},[i("app-cite",{attrs:{cite:e},on:{makeUpdate:t.updateCite,deleted:t.removeCite,showDetails:t.showDetails}})],1)})),1):i("b-alert",{staticClass:"text-center",attrs:{variant:"info",show:""}},[i("i",{staticClass:"fa fa-exclamation-triangle fa-3x"}),t._v(" "),i("br"),i("span",{staticClass:"h4 d-inline-flex ml-2"},[t._v("Aucune cité enregistrée pour le moment")])]),i("paginator",{attrs:{hr:"top",offset:t.offset,total:t.cites.length,limit:t.perPage,page:t.currentPage},on:{pageChanged:function(e){t.currentPage=e},limitChanged:function(e){t.perPage=e}}})],1)],1)]),t.cite?i("div",{staticClass:"modal fade edit-layout-modal",attrs:{id:"editLayoutItem",tabindex:"-1",role:"dialog","aria-labelledby":"editLayoutItemLabel","aria-hidden":"true"}},[i("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[i("div",{staticClass:"modal-content"},[i("div",{staticClass:"modal-header"},[i("h5",{staticClass:"modal-title",attrs:{id:"editLayoutItemLabel"}},[t._v("Détails de la cité : "),i("b",[t._v(t._s(t.cite.nomCite))]),t._v(".")]),t._m(0)]),i("div",{staticClass:"modal-body pt-2"},[i("details-cite",{attrs:{cite:t.cite,source:t.source},on:{batimentsChanged:t.changeBatiments}})],1)])])]):t._e(),i("b-modal",{ref:"modalCite",attrs:{id:"modal-cite",size:"sm"},on:{hidden:t.resetModal,ok:t.submitModal},scopedSlots:t._u([{key:"modal-title",fn:function(){return["add"==t.modal.action?i("span",[t._v("Ajouter une cité")]):t._e(),"edit"==t.modal.action?i("span",[t._v("Edition de la cité")]):t._e()]},proxy:!0},{key:"modal-footer",fn:function(e){var s=e.ok;return[i("b-button",{attrs:{size:"sm",variant:"danger",disabled:t.modal.submitted},on:{click:function(t){return s()}}},[t._v("Valider "),t.modal.submitted?i("b-spinner",{attrs:{small:""}}):t._e()],1)]}}])},[i("b-form-group",{attrs:{label:"Nom de la cité"}},[i("b-form-input",{attrs:{placeholder:"Ex: Cité de la paix",trim:""},model:{value:t.modal.nom,callback:function(e){t.$set(t.modal,"nom",e)},expression:"modal.nom"}})],1),i("b-form-group",{attrs:{label:"Reference"}},[i("b-form-input",{attrs:{placeholder:"Ex: CP3",trim:""},model:{value:t.modal.ref,callback:function(e){t.$set(t.modal,"ref",e)},expression:"modal.ref"}})],1),i("b-form-group",{attrs:{label:"Photo"}},[i("img-inputer",{attrs:{"img-src":t.$getBase64(t.modal.photo,!1),placeholder:"Ajouter la photo de la cité",theme:"light",size:"xl","bottom-text":"déposez le fichier ici ou cliquez pour modifier",icon:"img"},model:{value:t.modal.photo,callback:function(e){t.$set(t.modal,"photo",e)},expression:"modal.photo"}})],1)],1)],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[i("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])}],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:" list-item list-item-grid"},[i("div",{staticClass:"card d-flex flex-row mb-3"},[i("a",{staticClass:"d-flex card-img",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.showDetails.apply(null,arguments)}}},[i("img",{staticClass:"list-thumbnail responsive border-0",staticStyle:{height:"10em"},attrs:{src:t.cite.image||"/img/bgCity.jpg",alt:""}}),t.isNew?i("span",{staticClass:"badge badge-pill badge-primary position-absolute badge-top-left"},[t._v("New")]):t._e()]),i("div",{staticClass:"d-flex flex-grow-1 min-width-zero card-content"},[i("div",{staticClass:"card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"},[i("div",{staticClass:"text-center"},[i("h4",{staticClass:"text-red mt-0 truncate"},[t._v(t._s(t.cite.nomCite))]),i("span",{staticClass:"d-inline-block text-muted"},[t._v("Reference: "),i("b",[t._v(t._s(t.cite.refCite))])])]),i("p",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:t.dateCreation,expression:"dateCreation",modifiers:{bottom:!0}}],staticClass:"mt-3 mb-1 text-muted text-small date w-15 w-xs-100"},[t._v(t._s(t.$date(t.cite.createdAt).format("DD.MM.YYYY")))])]),i("div",{staticClass:"list-actions"},[i("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:"Détails",expression:"'Détails'",modifiers:{bottom:!0}}],attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.showDetails.apply(null,arguments)}}},[i("i",{staticClass:"ik ik-eye"})]),i("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:"Editer",expression:"'Editer'",modifiers:{bottom:!0}}],attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.$emit("makeUpdate",t.cite)}}},[i("i",{staticClass:"ik ik-edit-2"})]),i("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:"Supprimer",expression:"'Supprimer'",modifiers:{bottom:!0}}],staticClass:"list-delete",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.remove.apply(null,arguments)}}},[i("i",{staticClass:"ik ik-trash-2"})])])])])])},n=[],l={props:{cite:{type:Object,required:!0},isSub:{type:Boolean,default:!1}},computed:{dateCreation(){const t=this.$date(this.cite.createdAt);return`Créée le ${t.format("dddd, DD MMMM YYYY")} à ${t.format("HH:mm")}`},isNew(){return dayjs().diff(this.cite.createdAt,"hour")<=1}},methods:{showDetails(){if(this.isSub)return!1;this.$emit("showDetails",this.cite)},remove(){App.confirm(`Voullez vous vraiment supprimer la cité " <b>${this.cite.nomCite}</b> " ?`,{confirm:()=>{axios.delete("cites/"+this.cite.idCite).then(t=>t.success?(this.$emit("deleted",this.cite.idCite),App.notifySuccess(t.message)):App.notifyError(t.message))}})}}},r=l,c=i("2877"),d=Object(c["a"])(r,o,n,!1,null,null,null),m=d.exports,h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("ul",{staticClass:"nav nav-tabs"},[i("li",{staticClass:"nav-item"},[i("a",{staticClass:"nav-link",class:{active:"batiments"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="batiments"}}},[t._v("Batiments")])]),i("li",{staticClass:"nav-item"},[i("a",{staticClass:"nav-link",class:{active:"stats"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="stats"}}},[t._v("Statistiques générales")])]),i("li",{staticClass:"nav-item"},[i("a",{staticClass:"nav-link",class:{active:"add-batiments"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="add-batiments"}}},[t._v("Ajouter des bâtiments")])]),i("li",{staticClass:"nav-item"},[i("a",{staticClass:"nav-link",class:{active:"depenses"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="depenses"}}},[t._v("Dépenses liées à la cité")])]),i("li",{staticClass:"nav-item"},[i("a",{staticClass:"nav-link",class:{active:"add-depense"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="add-depense"}}},[t._v("Ajouter une dépense")])])]),i("div",{staticClass:"tab-content mt-3"},[i("div",{staticClass:"tab-pane fade show active"},["stats"==t.section?i("div",{staticClass:"jumbotron pt-10 pb-10"},[i("h3",{staticClass:"m-0"},[t._v("Statistiques générales")]),i("p",[t._v("This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.")])]):t._e(),"batiments"==t.section?i("div",[t.cite.batiments.length?i("div",{staticStyle:{height:"75vh"}},[i("paginator",{attrs:{"no-control":"",hr:"bottom",total:t.cite.batiments.length,limit:t.perPage,page:t.currentPage},on:{pageChanged:function(e){t.currentPage=e},limitChanged:function(e){t.perPage=e}}}),i("div",{staticStyle:{height:"90%","overflow-y":"auto","overflow-x":"hidden"}},[i("b-row",{staticClass:"layout-wrap"},t._l(t.items,(function(e,s){return i("b-col",{key:e.idBatiment||s,attrs:{cols:"6"}},[i("batiment",{attrs:{batiment:e,"is-sub":""},on:{deleted:t.removeBatiment}})],1)})),1)],1)],1):i("b-alert",{attrs:{variant:"info",show:""}},[i("i",{staticClass:"fa fa-exclamation-triangle fa-3x float-left"}),i("span",{staticClass:"h4 d-inline-flex ml-2"},[t._v("Aucun bâtiment enregistré pour le moment")])])],1):t._e(),i("div",{directives:[{name:"show",rawName:"v-show",value:"add-batiments"==t.section,expression:"section == 'add-batiments'"}]},[i("form-batiment",{attrs:{cite:t.cite},on:{batimentAdded:t.pushBatiment}})],1),"depenses"==t.section?i("div",[t.cite.depenses.length?t._e():i("b-alert",{attrs:{variant:"info",show:""}},[i("i",{staticClass:"fa fa-exclamation-triangle fa-3x float-left"}),i("span",{staticClass:"h4 d-inline-flex ml-2"},[t._v("Aucune dépense enregistrée pour le moment")])]),t.cite.depenses.length>0?i("div",{staticStyle:{height:"75vh"}},[i("b-row",[i("paginator",{attrs:{"no-control":"",hr:"bottom",total:t.cite.depenses.length,limit:t.perPage,page:t.currentPage},on:{pageChanged:function(e){t.currentPage=e},limitChanged:function(e){t.perPage=e}}})],1),i("div",{staticStyle:{height:"90%","overflow-y":"auto","overflow-x":"hidden"}},[i("b-row",{staticClass:"layout-wrap"},t._l(t.itemsDepenses,(function(e,s){return i("b-col",{key:e.idDepense||s,attrs:{cols:"6"}},[i("depense",{attrs:{depense:e,"is-sub":""},on:{deleted:t.removeDepense}})],1)})),1)],1)],1):t._e()],1):t._e(),i("div",{directives:[{name:"show",rawName:"v-show",value:"add-depense"==t.section,expression:"section == 'add-depense'"}]},[i("depense-form",{attrs:{cite:t.cite,provenance:t.provenance,action:t.action},on:{depenseAdded:t.addedDepense}})],1)])])])},u=[],p=i("5c21"),f=i("5ad6"),b=i("a474"),v=i("3c60");const g=i("5a6f");var C={props:{cite:{type:Object,required:!0}},components:{Batiment:p["a"],Depense:f["a"],DepenseForm:b["a"],FormBatiment:v["a"]},computed:{items(){return g.array_slice(this.cite.batiments||[],this.offset,this.perPage)},itemsDepenses(){return g.array_slice(this.cite.depenses||[],this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage}},data:()=>({section:"add-batiments",submitted:!1,currentPage:1,perPage:10,source:"2",provenance:"2",action:"add"}),mounted(){this.section="batiments",this.makeRepeater()},methods:{addedDepense(){axios.get(`cites/${this.cite.idCite}/depenses`).then(t=>t.result||[]).then(t=>{this.cite.depenses=t,this.section="depenses"})},pushBatiment(t){if(this.cite.batiments.push(...t),this.$emit("batimentsChanged",this.cite.batiments),this.section="batiments",!t.length)return App.notif("Aucun batiment rajouté",{})},removeBatiment(t){this.cite.batiments=this.cite.batiments.filter(e=>e.idBatiment!=t),this.$emit("batimentsChanged",this.cite.batiments)},removeDepense(t){this.cite.depenses=this.cite.depenses.filter(e=>e.idDepense!=t),this.$emit("depensesChanged",this.cite.depenses)},defineDepense(){this.action="add",this.commandeDepense=!0},onCloseSet(){this.commandeDepense=!1}}},w=C,y=Object(c["a"])(w,h,u,!1,null,null,null),x=y.exports,_=i("fb87");const k=i("5a6f");var D={name:"cites",components:{AppCite:m,DetailsCite:x,SearchForm:_["a"]},computed:{items(){return k.array_slice(this.cites,this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage}},data:()=>({cites:[],trueCites:[],showOverlay:!0,cite:null,currentPage:1,perPage:10,search:null,modal:{action:"",submitted:!1,nom:"",ref:"",idCite:"",photo:""},source:0}),watch:{search(t){k.empty(t)?this.cites=this.trueCites:this.cites=this.trueCites.filter(e=>e.nomCite.toLowerCase().includes(t.toLowerCase()))}},beforeMount(){this.getCities()},mounted(){},methods:{showModal(){this.modal.action="add",this.$refs.modalCite.show("modal-cite")},onFileSelected(t){let e=new FileReader,i=this.modal;e.onload=function(){i.photo=this.result},e.readAsDataURL(t)},getCities(){axios.get("cites").then(t=>t.result||[]).then(t=>{this.cites=this.trueCites=t,this.autoAddTarget(),this.showOverlay=!1})},autoAddTarget(){const t=this.$route.query.formCite||null;t&&(this.showModal(),window.history.replaceState({},"",window.location.href.split("?")[0]))},showDetails(t){this.cite=t,this.source=2,setTimeout(()=>{$("#editLayoutItem").modal("show"),$("#editLayoutItem").on("hide.bs.modal",t=>{this.cite=null}),$("#editLayoutItem").on("hidden.bs.modal",t=>{this.cite=null})},100)},changeBatiments(t){this.cites=this.cites.map(e=>e.idCite!=this.cite.idCite?e:{...e,batiments:t}),this.cite.batiments=t},removeCite(t){this.cites=this.cites.filter(e=>e.idCite!=t),this.trueCites=this.trueCites.filter(e=>e.idCite!=t)},resetModal(){this.modal={action:"",submitted:!1,nom:"",ref:"",idCite:"",photo:""}},async submitModal(t){if(t.preventDefault(),k.empty(this.modal.nom)||k.empty(this.modal.ref))return App.error("Veuillez remplir tous les champs du formulaire");this.modal.submitted=!0;const e=Object.assign({},this.modal,{photo:await this.$getBase64(this.modal.photo)});"add"==this.modal.action&&axios.post("cites",e).then(t=>(this.modal.submitted=!1,t.success?(this.cites=this.addNewCite(this.cites,t.result),this.trueCites=this.addNewCite(this.trueCites,t.result),this.$bvModal.hide("modal-cite"),App.notifySuccess(t.message)):App.alertError(t.message))).catch(t=>(this.modal.submitted=!1,App.alertError(t.message))),"edit"==this.modal.action&&axios.put("cites/"+this.modal.idCite,e).then(t=>(this.modal.submitted=!1,t.success?(this.cites=this.renameCite(this.cites,e),this.trueCites=this.renameCite(this.trueCites,e),this.$bvModal.hide("modal-cite"),App.notifySuccess(t.message)):App.alertError(t.message))).catch(t=>(this.modal.submitted=!1,App.alertError(t.message)))},updateCite(t){this.modal={action:"edit",nom:t.nomCite,ref:t.refCite,idCite:t.idCite,photo:t.image},this.$bvModal.show("modal-cite")},addNewCite(t,e){let i=!1;for(let s=0;s<t.length;s++)if(t[s].idCite==e.idCite){i=!0;break}return i||t.push(e),t},renameCite(t,e){return t.map(t=>(t.idCite==e.idCite&&(t.nomCite=e.nom,t.refCite=e.ref,t.image=e.photo),t))}}},P=D,A=Object(c["a"])(P,s,a,!1,null,null,null);e["default"]=A.exports}}]);
//# sourceMappingURL=chunk-0ae779aa.8f595a69.js.map