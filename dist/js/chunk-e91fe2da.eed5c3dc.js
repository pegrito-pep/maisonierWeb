(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e91fe2da"],{"278e":function(e,t,r){"use strict";var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("b-overlay",{attrs:{show:e.showOverlay,rounded:"sm"}},[i("form-wizard",{ref:"occupationForm",attrs:{title:"",subtitle:"",nextButtonText:"suivant",backButtonText:"Précedent",finishButtonText:"Enregistrer","aria-labelledby":"demoModalLabel",shape:"circle",color:"#e74c3c"},on:{"on-complete":e.onComplete,"on-loading":e.setLoading}},[i("tab-content",{attrs:{title:"Habitation",icon:"fas fa-info-circle","before-change":e.validateFirst}},[i("b-row",{staticClass:"mb-4"},[i("b-col",[i("b-form-group",{attrs:{label:"Quel est le logement concerné par l'occupation"}},[i("div",{staticStyle:{height:"10.5em"}},[i("v-select",{attrs:{options:e.logements,reduce:function(e){return e.idLogement},label:"refLogement"},on:{input:e.setSlide_logement},model:{value:e.occupation.idLogement,callback:function(t){e.$set(e.occupation,"idLogement",t)},expression:"occupation.idLogement"}}),i("b-carousel",{ref:"logementCarousel",attrs:{interval:0,controls:""},model:{value:e.selected_index_logement,callback:function(t){e.selected_index_logement=t},expression:"selected_index_logement"}},e._l(e.logements,(function(t,r){return i("b-carousel-slide",{key:r,staticClass:"fluid w-100 responsive border-0",staticStyle:{height:"10.5em"},attrs:{"img-src":e.empty(t.photos)?"/img/bgHousing.jpg":t.photos[0].image}})})),1)],1)])],1),i("b-col",[i("b-form-group",{attrs:{label:"Qui est le résident pour lequel l'occupation est défini"}},[i("div",{staticStyle:{height:"10.5em"}},[i("v-select",{attrs:{options:e.locataires,reduce:function(e){return e.idLocataire},label:"nomLocataire",disabled:e.disabled},on:{input:e.setSlide_locataire},scopedSlots:e._u([{key:"option",fn:function(t){var r=t.nomLocataire,a=t.prenomLocataire;return[e._v(" "+e._s(r)+" "),i("br"),i("span",{staticClass:"text-muted"},[e._v(e._s(a))])]}}]),model:{value:e.occupation.idLocataire,callback:function(t){e.$set(e.occupation,"idLocataire",t)},expression:"occupation.idLocataire"}}),"1"==e.provenance?i("b-carousel",{ref:"locataireCarousel",attrs:{interval:0,controls:""},model:{value:e.selected_index_locataire,callback:function(t){e.selected_index_locataire=t},expression:"selected_index_locataire"}},e._l(e.locataires,(function(e,t){return i("b-carousel-slide",{key:t,staticClass:"fluid w-100 responsive border-0",staticStyle:{height:"10.5em"},attrs:{"img-src":e.avatar}})})),1):e._e(),"2"==e.provenance?i("b-carousel",{ref:"locataireCarousel",attrs:{interval:0,controls:""},model:{value:e.selected_index_locataire,callback:function(t){e.selected_index_locataire=t},expression:"selected_index_locataire"}},[i("b-carousel-slide",{staticClass:"fluid w-100 responsive border-0",staticStyle:{height:"10.5em"},attrs:{"img-src":e.locataire.avatar}})],1):e._e()],1)])],1)],1),i("b-row",{staticClass:"mt-4"},[i("b-col",{staticClass:"col-4"},[i("b-form-group",{attrs:{label:"Date de debut du bail"}},[i("date-picker",{staticClass:"w-100",attrs:{placeholder:"Selectionnez une date",format:"dddd, DD MMMM YYYY",valueType:"YYYY-MM-DD",clearable:!1},model:{value:e.occupation.debut,callback:function(t){e.$set(e.occupation,"debut",t)},expression:"occupation.debut"}})],1)],1),i("b-col",{staticClass:"col-2"},[i("b-form-group",{attrs:{label:"Durée du bail"}},[i("b-form-input",{class:e.requiredAvance?"":"is-red",attrs:{type:"number",placeholder:"Ex: 6",trim:""},model:{value:e.occupation.dureeBail,callback:function(t){e.$set(e.occupation,"dureeBail",t)},expression:"occupation.dureeBail"}}),e.requiredAvance?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)],1),i("b-col",{staticClass:"mt-4"},[i("b-form-checkbox",{attrs:{switch:""},model:{value:e.occupation.endLastBail,callback:function(t){e.$set(e.occupation,"endLastBail",t)},expression:"occupation.endLastBail"}},[i("span",{staticClass:"fa-lg"},[e._v("Mettre fin au bail précédent")])])],1)],1)],1),i("tab-content",{attrs:{title:"Facturation",icon:"ik ik-dollar-sign","before-change":e.validateSecond}},[i("b-row",[i("b-col",[i("b-form-group",{attrs:{label:"Loyer",description:"Combien devra payer le résident"}},[i("b-form-input",{class:e.requiredLoyer?"":"is-red",attrs:{type:"number",placeholder:"Ex: 45000",trim:""},model:{value:e.occupation.loyer,callback:function(t){e.$set(e.occupation,"loyer",t)},expression:"occupation.loyer"}}),e.requiredLoyer?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)],1),i("b-col",[i("div",{staticClass:"form-group"},[i("label",[e._v("Mode de paiement")]),i("v-select",{staticClass:"pb-5",class:e.requiredMode?"":"is-red",attrs:{label:"text",options:e.payoptions,reduce:function(e){return e.value}},model:{value:e.occupation.mode,callback:function(t){e.$set(e.occupation,"mode",t)},expression:"occupation.mode"}}),e.requiredMode?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)]),i("b-col",{staticClass:"col-2"},[i("b-form-group",{attrs:{label:"Nombre de mois d'avance",description:"Combien de mois le locataire a t-il avancé"}},[i("b-form-input",{class:e.requiredAvance?"":"is-red",attrs:{type:"number",placeholder:"Ex: 6",trim:""},model:{value:e.occupation.avance,callback:function(t){e.$set(e.occupation,"avance",t)},expression:"occupation.avance"}}),e.requiredAvance?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)],1),i("b-col",[i("b-form-group",{attrs:{label:"Caution",description:"somme versée faisant office de caution"}},[i("b-form-input",{class:e.requiredCaution?"":"is-red",attrs:{type:"number",placeholder:"Ex: 25000",trim:""},model:{value:e.occupation.caution,callback:function(t){e.$set(e.occupation,"caution",t)},expression:"occupation.caution"}}),e.requiredCaution?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)],1)],1),i("b-row",[i("b-col",[i("div",{staticClass:"form-group"},[i("label",[e._v("Facturation d'eau")]),i("v-select",{class:e.requiredEau?"":"is-red",attrs:{label:"text",options:e.eauoptions,reduce:function(e){return e.value}},model:{value:e.occupation.eau,callback:function(t){e.$set(e.occupation,"eau",t)},expression:"occupation.eau"}}),e.requiredEau?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)]),i("b-col",[i("b-form-group",{attrs:{label:"forfait"==e.occupation.eau?"Taux forfataire":"Prix unitaire de l'eau",description:""}},[i("b-form-input",{class:e.requiredPuEau?"":"is-red",attrs:{min:"0",type:"number",placeholder:"Ex: 1500",trim:""},model:{value:e.occupation.puEau,callback:function(t){e.$set(e.occupation,"puEau",t)},expression:"occupation.puEau"}}),e.requiredPuEau?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)],1),"index"==e.occupation.eau?i("b-col",[i("b-form-group",{attrs:{label:"Index initial",description:"Index du compteur d'eau à l'entrée du locataire"}},[i("b-form-input",{class:e.requiredIndex?"":"is-red",attrs:{min:"0",type:"number",placeholder:"Ex: 095",trim:""},model:{value:e.occupation.indexEau,callback:function(t){e.$set(e.occupation,"indexEau",t)},expression:"occupation.indexEau"}}),e.requiredIndex?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)],1):e._e()],1),i("b-row",[i("b-col",[i("div",{staticClass:"form-group"},[i("label",[e._v("Facturation d'électricité")]),i("v-select",{class:e.requiredELectricite?"":"is-red",attrs:{label:"text",options:e.eauoptions,reduce:function(e){return e.value}},model:{value:e.occupation.energie,callback:function(t){e.$set(e.occupation,"energie",t)},expression:"occupation.energie"}}),e.requiredELectricite?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)]),i("b-col",[i("b-form-group",{attrs:{label:"forfait"==e.occupation.energie?"Taux forfataire":"Prix unitaire de l'électricité",description:"L'exemple suggéré suppose une consommation par index"}},[i("b-form-input",{class:e.requiredPuEnergie?"":"is-red",attrs:{type:"number",min:"0",placeholder:"Ex: 150",trim:""},model:{value:e.occupation.puEnergie,callback:function(t){e.$set(e.occupation,"puEnergie",t)},expression:"occupation.puEnergie"}}),e.requiredPuEnergie?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)],1),"index"==e.occupation.energie?i("b-col",[i("b-form-group",{attrs:{label:"Index initial",description:"Index du compteur d'électricité à l'entrée du locataire"}},[i("b-form-input",{class:e.requiredPuEnergie?"":"is-red",attrs:{type:"number",min:"0",placeholder:"Ex: 095",trim:""},model:{value:e.occupation.indexEnergie,callback:function(t){e.$set(e.occupation,"indexEnergie",t)},expression:"occupation.indexEnergie"}}),e.requiredPuEnergie?e._e():i("span",{staticStyle:{color:"red"}},[e._v("Ce champ est obligatoire")])],1)],1):e._e()],1)],1),i("tab-content",{attrs:{title:"Contrat",icon:"fas fa-file-contract"}},[i("div",{staticClass:"templateChoix mb-4"},e._l(e.contrats,(function(t,a){return i("b-col",{key:a,attrs:{xl:"2",lg:"2",cols:"12",sm:"6"},on:{click:function(r){return e.contratSelect(t,a)}}},[i("div",{staticClass:"contratTheme",class:{"active-contrat":e.selectedContrat==a}},[i("div",{staticClass:"contratImage"},[i("img",{attrs:{src:r("760d"),alt:"template de contrat de bail ou de location"}})]),i("div",{staticClass:"contratType",class:{"active-contrat":e.selectedContrat==a}},[i("span",[e._v(" "+e._s(t.libelleModele)+" ")])])])])})),1),i("b-overlay",{attrs:{show:e.showOverlay2,rounded:"sm"}},[i("div",{staticClass:"well-display",staticStyle:{height:"130em","margin-top":"100px"}},[i("vue-editor",{staticStyle:{height:"123em"},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}})],1)])],1),e.loadingWizard?i("div",{staticClass:"leloader"}):e._e()],1),i("div",{staticClass:"float-right"},[i("b-button",{attrs:{variant:"secondary"},on:{click:function(t){return t.preventDefault(),e.resetModal.apply(null,arguments)}}},[e._v("Fermer")])],1)],1)},a=[],n=r("2ee4"),o=(r("da93"),r("ec45")),s=(r("411c"),r("0edd"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-form-group",{attrs:{label:e.label,description:e.description}},[r("b-form-input",{attrs:{type:e.type,min:e.min,placeholder:e.placeholder,trim:""},on:{input:function(t){e.$emit("input",t)}},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}})],1)}),l=[],c={name:"CustomInputGroup",props:{label:{type:String,required:!0},description:{type:String,required:!0},placeholder:{type:String},value:{type:[String,Number],required:!0},min:{type:[String,Number]},type:{type:String,default:"text"}},data:()=>({val:null}),mounted:()=>{(void 0).val=JSON.parse(JSON.stringify((void 0).value))}},u=c,p=r("2877"),d=Object(p["a"])(u,s,l,!1,null,"43d70647",null),m=d.exports,g=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-form-group",{attrs:{label:e.label,description:e.description}},[r("b-form-select",{attrs:{options:e.options},on:{input:function(t){e.$emit("input",t)}},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}})],1)},b=[],E={name:"CustomSelectGroup",props:{label:{type:String,required:!0},description:{type:String,required:!0},placeholder:{type:String},value:{type:[String,Number],required:!0},options:{type:Array,default:[]}},data:()=>({val:null}),mounted:()=>{(void 0).val=JSON.parse(JSON.stringify((void 0).value))}},h=E,v=Object(p["a"])(h,g,b,!1,null,"9982fb74",null),f=v.exports,L=r("2c43"),x=r("5873"),I=r("2f62");const T=r("5a6f");var A={name:"occupation-form",components:{DatePicker:o["default"],CustomInputGroup:m,CustomSelectGroup:f,FormWizard:n["FormWizard"],TabContent:n["TabContent"],VueEditor:x["a"]},props:{locataire:{type:Object},provenance:{type:Number,required:!0,default:"1"},action:{type:String,required:!0,default:"add"},editOccupation:{type:Object}},data:()=>({duree:[null,null],selected_index_logement:-1,selected_index_locataire:-1,selected_value:"",occupation:{loyer:"",mode:"prepayer",energie:"index",eau:"index",puEnergie:"",puEau:"",idLogement:"",idLocataire:"",debut:"",indexEnergie:0,indexEau:0,endLastBail:!1,avance:1,contrats:"",dureeBail:0,caution:1,contrat:""},loadingWizard:!1,content:"<h1 class=\"ql-align-center\"><strong>CONTRAT DE BAIL A USAGE D'HABITATION </strong></h1><p><br></p><p><br></p><h3>\t<strong>DESIGNATION DES PARTIES</strong></h3><p><br></p><h3>\t<strong><u>LE COMPLEXE INDUSTRIEL DU CAMEROUN en abrégé ( CIC )</u></strong></h3><p>\t</p><p>\t siège : <strong>.{{ LOGEMENT_ADRESSE_PAYS}}</strong></p><p>\t</p><p>\tReprésenté par : <strong>.{{  NOM_BAILLEUR }}</strong></p><p>  </p><p>    N° de CNI : <strong>{{  CNI_BAILLEUR }}</strong></p><p><br></p><p>\tDate de Délivrance : ....................</p><p><br></p><p>    Tél : <strong>{{  TEL_BAILLEUR }}</strong></p><p><br></p><p>                ci-après désigné  <strong>&lt;&lt; BAILLEUR &gt;&gt;</strong></p><p><br></p><p>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>ET</strong></p><p><br></p><h3>\t\t</h3><h3>\t\t<strong><u>Le LOCATAIRE</u></strong></h3><p>\t\t</p><p>\t\t\t NOM:<strong> {{ LOCATAIRE_NOMS_PRENOMS }}</strong></p><p>\t</p><p>\t\t\tNé \tle : <strong>{{ LOCATAIRE_DATE_NAISSANCE  }}</strong></p><p>  </p><p>  \t\t    Fils de  : ............</p><p><br></p><p>\t        Exercant  de: ........</p><p><br></p><p>            N° de CNI: <strong>{{ LOCATAIRE_CNI }}</strong></p><p>\t\t</p><p>\t\t\tDate de délivrance: .................</p><p><br></p><p>\t\t\tTel: <strong>{{ LOCATAIRE_TEL  }}</strong></p><p><br></p><p>\t\t\t\t\t\t ci-après désigné  &lt;&lt; LE PRENEUR&gt;&gt;</p><p><br></p><h2>\t</h2><h3>\t\t\t\t<strong>IL A ETE ARRETE ET CONVENU CE QUI SUIT</strong></h3><p><br></p><p><br></p><h3>\t<strong>Article 1: OBJET-USAGE DES LIEUX</strong></h3><p>\t</p><p>\t1.1 Le bailleur loue par les présentes au preneur qui accepte les lieux ci-après décrits à l'article 2, situé au quartier Mvan à usage exclusif d'habitation.</p><p><br></p><p>\t1.2 Ils ne pourront être utilisé même temporairement à d'autres usages que celui ainsi arrêté sous</p><p>\t\t\tpeine de résiliation de plein droit de bail, suivi d'un délaissement immédiat à la première demande du bailleur&nbsp;.</p><p><br></p><p><br></p><h3>\t<strong>Article 2: DESIGNATION-COMPOSITION-ETAT DES LIEUX</strong></h3><p><br></p><p>\t2.1 Les locaux objet du présent bail se présentent ainsi qu'il suit :</p><ul><li>\t\t<strong>{{ CARACTERISTIQUES_LOGEMENT }}</strong></li></ul><p><br></p><p>   2.2 Il n'est pas fait plus ample description des lieux loués, le preneur déclarant les connaitre parfaitement pour les avoir vu, visité, et accepté  tels quels avant conclusion du présent contrat</p><p><br></p><p>\t2.2 A défaut des lieux ci-dessus, le preneur reconnait  qu'il sera réputé avoir occupé les lieux en parfait état.</p><p><br></p><h3><strong>Article 3: DUREE DU BAIL-AVENANT DE RENOUVELEMENT</strong></h3><p><br></p><p>\t3.1 Le présent bail est inclus pour une durée ferme et définitive <strong>{{ CONTRAT_DUREE }}</strong> mois ? Sauf si les parties en disposent autrement</p><p><br></p><p>\t3.2 Un mois avant la fin du bail , il est inclus un nouveau bail si nécessaire pour la même durée à la même demande écrite du locataire.</p><p><br></p><p>\t3.3 En cas d'acceptation du bailleur ou de son silence garder jusqu'au moins deux semaines avant l'expiration du bail, le renouvellement est acquis et dans tous les cas pour une durée supplémentaire d'un an.</p><p><br></p><h3><strong>Article 4: PRIX DU LOYER ET DES REDEVANCES D'OCCUPATION</strong></h3><p><br></p><p>\t 4.1 Le prix du loyer mensuel hors taxes consenti pour la présente location est de : <strong>{{ PRIX_LOYER }} FCFA</strong></p><p>\t</p><p>    4.2 Que le preneur accepte payer ainsi que les accessoires, à chaque échéance ci-après indiquée ;</p><p><br></p><p>\t4.3 Le loyer est payable mensuellement ;</p><p><br></p><p>\t4.4 Le preneur s'oblige à s'acquitter ses loyers et accessoires par terme et d'avance à Yaoundé, au plus tard le premier jour de chaque mois ;</p><p><br></p><p>\t4.5 Les paiements tant du loyer que de accessoires seront effectuées par des versements en espèces entre les mains du bailleur ou de tout autre mandataire détenteur d'une bonne et valable procuration ;</p><p><br></p><p><br></p><h3><strong>Article 5: FRAIS D'ETABLISSEMENT, DEPENSES D'ENREGISTREMENT, TIMBRE DE TAXES DIVERSES, ET FRAIS DE POURSUITES </strong></h3><p><br></p><p>5.1 Tous les frais fixés par les règlements publics relatifs à l'établissement de présentes ( frais d'enregistrement, frais de timbre et pénalités de toutes natures), sont   à la charge du preneur;</p><p><br></p><p>5.2 Les taxes fixées par les administrations publiques, communales sont également à sa charge et dues dans les conditions et aux dates fixées par ces administrations ; il devra justifier de leurs acquis avant de déménager ;</p><p><br></p><p>5.3 En cas de règlement tardif de ces taxes par le preneur, les pénalités administratives et fiscales en résultant sont à la charge du preneur;</p><p><br></p><p>5.4 Les frais droits et honoraires auxquels pourront donner lieu le présent acte et ses suites, y compris les frais de poursuites de  toutes natures, seront supportés par le preneur;</p><p><br></p><h3><strong>Article 6: LA CAUTION OU DEPOT DE GARANTIE</strong></h3><p><br></p><p>6.1 Le montant de la caution ou du dépôt de garantie est de : <strong>{{ MONTANT_CAUTION }} FCFA</strong></p><p><br></p><p>6.2 Le preneur a versé la somme de <strong>{{ AVANCE }} FCFA</strong> correspondant à une avance de <strong>{{ NBRE_MOIS }}</strong> mois de loyer.</p><p><br></p><p>6.3 Le dernier terme du loyer ne sera ni imputable sur le dépôt de garantie ; Celui-ci restera conservé à titre de sûreté de bonne exécution du présent bail;</p><p><br></p><p>6.4 Le preneur ne pourra exiger le remboursement de la caution ou du dépôt de garantie en fin de jouissance, dès complet déménagement,  remise de toutes les clés et des lieux en état initial d'occupation ; </p><p><br></p><h3><strong>Article 7: ENTRETIEN TRAVAUX REPARATIONS-REGLEMENTS D'IMMEUBLE</strong></h3><p><br></p><p>7.1 Le preneur entretiendra les lieux loués en bon état de réparation locative, en jouira en bon père de famille et les restituera en fin de bail en bon état.</p><p><br></p><p>7.2 Le preneur devra notamment refaire les badigeons, peinture de boiserie, des murs, portes, plafonnage, etc... conformément aux dispositions de l'article 1 754 code civil aussi souvent que besoin sera ;</p><p><br></p><p>7.3 Le bailleur ne sera tenu d'exécuter au cours du bail que les grosses réparations qui pourraient, conformément aux disposition de l'article 1 720 du code civil, devenir nécessaires, toute autre réparation quelle qu'elle soit restant à chaque charge du preneur qui en supportera les conséquences.</p><p><br></p><h3><strong>Article 8: CESSION DE BAIL SOUS LOCATION</strong></h3><p><br></p><p>8.1 Le présent bail est signé intuitu personnage, toute cession des droits au présent contrat, toute sous location est interdite ;</p><p><br></p><h3><strong>Article 9: REGLEMENT URBAIN</strong></h3><p><br></p><p>9.1 Le preneur satisfera à toutes les prescriptions de police, de voirie et d'hygiène ;</p><p><br></p><h3><strong>Article 10: ASSURANCES-RESPONSABILITES-RECOURS DIVERS</strong></h3><p><br></p><p>10.1 Le preneur est responsable de toutes dégradations commises, et de tous sinistres directs et indirects qui pourraient être survenus par lui, par les occupants de son chef, ou par des tiers quelconques se trouvant même momentanément sur les lieux loués par lui, ou ayant un rapport quelconque avec&nbsp;lui ;</p><p><br></p><p>10.2 Il sera particulièrement responsable et de plein droit, des dégâts causés en cours d'aménagement, ainsi que ceux résultant des activités des personnes effectuant pour son compte des travaux sur les lieux, ou celle des personnes vivants avec lui ;</p><p><br></p><p>10.3 Il renonce à tous recours en responsabilité contre le bailleur, et pourra exiger de ce dernier aucune indemnité, ni diminution de loyer dans les cas ci-après en cas d'interruption dans le service de l'eau, d'électricité, par suite d'accident ou d’événements indépendants de la volonté du bailleur ;</p><p><br></p><p><br></p><h3><strong>Article 11: VISITES-ACCES DES LIEUX-REMISE DES CLES</strong></h3><p><br></p><p>11.1 Le preneur après avoir été au moins vingt quatre (24) heures à l'avance, devra laissé le bailleur ( en personne ou celle de son représentant préposé ) visité les lieux loués chaque fois qu'il le jurera nécessaire, pour tous travaux, relevés, et inspections utiles;</p><p><br></p><p>11.2 Il devra également laisser pénétré les architectures ou entrepreneurs et leur personnel pour tous travaux rendus nécessaires ;</p><p><br></p><p><br></p><h3><strong>Article 12: ELECTRICITE-EAU-TELEPHONE-IMAGETV-INTERNET</strong></h3><p><br></p><p>12.1 Le preneur paiera directement au concessionnaire le montant des abonnement ou consommation d'eau, d'électricité, de téléphone, d'image TV et Internet ; il fera son affaire personnelle;</p><p><br></p><p>12.2 Consommation en eau:&nbsp;&nbsp;Le preneur s'engage à payer la somme de <strong> {{ FORFAIT_EAU }} FCFA </strong> par mois représentant le montant du forfait convenu.</p><p class=\"index_eau\">12.2 Consommation en eau:&nbsp;La consommation en eau du preneur sera calculée chaque mois sur la base des indexes qui seront relevés sur son compteur avec une facturation de <strong> {{ PU_EAU }} le KWh </strong>. A son entrée, l'index relevé est de <strong> {{ INDEX_EAU }}.</strong></p><p>12.3 Consommation en électricité:&nbsp;&nbsp;Le preneur s'engage à payer la somme de <strong>{{ FORFAIT_ELECTRICITE }} FCFA</strong> par mois représentant le montant du forfait convenu.</p><p class=\"index_electricite\">12.3 Consommation en électricité:&nbsp;La consommation en électricité du preneur sera calculée chaque mois sur la base des indexes qui seront relevés sur son compteur électrique avec une facturation de<strong> {{ PU_ELECTRICITE }} le KWh </strong> . A son entrée, l'index relevé est de <strong>{{ INDEX_ELECTRICITE }} . </strong></p><p><br></p><p><br></p><h3><strong>Article 13: TOLERENCES</strong></h3><p><br></p><p>13.1 Toutes tolérances de la part du bailleur, quelles qu'en aient pu être la fréquence et la durée au sujet des clause et conditions du présent accord, ne pourront jamais être considérés comme apportant des modifications ou suppressions de ces clauses et conditions, ni comme génératrice d'un droit quelconque ;</p><p><br></p><h3><strong>Article 14: CLAUSE RESOLUTOIRE - PRIVILEGE DU BAILLEUR</strong></h3><p><br></p><p>14.1 Les parties conviennent expressément que le présent bail sera considéré comme résilié de plein droit et le contrat éteint définitivement pour l'avenir, sans aucune formalité, entre elles dans les hypothèses ci-après :</p><p><br></p><p>&nbsp;&nbsp;&nbsp;a-) En cas du décès du preneur ,</p><p><br></p><p>\t b-) En&nbsp;cas de non paiement à son écheance&nbsp;d'un seul terme de loyer, ou d'une quelconque somme due en vertu des présentes et huit jours après sommation de payer restée infructueuse ;</p><p><br></p><p><br></p><p>14.2 Dans tous les cas de résiliation, sans préjudice des autres voies de droit, le mobilier garnissant les lieux loués, pourra au gré du bailleur, être séquestré sur place ou dans un garde meuble, aux frais, risque et périls sur requête signés par Monsieur le Président du Tribunal de Première Instance de Yaoundé EKOUNOU, à charge de lui en référé en cas de difficultés ;</p><p><br></p><p>&nbsp;&nbsp;&nbsp;</p><p>14.3 Le séquestre du mobilier fait conformément à la clause ci-dessus pourra être levé, soit par accords amiable signés entre les parties, soit à la suite d'une procédure judiciaire définitive de liquidation de l'intégralité des droits du bailleur.</p><p><br></p><p><br></p><p>14.4 En cas de résiliation amiable, les parties acceptent organiser dans les accords écrits particuliers les modalités de liquidation des droits de chacune d'elles, celle-ci pouvant prévoir qu'il soit défalqué la caution ou du dépôt de garantie, indépendamment des loyers, arriérés de loyers et accessoires, les frais de remise des locaux en état, et plus généralement toute somme due,</p><p><br></p><p><br></p><p><br></p><h3><strong>Article 15: DELAISSEMENT FORCE DE L'IMMEUBLE OU EXPULSION</strong></h3><p><br></p><p>\t15.1 Après extinction du présent bail, ou en cas d'acquisition définitive de la clause résolutoire, le délaissement forcé de l'immeuble sera poursuivi et exécuté suivant la simple procédure de référé engagé devant le Tribunal de Première Instance de Yaoundé Ekounou ;</p><h2><br></h2><h3><strong>Article 16: OCCUPATION DES LIEUX APRES CESSATION OU RESILIATION DU BAIL</strong></h3><p><br></p><p>\t16.1 Au cas où après cessation ou résiliation du bail, et pour quelque cause que ce soient, les lieux ne seraient pas restitués en l'état au bailleur, et libre de toute occupation, il lui sera dû une indemnité contractuelle d'occupation ;</p><h2><br></h2><h3><strong>Article 17: ELECTION DE DOMICILE - ATTRIBUTION DE COMPETENCE</strong></h3><p><br></p><p>\t17.1 Pour l'exécution des présentes, les parties font élection de domicile à leur adresse respective à Yaoundé</p><p><br></p><p>\t17.2 A défaut d'accords écrit particuliers amiables terminant tout litige entre les parties en cours d'exécution du présent bail, le président du Tribunal de Première Instance de Yaoundé Ekounou ou tout juge délégué par lui, siègent en chambre de conseil, ou en matière d'urgence est la juridiction contractuelle unique pour trancher tout différend né entre les parties;</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>",check2:!0,modeleContratVide:{idModele:0,idUtilisateur:"",libelleModele:"Modèle Vide",contenu:'<h1><br></h1><h1 class="ql-align-center"><strong>CONTRAT DE BAIL</strong></h1>'},showOverlay2:!1,contrats:[],selectedContrat:0,logements:[],locataires:[],showOverlay:!1,requiredLoyer:!0,requiredAvance:!0,requiredCaution:!0,requiredLoyer:!0,requiredMode:!0,requiredLogement:!0,requiredLocataire:!0,requiredELectricite:!0,requiredEau:!0,requiredPuEau:!0,requiredPuEnergie:!0,requiredIndex:!0,disabled:!1,stateLocataire:null,payoptions:[{text:"Prépayé",value:"prepayer"},{text:"Postpayé",value:"postpayer"}],eauoptions:[{value:"index",text:"Index"},{value:"forfait",text:"Forfait"}]}),watch:{selected_index_logement(e){const t=this.logements[e];this.occupation.idLogement=t.idLogement,this.indexEnergie=t.lastIndexEnergie?t.lastIndexEnergie.nouveau:0,this.indexEau=t.lastIndexEau?t.lastIndexEau.nouveau:0},selected_index_locataire(e){this.occupation.idLocataire=this.locataires[e].idLocataire},loyer(e){this.occupation.loyer=e}},computed:{logementSelected(){return this.logements.find(e=>e.idLogement==this.occupation.idLogement)},loyer:{get(){const e=this.logementSelected;return e?(e.prixMin+e.prixMax)/2:0},set(e){this.occupation.loyer=e}},indexEnergie:{get(){const e=this.logementSelected;return e&&e.lastIndexEnergie?e.lastIndexEnergie.nouveau:0},set(e){this.occupation.indexEnergie=e}},indexEau:{get(){const e=this.logementSelected;return e&&e.lastIndexEau?e.lastIndexEau.nouveau:0},set(e){this.occupation.indexEau=e}},...Object(I["b"])(["user"])},methods:{createLogement(){this.$emit("createLogementSecond")},createLocataire(){this.$emit("createLocataire")},empty(e){return T.empty(e)},contratSelect(e,t){this.selectedContrat=t,console.log(e),this.showOverlay2=!0,setTimeout(()=>{this.content=this.fillData(e.contenu),this.showOverlay2=!1},2e3)},setSlide_logement(e){for(let t=0;t<this.logements.length;t++){const r=this.logements[t];if(r.idLogement==e){this.$refs.logementCarousel.setSlide(t),this.indexEnergie=r.lastIndexEnergie?r.lastIndexEnergie.nouveau:0,this.indexEau=r.lastIndexEau?r.lastIndexEau.nouveau:0;break}}},setSlide_locataire(e){for(let t=0;t<this.locataires.length;t++)if(this.locataires[t].idLocataire==e){console.log(this.locataires[t]),this.locataireSelect=this.locataires[t],this.$refs.locataireCarousel.setSlide(t);break}},resetModal(){this.occupation={loyer:"",mode:"",energie:"index",eau:"index",puEnergie:"",puEau:"",idLogement:"",debut:"",indexEnergie:0,indexEau:0,dureeBail:"",caution:0,endLastBail:!1},2!=this.provenance&&(this.occupation.idLocataire="",this.occupation.idLogement="")},setLoading:function(e){this.loadingWizard=e},validateFirst:function(){return new Promise((e,t)=>{this.occupation.idLogement&&this.occupation.idLocataire?this.check0=!0:(this.occupation.idLogement?this.requiredLogement=!0:this.requiredLogement=!1,this.occupation.idLocataire?this.requiredLocataire=!0:this.requiredLocataire=!1,this.check0=!1),setTimeout(()=>{e(this.check0)},1e3)})},validateSecond:function(){return new Promise((e,t)=>{this.occupation.loyer&&this.occupation.avance&&this.occupation.mode&&this.occupation.caution?(this.check2=!0,this.alreadyset=!0):(this.occupation.loyer?this.requiredLoyer=!0:this.requiredLoyer=!1,this.occupation.avance?this.requiredAvance=!0:this.requiredAvance=!1,this.occupation.mode?this.requiredMode=!0:this.requiredMode=!1,this.occupation.caution?this.requireCaution=!0:this.requireCaution=!1,this.occupation.puEnergie?this.requiredPuEnergie=!0:this.requiredPuEnergie=!1,this.occupation.puEau?this.requiredPuEau=!0:this.requiredPuEau=!1,this.check2=!1),this.content=this.fillData(this.content),console.log("entrée ici"),setTimeout(()=>{e(this.check2)},1e3)})},fillData(e){console.log("debug1");let t=this.logements.find(e=>e.idLogement===this.occupation.idLogement),r=this.locataires.find(e=>e.idLocataire===this.occupation.idLocataire);console.log("logementSelect",t.caracteristiques);let i="";for(let u=0;u<t.caracteristiques.length;u++){let e;e=""==t.caracteristiques[u].valeur||null==t.caracteristiques[u].valeur?1:t.caracteristiques[u].valeur,i=i+e+t.caracteristiques[u].libelleCaracteristique+" ,"}console.log("debug2");let a=e,n=a.replace("{{  NOM_BAILLEUR }}",this.user.profil.titre+". "+this.user.nom+" "+this.user.prenom||"..............").replace("{{  CNI_BAILLEUR }}",this.user.profil.cni||"..............").replace("{{  TEL_BAILLEUR }}",this.user.tel||"..............").replace("{{ LOGEMENT_ADRESSE_PAYS}}",t.adresse.pays||"..............").replace("{{ LOCATAIRE_NOMS_PRENOMS }}",r.titre+" "+r.nomLocataire+" "+r.prenomLocataire).replace("{{ LOCATAIRE_DATE_NAISSANCE  }}",r.dateNaiss||".............").replace("{{ LOCATAIRE_CNI }}",r.cniLocataire||".............").replace("{{ LOCATAIRE_TEL  }}",r.tel||"..............").replace("{{ CONTRAT_DUREE }}",this.occupation.dureeBail||".............").replace("{{ PRIX_LOYER }}",this.occupation.loyer||".............").replace("{{ MONTANT_CAUTION }}",this.occupation.caution||".............").replace("{{ AVANCE }}",this.occupation.avance*this.occupation.loyer||".............").replace("{{ CARACTERISTIQUES_LOGEMENT }}",i).replace("{{ NBRE_MOIS }}",this.occupation.avance||".............").replace("{{ LOGEMENT_ADRESSE_QUARTIER }}",t.adresse.quartier||".............").replace("{{ LOGEMENT_ADRESSE_VILLE }}",t.adresse.ville||".............").replace("{{ LOGEMENT_ADRESSE_VILLE }}",t.adresse.ville||".............").replace("{{ LOGEMENT_ADRESSE_QUARTIER }}",t.adresse.quartier||".............").replace("{{ REF_LOGEMENT }}",t.refLogement||".............");console.log("debug3");let o=document.querySelector(".forfait_eau"),s=document.querySelector(".index_eau"),l=document.querySelector(".forfait_electricite"),c=document.querySelector(".index_electricite");return console.log("debug4"),console.log("p1",o),console.log("p2",s),console.log("p3",l),console.log("p4",c),"index"==this.occupation.eau&&null!=o&&void 0!=o&&(console.log("entreé 2"),n=n.replace(o.innerHTML,"").replace("{{ PU_EAU }}",this.occupation.puEau||".............").replace("{{ INDEX_EAU }}",this.occupation.indexEau||".............")),"forfait"==this.occupation.eau&&null!=s&&void 0!=s&&(n=n.replace(s.innerHTML,"").replace("{{ FORFAIT_EAU }}",this.occupation.puEau||"............."),console.log("contenu p2",s.innerHTML||".............")),"index"==this.occupation.energie&&null!=l&&void 0!=l&&(n=n.replace(l.innerHTML,"").replace("{{ PU_ELECTRICITE }}",this.occupation.puEnergie||".............").replace("{{ INDEX_ELECTRICITE }}",this.occupation.indexEnergie||"............."),console.log("contenu p3",l.innerHTML)),"forfait"==this.occupation.energie&&null!=c&&void 0!=c&&(n=n.replace(c.innerHTML,"").replace("{{ FORFAIT_ELECTRICITE }}",this.occupation.puEnergie||"............."),console.log("contenu p4",c.innerHTML)),console.log("debug5"),n},onComplete(){this.occupation.contrat=this.content,console.log(this.occupation),"add"==this.action&&(this.showOverlay=!0,axios.post("occupations",this.occupation).then(e=>(this.$emit("occupationAdded"),this.resetModal(),console.log(e),this.showOverlay=!1,App.notifySuccess(e.message))).catch(e=>(this.showOverlay=!1,App.alertError(e.message))))},async getInitialiseData(){this.showOverlay=!0;try{if(this.logements=await axios.get("logements").then(e=>e.result.sort((e,t)=>e.refLogement>t.refLogement?1:t.refLogement>e.refLogement?-1:0)||[]),this.logements[0]){const e=this.logements[0];this.occupation.idLogement=e.idLogement,e.lastIndexEnergie&&(this.indexEnergie=e.lastIndexEnergie.nouveau),e.lastIndexEau&&(this.indexEau=e.lastIndexEau.nouveau),this.loyer=(e.prixMin+e.prixMax)/2}}catch(e){L["a"].error(e.message)}if(2!=this.provenance)try{this.locataires=await axios.get("locataires").then(e=>e.result.sort((e,t)=>e.nomLocataire>t.nomLocataire?1:t.nomLocataire>e.nomLocataire?-1:0)||[]),this.locataires[0]&&(this.occupation.idLocataire=this.locataires[0].idLocataire)}catch(e){L["a"].error(e.message)}this.contrats=await axios.get("modeles-contrats").then(e=>e.result||[]),this.contrats.push(this.modeleContratVide),this.contrats.length>0&&(this.content=this.contrats[0].contenu),this.showOverlay=!1},enableEditMode(){richTextField.document.designMode="On"},execCmd(e){richTextField.document.execCommand(e,!1,null)},toggleSource(){this.showingCodeSource?(richTextField.document.getElementsByTagName("body")[0].innerHTML=richTextField.document.getElementsByTagName("body")[0].textContent,this.showingCodeSource=!1):(console.log(richTextField.document.getElementsByTagName("body")[0].textContent),richTextField.document.getElementsByTagName("body")[0].textContent=richTextField.document.getElementsByTagName("body")[0].innerHTML,this.showingCodeSource=!0)},resetModal(){this.occupation={loyer:null,mode:null,energie:"index",eau:"index",puEnergie:null,puEau:null,idLogement:null,idLocataire:null,debut:null,indexEnergie:0,indexEau:0,endLastBail:!1,avance:1,contrats:null,dureeBail:0,caution:1},this.editOccupation,this.action="add",this.$emit("closeOccupationModal")}},async mounted(){await this.getInitialiseData(),null!=this.locataire&&(this.provenance=2,this.disabled=!0,this.stateLocataire=this.locataire,this.occupation.idLocataire=this.locataire.idLocataire),this.editOccupation&&(console.log("provenance = édition"),this.$refs["occupationForm"].activateAll())}},C=A,S=(r("9b5c"),Object(p["a"])(C,i,a,!1,null,"cf08efc4",null));t["a"]=S.exports},"9b5c":function(e,t,r){"use strict";r("a8fb")},a8fb:function(e,t,r){}}]);
//# sourceMappingURL=chunk-e91fe2da.eed5c3dc.js.map