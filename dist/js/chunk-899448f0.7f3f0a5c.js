(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-899448f0"],{"0a48":function(t,e,a){"use strict";a("ee7d")},"14ff":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"card-deck"},[a("div",{staticClass:"card col-3"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"text-center"},[a("h4",{staticClass:"card-title"},[t._v("Occupation n° "+t._s(t.occupation.idOccupation))]),null==t.occupation.dateFin?a("div",[t._calcul_impayes("total")>0?a("b-badge",{attrs:{variant:"warning"}},[t._v("Bail en cours")]):a("b-badge",{attrs:{variant:"success"}},[t._v("Bail en cours")])],1):a("div",[a("b-badge",{attrs:{variant:"danger"}},[t._v("Bail terminé le "+t._s(t.$date(t.occupation.dateFin).format("DD MMMM YYYY")))])],1)])]),a("div",{staticClass:"card-body pt-0"},[t.totalImpayes>0?a("div",{staticClass:"d-flex align-items-center justify-content-between"},[a("hr",{staticClass:"w-25 bg-danger"}),t._v(" Aperçu "),a("hr",{staticClass:"w-25 bg-danger"})]):t._e(),t.totalImpayes>0?a("div",{staticClass:"jumbotron pt-10 pb-10 px-2"},[a("dl",{staticClass:"row mb-0 text-muted"},[t._m(0),a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.right",value:"Impayés de loyer",expression:"'Impayés de loyer'",modifiers:{right:!0}}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t._calcul_impayes("loyer")+" F"))]),t._m(1),a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.right",value:"Impayés de lumière",expression:"'Impayés de lumière'",modifiers:{right:!0}}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t._calcul_impayes("energie")+" F"))]),t._m(2),a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.right",value:"Impayés d'eau",expression:"'Impayés d\\'eau'",modifiers:{right:!0}}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t._calcul_impayes("eau")+" F"))]),t._m(3),a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.right",value:"Total des impayés",expression:"'Total des impayés'",modifiers:{right:!0}}],staticClass:"mt-1 col-10 truncate font-weight-bold",class:{"text-danger":t.totalImpayes>1e4}},[t._v(t._s(t.totalImpayes+" F"))])])]):t._e(),t._m(4),a("span",{staticClass:"d-inline-block w-100 mb-1 text-center"},[t._v(t._s(t.occupation.locataire.titre+" "+t.occupation.locataire.nomLocataire+" "+t.occupation.locataire.prenomLocataire))]),a("span",{staticClass:"d-inline-block w-100 mb-1 text-center text-muted"},[t._v(t._s(t.occupation.locataire.profession))]),a("div",{staticClass:"jumbotron pt-10 pb-10 px-2"},[a("dl",{staticClass:"row text-muted"},[t._m(5),a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Numéro de CNI",expression:"'Numéro de CNI'"}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t.occupation.locataire.cniLocataire))]),t._m(6),a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Numéro de téléphone",expression:"'Numéro de téléphone'"}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t.occupation.locataire.tel+" / "+t.occupation.locataire.tel2))]),t._m(7),a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Email",expression:"'Email'"}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t.occupation.locataire.email+" / "+t.occupation.locataire.email2))]),t._m(8),a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Date de naissance",expression:"'Date de naissance'"}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t.$date(t.occupation.locataire.dateNaiss).format("DD MMMM YYYY")))])]),a("b-button",{attrs:{to:"#",size:"sm",block:"",variant:"outline-secondary"}},[t._v("Voir le dossier")])],1),t._m(9),a("span",{staticClass:"d-inline-block w-100 mb-1 text-center"},[t._v(t._s(t.occupation.logement.refLogement))]),a("span",{staticClass:"d-inline-block w-100 mb-1 text-center text-muted"},[t._v(t._s(t.occupation.logement.sousTypeLogement.libelleSousType))]),a("div",{staticClass:"jumbotron pt-10 pb-10 px-2"},[a("dl",{staticClass:"row text-muted"},[t._m(10),a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Plage de loyer",expression:"'Plage de loyer'"}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t.occupation.logement.prixMin+"F")+" - "+t._s(t.occupation.logement.prixMax+"F"))]),t._m(11),a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Localisation",expression:"'Localisation'"}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t.occupation.logement.adresse.ville+" "+t.occupation.logement.adresse.pays))]),t.occupation.logement.batiment?a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fa fa-building"})]):t._e(),t.occupation.logement.batiment?a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Batiment",expression:"'Batiment'"}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t.occupation.logement.batiment.nomBatiment))]):t._e(),t.occupation.logement.batiment?a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fas fa-city"})]):t._e(),t.occupation.logement.batiment?a("dt",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Cité",expression:"'Cité'"}],staticClass:"mt-1 col-10 truncate"},[t._v(t._s(t.occupation.logement.batiment.cite.nomCite))]):t._e()]),a("b-button",{attrs:{to:{name:"logements",query:{target:t.occupation.logement.idLogement}},size:"sm",block:"",variant:"outline-secondary"}},[t._v("Voir les details")])],1)])]),a("div",{staticClass:"card"},[t._m(12),a("div",{staticClass:"tab-content",attrs:{id:"pills-tabContent"}},[a("div",{staticClass:"tab-pane fade show active",attrs:{id:"generalites"}},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"border-bottom"},[t._v("Information")]),a("b-row",{staticClass:"mb-1"},[a("b-col",[a("dl",{staticClass:"row text-muted"},[a("dd",{staticClass:"mt-1 col-5"},[t._v("Loyer")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.occupation.loyerBase+" F"))]),a("dd",{staticClass:"mt-1 col-5"},[t._v("Mode de paiement")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.occupation.modePaiement))]),a("dd",{staticClass:"mt-1 col-5"},[t._v("Date de debut du bail")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.$date(t.occupation.dateDeb).format("dddd, DD MMMM YYYY")))]),t.occupation.dateFin?a("dd",{staticClass:"mt-1 col-5"},[t._v("Date de fin du bail")]):t._e(),t.occupation.dateFin?a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.$date(t.occupation.dateFin).format("dddd, DD MMMM YYYY")))]):t._e(),a("dd",{staticClass:"mt-1 col-5"},[t._v("Occupation créée le")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.$date(t.occupation.createdAt).format("dddd, DD MMMM YYYY HH:mm")))])])]),a("b-col",[a("dl",{staticClass:"row text-muted"},[a("dd",{staticClass:"mt-1 col-5"},[t._v("Nombre de mois d'avance")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.occupation.loyerBase+" F"))]),a("dd",{staticClass:"mt-1 col-5"},[t._v("Caution payé")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.occupation.modePaiement))]),a("dd",{staticClass:"mt-1 col-5"},[t._v("Facturation d'energie")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.occupation.puEnergie+"F")+" par "+t._s("index"==t.occupation.modeEnergie?"kw":"mois"))]),a("dd",{staticClass:"mt-1 col-5"},[t._v("Facturation d'eau")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.occupation.puEau+"F")+" par "),"index"==t.occupation.modeEau?a("span",[t._v("m"),a("sup",[t._v("3")])]):a("span",[t._v("mois")])])])])],1),a("div",{staticClass:"border-bottom d-flex justify-content-between mb-2"},[a("h4",[t._v("Comptes")]),a("b-button-group",[a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Effectuer une recharge",expression:"'Effectuer une recharge'"}],staticClass:"float-right btn-icon",on:{click:function(e){return e.preventDefault(),t.$bvModal.show("rechargeCompte")}}},[a("i",{staticClass:"fa fa-charging-station"})]),a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip",value:"Créer compte",expression:"'Créer compte'"}],staticClass:"float-right btn-icon",on:{click:function(e){return e.preventDefault(),t.$bvModal.show("creerCompte")}}},[a("i",{staticClass:"fa fa-plus"})])],1)],1),t._l(t.occupation.comptes,(function(e,s){return a("dl",{key:e.idCompte||s,staticClass:"row my-2"},[a("dd",{staticClass:"col-5"},[t._v("Compte "+t._s(e.typeCompte))]),a("dt",{staticClass:"col-7 fa-lg text-primary"},[t._v(t._s(e.solde)+" F")])])}))],2)]),a("div",{staticClass:"tab-pane fade",attrs:{id:"indexes"}},[a("b-container",{staticClass:"my-3"},[a("ul",{staticClass:"nav nav-tabs"},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"eau"==t.tab_indexe},attrs:{"data-toggle":"pill",href:"#"},on:{click:function(e){e.preventDefault(),t.tab_indexe="eau"}}},[t._v("Indexes d'eau")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",class:{active:"energie"==t.tab_indexe},attrs:{"data-toggle":"pill",href:"#"},on:{click:function(e){e.preventDefault(),t.tab_indexe="energie"}}},[t._v("Indexes d'électricité")])])]),a("div",{staticClass:"tab-content"},[a("div",{staticClass:"tab-pane fade show active mt-1"},[a("b-table",{attrs:{"sticky-header":"600px",striped:"",hover:"",responsive:"",items:t.indexes,fields:[{key:"mois",label:"Mois",sortable:!0},{key:"annees",label:"Année",sortable:!0},{key:"nouveau",label:"Indexe courant",sortable:!0},{key:"ancien",label:"Ancien indexe",sortable:!0},{key:"consommation",label:"Consommation",sortable:!0},{key:"montant",label:"Montant",sortable:!0},{key:"show_details",label:"Details"}]},scopedSlots:t._u([{key:"cell(mois)",fn:function(e){return[t._v(t._s(t.$dayjs(e.item.periode).format("MMMM")))]}},{key:"cell(annees)",fn:function(e){return[t._v(t._s(t.$dayjs(e.item.periode).format("YYYY")))]}},{key:"cell(consommation)",fn:function(e){return[t._v(t._s(e.item.nouveau-e.item.ancien))]}},{key:"cell(montant)",fn:function(e){return[a("span",{class:{"text-success":t._calcul_consommation_indexe(e.item,t.tab_indexe)<=e.item.avance,"text-warning":t._calcul_consommation_indexe(e.item,t.tab_indexe)>e.item.avance,"text-danger":t.empty(e.item.avance)}},[t._v(" "+t._s(t._calcul_consommation_indexe(e.item,t.tab_indexe))+" F ")])]}},{key:"cell(show_details)",fn:function(e){return[a("b-form-checkbox",{on:{change:e.toggleDetails},model:{value:e.detailsShowing,callback:function(a){t.$set(e,"detailsShowing",a)},expression:"row.detailsShowing"}})]}},{key:"row-details",fn:function(e){return[a("b-card",{staticClass:"m-0"},[a("b-row",[a("b-col",[a("dl",{staticClass:"row text-muted"},[a("dd",{staticClass:"mt-1 col-5"},[t._v("Avance")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.empty(e.item.avance)?"0 F":e.item.avance+" F"))]),a("dd",{staticClass:"mt-1 col-5"},[t._v("Reste")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.empty(e.item.reste)?"0 F":e.item.reste+" F"))])])]),a("b-col",[a("dl",{staticClass:"row text-muted"},[a("dd",{staticClass:"mt-1 col-5"},[t._v("Statut")]),a("dt",{staticClass:"mt-1 col-7"},[t.empty(e.item.avance)?a("b-badge",{attrs:{variant:"danger"}},[t._v("Non payé")]):t._calcul_consommation_indexe(e.item,t.tab_indexe)>e.item.avance?a("b-badge",{attrs:{variant:"warning"}},[t._v("Avancé")]):a("b-badge",{attrs:{variant:"success"}},[t._v("Payé")])],1),a("dd",{staticClass:"mt-1 col-5"},[t._v("Date de paiement")]),a("dt",{staticClass:"mt-1 col-7"},[t._v(t._s(t.empty(e.item.datePaiement)?"Non disponible":t.$date(e.item.datePaiement).format("DD MMMM YYYY")))])])])],1)],1)]}}])})],1)])])],1),a("div",{staticClass:"tab-pane fade ",attrs:{id:"loyers"}},[a("b-container",[a("b-table",{attrs:{"sticky-header":"600px",striped:"",hover:"",responsive:"",items:t.occupation.loyers,fields:[{key:"mois",label:"Mois",sortable:!0},{key:"annees",label:"Année",sortable:!0},{key:"montant",label:"Montant à payer",sortable:!0},{key:"montantPayer",label:"Montant payé",sortable:!0},{key:"observation",label:"Observation"}]},scopedSlots:t._u([{key:"cell(mois)",fn:function(e){return[t._v(t._s(t.$dayjs(e.item.periode).format("MMMM")))]}},{key:"cell(annees)",fn:function(e){return[t._v(t._s(t.$dayjs(e.item.periode).format("YYYY")))]}},{key:"cell(montant)",fn:function(e){return[t._v(" "+t._s(e.item.montant)+" F")]}},{key:"cell(montantPayer)",fn:function(e){return[t._v(" "+t._s(e.item.montantPayer)+" F")]}},{key:"cell(observation)",fn:function(e){return[t.empty(e.item.montantPayer)||e.item.montantPayer<=0?a("b-badge",{attrs:{variant:"danger"}},[t._v("Impayé")]):e.item.montantPayer<e.item.montant?a("b-badge",{attrs:{variant:"warning"}},[t._v("Avancé")]):a("b-badge",{attrs:{variant:"success"}},[t._v("Payé le "+t._s(t.$dayjs(e.item.datePaiement).format("DD MMMM YYYY")))])]}}])})],1)],1),a("div",{staticClass:"tab-pane fade ",attrs:{id:"charges"}},[a("b-container",[a("b-overlay",{attrs:{show:t.showOverlayTable,rounded:"sm"}},[a("b-table",{attrs:{"sticky-header":"600px",striped:"",hover:"",responsive:"",items:t.occupation.charges,fields:[{key:"mois",label:"Mois",sortable:!0},{key:"annees",label:"Année",sortable:!0},{key:"montant",label:"Montant",sortable:!0},{key:"observation",label:"Observation",sortable:!0},{key:"statut",label:"Statut"},{key:"Action",label:"Action"}]},scopedSlots:t._u([{key:"cell(mois)",fn:function(e){return[t._v(t._s(t.$dayjs(e.item.periode).format("MMMM")))]}},{key:"cell(annees)",fn:function(e){return[t._v(t._s(t.$dayjs(e.item.periode).format("YYYY")))]}},{key:"cell(montant)",fn:function(e){return[t._v(" "+t._s(e.item.montant)+" F")]}},{key:"cell(montantPayer)",fn:function(e){return[t._v(" "+t._s(e.item.montantPayer)+" F")]}},{key:"cell(observation)",fn:function(e){return[t._v(" "+t._s(e.item.observation)+" ")]}},{key:"cell(statut)",fn:function(e){return[e.item.etatCharge?a("b-badge",{attrs:{variant:"danger"}},[t._v("Actif")]):a("b-badge",{attrs:{variant:"secondary"}},[t._v("Terminé")])]}},{key:"cell(action)",fn:function(e){return[a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.righttop",value:"changer le statut",expression:"'changer le statut'",modifiers:{righttop:!0}}],staticClass:"ml-1",on:{click:function(a){return a.preventDefault(),t.changeState(e.item)}}},[a("i",{staticClass:"fas fa-toggle-on"})])]}}])})],1)],1),a("div",{staticClass:"d-flex align-items-center justify-content-end"},[a("btnAdd",{directives:[{name:"b-modal",rawName:"v-b-modal.chargeForm",modifiers:{chargeForm:!0}}],attrs:{message:"Nouvelle charge"}})],1)],1)])])]),a("b-modal",{attrs:{id:"chargeForm",size:"sm","hide-footer":"","no-close-on-backdrop":""},scopedSlots:t._u([{key:"modal-title",fn:function(){return[a("span",{staticClass:"ml-4 text-form-charge"},[t._v(t._s(t.title))])]},proxy:!0}])},[a("div",[a("charge-form",{attrs:{action:t.action,occupation:t.occupation}})],1)]),a("b-modal",{attrs:{id:"rechargeCompte",size:"sm",title:"Recharge de compte"},on:{hidden:t.resetForm,ok:t.doRecharge,show:function(){t.recharge.idCompte=t.occupation.comptes.find((function(t){return"principal"==t.typeCompte})).idCompte}},scopedSlots:t._u([{key:"modal-footer",fn:function(e){var s=e.ok,i=e.cancel;return[a("b-button",{attrs:{size:"sm"},on:{click:function(t){return i()}}},[t._v("Annuler")]),a("b-button",{attrs:{size:"sm",variant:"danger",disabled:t.submitted},on:{click:function(t){return s()}}},[t._v("Valider "),t.submitted?a("b-spinner",{attrs:{small:""}}):t._e()],1)]}}])},[a("b-form-group",{attrs:{label:"Compte à recharger"}},[a("b-form-select",{attrs:{options:t.occupation.comptes,"value-field":"idCompte","text-field":"typeCompte"},model:{value:t.recharge.idCompte,callback:function(e){t.$set(t.recharge,"idCompte",e)},expression:"recharge.idCompte"}})],1),a("b-form-group",{attrs:{label:"Montant de la recharge"}},[a("b-form-input",{attrs:{type:"number",min:"1",placeholder:"Ex: 5000"},model:{value:t.recharge.montant,callback:function(e){t.$set(t.recharge,"montant",e)},expression:"recharge.montant"}})],1)],1),a("b-modal",{attrs:{id:"creerCompte",size:"sm",title:"Créer un compte à l'occupation"},on:{hidden:t.resetForm,ok:t.createCompte},scopedSlots:t._u([{key:"modal-footer",fn:function(e){var s=e.ok,i=e.cancel;return[a("b-button",{attrs:{size:"sm"},on:{click:function(t){return i()}}},[t._v("Annuler")]),a("b-button",{attrs:{size:"sm",variant:"danger",disabled:t.submitted},on:{click:function(t){return s()}}},[t._v("Valider "),t.submitted?a("b-spinner",{attrs:{small:""}}):t._e()],1)]}}])},[a("b-form-group",{attrs:{label:"Label du compte"}},[a("b-form-input",{attrs:{placeholder:"Ex: Lumière"},model:{value:t.creerCompte.typeCompte,callback:function(e){t.$set(t.creerCompte,"typeCompte",e)},expression:"creerCompte.typeCompte"}})],1),a("b-form-group",{attrs:{label:"Solde initial"}},[a("b-form-input",{attrs:{type:"number",min:"1",placeholder:"Ex: 5000"},model:{value:t.creerCompte.solde,callback:function(e){t.$set(t.creerCompte,"solde",e)},expression:"creerCompte.solde"}})],1)],1)],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fa fa-money-bill"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fa fa-lightbulb"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fa fa-water"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fa fa-dollar-sign"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex align-items-center justify-content-between"},[a("hr",{staticClass:"w-25 bg-danger"}),t._v(" Locataire "),a("hr",{staticClass:"w-25 bg-danger"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fa fa-id-card"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fa fa-phone"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fa fa-envelope"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fas fa-calendar-alt"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex align-items-center justify-content-between"},[a("hr",{staticClass:"w-25 bg-danger"}),t._v(" Logement "),a("hr",{staticClass:"w-25 bg-danger"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fa fa-dollar-sign"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("dd",{staticClass:"mt-1 col-1"},[a("i",{staticClass:"fa fa-map-marker-alt"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{staticClass:"nav nav-pills custom-pills",attrs:{id:"pills-tab",role:"tablist"}},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link active",attrs:{"data-toggle":"pill",href:"#generalites"}},[t._v("Généralités")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{"data-toggle":"pill",href:"#loyers"}},[t._v("Loyers")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{"data-toggle":"pill",href:"#charges"}},[t._v("charges")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{"data-toggle":"pill",href:"#indexes"}},[t._v("Indexes")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link",attrs:{"data-toggle":"pill",href:"#comptes"}},[t._v("Comptes")])])])}],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-overlay",{attrs:{show:t.showOverlay,rounded:"sm"}},[a("b-row",[a("b-col",[a("b-form-group",{attrs:{label:"Montant",description:"combien voulez-vous attribuer ?"}},[a("b-form-input",{attrs:{placeholder:"Ex: 3000",type:"number",trim:""},model:{value:t.charge.montant,callback:function(e){t.$set(t.charge,"montant",e)},expression:"charge.montant"}})],1)],1)],1),a("b-row",[a("b-col",[a("b-form-group",{attrs:{label:"observation"}},[a("b-form-textarea",{staticClass:"mb-2",attrs:{placeholder:"pourquoi attribuez-vous cette charge ?",rows:"6"},model:{value:t.charge.observation,callback:function(e){t.$set(t.charge,"observation",e)},expression:"charge.observation"}})],1)],1)],1),a("b-row",[a("b-col",[a("div",{staticClass:"form-group"},[a("label",[t._v("Type de charge concernée")]),a("v-select",{attrs:{label:"libelle",options:t.typesCharges},on:{input:t.setType},model:{value:t.typeCharge,callback:function(e){t.typeCharge=e},expression:"typeCharge"}})],1)])],1),a("b-row",[a("b-col",[a("b-form-checkbox",{model:{value:t.charge.etatCharge,callback:function(e){t.$set(t.charge,"etatCharge",e)},expression:"charge.etatCharge"}},[a("span",{staticClass:"mt-3"},[t._v("Statut")])])],1)],1),a("hr"),a("div",{staticClass:"float-right"},[a("b-button",{attrs:{variant:"danger"},on:{click:function(e){return e.preventDefault(),t.submitModal.apply(null,arguments)}}},[t._v("Valider")])],1)],1)},n=[],c=a("ec45"),r=(a("411c"),a("0edd"),a("2c43"));const l=a("5a6f");var m={name:"charge-form",data:()=>({disabled:!1,charge:{idTypeCharge:"",montant:"",date:"",observation:"",etatCharge:!0},typesCharges:[],typeCharge:"",commandeAction:"",showOverlay:!0,sendForm:!1}),components:{DatePicker:c["default"]},props:{action:{type:String,required:!0,default:"add"},occupation:{type:Object}},methods:{setType(){this.charge.idTypeCharge=this.typeCharge.idTypeCharge},resetModal(){this.charge={idTypeCharge:"",montant:"",date:"",description:""},setTimeout(()=>{this.$emit("closeDepenseModal")},500)},submitModal(t){return t.preventDefault(),l.empty(this.charge.montant)||l.empty(this.charge.idTypeCharge)?App.error("Un montant, une date et la raison de la charge sont obligatoires"):""==this.charge.montant?App.error("Vous devez spécifier un montant"):""==this.idTypeCharge?App.error("Vous devez spécifier selectionner le type de charge qu'il s'agit"):void("add"==this.action&&(console.log("charge",this.charge),this.showOverlay=!0,axios.post("occupations/"+this.occupation.idOccupation+"/charges",this.charge).then(t=>(this.resetModal(),this.showOverlay=!1,this.$root.$emit("new-charge",t.result),App.notifySuccess(t.message))).catch(t=>{this.showOverlay=!1,r["a"].error(t.message)})))},async getTypesCharges(){if(null!=storage.get("types-charges")&&storage.get("types-charges").length>0)this.typesCharges=storage.get("types-charges");else try{this.typesCharges=await axios.get("constants/types-charges").then(t=>t.result),storage.set("types-charges",this.typesCharges)}catch(t){console.log(t.message)}this.showOverlay=!1}},async mounted(){await this.getTypesCharges()}},d=m,u=(a("451c"),a("2877")),p=Object(u["a"])(d,o,n,!1,null,"3c257186",null),v=p.exports;const b=a("5a6f");var h={data:()=>({submitted:!1,recharge:{idCompte:null,montant:null},creerCompte:{typeCompte:null,solde:0},tab_indexe:"eau",title:"Ajouter une charge",action:"add",showOverlayTable:!1}),props:{occupation:{type:Object,required:!0}},components:{chargeForm:v},computed:{indexes(){return this.indexes_type(this.tab_indexe).sort((t,e)=>this.$dayjs().diff(e.periode)-this.$dayjs().diff(t.periode))},totalImpayes(){return this._calcul_impayes("total")}},beforeMount(){},mounted(){this.$root.$on("new-charge",t=>{this.occupation.charges.unshift(t),this.$bvModal.hide("chargeForm"),console.log("nouvelle charge ajoutée")})},methods:{empty:t=>b.empty(t),indexes_type(t){return this.occupation.indexes.filter(e=>e.typeIndexe==t)},_calcul_consommation_indexe(t,e){let a=this.occupation.modeEau,s=this.occupation.puEau,i=1;return"energie"==e&&(a=this.occupation.modeEnergie,s=this.occupation.puEnergie),"index"==a&&(i=t.nouveau-t.ancien),i*s},_calcul_impayes(t){let e=0;return"loyer"==t?this.occupation.loyers.forEach(t=>{e+=t.montant-t.montantPayer}):"total"==t?e=this._calcul_impayes("loyer")+this._calcul_impayes("eau")+this._calcul_impayes("energie"):this.indexes_type(t).forEach(a=>{a.avance=parseInt(a.avance||0),e+=this._calcul_consommation_indexe(a,t)-a.avance}),e},pushCharge(){console.log("nouvelle charge ajoutée"),this.occupation.charges.unshift(response.result)},changeState(t){this.showOverlayTable=!0;let e="/charges/"+t.idCharge+"/change-state";axios.put(e).then(e=>{if(!e.success)return this.showOverlayTable=!1,App.alertError(e.message);let a="occupations/"+t.idOccupation+"/charges";return axios.get(a).then(t=>t.result||[]).then(t=>{this.occupation.charges=t}),this.showOverlayTable=!1,App.notifySuccess(e.message)})},doRecharge(t){if(t.preventDefault(),b.empty(this.recharge.idCompte)||b.empty(this.recharge.montant))return App.error("Veuillez remplir tous les champs du formulaire");this.submitted=!0,axios.post("comptes/"+this.recharge.idCompte+"/recharge",this.recharge).then(t=>(this.occupation.comptes=this.occupation.comptes.map(t=>(t.idCompte==this.recharge.idCompte&&(t.solde+=parseInt(this.recharge.montant)),t)),this.$bvModal.hide("rechargeCompte"),this.$emit("change",this.occupation),App.notifySuccess(t.message))).catch(t=>(this.submitted=!1,App.alertError(t.message)))},createCompte(t){if(t.preventDefault(),b.empty(this.creerCompte.typeCompte)||b.empty(this.creerCompte.solde))return App.error("Veuillez remplir tous les champs du formulaire");const e={...this.creerCompte,idOccupation:this.occupation.idOccupation};this.submitted=!0,axios.post("comptes",e).then(t=>(this.occupation.comptes.push(t.result),this.$bvModal.hide("creerCompte"),this.$emit("change",this.occupation),App.notifySuccess(t.message))).catch(t=>(this.submitted=!1,App.alertError(t.message)))},resetForm(){this.recharge={idCompte:null,montant:null},this.submitted=!1}}},g=h,f=(a("0a48"),Object(u["a"])(g,s,i,!1,null,"708ee7a2",null));e["a"]=f.exports},"2c43":function(t,e,a){"use strict";e["a"]={success:function(t,e){this.make(t,{type:"success",bgcolor:"#5bd747"},e)},error:function(t,e){this.make(t,{type:"error"},e)},make:function(t,e,a){notif(Object.assign({},{type:"info",msg:t,timeout:3e3,callback:a},e))}}},"451c":function(t,e,a){"use strict";a("e6a1")},e6a1:function(t,e,a){},ee7d:function(t,e,a){}}]);
//# sourceMappingURL=chunk-899448f0.7f3f0a5c.js.map