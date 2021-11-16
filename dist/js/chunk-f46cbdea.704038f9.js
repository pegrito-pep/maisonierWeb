(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f46cbdea"],{"0b35":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"mb-2 clearfix"},[n("div",{staticClass:"collapse d-md-block display-options",attrs:{id:"displayOptions"}},[n("div",{staticClass:"d-block d-md-inline-block"},[n("SearchForm",{model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),n("div",{staticClass:"float-md-right"},[n("btnAdd",{directives:[{name:"b-modal",rawName:"v-b-modal.annonceForm",modifiers:{annonceForm:!0}}],attrs:{message:"Nouvelle Annonce"}})],1)])]),n("div",{staticClass:"separator mb-20"}),n("b-overlay",{attrs:{show:e.showOverlay,rounded:"sm"}},[e.annonces.length?n("b-row",{staticClass:"layout-wrap"},e._l(e.items,(function(t,s){return n("b-col",{key:t.idAnnonce||s,staticClass:"animated flipInX mb-4",attrs:{sm:"12",md:"6",lg:"3"}},[n("annonce-component",{attrs:{annonce:t},on:{makeDuplication:e.duplicateAnnonce,makeUpdate:e.updateAnnonce,deleted:e.removeAnnonce,showDetails:e.showDetails}})],1)})),1):n("b-alert",{staticClass:"text-center",attrs:{variant:"info",show:""}},[n("i",{staticClass:"fa fa-exclamation-triangle fa-3x"}),e._v(" "),n("br"),n("span",{staticClass:"h4 d-inline-flex ml-2"},[e._v("Aucune annonce créée pour le moment")])]),n("paginator",{attrs:{hr:"top",offset:e.offset,total:e.annonces.length,limit:e.perPage,page:e.currentPage},on:{pageChanged:function(t){e.currentPage=t},limitChanged:function(t){e.perPage=t}}})],1)],1)]),e.annonce?n("div",{staticClass:"modal fade edit-layout-modal",attrs:{id:"editLayoutItem",tabindex:"-1",role:"dialog","aria-labelledby":"editLayoutItemLabel","aria-hidden":"true"}},[n("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[n("div",{staticClass:"modal-content"},[n("div",{staticClass:"modal-header"},[n("h5",{staticClass:"modal-title",attrs:{id:"editLayoutItemLabel"}},[e._v("Détails de l'annonce : "),n("b",[e._v(e._s(e.annonce.titreAnnonce))]),e._v(".")]),e._m(0)]),n("div",{staticClass:"modal-body pt-2"},[n("details-annonce",{attrs:{annonce:e.annonce}})],1)])])]):e._e(),n("b-modal",{attrs:{id:"annonceForm",size:"lg","hide-footer":"","no-close-on-backdrop":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[n("span",{staticClass:"ml-4 text-form-annone"},[e._v(e._s(e.title))])]},proxy:!0}])},[n("div",[n("annonce-form",{attrs:{action:e.action,editAnnonce:e.editAnnonce},on:{annonceAdded:e.pushAnnonce,annonceUpdated:e.editAnnonces,createLogementFirst:e.goToLogement}})],1)]),e.annonce?n("div",[n("b-modal",{on:{ok:e.validateDuplication,hidden:e.resetDuplicationForm},scopedSlots:e._u([{key:"modal-title",fn:function(){return[e._v(" Dupplication de l'annonce de titre "),n("br"),n("code",[e._v('"'+e._s(e.annonce.titreAnnonce)+'"')])]},proxy:!0},{key:"modal-footer",fn:function(t){var s=t.ok;return[n("b-button",{attrs:{size:"sm",variant:"danger",disabled:e.duplication.submitted},on:{click:function(e){return s()}}},[e._v(" Valider "),e.duplication.submitted?n("b-spinner",{attrs:{small:""}}):e._e()],1)]}}],null,!1,3867188008),model:{value:e.duplication.enabled,callback:function(t){e.$set(e.duplication,"enabled",t)},expression:"duplication.enabled"}},[n("div",{staticClass:"jumbotron pt-10 pb-10"},[n("p",[e._v("La duplication de cette annonce consistera à l'appliquer à tous les logements du batiment auquel cette dernière est liée. Pour notre cas, il s'agit de tous les logements du batiment ")])])])],1):e._e()],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[n("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])}],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-overlay",{attrs:{show:e.showOverlay,rounded:"sm"}},[e.logements.length>0?n("div",[n("b-row",[n("b-col",[n("b-form-group",{attrs:{label:"Titre de l'annonce",description:"Donnez un titre intuitif à votre annonce"}},[n("b-form-input",{attrs:{placeholder:"Ex: Grande chambre moderne à louer",trim:""},model:{value:e.annonce.titre,callback:function(t){e.$set(e.annonce,"titre",t)},expression:"annonce.titre"}})],1)],1),n("b-col",[n("b-form-group",{attrs:{label:"Tags",description:"Ajouter des critères de recherche à votre annonce"}},[n("b-form-input",{attrs:{placeholder:"Ex: Appartement meublé, grande chambre",trim:""},model:{value:e.annonce.tags,callback:function(t){e.$set(e.annonce,"tags",t)},expression:"annonce.tags"}})],1)],1)],1),n("b-row",[n("b-col",{attrs:{cols:"7"}},[n("b-form-group",{attrs:{label:"description"}},[n("b-form-textarea",{staticClass:"mb-2",attrs:{placeholder:"Caractériser votre annonce afin d'être bien reférencé",rows:"8"},model:{value:e.annonce.description,callback:function(t){e.$set(e.annonce,"description",t)},expression:"annonce.description"}})],1)],1),n("b-col",{attrs:{cols:"5"}},[n("b-form-group",{attrs:{label:"Veuillez selectionner le logement"}},[n("div",{staticStyle:{height:"10.5em"}},[n("b-form-select",{staticClass:"mb-1",attrs:{options:e.logements,"value-field":"idLogement","text-field":"refLogement","disabled-field":"notEnabled"},on:{input:e.setSlide},model:{value:e.annonce.idLogement,callback:function(t){e.$set(e.annonce,"idLogement",t)},expression:"annonce.idLogement"}}),n("b-carousel",{ref:"myCarousel",attrs:{interval:0,controls:""},model:{value:e.selected_index,callback:function(t){e.selected_index=t},expression:"selected_index"}},e._l(e.logements,(function(t,s){return n("b-carousel-slide",{key:s,staticClass:"fluid w-100 responsive border-0",staticStyle:{height:"10.5em"},attrs:{"img-src":e.empty(t.photos)?"/img/bgHousing.jpg":t.photos[0].image}})})),1)],1)])],1)],1),n("b-row",[n("b-col",[n("b-form-checkbox",{attrs:{switch:""},model:{value:e.annonce.publish,callback:function(t){e.$set(e.annonce,"publish",t)},expression:"annonce.publish"}},[e.annonce.publish?n("span",{staticClass:"fa-lg"},[e._v("Directement publier cette annonce ?")]):n("span",{staticClass:"fa-lg"},[e._v("Spécifier la durée de validité")])])],1),n("b-col")],1),n("transition",{attrs:{"enter-active-class":"animated zoomIn","leave-active-class":"animated fadeOut zoomOut"}},[e.annonce.publish?e._e():n("b-row",[n("b-col",[n("b-form-group",{attrs:{label:"Date de début",description:"Quand souhaitez-vous débuter la publication"}},[n("b-form-datepicker",{attrs:{locale:"fr",min:e.$date().format()},model:{value:e.duree[0],callback:function(t){e.$set(e.duree,0,t)},expression:"duree[0]"}})],1)],1),n("b-col",[n("b-form-group",{attrs:{label:"Date de fin",description:"Jusqu'à quand cette annonce est valable"}},[n("b-form-datepicker",{attrs:{locale:"fr",min:e.$date().add(1,"day").format()},model:{value:e.duree[1],callback:function(t){e.$set(e.duree,1,t)},expression:"duree[1]"}})],1)],1)],1)],1),n("hr"),n("div",{staticClass:"float-right"},[n("b-button",{staticClass:"ml-2",attrs:{variant:"danger",disabled:e.submitted},on:{click:e.submitModal}},[e._v("Valider "),e.submitted?n("b-spinner",{attrs:{small:""}}):e._e()],1)],1)],1):n("div",[n("b-row",[n("div",{staticClass:"text-center"},[n("i",{staticClass:"fa fa-exclamation-triangle fa-3x"}),e._v(" "),n("br"),n("span",{staticClass:"h4 d-inline-flex ml-2"},[e._v("Aucun logement trouvé")]),n("br"),n("b-button",{staticClass:"my-2",attrs:{size:"lg",variant:"outline-info"},on:{click:function(t){return t.preventDefault(),e.createLogement.apply(null,arguments)}}},[e._v("créer un logement")]),n("p",[e._v("Une annonce concerne un logement du coup avant de pouvoir en créer une, vous devez préalablemenet creér au moins un logement")])],1)])],1)])},o=[],l=n("2c43");const r=n("5a6f");var c={name:"annonce-form",data:()=>({duree:[null,null],selected_index:-1,selected_value:"",annonce:{titre:"",description:"",tags:"",idLogement:"",duree:"",publish:!0},idAnnonce:"",showOverlay:!1,sendForm:!1,logements:[],commande:!1,submitted:!1}),watch:{selected_index(e){this.annonce.idLogement=this.logements[e].idLogement}},props:{action:{type:String,default:"add"},editAnnonce:{type:Object,default:null}},methods:{setSlide(e){for(let t=0;t<this.logements.length;t++)if(this.logements[t].idLogement==e){this.$refs.myCarousel.setSlide(t);break}},empty(e){return r.empty(e)},resetModal(){this.annonce={titre:"",description:"",tags:"",idLogement:""}},submitModal(e){return this.annonce.duree=this.duree.join(","),e.preventDefault(),r.empty(this.annonce.titre)||r.empty(this.annonce.description)||r.empty(this.annonce.duree)?App.error("Un titre, une description et une durée sont obligatoires"):this.annonce.titre.length<20?App.error("Le titre doit contenir au moins 20 caractères"):this.annonce.description.length<200?App.error("La description doit contenir au moins 200 caractères"):(this.submitted=!0,this.showOverlay=!0,"add"==this.action&&(console.log("annonce",this.annonce),axios.post("annonces",this.annonce).then(e=>(l["a"].success(e.message),this.$emit("annonceAdded"),this.submitted=!1,App.notifySuccess(e.message))).catch(e=>(this.submitted=!1,App.alertError(e.message))),setTimeout(()=>{this.showOverlay=!1},500)),void("edit"!=this.action||r.empty(this.annonce)||axios.put("annonces/"+this.idAnnonce,this.annonce).then(e=>(this.$emit("annonceUpdated"),this.submitted=!1,this.showOverlay=!1,App.notifySuccess(e.message))).catch(e=>(this.submitted=!1,this.showOverlay=!1,App.notifyError(e.message)))))},async getHousing(){this.showOverlay=!0,null!=storage.get("logements")&&storage.get("logements").length>0?this.logements=storage.get("logements"):(this.logements=await axios.get("logements").then(e=>e.result||[]),storage.set("logements",this.logements)),null!=this.editAnnonce&&(this.annonce.titre=this.editAnnonce.titreAnnonce,this.annonce.description=this.editAnnonce.descAnnonce,this.annonce.tags=this.editAnnonce.tags,this.annonce.idLogement=this.editAnnonce.idLogement,this.idAnnonce=this.editAnnonce.idAnnonce),console.log("entrée 2","editAnnonce",this.editAnnonce),this.showOverlay=!1},createLogement(){this.$emit("createLogementFirst")}},async mounted(){await this.getHousing()}},d=c,u=n("2877"),m=Object(u["a"])(d,i,o,!1,null,null,null),p=m.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"list-item list-item-grid"},[n("div",{staticClass:"card mb-3"},[n("div",{staticClass:"d-flex"},[n("a",{staticClass:"w-100 d-flex card-img",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.showDetails.apply(null,arguments)}}},[n("b-carousel",{attrs:{interval:4e3,indicators:""}},[e.photos?e._l(e.annonce.photos,(function(e,t){return n("b-carousel-slide",{key:t,staticStyle:{height:"15em",overflow:"hidden","border-radius":"10px",background:"rgba(128, 128, 128, 0.233)"},attrs:{"img-src":e}})})):n("img",{staticStyle:{height:"15rem",overflow:"hidden","border-radius":"10px"},attrs:{src:"/img/images-defauft-logement.jpeg",alt:"Image annonce"}})],2),n("b-badge",{staticClass:"position-absolute badge-top-left",attrs:{pill:"",variant:e.annonce.publish?"success":"danger"}},[e._v(e._s(e.annonce.publish?"Déja publiée":"Pas encore publiée"))]),n("b-badge",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:e.dateCreation,expression:"dateCreation",modifiers:{bottom:!0}}],staticClass:"position-absolute badge-top-left-2",attrs:{pill:"",variant:"secondary"}},[n("i",{staticClass:"fa fa-clock"}),e._v(" "+e._s(e.$date(e.annonce.createdAt).format("DD.MM.YYYY"))+" ")])],1)]),n("div",{staticClass:"d-flex flex-grow-1 min-width-zero card-content"},[n("div",{staticClass:"\n          card-body\n          align-self-center\n          d-flex\n          flex-column flex-md-row\n          justify-content-between\n          min-width-zero\n          align-items-md-center\n        ",staticStyle:{height:"11em","overflow-y":"hidden"}},[n("div",{staticClass:"max-lines-1"},[n("h5",{staticClass:"text-dark font-weight-bold"},[e._v(" "+e._s(e.php.ucfirst(e.annonce.titreAnnonce.toLowerCase()))+" ")]),e._l(e.annonce.tags.split(","),(function(t,s){return n("b-badge",{key:s,attrs:{variant:"secondary"}},[e._v(e._s(t))])}))],2),n("hr"),n("p",{staticClass:"text-muted text-small max-lines-3"},[e._v(" "+e._s(e.annonce.descAnnonce)+" ")])]),n("div",{staticClass:"d-flex justify-content-between p-3 mb-5"},[n("div",[n("i",{staticClass:"fas fa-money-bill-wave"}),n("strong",{staticClass:"price"},[e._v(" "+e._s((e.annonce.logement.prixMax+e.annonce.logement.prixMin)/2)+" FCFA")])]),n("div",{staticClass:"btn-actions d-flex justify-content-between"},[e.isSub?e._e():n("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:"Editer",expression:"'Editer'",modifiers:{bottom:!0}}],attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.$emit("makeUpdate",e.annonce)}}},[n("i",{staticClass:"fas fa-pen"})]),e.isSub?e._e():n("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:"Détails",expression:"'Détails'",modifiers:{bottom:!0}}],attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.showDetails.apply(null,arguments)}}},[n("i",{staticClass:"ik ik-eye"})]),n("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:"Menu",expression:"'Menu'",modifiers:{bottom:!0}}],staticClass:"show-list",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.showMenu(e.annonce.idAnnonce)}}},[n("i",{staticClass:"fa fa-ellipsis-v"})])]),n("div",{class:"py-4 animated bounceIn showModal s"+e.annonce.idAnnonce},[n("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.bottom",value:"Fermer",expression:"'Fermer'",modifiers:{bottom:!0}}],staticClass:"btn close text-dark border-0 closebtn",staticStyle:{"font-size":"36px",color:"red"},on:{click:function(t){return t.preventDefault(),e.closeMenu(e.annonce.idAnnonce)}}},[e._v(" ×")]),n("br"),e.isSub?e._e():n("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Acceder au logement",expression:"'Acceder au logement'",modifiers:{left:!0}}],staticClass:"d-block",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.accessTo.apply(null,arguments)}}},[n("b-button",{staticClass:"btn-icon my-1 mr-2",staticStyle:{width:"25px",height:"25px"},attrs:{variant:"dark"}},[n("i",{staticClass:"fa fa-share-square",staticStyle:{display:"flex","justify-content":"center","align-items":"center"}})]),e._v("Acceder au logement ")],1),e.annonce.publish?e._e():n("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Publier",expression:"'Publier'",modifiers:{left:!0}}],staticClass:"d-block",attrs:{href:"#"},on:{click:function(t){return e.publier(e.annonce)}}},[n("b-button",{staticClass:"btn-icon my-1 mr-2",staticStyle:{width:"25px",height:"25px"},attrs:{variant:"primary"}},[n("i",{staticClass:"fas fa-share",staticStyle:{display:"flex","justify-content":"center","align-items":"center"}})]),e._v("Publier l'annonce")],1),e.isSub?e._e():n("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Dupliquer l'annonce",expression:"'Dupliquer l\\'annonce'",modifiers:{left:!0}}],staticClass:"d-block",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.$emit("makeDuplication",e.annonce)}}},[n("b-button",{staticClass:"btn-icon my-1 mr-2",staticStyle:{width:"25px",height:"25px"},attrs:{variant:"primary"}},[n("i",{staticClass:"ik ik-copy",staticStyle:{display:"flex","justify-content":"center","align-items":"center"}})]),e._v("Dupliquer l'annonce")],1),n("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Propositions",expression:"'Propositions'",modifiers:{left:!0}}],staticClass:"d-block",attrs:{href:"#"}},[n("b-button",{staticClass:"btn-icon my-1 mr-2",staticStyle:{width:"25px",height:"25px"},attrs:{variant:e.annonce.nbrPropostions>0?"success":"secondary",id:"button-nombre-propositions"}},[n("i",{staticClass:"fas fa-sticky-note",staticStyle:{display:"flex","justify-content":"center","align-items":"center"}})]),e._v("Propositions")],1),n("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Faire un commentaire",expression:"'Faire un commentaire'",modifiers:{left:!0}}],staticClass:"d-block",attrs:{href:"#"}},[n("b-button",{staticClass:"btn-icon my-1 mr-2",staticStyle:{width:"25px",height:"25px"},attrs:{variant:"info"}},[n("i",{staticClass:"fa fa-comments",staticStyle:{display:"flex","justify-content":"center","align-items":"center"}})]),e._v("Faire un commentaire")],1),n("a",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.left",value:"Supprimer l'annonce",expression:"'Supprimer l\\'annonce'",modifiers:{left:!0}}],staticClass:"d-block",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.remouve.apply(null,arguments)}}},[n("b-button",{staticClass:"btn-icon my-1 mr-2",staticStyle:{width:"25px",height:"25px"},attrs:{variant:"danger"}},[n("i",{staticClass:"ik ik-trash-2",staticStyle:{display:"flex","justify-content":"center","align-items":"center"}})]),e._v("Supprimer l'annonce")],1)])])])])])},b=[];const g=n("5a6f");var f={data:()=>({open:!0}),props:{annonce:{type:Object,required:!0},isSub:{type:Boolean,default:!1}},computed:{dateCreation(){const e=this.$date(this.annonce.createdAt);return`Créée le ${e.format("dddd, DD MMMM YYYY")} à ${e.format("HH:mm")}`},php(){return g}},methods:{accessTo(){this.$router.push({name:"logements",query:{target:this.annonce.idLogement}})},remouve(){App.confirm(`Voullez vous vraiment supprimer l'annonce " <b>${this.annonce.titreAnnonce}</b> " ?`,{confirm:()=>{axios.delete("annonces/"+this.annonce.idAnnonce).then(e=>e.success?(this.$emit("deleted",this.annonce.idAnnonce),App.notifySuccess(e.message)):App.notifyError(e.message)).catch(e=>{App.notifyError(e.message)})}})},publier(e){let t="annonces/"+e.idAnnonce+"/publish";axios.put(t).then(e=>{this.$root.$emit("annonce-published-ok"),l["a"].success(e.message)}).catch(e=>{l["a"].error(e.message)})},showMenu(e){document.querySelector(".showModal.s"+e).style.display="block"},closeMenu(e){document.querySelector(".showModal.s"+e).style.display="none"},showDetails(){if(this.isSub)return!1;this.$emit("showDetails",this.annonce)}}},v=f,y=(n("b687"),Object(u["a"])(v,h,b,!1,null,"410a400e",null)),C=y.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ul",{staticClass:"nav nav-tabs"},[n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link",class:{active:"caractéristiques"==e.section},attrs:{"data-toggle":"tab",href:"#caracteristiques"},on:{click:function(t){t.preventDefault(),e.section="caracteristiques"}}},[e._v("Caractéristiques")])]),n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link",class:{active:"propositions"==e.section},attrs:{"data-toggle":"tab",href:"#propositions"},on:{click:function(t){t.preventDefault(),e.section="propositions"}}},[e._v("Propositions")])])]),n("div",{staticClass:"tab-content mt-3"},[n("div",{staticClass:"tab-pane fade show active"},["caracteristiques"==e.section?n("b-container",{attrs:{fluid:""}},[n("h2",{staticClass:"text-capitalize font-weight-bold fs-4"},[e._v("Localisation")]),n("b-row",{staticClass:"rounded text-white py-2",staticStyle:{margin:"0",background:"#f5365c"}},[n("b-col",{attrs:{lg:"4",md:"6",sm:"12"}},[n("span",{staticClass:"d-inline-block w-100 my-1"},[e._v(" Pays: "),n("b",{staticClass:"font-weight-bold"},[e._v(e._s(e.annonce.logement.adresse.pays))])])]),n("b-col",{attrs:{lg:"4",md:"6",sm:"12"}},[n("span",{staticClass:"d-inline-block w-100 my-1"},[e._v(" Ville: "),n("b",{staticClass:"font-weight-bold"},[e._v(e._s(e.annonce.logement.adresse.ville))])])]),n("b-col",{attrs:{lg:"4",md:"6",sm:"12"}},[n("span",{staticClass:"d-inline-block w-100 my-1"},[e._v(" Quartier: "),n("b",{staticClass:"font-weight-bold"},[e._v(e._s(e.annonce.logement.adresse.quartier))])])])],1),n("b-container",{staticClass:"mt-4 p-0"},[n("div",{staticClass:"map-container"},[n("GmapMap",{staticClass:"w-100",staticStyle:{height:"340px"},attrs:{center:{lat:parseFloat(e.annonce.logement.adresse.lat),lng:parseFloat(e.annonce.logement.adresse.lon)},zoom:14}},[n("gmap-custom-marker",{attrs:{marker:e.marker}},[n("img",{attrs:{src:"/img/mapMarker.png"},on:{mouseenter:e.showCoordonates,mouseleave:e.hidecoordonates}})])],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.dvisible,expression:"dvisible"}],staticClass:"mini-composant"},[n("div",{staticClass:"internal"},[n("p",[e._v(" Pays: "),n("span",[e._v(e._s(e.annonce.logement.adresse.pays))])]),n("p",[e._v(" Ville: "),n("span",[e._v(e._s(e.annonce.logement.adresse.ville))])]),n("p",[e._v(" Quartier: "),n("span",[e._v(e._s(e.annonce.logement.adresse.quartier))])])])])],1)]),n("hr"),n("vue-easy-lightbox",{attrs:{visible:e.section_photo.visible,imgs:e.photos,index:e.section_photo.index},on:{hide:e.section_photo_handleHide}}),n("h2",{staticClass:"text-capitalize font-weight-bold fs-4 my-4"},[e._v(" Caractéristiques approfondies ")]),n("b-row",[n("b-col",{attrs:{cols:"12"}},[n("span",{staticClass:"d-inline-block w-100 my-1 h6"},[e._v(" Titre: "),n("strong",[e._v(e._s(e.annonce.titreAnnonce))])]),n("span",{staticClass:"d-inline-block w-100 text-muted"},[e._v(" Posté le : "),n("small",[e._v(e._s(e.annonce.createdAt.slice(0,10)))])])]),n("b-col",{attrs:{cols:"12"}},[n("div",e._l(e.tags,(function(t,s){return n("b-badge",{key:t||s,staticClass:"m-1 bg-badge background"},[n("b",{staticClass:"fa-lg h6"},[e._v(e._s(t))])])})),1)])],1),n("div",{staticClass:"jumbotron pt-0 pb-10 mt-2 mb-0"},[n("p",{staticClass:"text-justify description"},[e._v(e._s(e.annonce.descAnnonce))])]),n("h2",{staticClass:"text-capitalize font-weight-bold fs-4 my-4"},[e._v("Photos")]),n("div",{staticClass:"row"},[e.photos.length>1?n("div",{staticClass:"col-md-3"},[n("div",{attrs:{id:"logement-imgs"}},[e._l(e.newPhotos,(function(e,t){return n("div",{key:t,staticClass:"logement-preview logement-image"},[n("img",{attrs:{src:e,alt:""}})])})),n("div",{staticClass:"icon-up",on:{click:e.goUp}},[n("i",{staticClass:"fa fa-chevron-up"})]),n("div",{staticClass:"icon-down",on:{click:e.goDown}},[n("i",{staticClass:"fa fa-chevron-down"})])],2)]):e._e(),e.photos.length>1?n("div",{staticClass:"col-md-9"},[n("div",{attrs:{id:"logement-main-img"}},[n("div",{staticClass:"logement-preview"},[n("img",{attrs:{src:e.currentPicture,alt:""}})])])]):n("div",{staticClass:"col-md-12"},[n("div",{attrs:{id:"logement-main-img"}},[n("div",{staticClass:"logement-preview"},[n("img",{attrs:{src:e.currentPicture,alt:""}})])])])]),n("h2",{staticClass:"text-capitalize font-weight-bold fs-4 my-4"},[e._v(" Informations sur le logement ")]),n("table",{staticClass:"table table-hover table-dark"},[n("thead",[n("tr",[n("th",{attrs:{scope:"col"}},[e._v("Libellé")]),n("th",{attrs:{scope:"col"}},[e._v("Valeur")])])]),n("tbody",[n("tr",[n("td",[e._v("Etat du logement")]),n("td",[e.annonce.logement.etatLogement?n("b-badge",{staticClass:"mt--1 mr-2 btn bg-badge background rounded-pill"},[n("small",{staticClass:"fa-sm"},[e._v("Logement occupé")])]):n("b-badge",{staticClass:"mt--1 mr-2 btn bg-badge bg-danger rounded-pill"},[n("small",{staticClass:"fa-sm"},[e._v("Logement libre")])])],1)]),n("tr",[n("td",[e._v("Prix du logement")]),n("td",[e._v(" "+e._s((e.annonce.logement.prixMax+e.annonce.logement.prixMin)/2)+" FCFA ")])])])]),n("hr")],1):e._e(),"propositions"==e.section?n("b-container",{attrs:{fluid:""}},[n("h2",{staticClass:"text-capitalize font-weight-bold fs-4 mb-4"},[e._v(" Propositions ")]),n("p",{staticClass:"btn btn-secondary position-relative rounded-pill mt-3 mr-2"},[e._v(" proposition(s) "),n("span",{staticClass:"\n              position-absolute\n              top-0\n              start-100\n              translate-middle\n              badge\n              rounded-pill\n              bg-danger\n            "},[e._v(" "+e._s(e.annonce.nbrPropostions)+" "),n("span",{staticClass:"visually-hidden"})])]),n("hr")]):e._e()],1)])])},w=[],x=n("6cee"),A=n("825a");const k=n("5a6f");var D={components:{VueEasyLightbox:A["a"],GmapCustomMarker:x["a"]},props:{annonce:{type:Object,required:!0}},data:()=>({section:"caracteristiques",marker:{lat:"",lng:""},dvisible:!1,section_photo:{index:0,visible:!1,images:[]},tags:[],currentPicture:"",newPhotos:[]}),computed:{latitude_5(){return Number(this.annonce.logement.adresse.lat).toFixed(5)},longitude_5(){return Number(this.annonce.logement.adresse.lon).toFixed(5)},photos(){return this.annonce.photos},caracteristiques(){return this.logement.caracteristiques.filter(e=>parseInt(e.valeur)>0)},itemsDepenses(){return k.array_slice(this.logement.depenses,this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage}},mounted(){this.newPhotos=this.photos.slice(0,3),this.currentPicture=this.newPhotos[0],this.tags=this.annonce.tags.split(","),this.marker.lat=this.annonce.logement.adresse.lat,this.marker.lng=this.annonce.logement.adresse.lon},methods:{showCoordonates(){this.dvisible=!0},hidecoordonates(){this.dvisible=!1},section_photo_showImg(e){},section_photo_handleHide(){this.section_photo.visible=!1},section_photo_uploadImageSuccess(e,t,n){console.log("data",e,t,n)},goUp(){let e=document.querySelector("#logement-main-img").offsetHeight/3,t=document.querySelectorAll(".logement-image");for(let s=0;s<t.length;s++)t[s].style.height=e+"px";let n=this.photos.indexOf(this.currentPicture);if(this.newPhotos=this.photos.slice(n,n+3),this.newPhotos.length<3){console.log("Taille incomplète !!!");let e=0;while(this.newPhotos.length<3)this.newPhotos.push(this.photos[e]),e+=1}this.photos[n+1]?this.currentPicture=this.photos[n+1]:this.currentPicture=this.photos[0]},goDown(){}}},S=D,P=(n("0fd3"),Object(u["a"])(S,_,w,!1,null,"c01b035a",null)),L=P.exports,M=n("fb87");const F=n("5a6f");var q={name:"list-logements",components:{AnnonceForm:p,AnnonceComponent:C,SearchForm:M["a"],DetailsAnnonce:L},watch:{search(e){this.annonces=F.empty(e)?this.trueAnnonces:this.trueAnnonces.filter(t=>t.titreAnnonce.toLowerCase().includes(e.toLowerCase()))}},data:()=>({action:"add",search:null,showOverlay:!0,currentPage:1,perPage:10,annonces:[],trueAnnonces:[],title:"créer une annonce",duplication:{enabled:!1,submitted:!1,error:!1,idBatiment:null},annonce:null,editAnnonce:null}),computed:{items(){return F.array_slice(this.annonces,this.offset,this.perPage)},offset(){return this.currentPage*this.perPage-this.perPage}},beforeMount(){this.getAnnonces()},mounted(){this.$root.$on("annonce-published-ok",()=>{this.getAnnonces()})},methods:{pushAnnonce(){this.getAnnonces(),this.$bvModal.hide("annonceForm")},addedAnnonce(){this.getAnnonces()},showDetails(e){this.annonce=e,setTimeout(()=>{$("#editLayoutItem").modal("show"),$("#editLayoutItem").on("hide.bs.modal",e=>{this.annonce=null}),$("#editLayoutItem").on("hidden.bs.modal",e=>{this.annonce=null})},100)},async getAnnonces(){try{this.annonces=this.trueAnnonces=await axios.get("annonces?my=true").then(e=>e.result),console.log("================================="),console.log(this.annonces),console.log("================================="),this.showOverlay=!1}catch(e){}},updateAnnonce(e){console.log("annonce",e),this.action="edit",this.title="edition de l'annonce \""+e.titreAnnonce+'"',this.editAnnonce=e,this.$bvModal.show("annonceForm")},removeAnnonce(e){this.annonces=this.annonces.filter(t=>t.idAnnonce!=e),this.trueAnnonces=this.trueAnnonces.filter(t=>t.idAnnonce!=e)},goToLogement(){this.$bvModal.hide("annonceForm"),setTimeout(()=>{this.$router.push({name:"logements",query:{target:"call-logement"}})},50)},duplicateAnnonce(e){this.duplication.enabled=!0,this.annonce=e},validateDuplication(e){e.preventDefault(),this.duplication.error=!1,this.duplication.submitted=!0,axios.post(`annonces/${this.annonce.idAnnonce}/duplicate`,this.duplication).then(e=>(this.getAnnonces,this.resetDuplicationForm(),App.notifySuccess(e.message))).catch(e=>(this.duplication.submitted=!1,App.alertError(e.message)))},resetDuplicationForm(){this.duplication={enabled:!1,submitted:!1,error:!1,idBatiment:null}},editAnnonces(){this.$bvModal.hide("annonceForm"),this.getAnnonces()},renameAnnonces(e,t){return e.map(e=>(e.idAnnonce==t.idAnnonce&&(e.titreAnnonce=t.titreAnnonce,e.descAnnonce=t.descAnnonce,e.etatAnnonce=t.etatAnnonce,e.publish=t.publish,e.tags=t.tags,e.idLogement=t.idLogement),e))}}},j=q,O=(n("4f01"),Object(u["a"])(j,s,a,!1,null,"67c29a63",null));t["default"]=O.exports},"0d5a":function(e,t,n){},"0fd3":function(e,t,n){"use strict";n("1e46")},"1e46":function(e,t,n){},"4f01":function(e,t,n){"use strict";n("85ec")},"85ec":function(e,t,n){},b687:function(e,t,n){"use strict";n("0d5a")}}]);
//# sourceMappingURL=chunk-f46cbdea.704038f9.js.map