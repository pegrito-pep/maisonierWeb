(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-074986f4"],{a7a3:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container-fluid"},[s("page-description",{attrs:{title:"Rélévés d'indexes",description:"Rélévés des indexes d'eau et d'énergie",icon:"clipboard-list",path:["Finance","Rélévés d'indexes"]}}),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"mb-2 clearfix"},[s("div",{staticClass:"collapse d-md-block display-options",attrs:{id:"displayOptions"}},[s("div",{staticClass:"d-block d-md-inline-block"},[s("div",{staticClass:"search-sm d-inline-block float-md-left mr-1 mb-1 align-top"},[s("form",{attrs:{action:"",onSubmit:"return false"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Recherche..."},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}}),e._m(0)])])]),s("div",{staticClass:"float-md-right"},[s("div",{staticClass:"d-flex "},[s("b-form-select",{staticClass:"form-control",attrs:{size:"sm",options:e.mois},on:{input:function(t){return e.setIndexesMois(t,e.periode.annee)}},model:{value:e.periode.mois,callback:function(t){e.$set(e.periode,"mois",t)},expression:"periode.mois"}}),s("b-form-select",{staticClass:"form-control",attrs:{size:"sm",options:e.annees},on:{input:function(t){return e.setIndexesMois(e.periode.mois,t)}},model:{value:e.periode.annee,callback:function(t){e.$set(e.periode,"annee",t)},expression:"periode.annee"}})],1)])])]),s("div",{staticClass:"separator mb-20"}),s("b-overlay",{attrs:{show:e.showOverlay,rounded:"sm"}},[e.logements.length?s("b-row",e._l(e.items,(function(t){return s("b-col",{key:t.idLogement,attrs:{cols:"3"}},[s("b-card",{attrs:{title:t.refLogement,"sub-title":t.sousTypeLogement.libelleSousType}},[s("hr"),s("b-form-group",{attrs:{label:"Indexe eau"}},[s("b-input-group",[s("b-form-input",{attrs:{size:"sm",type:"number",min:"0"},model:{value:t.indexeMois.eau,callback:function(s){e.$set(t.indexeMois,"eau",s)},expression:"logement.indexeMois.eau"}}),s("b-input-group-append",[s("b-button",{attrs:{size:"sm",variant:"outline-danger",id:"popover-eau-"+t.idLogement}},[s("i",{staticClass:"fa fa-list"})])],1)],1)],1),s("b-form-group",{attrs:{label:"Indexe électricité"}},[s("b-input-group",[s("b-form-input",{attrs:{type:"number",min:"0"},model:{value:t.indexeMois.energie,callback:function(s){e.$set(t.indexeMois,"energie",s)},expression:"logement.indexeMois.energie"}}),s("b-input-group-append",[s("b-button",{attrs:{variant:"outline-danger",id:"popover-energie-"+t.idLogement}},[s("i",{staticClass:"fa fa-list"})])],1)],1)],1),s("b-popover",{attrs:{title:"Indexes précedents",target:"popover-eau-"+t.idLogement,triggers:"click blur",placement:"auto"}},[s("div",{staticStyle:{"overflow-y":"auto","overflow-x":"hidden","max-height":"15em"}},e._l(t.iEau,(function(t,i){return s("div",{key:i,staticClass:"text-muted mb-1"},[s("h6",{staticClass:"border-bottom small"},[e._v(e._s(e.$dayjs(t.periode).format("MMMM YYYY")))]),s("b-row",[s("b-col",{staticClass:"truncate"},[e._v("N: "),s("b",[e._v(e._s(t.nouveau))]),e._v(" m"),s("sup",[e._v("3")])]),s("b-col",{staticClass:"truncate"},[e._v("A: "),s("b",[e._v(e._s(t.ancien))]),e._v(" m"),s("sup",[e._v("3")])])],1)],1)})),0),s("div",{staticClass:"jumbotron pt-10 pb-1 px-2 mb-0 mt-2"},[s("b-form-group",{attrs:{label:"Mois passé ("+e.$dayjs(t.indexePassee.periode).format("MMMM YYYY")+")"}},[s("b-form-input",{attrs:{size:"sm",min:"0",type:"number"},model:{value:t.indexePassee.eau,callback:function(s){e.$set(t.indexePassee,"eau",s)},expression:"logement.indexePassee.eau"}})],1)],1)]),s("b-popover",{attrs:{title:"Indexes précedents",target:"popover-energie-"+t.idLogement,triggers:"click blur",placement:"auto"}},[s("div",{staticStyle:{"overflow-y":"auto","overflow-x":"hidden","max-height":"15em"}},e._l(t.iEnergie,(function(t,i){return s("div",{key:i,staticClass:"text-muted mb-1"},[s("h6",{staticClass:"border-bottom small"},[e._v(e._s(e.$dayjs(t.periode).format("MMMM YYYY")))]),s("b-row",[s("b-col",{staticClass:"truncate"},[e._v("N: "),s("b",[e._v(e._s(t.nouveau))]),e._v(" kw")]),s("b-col",{staticClass:"truncate"},[e._v("A: "),s("b",[e._v(e._s(t.ancien))]),e._v(" kw")])],1)],1)})),0),s("div",{staticClass:"jumbotron pt-10 pb-1 px-2 mb-0 mt-2"},[s("b-form-group",{attrs:{label:"Mois passé ("+e.$dayjs(t.indexePassee.periode).format("MMMM YYYY")+")"}},[s("b-form-input",{attrs:{size:"sm",min:"0",type:"number"},model:{value:t.indexePassee.energie,callback:function(s){e.$set(t.indexePassee,"energie",s)},expression:"logement.indexePassee.energie"}})],1)],1)])],1)],1)})),1):s("b-alert",{staticClass:"text-center",attrs:{variant:"info",show:""}},[s("i",{staticClass:"fa fa-exclamation-triangle fa-3x"}),e._v(" "),s("br"),s("span",{staticClass:"h4 d-inline-flex ml-2"},[e._v("Vous n'avez enregistré aucun index pour le moment")])]),s("hr"),s("div",{staticClass:"d-flex justify-content-between align-items-start"},[s("paginator",{attrs:{offset:e.offset,total:e.logements.length,limit:e.perPage,page:e.currentPage},on:{pageChanged:function(t){e.currentPage=t},limitChanged:function(t){e.perPage=t}}}),s("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Valider",expression:"'Valider'",modifiers:{left:!0}}],staticClass:"position-fixed validate btn-icon",attrs:{variant:"danger",disabled:e.submitted},on:{click:function(t){return t.preventDefault(),e.submitForm.apply(null,arguments)}}},[e.submitted?s("b-spinner",{attrs:{small:""}}):s("i",{staticClass:"fa fa-check fa-lg"})],1)],1)],1)],1)])],1)},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("button",{staticClass:"btn btn-icon",attrs:{type:"submit"}},[s("i",{staticClass:"ik ik-search"})])}];const a=s("5a6f");var o={name:"releves-indexes",data:()=>({search:null,showOverlay:!0,submitted:!1,currentPage:1,perPage:10,logements:[],trueLogements:[],periode:{annee:null,mois:null}}),watch:{search(e){this.logements=a.empty(e)?this.trueLogements:this.trueLogements.filter(t=>t.refLogement.toLowerCase().includes(e.toLowerCase()))}},computed:{items(){return a.array_slice(this.logements,this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage},annees(){const e=this.$dayjs().format("YYYY");let t=[e];for(let s=e;s>e-5;s--)s!=e&&t.push(s);return t.sort((e,t)=>e-t)},mois(){const e=new Date,t=[],s=this.$dayjs().format("YYYY"),i=s==this.periode.annee?e.getMonth():11;for(let n=0;n<=i;n++)e.setMonth(n),t.push({value:n,text:a.ucfirst(this.$dayjs(e).format("MMMM"))});return t}},beforeMount(){this.periode={mois:parseInt(this.$dayjs().format("M"))-1,annee:parseInt(this.$dayjs().format("YYYY"))},this.getLogements()},methods:{onClose(){this.popoverShow=!1},getLogements(){axios.get("logements").then(e=>e.result||[]).then(e=>{this.logements=this.trueLogements=e,this.setIndexesMois(this.periode.mois,this.periode.annee),this.showOverlay=!1})},submitForm(){this.submitted=!0;let e=this.periode.mois+1;e<10&&(e="0"+e),e=this.periode.annee+"-"+e+"-01";let t={periode:e,indexes:[]};this.trueLogements.forEach(e=>{null==e.indexeMois.eau&&null==e.indexeMois.energie||t.indexes.push({idLogement:e.idLogement,eau:[e.indexeMois.eau,e.indexePassee.eau],energie:[e.indexeMois.energie,e.indexePassee.energie]})}),axios.post("indexes/add-multiple",t).then(e=>{App.notifySuccess(e.message),this.showOverlay=!0,this.submitted=!1,this.getLogements()}).catch(e=>(this.submitted=!1,App.alertError(e.message||"Impossible de joindre le serveur")))},setIndexesMois(e,t){let s=e+1;s<10&&(s="0"+s),s=t+"-"+s+"-01",this.trueLogements=this.setIndexesPeriode(s,this.trueLogements),this.logements=this.setIndexesPeriode(s,this.logements)},setIndexesPeriode(e,t){let s=this.$dayjs(e).subtract(1,"month").format("YYYY-MM")+"-01";return t.map(t=>{let i=t.indexes.filter(t=>0==this.$dayjs(e).diff(t.periode,"month")),n=i.find(e=>"eau"==e.typeIndexe),o=i.find(e=>"energie"==e.typeIndexe);return t.indexeMois={eau:a.empty(n)?null:n.nouveau,energie:a.empty(o)?null:o.nouveau},i=t.indexes.filter(e=>0==this.$dayjs(s).diff(e.periode,"month")),n=i.find(e=>"eau"==e.typeIndexe),o=i.find(e=>"energie"==e.typeIndexe),t.indexePassee={eau:a.empty(n)?null:n.nouveau,energie:a.empty(o)?null:o.nouveau,periode:s},i=t.indexes.filter(e=>this.$dayjs(s).diff(e.periode,"month")>0&&e.nouveau>0),t.iEau=i.filter(e=>"eau"==e.typeIndexe),t.iEnergie=i.filter(e=>"energie"==e.typeIndexe),t})}}},r=o,l=(s("adad"),s("2877")),d=Object(l["a"])(r,i,n,!1,null,"7aeb397d",null);t["default"]=d.exports},adad:function(e,t,s){"use strict";s("fb6e")},fb6e:function(e,t,s){}}]);
//# sourceMappingURL=chunk-074986f4.ab3949a0.js.map