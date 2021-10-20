(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ceffec6"],{"4d8d":function(e,t,s){"use strict";s("869c")},"869c":function(e,t,s){},c574:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container-fluid"},[s("page-description",{attrs:{title:"Dépenses",description:"Gestion de vos dépenses",icon:"home",path:["Statistiques","Mes Dépenses"]}}),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"mb-2 clearfix"},[s("div",{staticClass:"collapse d-md-block display-options",attrs:{id:"displayOptions"}},[s("div",{staticClass:"d-block d-md-inline-block"},[s("div",{staticClass:"btn-group float-md-left mr-1 mb-1"},[s("b-form-select",{staticStyle:{"box-shadow":"none"},attrs:{size:"sm"},model:{value:e.filtre_categories,callback:function(t){e.filtre_categories=t},expression:"filtre_categories"}},[s("b-form-select-option",{attrs:{value:null}},[e._v("Filtre de catégories")]),s("b-form-select-option-group",[s("b-form-select-option")],1)],1)],1),s("div",{staticClass:"search-sm d-inline-block float-md-left mr-1 mb-1 align-top"},[s("form",{attrs:{action:"",onsubmit:"return false"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Recherche..."},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}}),e._m(0)])])]),s("div",{staticClass:"float-md-right"},[s("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.depenseForm",modifiers:{depenseForm:!0}}],attrs:{variant:"danger"}},[s("i",{staticClass:"fa fa-plus-circle"}),e._v(" Nouvelle dépense ")])],1)])]),s("div",{staticClass:"separator mb-20"}),s("b-overlay",{attrs:{show:e.showOverlay,rounded:"sm"}},[e.depenses.length?s("b-row",{staticClass:"layout-wrap"},e._l(e.depenses,(function(t,a){return s("b-col",{key:t.idDepense||a,staticClass:"animated flipInX mb-4",attrs:{lg:"4",cols:"12",sm:"6"}},[s("depense",{attrs:{depense:t,soure:e.source},on:{makeUpdate:e.updateDepense,deleted:e.removeDepense,showDetails:e.showDetails}})],1)})),1):s("b-alert",{staticClass:"text-center",attrs:{variant:"info",show:""}},[s("i",{staticClass:"fa fa-exclamation-triangle fa-3x"}),s("br"),s("span",{staticClass:"h4 d-inline-flex ml-2"},[e._v("Aucune dépense enregistrée pour le moment")])]),s("paginator",{attrs:{hr:"top",offset:e.offset,total:e.depenses.length||0,limit:e.perPage,page:e.currentPage},on:{pageChanged:function(t){e.currentPage=t},limitChanged:function(t){e.perPage=t}}})],1)],1)]),e.depense?s("div",{staticClass:"modal fade edit-layout-modal",attrs:{id:"editLayoutItem",tabindex:"-1",role:"dialog","aria-labelledby":"editLayoutItemLabel","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title",attrs:{id:"editLayoutItemLabel"}},[e._v(" Détails de la dépense: "),s("b",[e._v(e._s(e.depense.motif))]),e._v(". ")]),e._m(1)]),s("div",{staticClass:"modal-body pt-2"},[s("details-depense",{attrs:{depense:e.depense}})],1)])])]):e._e(),s("b-modal",{attrs:{id:"depenseForm",size:"lg","hide-footer":"","no-close-on-backdrop":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[s("span",{staticClass:"ml-4 text-form-annone"},[e._v(e._s(e.title))])]},proxy:!0}])},[s("div",[s("depense-form",{attrs:{action:e.action},on:{depenseAdded:e.pushDepense}})],1)])],1)},i=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("button",{staticClass:"btn btn-icon",attrs:{type:"submit"}},[s("i",{staticClass:"ik ik-search"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])}],n=s("a474"),o=s("5ad6");const l=s("5a6f");var r={name:"depenses",components:{DepenseForm:n["a"],Depense:o["a"]},data:()=>({cite:null,batiment:null,logement:null,source:0,title:"Définir une dépense",search:null,showOverlay:!0,currentPage:1,perPage:10,action:"add",depenses:[],trueDepenses:[],depense:null,typesLogements:[],filtre_categories:null}),computed:{items(){return l.array_slice(this.depenses,this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage}},watch:{filtre_categories(e){this.depenses=l.empty(e)?this.trueDepenses:this.trueDepenses.filter(t=>t.idSousType==e)},search(e){this.depenses=l.empty(e)?this.trueDepenses:this.trueDepenses.filter(t=>t.nomLogement.toLowerCase().includes(e.toLowerCase()))}},beforeMount(){this.getDepenses()},mounted(){},methods:{pushDepense(){this.getDepenses(),this.$bvModal.hide("depenseForm")},async getDepenses(e){this.showOverlay=!0,this.depenses=this.trueDepenses=await axios.get("depenses").then(e=>e.result||[]),this.showOverlay=!1,!1!==e&&(this.cites=await axios.get("cites").then(e=>e.result||[])),this.autoDetailsTarget()},autoDetailsTarget(){const e=this.$route.query.target||null;if(e){const t=this.trueDepenses.filter(t=>t.idDepense==e)[0];t&&(this.showDetails(t),window.history.replaceState({},"",window.location.href.split("?")[0]))}},updateDepense(e){console.log("depense",e)},removeDepense(e){console.log("depense",e)},showDetails(e){this.depense=e,setTimeout(()=>{$("#editLayoutItem").modal("show"),$("#editLayoutItem").on("hide.bs.modal",e=>{this.depense=null}),$("#editLayoutItem").on("hidden.bs.modal",e=>{this.depense=null})},100)}}},d=r,c=(s("4d8d"),s("2877")),p=Object(c["a"])(d,a,i,!1,null,"2a94f0da",null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-3ceffec6.ba058177.js.map