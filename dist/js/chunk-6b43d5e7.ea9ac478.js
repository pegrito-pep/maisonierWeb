(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b43d5e7"],{"27a0":function(t,e,a){},"91d3":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"mb-2 clearfix"},[a("div",{staticClass:"collapse d-md-block display-options",attrs:{id:"displayOptions"}},[a("div",{staticClass:"d-block d-md-inline-block"},[a("SearchForm",{model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("div",{staticClass:"float-md-right"},[a("btnAdd",{attrs:{message:"Ajouter un batiment"},on:{click:function(){t.action="add",t.$bvModal.show("modal-batiment")}}})],1)])]),a("div",{staticClass:"separator mb-20"}),a("b-overlay",{attrs:{show:t.showOverlay,rounded:"sm"}},[t.batiments.length?a("b-row",{staticClass:"layout-wrap"},t._l(t.items,(function(e,s){return a("b-col",{key:e.idBatiment||s,staticClass:"animated flipInX mb-4",attrs:{xl:"3",lg:"4",cols:"12",sm:"6"}},[a("batiment",{attrs:{batiment:e},on:{makeUpdate:t.updateBatiment,deleted:t.removeBatiment,showDetails:t.showDetails}})],1)})),1):a("b-alert",{staticClass:"text-center",attrs:{variant:"info",show:""}},[a("i",{staticClass:"fa fa-exclamation-triangle fa-3x"}),t._v(" "),a("br"),1==t.source?a("span",{staticClass:"h4 d-inline-flex ml-2"},[t._v("Aucun batiment enregistré pour le moment")]):t._e(),2==t.source?a("span",{staticClass:"h4 d-inline-flex ml-2"},[t._v("Aucun batiment trouvé")]):t._e()]),a("paginator",{attrs:{hr:"top",offset:t.offset,total:t.batiments.length,limit:t.perPage,page:t.currentPage},on:{pageChanged:function(e){t.currentPage=e},limitChanged:function(e){t.perPage=e}}})],1)],1)]),t.batiment?a("div",{staticClass:"modal fade edit-layout-modal",attrs:{id:"editLayoutItem",tabindex:"-1",role:"dialog","aria-labelledby":"editLayoutItemLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"editLayoutItemLabel"}},[t._v("Détails du batiment : "),a("b",[t._v(t._s(t.batiment.nomBatiment))]),t._v(".")]),t._m(0)]),a("div",{staticClass:"modal-body pt-2"},[a("details-batiment",{attrs:{batiment:t.batiment},on:{logementsChanged:t.changeLogements}})],1)])])]):t._e(),a("b-modal",{ref:"modalBatiment",attrs:{id:"modal-batiment",size:"lg","hide-footer":""},on:{hidden:function(e){t.batiment=null}},scopedSlots:t._u([{key:"modal-title",fn:function(){return["add"==t.action?a("span",{staticClass:"ml-4 text-form-batiment"},[t._v("Ajouter un batiment")]):t._e(),"edit"==t.action?a("span",{staticClass:"ml-4 text-form-batiment"},[t._v("Edition du batiment")]):t._e()]},proxy:!0}])},[a("form-batiment",{attrs:{action:t.action,batiment:t.batiment},on:{batimentAdded:t.pushBatiment,batimentUpdated:t.editBatiment}})],1)],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])}],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ul",{staticClass:"nav nav-tabs"},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"logements"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="logements"}}},[t._v("Logements")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"stats"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="stats"}}},[t._v("Statistiques générales")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"add-logement"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="add-logement"}}},[t._v("Ajouter un logement")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"depenses"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="depenses"}}},[t._v("Dépenses liées au batiment")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"add-depense"==t.section},attrs:{"data-toggle":"tab",href:"#"},on:{click:function(e){e.preventDefault(),t.section="add-depense"}}},[t._v("Ajouter une dépense")])])]),a("div",{staticClass:"tab-content mt-3"},[a("div",{staticClass:"tab-pane fade show active"},["stats"==t.section?a("div",{staticClass:"jumbotron pt-10 pb-10"},[a("h3",{staticClass:"m-0"},[t._v("Statistiques générales")]),a("p",[t._v("This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.")])]):t._e(),"logements"==t.section?a("div",[t.batiment.logements.length?a("div",{staticStyle:{height:"75vh"}},[a("paginator",{attrs:{"no-control":"",hr:"bottom",total:t.batiment.logements.length,limit:t.perPage,page:t.currentPage},on:{pageChanged:function(e){t.currentPage=e},limitChanged:function(e){t.perPage=e}}}),a("div",{staticStyle:{height:"90%","overflow-y":"auto","overflow-x":"hidden"}},[a("b-row",{staticClass:"layout-wrap"},t._l(t.items,(function(e,s){return a("b-col",{key:e.idLogement||s,attrs:{cols:"6"}},[a("logement",{attrs:{logement:e,"is-sub":""},on:{deleted:t.removeLogement}})],1)})),1)],1)],1):a("b-alert",{attrs:{variant:"info",show:""}},[a("i",{staticClass:"fa fa-exclamation-triangle fa-3x float-left"}),a("span",{staticClass:"h4 d-inline-flex ml-2"},[t._v("Aucun logement enregistré pour le moment")])])],1):t._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:"add-logement"==t.section,expression:"section == 'add-logement'"}]},[a("add-logement",{attrs:{batiment:t.batiment,action:t.action},on:{logementAdded:t.addedLogement}})],1),"depenses"==t.section?a("div",[t.batiment.depenses.length?t._e():a("b-alert",{attrs:{variant:"info",show:""}},[a("i",{staticClass:"fa fa-exclamation-triangle fa-3x float-left"}),a("span",{staticClass:"h4 d-inline-flex ml-2"},[t._v("Aucune dépense enregistrée pour le moment")])]),t.batiment.depenses.length>0?a("div",{staticStyle:{height:"75vh"}},[a("b-row",[a("paginator",{attrs:{"no-control":"",hr:"bottom",total:t.batiment.depenses.length,limit:t.perPage,page:t.currentPage},on:{pageChanged:function(e){t.currentPage=e},limitChanged:function(e){t.perPage=e}}})],1),a("div",{staticStyle:{height:"90%","overflow-y":"auto","overflow-x":"hidden"}},[a("b-row",{staticClass:"layout-wrap"},t._l(t.itemsDepenses,(function(e,s){return a("b-col",{key:e.idDepense||s,attrs:{cols:"6"}},[a("depense",{attrs:{depense:e,source:t.source,"is-sub":""},on:{deleted:t.removeDepense}})],1)})),1)],1)],1):t._e()],1):t._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:"add-depense"==t.section,expression:"section == 'add-depense'"}]},[a("depense-form",{attrs:{batiment:t.batiment,provenance:t.provenance},on:{depenseAdded:t.addedDepense}})],1)])])])},o=[],l=a("265a"),m=a("5ad6"),r=a("a474"),d=a("c0a6");const c=a("5a6f");var h={props:{batiment:{type:Object,required:!0}},components:{Logement:l["a"],Depense:m["a"],DepenseForm:r["a"],AddLogement:d["a"]},computed:{items(){return c.array_slice(this.batiment.logements,this.offset,this.perPage)},itemsDepenses(){return c.array_slice(this.batiment.depenses||[],this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage}},data:()=>({section:"logements",submitted:!1,commandeDepense:!1,action:"",currentPage:1,perPage:10,source:3,provenance:"2",action:"add"}),mounted(){},methods:{addedDepense(){axios.get(`batiments/${this.batiment.idBatiment}/depenses`).then(t=>t.result||[]).then(t=>{this.batiment.depenses=t,this.section="depenses"})},addedLogement(){axios.get(`batiments/${this.batiment.idBatiment}/logements`).then(t=>t.result||[]).then(t=>{this.batiment.logements=t,this.section="logements"})},pushDepense(t){this.batiment.depenses.unshift(t),this.commandeDepense=!1},removeLogement(t){this.batiment.logements=this.batiment.logements.filter(e=>e.idLogement!=t),this.$emit("logementsChanged",this.batiment.logements)},removeDepense(t){this.batiment.depenses=this.batiment.depenses.filter(e=>e.idDepense!=t),this.$emit("depensesChanged",this.batiment.depenses)},defineDepense(){this.action="add",this.commandeDepense=!0},onCloseSet(){this.commandeDepense=!1}}},u=h,p=a("2877"),b=Object(p["a"])(u,n,o,!1,null,null,null),g=b.exports,f=a("5c21"),v=a("3c60"),C=a("fb87");const w=a("5a6f");var B={name:"Batiments",components:{DetailsBatiment:g,Batiment:f["a"],FormBatiment:v["a"],SearchForm:C["a"]},computed:{items(){return w.array_slice(this.batiments,this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage}},data:()=>({batiments:[],trueBatiments:[],showOverlay:!0,batiment:null,currentPage:1,perPage:10,search:null,action:"add",source:1}),watch:{search(t){t=t.toLowerCase(),this.source=2,this.batiments=w.empty(t)?this.trueBatiments:this.trueBatiments.filter(e=>e.nomBatiment.toLowerCase().includes(t))}},mounted(){this.getBatiments()},methods:{async getBatiments(){try{this.batiments=this.trueBatiments=await axios.get("batiments").then(t=>t.result||[]),this.showOverlay=!1,this.autoDetailsTarget(),this.autoAddTarget()}catch(t){}},autoAddTarget(){const t=this.$route.query.formBatiment||null;t&&(this.$refs["modalBatiment"].show(),window.history.replaceState({},"",window.location.href.split("?")[0]))},autoDetailsTarget(){const t=this.$route.query.target||null;if(t){const e=this.trueBatiments.filter(e=>e.idBatiment==t)[0];e&&(this.showDetails(e),window.history.replaceState({},"",window.location.href.split("?")[0]))}},showDetails(t){this.batiment=t,setTimeout(()=>{$("#editLayoutItem").modal("show"),$("#editLayoutItem").on("hide.bs.modal",t=>{this.batiment=null}),$("#editLayoutItem").on("hidden.bs.modal",t=>{this.batiment=null})},100)},changeLogements(t){this.batiments=this.batiments.map(e=>e.idBatiment!=this.batiment.idBatiment?e:{...e,logements:t}),this.batiment.logements=t},removeBatiment(t){this.batiments=this.batiments.filter(e=>e.idBatiment!=t),this.trueBatiments=this.trueBatiments.filter(e=>e.idBatiment!=t)},pushBatiment(t){this.batiments=this.addNewBatiment(this.batiments,t),this.trueBatiments=this.addNewBatiment(this.trueBatiments,t),this.$bvModal.hide("modal-batiment")},editBatiment(t){this.batiments=this.renameBatiment(this.batiments,t),this.trueBatiments=this.renameBatiment(this.trueBatiments,t),this.$bvModal.hide("modal-batiment")},updateBatiment(t){this.action="edit",this.batiment=t,this.$bvModal.show("modal-batiment")},addNewBatiment(t,e){let a=!1;for(let s=0;s<t.length;s++)if(t[s].idBatiment==e.idBatiment){a=!0;break}return a||t.push(e),t},renameBatiment(t,e){return t.map(t=>(t.idBatiment==e.idBatiment&&(t.nomBatiment=e.nom,t.refBatiment=e.ref,t.image=e.photo,t.idCite=e.idCite),t))}}},_=B,y=(a("cdd2"),Object(p["a"])(_,s,i,!1,null,"348040d2",null));e["default"]=y.exports},cdd2:function(t,e,a){"use strict";a("27a0")}}]);
//# sourceMappingURL=chunk-6b43d5e7.ea9ac478.js.map