(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f7cca34"],{"1f20":function(e,t,n){},"4bdc":function(e,t,n){},"5f81":function(e,t,n){"use strict";n("4bdc")},9957:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container-fluid"},[n("page-description",{attrs:{title:"Annonces",description:"Gestion de vos annonces",icon:"ad",path:["Gestion immobilière","Mes annonces"]}}),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"mb-2 clearfix"},[n("div",{staticClass:"collapse d-md-block display-options",attrs:{id:"displayOptions"}},[n("div",{staticClass:"d-block d-md-inline-block"},[n("div",{staticClass:"search-sm d-inline-block float-md-left mr-1 mb-1 align-top"},[n("form",{attrs:{action:"",onSubmit:"return false"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Recherche..."},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}}),e._m(0)])])]),n("div",{staticClass:"float-md-right"},[n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-lg",modifiers:{"modal-lg":!0}}],attrs:{variant:"danger"},on:{click:function(t){return t.preventDefault(),e.addAnnonce.apply(null,arguments)}}},[n("i",{staticClass:"fa fa-plus-circle"}),e._v(" Nouvelle Annonce")])],1)])]),n("div",{staticClass:"separator mb-20"}),n("b-overlay",{attrs:{show:e.showOverlay,rounded:"sm"}},[e.annonces.length?n("b-row",{staticClass:"layout-wrap"},e._l(e.items,(function(t,a){return n("b-col",{key:t.idAnnonce||a,staticClass:"animated flipInX mb-4",attrs:{cols:"6"}},[n("annonce-component",{attrs:{annonce:t},on:{makeUpdate:e.updateAnnonce,deleted:e.removeAnnonce,showDetails:e.showDetails}})],1)})),1):n("b-alert",{staticClass:"text-center",attrs:{variant:"info",show:""}},[n("i",{staticClass:"fa fa-exclamation-triangle fa-3x"}),e._v(" "),n("br"),n("span",{staticClass:"h4 d-inline-flex ml-2"},[e._v("Aucune annonce trouvée")])]),n("paginator",{attrs:{hr:"top",offset:e.offset,total:e.annonces.length,limit:e.perPage,page:e.currentPage},on:{pageChanged:function(t){e.currentPage=t},limitChanged:function(t){e.perPage=t}}})],1)],1)]),e.commandeAnnonce?n("add-annonce",{attrs:{action:"add"},on:{annonceAdded:e.addedAnnonce}}):e._e()],1)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"btn btn-icon",attrs:{type:"submit"}},[n("i",{staticClass:"ik ik-search"})])}],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-modal",{ref:"annonce-modal",attrs:{id:"modal-lg",size:"lg","ok-only":"","ok-title":"Valider"},on:{hidden:e.resetModal,ok:e.submitModal},scopedSlots:e._u([{key:"modal-title",fn:function(){return["add"==e.action?n("span",{staticClass:"ml-4 text-form-annone"},[e._v("Créer une annonce")]):e._e(),"edit"==e.action?n("span",{staticClass:"ml-4 text-form-annone"},[e._v("Edition")]):e._e()]},proxy:!0}])},[n("b-overlay",{attrs:{show:e.showOverlay,rounded:"sm"}},[n("b-row",[n("b-col",[n("b-form-group",{attrs:{label:"Titre de l'annonce",description:"Donnez un titre intuitif à votre annonce"}},[n("b-form-input",{attrs:{placeholder:"Ex: Grande chambre moderne à louer",trim:""},model:{value:e.annonce.titre,callback:function(t){e.$set(e.annonce,"titre",t)},expression:"annonce.titre"}})],1)],1),n("b-col",[n("b-form-group",{attrs:{label:"Tags",description:"Ajouter des critères de recherche à votre annonce"}},[n("b-form-input",{attrs:{placeholder:"Ex: Appartement meublé, grande chambre",trim:""},model:{value:e.annonce.tags,callback:function(t){e.$set(e.annonce,"tags",t)},expression:"annonce.tags"}})],1)],1)],1),n("b-row",[n("b-col",[n("b-form-group",{attrs:{label:"Date de début",description:"Quand souhaitez-vous débuter la publication"}},[n("b-form-datepicker",{attrs:{locale:"fr",min:e.$date().format()},model:{value:e.duree[0],callback:function(t){e.$set(e.duree,0,t)},expression:"duree[0]"}})],1)],1),n("b-col",[n("b-form-group",{attrs:{label:"Date de fin",description:"Jusqu'à quand cette annonce est valable"}},[n("b-form-datepicker",{attrs:{locale:"fr",min:e.$date().add(1,"day").format()},model:{value:e.duree[1],callback:function(t){e.$set(e.duree,1,t)},expression:"duree[1]"}})],1)],1)],1),n("b-row",[n("b-col",{attrs:{cols:"7"}},[n("b-form-group",{attrs:{label:"description"}},[n("b-form-textarea",{staticClass:"mb-2",attrs:{placeholder:"Caractériser votre annonce afin d'etre bien reférencé",rows:"8"},model:{value:e.annonce.description,callback:function(t){e.$set(e.annonce,"description",t)},expression:"annonce.description"}}),n("b-form-checkbox",{attrs:{switch:""},model:{value:e.annonce.publish,callback:function(t){e.$set(e.annonce,"publish",t)},expression:"annonce.publish"}},[n("span",{staticClass:"fa-lg"},[e._v("Directement pubier cette annonce ?")])])],1)],1),n("b-col",{attrs:{cols:"5"}},[n("b-form-group",{attrs:{label:"Veuillez selectionner le logement"}},[n("div",{staticStyle:{height:"10.5em"}},[n("b-form-select",{staticClass:"mb-1",attrs:{options:e.logements,"value-field":"idLogement","text-field":"refLogement","disabled-field":"notEnabled"},on:{input:e.setSlide},model:{value:e.annonce.idLogement,callback:function(t){e.$set(e.annonce,"idLogement",t)},expression:"annonce.idLogement"}}),n("b-carousel",{ref:"myCarousel",attrs:{interval:0,controls:""},model:{value:e.selected_index,callback:function(t){e.selected_index=t},expression:"selected_index"}},e._l(e.logements,(function(t,a){return n("b-carousel-slide",{key:a,staticClass:"fluid w-100 responsive border-0",staticStyle:{height:"10.5em"},attrs:{"img-src":e.empty(t.photos)?"/img/bgHousing.jpg":t.photos[0].image}})})),1)],1)])],1)],1)],1)],1)},i=[],r=n("2c43");const c=n("5a6f");var l={name:"add-annonce",data:()=>({duree:[null,null],selected_index:-1,selected_value:"",annonce:{titre:"",description:"",tags:"",idLogement:"",duree:"",publish:!1},showOverlay:!1,sendForm:!1,logements:[]}),watch:{selected_index(e){this.annonce.idLogement=this.logements[e].idLogement}},props:["action"],methods:{setSlide(e){for(let t=0;t<this.logements.length;t++)if(this.logements[t].idLogement==e){this.$refs.myCarousel.setSlide(t);break}},empty(e){return c.empty(e)},resetModal(){this.annonce={titre:"",description:"",tags:"",idLogement:""}},submitModal(e){return this.annonce.duree=this.duree.join(","),e.preventDefault(),c.empty(this.annonce.titre)||c.empty(this.annonce.description)||c.empty(this.annonce.duree)?App.error("Un titre, une description et une durée sont obligatoires"):this.annonce.titre.length<20?App.error("Le titre doit contenir au moins 20 caractères"):this.annonce.description.length<200?App.error("La description doit contenir au moins 200 caractères"):void("add"==this.action&&(this.showOverlay=!0,axios.post("annonces",this.annonce).then(e=>(r["a"].success(e.message),this.$refs["annonce-modal"].hide(),this.$emit("annonceAdded"),App.notifySuccess(e.message))).catch(e=>App.alertError(e.message)),setTimeout(()=>{this.showOverlay=!1},500)))},getAllHousing(){axios.get("logements").then(e=>e.result||[]).then(e=>{this.logements=e,e[0]&&(this.annonce.idLogement=e[0].idLogement)})}},mounted(){this.getAllHousing()}},d=l,u=(n("5f81"),n("2877")),m=Object(u["a"])(d,o,i,!1,null,"143a3bac",null),p=m.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:" list-item list-item-grid"},[n("div",{staticClass:"card mb-3"},[n("div",{staticClass:"d-flex mb-3"},[n("a",{staticClass:"w-90 d-flex card-img",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.showDetails.apply(null,arguments)}}},[n("b-carousel",{attrs:{interval:4e3,controls:"",indicators:""}},e._l(e.annonce.photos,(function(e,t){return n("b-carousel-slide",{key:t,staticClass:"fluid w-100 responsive border-0",staticStyle:{height:"15em"},attrs:{"img-src":e}})})),1),n("b-badge",{staticClass:"position-absolute badge-top-left",attrs:{pill:"",variant:e.annonce.publish?"success":"danger"}},[e._v(e._s(e.annonce.publish?"Déja publiée":"Pas encore publiée"))]),n("b-badge",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:e.dateCreation,expression:"dateCreation",modifiers:{bottom:!0}}],staticClass:"position-absolute badge-top-left-2",attrs:{pill:"",variant:"secondary"}},[n("i",{staticClass:"fa fa-clock"}),e._v(" "+e._s(e.$date(e.annonce.createdAt).format("DD.MM.YYYY"))+" ")])],1),n("div",{staticClass:"w-10 d-flex flex-column justify-content-center align-items-center"},[e.annonce.publish?e._e():n("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Publier",expression:"'Publier'",modifiers:{left:!0}}],staticClass:"btn-icon my-1",attrs:{variant:"primary"},on:{click:function(t){return e.publier(e.annonce)}}},[n("i",{staticClass:"fas fa-share"})]),n("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Modifier",expression:"'Modifier'",modifiers:{left:!0}}],staticClass:"btn-icon my-1",attrs:{variant:"warning"}},[n("i",{staticClass:"ik ik-edit-2"})]),n("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Supprimer",expression:"'Supprimer'",modifiers:{left:!0}}],staticClass:"btn-icon my-1",attrs:{variant:"danger"}},[n("i",{staticClass:"ik ik-trash-2"})]),n("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Faire un commentaire",expression:"'Faire un commentaire'",modifiers:{left:!0}}],staticClass:"btn-icon my-1",attrs:{variant:"info"}},[n("i",{staticClass:"fa fa-comments"})]),n("b-button",{staticClass:"btn-icon my-1",attrs:{variant:e.annonce.nbrPropostions>0?"success":"secondary",id:"button-nombre-propositions"}},[n("i",{staticClass:"fas fa-sticky-note"})]),n("b-tooltip",{attrs:{target:"button-nombre-propositions",placement:"left",noninteractive:"",variant:"secondary"}},[e._v("Vous avez déjà reçu "+e._s(e.annonce.nbrPropostions)+" propositions")]),n("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Accéder au logement",expression:"'Accéder au logement'",modifiers:{left:!0}}],staticClass:"btn-icon my-1",attrs:{variant:"dark"},on:{click:function(t){return t.preventDefault(),e.accessTo.apply(null,arguments)}}},[n("i",{staticClass:"fa fa-share-square"})])],1)]),n("div",{staticClass:"d-flex flex-grow-1 min-width-zero card-content py-3"},[n("div",{staticClass:"card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center",staticStyle:{height:"15em","overflow-y":"auto"}},[n("div",{staticClass:"text-center"},[n("h5",{staticClass:"text-red"},[e._v(e._s(e.php.ucfirst(e.annonce.titreAnnonce.toLowerCase())))]),e._l(e.annonce.tags.split(","),(function(t,a){return n("b-badge",{key:a,attrs:{variant:"secondary"}},[e._v(e._s(t))])}))],2),n("hr"),n("p",{staticClass:"text-muted text-small"},[e._v(e._s(e.annonce.descAnnonce))])])])])])},f=[];const h=n("5a6f");var g={data:()=>({open:!0}),props:{annonce:{type:Object,required:!0},isSub:{type:Boolean,default:!1}},computed:{dateCreation(){const e=this.$date(this.annonce.createdAt);return`Créée le ${e.format("dddd, DD MMMM YYYY")} à ${e.format("HH:mm")}`},php(){return h}},methods:{accessTo(){this.$router.push({name:"logements",query:{target:this.annonce.idLogement}})},publier(e){let t="annonces/"+e.idAnnonce+"/publish";axios.put(t).then(e=>{this.$root.$emit("annonce-published-ok"),r["a"].success(e.message)}).catch(e=>{r["a"].error(e.message)})}}},v=g,C=Object(u["a"])(v,b,f,!1,null,null,null),y=C.exports;const x=n("5a6f");var w={name:"list-logements",components:{AddAnnonce:p,AnnonceComponent:y},watch:{search(e){this.annonces=x.empty(e)?this.trueAnnonces:this.trueAnnonces.filter(t=>t.titreAnnonce.toLowerCase().includes(e.toLowerCase()))}},data:()=>({action:"add",commandeAnnonce:!1,search:null,showOverlay:!0,currentPage:1,perPage:10,annonces:[],trueAnnonces:[]}),computed:{items(){return x.array_slice(this.annonces,this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage}},beforeMount(){this.getAnnonces()},mounted(){this.$root.$on("annonceAdded",()=>{this.getAnnonces(),this.commandeAnnonce=!1}),this.$root.$on("annonce-published-ok",()=>{this.getAnnonces()})},methods:{addAnnonce(){this.action="add",this.commandeAnnonce=!0},addedAnnonce(){this.getAnnonces(),this.commandeAnnonce=!1},async getAnnonces(){try{this.annonces=this.trueAnnonces=await axios.get("annonces?my=true").then(e=>e.result),console.log(this.annonces),this.showOverlay=!1}catch(e){}},updateAnnonce(e){console.log("logement",logement)},removeAnnonce(e){console.log("annonce",e)},showDetails(e){console.log("annonce",e)}}},A=w,k=(n("c775"),Object(u["a"])(A,a,s,!1,null,"dc0e3e38",null));t["default"]=k.exports},c775:function(e,t,n){"use strict";n("1f20")}}]);
//# sourceMappingURL=chunk-6f7cca34.0652c07b.js.map