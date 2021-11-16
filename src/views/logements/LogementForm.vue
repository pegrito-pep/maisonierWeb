<template>
    <b-overlay :show="showOverlay" rounded="sm">
        <form-wizard ref="logementForm"  title='' subtitle='' nextButtonText='suivant' backButtonText='Précedent' finishButtonText='Enregistrer' aria-labelledby="demoModalLabel"  @on-complete="onComplete"
                        @on-loading="setLoading"
                        @on-validate="handleValidation"
                        shape="circle"
                        color="#e74c3c">

            <tab-content title="Informations sur le logement"
                        icon="ik ik-home" 
                        :before-change="validateAsync">

                    <div>
                        <b-form-group
                        
                        id="fieldset-horizontal"
                        label-cols-sm="4"
                        label-cols-lg="3"
                        content-cols-sm
                        content-cols-lg="9"
                        :description="reference"
                        label="Reférence du logement"
                        label-for="input-horizontal"
                        >
                        <b-form-input :class="!requiredRef ? 'is-red' : ''" id="input-horizontal" v-model="logement.ref"></b-form-input>
                        <span v-if="!requiredRef" style="color:red;">Ce champ est obligatoire</span>
                        </b-form-group>
                    </div>
                <!--</b-row>-->
                <b-row>
                    <b-col> 
                        <div class="form-group">
                            <label>Type de logement</label>
                            <v-select label="libelleType" :options="typesLogement" v-model="type" :class="!requiredSousType ? 'is-red' : ''" @input="changeType"></v-select>
                        </div>
                    </b-col>
                    <b-col> 
                        <div class="form-group">
                            <label>Catégorie associée </label>
                            <v-select label="libelleSousType" :options="sousTypes" v-model="sousType" :class="!requiredSousType ? 'is-red' : ''"></v-select>
                            <span v-if="!requiredSousType" style="color:red;">Ce champ est obligatoire</span>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col> 
                        <div class="form-group">
                            <b-form-textarea
                            id="textarea"
                            v-model="logement.description"
                            placeholder="Ajouter une description à votre logement"
                            size="sm"
                            rows="6"
                            ></b-form-textarea>
                        </div>
                    </b-col>
                     <b-col> 
                        <b-row>
                            <label for="exampleInputUsername1">Prix Minimal</label>
                            <input type="number" step="1000" min="1000" class="form-control" id="prixMin" required placeholder="Prix Minimal Ex:18500" v-model="logement.prixMin">
                            <span v-if="!requiredPrixMin" style="color:red;">Le prix minimal est obligatoire</span>
                        </b-row>
                        <b-row class="pt-2">
                            <label for="exampleInputUsername1">Prix Maximal</label>
                            <input type="number" step="1000" min="1000" class="form-control" id="prixMax" required placeholder="Prix Maximal Ex:21000" v-model="logement.prixMax">
                            <span v-if="!requiredPrixMax" style="color:red;">Le prix maximal est obligatoire</span>
                        </b-row>
                    </b-col>
                </b-row>
                <b-form-checkbox :disabled="batiment != null" v-model="showSelectBatiment" switch class="mb-2">
                    <!--<span class="fa-lg">Votre logement est-il associé à un batiment ?</span>-->
                    <span class="fa-lg" v-if="!showSelectBatiment">Votre logement est-il associé à un batiment ?</span>
                    <span class="fa-lg" v-if="showSelectBatiment">Bien vouloir choisir le batiment concerné</span>
                </b-form-checkbox>
                <transition enter-active-class="animated zoomIn">
                    <b-row v-if="showSelectBatiment">
                        <b-col class="col-6">
                            <v-select :disabled="batiment != null" :options="tousLesBatiments" v-model="idBatiment" :reduce="batiment => batiment.idBatiment" label="nomBatiment" @input="selectAdresseBatiment">
                                <template #option="{ nomBatiment, refBatiment, cite }">
                                    {{ nomBatiment }}
                                    <br />
                                    <span class="text-muted">Reference: {{ refBatiment }}</span><br />
                                    <small class="text-muted" v-if="cite != null">Cité: {{ cite.nomCite }}</small>
                                    <hr class="m-0">
                                </template>
                            </v-select>
                        </b-col>
                    </b-row>
                </transition>
            </tab-content>
            <tab-content title="Photos du logement" icon="fas fa-image" :before-change="validateThird">
                <div
                    id="my-strictly-unique-vue-upload-multiple-image"
                    style="display: flex; justify-content: center;"
                >
                    <vue-upload-multiple-image
                    @upload-success="uploadImageSuccess"
                    @before-remove="beforeRemove"
                    @edit-image="editImage"
                    :data-images="images"
                    dragText="cliquer pour choisir des images"
                    browseText="Vous pouvez choisir jusqu'à 5 images"
                    idUpload="myIdUpload"
                    editUpload="myIdEdit"
                    ></vue-upload-multiple-image>
                </div>
            </tab-content>
            <tab-content title="Localisation du logement" icon="fa fa-map-marker" :before-change="validateFour">
                <b-row>
                    <b-col>
                        <b-row>
                            <div class="form-group">
                                <label>Pays </label>
                                 <b-form-select
                                    v-model="logement.pays"
                                    :options="tousLesPays"
                                    class="mb-3"
                                    value-field="name"
                                    text-field="name"
                                    :disabled="idBatiment!=null&&showSelectBatiment==true"
                                ></b-form-select>
                                <span v-if="!requiredPays" style="color:red;">Vous devez selectionner un pays</span>
                            </div>
                        </b-row>
                        <b-row>
                            <b-col>
                                <label>Ville </label>
                                <input type="text" class="form-control" id="ville" required placeholder="Ville Ex:Yaoundé" v-model="logement.ville" :disabled="idBatiment!=null&&showSelectBatiment==true">
                                <span v-if="!requiredVille" style="color:red;">Ville obligatoire</span>
                            </b-col>
                            <b-col>
                                <label>Quartier </label>
                                <input type="text" class="form-control" id="quartier" required placeholder="Quartier Ex:Nsam" v-model="logement.quartier">
                                <span v-if="!requiredQuartier" style="color:red;">Quartier obligatoire</span>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row class="ml-4 mt-2">
                            <label>Latitude </label>
                            <input type="text" class="form-control" id="lat" v-model="mapCoordinates.lat">
                        </b-row>
                        <b-row class="ml-4  mt-4">
                            <label>Longitude </label>
                            <input type="text" class="form-control" id="longitude" v-model="mapCoordinates.lng">
                        </b-row>
                    </b-col>
                </b-row>
                <div>
                    <GmapMap
                        :center="myCoordinates"
                        :zoom="zoom"
                        style="width:100%; height:360px; margin: 32px auto;"
                        ref="mapRef"
                        @dragend="handleDrag"
                    >
                        <GmapMarker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            :clickable="true"
                            :draggable="true"
                            @click="myCoordinates=m.position"
                        />
                    </GmapMap>
                </div>
            </tab-content>
            <tab-content title="Caractéristiques approfondies du logement" icon="fa fa-list">
                <b-row>
                    <b-col> 
                        <label>Nombre de chambre<span v-if="logement.nbchambre >1">(s)</span></label>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-btn variant="outline-info" @click="logement.nbchambre--">-</b-btn>
                            </b-input-group-prepend>
                                <b-form-input type="number" min="0.00" v-model="logement.nbchambre"></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="outline-secondary" @click="logement.nbchambre++">+</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col> 
                        <label>Nombre de cuisine<span v-if="logement.nbcuisine >1">(s)</span></label>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-btn variant="outline-info" @click="logement.nbcuisine--">-</b-btn>
                            </b-input-group-prepend>
                                <b-form-input type="number" min="0.00" v-model="logement.nbcuisine"></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="outline-secondary" @click="logement.nbcuisine++">+</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col> 
                        <label>Nombre de Salon<span v-if="logement.nbsalon >1">(s)</span></label>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-btn variant="outline-info" @click="logement.nbsalon--">-</b-btn>
                            </b-input-group-prepend>
                                <b-form-input type="number" min="0.00" v-model="logement.nbsalon"></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="outline-secondary" @click="logement.nbsalon++">+</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col> 
                        <label>Nombre de douche<span v-if="logement.nbdouche >1">(s)</span></label>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-btn variant="outline-info" @click="logement.nbdouche--">-</b-btn>
                            </b-input-group-prepend>
                                <b-form-input type="number" min="0.00" v-model="logement.nbdouche"></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="outline-secondary" @click="logement.nbdouche++">+</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col> 
                        <label>Nombre de parking<span v-if="logement.nbparking >1">(s)</span></label>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-btn variant="outline-info" @click="logement.nbparking--">-</b-btn>
                            </b-input-group-prepend>
                                <b-form-input type="number" min="0.00" v-model="logement.nbparking"></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="outline-secondary" @click="logement.nbparking++">+</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-card bg-variant="light">
                      <div style="text-align:center">
                          <h6 class="text-capitalize font-weight-bold fs-3 mt-2"> Autre(s) caractéristique(s)</h6>
                        <div :id="repeaterId">
                            <!--<div class="d-flex flex-column justify-content-between" style="height: 95%; overflow-y: auto; overflow-x: hidden">-->
                                <div data-repeater-list="group">
                                    <b-row data-repeater-item class="mb-1 justify-content-center">
                                       
                                        <b-col cols="3"  class="p-0">
                                            <b-form-input list="my-list-id" placeholder=" Ex: Sona" name="libelle" v-model="libelle"></b-form-input>
                                            <datalist id="my-list-id">
                                            <option v-for="(caract,i) in caracteristiques" :key="i">{{ caract }}</option>
                                            </datalist>
                                        </b-col> 
                                        <b-col cols="3" class="p-0 ml-2">
                                            <b-form-input name="valeur" v-model="valeur" placeholder="Quantité Ex: 1" trim></b-form-input>
                                        </b-col> 
                                        <b-col cols="1" class="m-0 p-0 ">
                                            <b-form-group label="">
                                                <b-button data-repeater-delete variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                                            </b-form-group>
                                        </b-col>   
                                    </b-row>   
                                </div>
                            <!--</div>-->
                            <b-button data-repeater-create class="btn btn-success btn-icon mt-2"><i class="ik ik-plus"></i></b-button>
                        </div>
                      </div>
                </b-card>
            </tab-content>
            <div v-if="action == 'edit'&& indexForm!=5">
                <hr>
                <div class="center"><b-button @click.prevent="onComplete" variant="primary">Valider</b-button></div>
            </div>
            <div class="leloader" v-if="loadingWizard"></div>
        </form-wizard>
           <div class="float-right">
                <b-button @click.prevent="resetModal" variant="secondary">Fermer</b-button>
            </div>
    </b-overlay> 
</template>
<script>
import notif from "@/plugins/notif.js";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
const php = require('phpjs')


//const home={lat:3.865974061463822, lng:  }

export default {
    name: 'add-logement',
    props: {
        batiment: {type: Object},
        editLogement: {type: Object},
        action:{type: String}
    },
    data:()=>({
        libelle:'',
        valeur:'',
        loadingWizard: false,
        showOverlay:true,
        reference:"une reference est propre à chaque logement",
        logement:{
            ref:"",
            description:"",
            prixMin:"",
            prixMax:"",
            pays:"Cameroun",
            ville:"",
            quartier:"",
            lat:"",
            lon:"",
            nbchambre:0,
            nbcuisine:0,
            nbsalon:0,
            nbdouche:0,
            nbparking:0,
            nbpiscine:0,
            nbgarage:0,
            nbsona:0
        },
        
         map: null,
        myCoordinates: {
            lat: 0,
            lng: 0
        },
        zoom: 17,
        telUser:null,
        passUser:null,
        avatarSmUser:null,
  
        requiredRef:true,
        requiredPays:true,
        requiredVille:true,
        requiredQuartier:true,
        requiredSousType:true,
        requiredPrixMin:true,
        requiredPrixMax:true,
        check:true,
        check2:true,
        check3:true,
        check4:false,
        check5:false,
        check6:false,
        type: null,
        sousType:null,
        typesLogement:[],
        sousTypesLogements:[],
        sousTypes:[],
        tousLesBatiments:[],
        idBatiment:null,
        images: [],
        photos:[],
        markers:[],
        tousLesPays:{
  "AF": "Afghanistan",
  "ZA": "Afrique du Sud",
  "AL": "Albanie",
  "DZ": "Algérie",
  "DE": "Allemagne",
  "AD": "Andorre",
  "AO": "Angola",
  "AI": "Anguilla",
  "AQ": "Antarctique",
  "AG": "Antigua-et-Barbuda",
  "AN": "Antilles néerlandaises",
  "SA": "Arabie saoudite",
  "AR": "Argentine",
  "AM": "Arménie",
  "AW": "Aruba",
  "AU": "Australie",
  "AT": "Autriche",
  "AZ": "Azerbaïdjan",
  "BS": "Bahamas",
  "BH": "Bahreïn",
  "BD": "Bangladesh",
  "BB": "Barbade",
  "BY": "Bélarus",
  "BE": "Belgique",
  "BZ": "Belize",
  "BJ": "Bénin",
  "BM": "Bermudes",
  "BT": "Bhoutan",
  "BO": "Bolivie",
  "BA": "Bosnie-Herzégovine",
  "BW": "Botswana",
  "BR": "Brésil",
  "BN": "Brunéi Darussalam",
  "BG": "Bulgarie",
  "BF": "Burkina Faso",
  "BI": "Burundi",
  "KH": "Cambodge",
  "CM": "Cameroun",
  "CA": "Canada",
  "CV": "Cap-Vert",
  "EA": "Ceuta et Melilla",
  "CL": "Chili",
  "CN": "Chine",
  "CY": "Chypre",
  "CO": "Colombie",
  "KM": "Comores",
  "CG": "Congo-Brazzaville",
  "KP": "Corée du Nord",
  "KR": "Corée du Sud",
  "CR": "Costa Rica",
  "CI": "Côte d’Ivoire",
  "HR": "Croatie",
  "CU": "Cuba",
  "DK": "Danemark",
  "DG": "Diego Garcia",
  "DJ": "Djibouti",
  "DM": "Dominique",
  "EG": "Égypte",
  "SV": "El Salvador",
  "AE": "Émirats arabes unis",
  "EC": "Équateur",
  "ER": "Érythrée",
  "ES": "Espagne",
  "EE": "Estonie",
  "VA": "État de la Cité du Vatican",
  "FM": "États fédérés de Micronésie",
  "US": "États-Unis",
  "ET": "Éthiopie",
  "FJ": "Fidji",
  "FI": "Finlande",
  "FR": "France",
  "GA": "Gabon",
  "GM": "Gambie",
  "GE": "Géorgie",
  "GS": "Géorgie du Sud et les îles Sandwich du Sud",
  "GH": "Ghana",
  "GI": "Gibraltar",
  "GR": "Grèce",
  "GD": "Grenade",
  "GL": "Groenland",
  "GP": "Guadeloupe",
  "GU": "Guam",
  "GT": "Guatemala",
  "GG": "Guernesey",
  "GN": "Guinée",
  "GQ": "Guinée équatoriale",
  "GW": "Guinée-Bissau",
  "GY": "Guyana",
  "GF": "Guyane française",
  "HT": "Haïti",
  "HN": "Honduras",
  "HU": "Hongrie",
  "BV": "Île Bouvet",
  "CX": "Île Christmas",
  "CP": "Île Clipperton",
  "AC": "Île de l'Ascension",
  "IM": "Île de Man",
  "NF": "Île Norfolk",
  "AX": "Îles Åland",
  "KY": "Îles Caïmans",
  "IC": "Îles Canaries",
  "CC": "Îles Cocos - Keeling",
  "CK": "Îles Cook",
  "FO": "Îles Féroé",
  "HM": "Îles Heard et MacDonald",
  "FK": "Îles Malouines",
  "MP": "Îles Mariannes du Nord",
  "MH": "Îles Marshall",
  "UM": "Îles Mineures Éloignées des États-Unis",
  "SB": "Îles Salomon",
  "TC": "Îles Turks et Caïques",
  "VG": "Îles Vierges britanniques",
  "VI": "Îles Vierges des États-Unis",
  "IN": "Inde",
  "ID": "Indonésie",
  "IQ": "Irak",
  "IR": "Iran",
  "IE": "Irlande",
  "IS": "Islande",
  "IL": "Israël",
  "IT": "Italie",
  "JM": "Jamaïque",
  "JP": "Japon",
  "JE": "Jersey",
  "JO": "Jordanie",
  "KZ": "Kazakhstan",
  "KE": "Kenya",
  "KG": "Kirghizistan",
  "KI": "Kiribati",
  "KW": "Koweït",
  "LA": "Laos",
  "LS": "Lesotho",
  "LV": "Lettonie",
  "LB": "Liban",
  "LR": "Libéria",
  "LY": "Libye",
  "LI": "Liechtenstein",
  "LT": "Lituanie",
  "LU": "Luxembourg",
  "MK": "Macédoine",
  "MG": "Madagascar",
  "MY": "Malaisie",
  "MW": "Malawi",
  "MV": "Maldives",
  "ML": "Mali",
  "MT": "Malte",
  "MA": "Maroc",
  "MQ": "Martinique",
  "MU": "Maurice",
  "MR": "Mauritanie",
  "YT": "Mayotte",
  "MX": "Mexique",
  "MD": "Moldavie",
  "MC": "Monaco",
  "MN": "Mongolie",
  "ME": "Monténégro",
  "MS": "Montserrat",
  "MZ": "Mozambique",
  "MM": "Myanmar",
  "NA": "Namibie",
  "NR": "Nauru",
  "NP": "Népal",
  "NI": "Nicaragua",
  "NE": "Niger",
  "NG": "Nigéria",
  "NU": "Niue",
  "NO": "Norvège",
  "NC": "Nouvelle-Calédonie",
  "NZ": "Nouvelle-Zélande",
  "OM": "Oman",
  "UG": "Ouganda",
  "UZ": "Ouzbékistan",
  "PK": "Pakistan",
  "PW": "Palaos",
  "PA": "Panama",
  "PG": "Papouasie-Nouvelle-Guinée",
  "PY": "Paraguay",
  "NL": "Pays-Bas",
  "PE": "Pérou",
  "PH": "Philippines",
  "PN": "Pitcairn",
  "PL": "Pologne",
  "PF": "Polynésie française",
  "PR": "Porto Rico",
  "PT": "Portugal",
  "QA": "Qatar",
  "HK": "R.A.S. chinoise de Hong Kong",
  "MO": "R.A.S. chinoise de Macao",
  "QO": "régions éloignées de l’Océanie",
  "CF": "République centrafricaine",
  "CD": "République démocratique du Congo",
  "DO": "République dominicaine",
  "CZ": "République tchèque",
  "RE": "Réunion",
  "RO": "Roumanie",
  "GB": "Royaume-Uni",
  "RU": "Russie",
  "RW": "Rwanda",
  "EH": "Sahara occidental",
  "BL": "Saint-Barthélémy",
  "KN": "Saint-Kitts-et-Nevis",
  "SM": "Saint-Marin",
  "MF": "Saint-Martin",
  "PM": "Saint-Pierre-et-Miquelon",
  "VC": "Saint-Vincent-et-les Grenadines",
  "SH": "Sainte-Hélène",
  "LC": "Sainte-Lucie",
  "WS": "Samoa",
  "AS": "Samoa américaines",
  "ST": "Sao Tomé-et-Principe",
  "SN": "Sénégal",
  "RS": "Serbie",
  "CS": "Serbie-et-Monténégro",
  "SC": "Seychelles",
  "SL": "Sierra Leone",
  "SG": "Singapour",
  "SK": "Slovaquie",
  "SI": "Slovénie",
  "SO": "Somalie",
  "SD": "Soudan",
  "LK": "Sri Lanka",
  "SE": "Suède",
  "CH": "Suisse",
  "SR": "Suriname",
  "SJ": "Svalbard et Île Jan Mayen",
  "SZ": "Swaziland",
  "SY": "Syrie",
  "TJ": "Tadjikistan",
  "TW": "Taïwan",
  "TZ": "Tanzanie",
  "TD": "Tchad",
  "TF": "Terres australes françaises",
  "IO": "Territoire britannique de l'océan Indien",
  "PS": "Territoire palestinien",
  "TH": "Thaïlande",
  "TL": "Timor oriental",
  "TG": "Togo",
  "TK": "Tokelau",
  "TO": "Tonga",
  "TT": "Trinité-et-Tobago",
  "TA": "Tristan da Cunha",
  "TN": "Tunisie",
  "TM": "Turkménistan",
  "TR": "Turquie",
  "TV": "Tuvalu",
  "UA": "Ukraine",
  "EU": "Union européenne",
  "UY": "Uruguay",
  "VU": "Vanuatu",
  "VE": "Venezuela",
  "VN": "Viêt Nam",
  "WF": "Wallis-et-Futuna",
  "YE": "Yémen",
  "ZM": "Zambie",
  "ZW": "Zimbabwe"
},
        //tousLesPays:[],
        showSelectBatiment:false,
        //cette propriété est utilisée pour controler la bouton de vaidatation lors de l'edit
        indexForm:0,
        editCaracteristiques:[],
        caracteristiques: ['Jacousi', 'Piscine', 'Sona', 'Buanderie'],
    }),
    components: {
        FormWizard,
        TabContent,
        VueUploadMultipleImage
    },
    computed: {

             mapCoordinates() {
                if(!this.map) {
                    return {
                        lat: 0,
                        lng: 0
                    };
                }

                return {
                   lat: this.map.getCenter().lat().toFixed(14),
                    lng: this.map.getCenter().lng().toFixed(14)
                }
            },
            repeaterId() {
                return `repeat-added-logement-form-${php.empty(this.logement) ? php.uniqid() : this.logement.idLogement}`
            },
    },
    methods:{
        /**methode pour placer un marker */
        drawMarker(){
            this.markers= [
                {
                    position: this.myCoordinates,
                }
            ]
        },
        makeRepeater() {
            setTimeout(() => {
                $(`#${this.repeaterId}`).repeater({ isFirstItemUndeletable: true  })
            }, 500);
        },
        resetModal() {
            this.logement = {
                ref: null, description: null, prixMin: null, prixMax: null,
                pays: null, ville: null, quartier: null, lat: null, lon: null, nbchambre: null,
                nbcuisine: null, nbsalon: null, nbdouche: null, nbparking: null, nbpiscine: null,
                nbgarage: null, nbsona: null
            }
            if(this.editLogement){
                this.editLogement = {
                refLogement: null, descLogement: null, prixMin: null, prixMax: null,
                pays: null, ville: null, quartier: null, lat: null, lon: null, nbchambre: null,
                nbcuisine: null, nbsalon: null, nbdouche: null, nbparking: null, nbpiscine: null,
                nbgarage: null, nbsona: null
            }
            }
            this.idSousType=null;
            this.idBatiment=null;
            this.mapCoordinates = { lat: null, lng: null};
            this.photos=[];
            this.action='add'
            this.$emit('closeLogementModal');
     
            
        },
        setLoading: function(value) {
            this.loadingWizard = value
        },
        handleValidation: function(isValid, tabIndex){
            console.log('Tab: '+tabIndex+ ' valid: '+isValid)
            this.indexForm=this.indexForm+1;
            console.log('indexFom: ',this.indexForm)
        },
        validateAsync:function() {
            return new Promise((resolve, reject) => {
                
                if(!this.logement.ref || !this.sousType || !this.logement.prixMin || !this.logement.prixMax){
                    this.check=false
                    if(!this.logement.ref){
                        this.reference=""
                        this.requiredRef=false;}
                    else{this.requiredRef=true;}
                    if(!this.sousType){this.requiredSousType=false;}
                    else{this.requiredSousType=true;}
                    if(!this.logement.prixMin){this.requiredPrixMin=false;}
                    else {this.requiredPrixMin=true;}
                    if(!this.logement.prixMax){this.requiredPrixMax=false;}
                    else{this.requiredPrixMax=true;}
                }else{
                    this.check=true
                }
            setTimeout(() => {
                resolve(this.check)
            }, 1000)
            })
        },

        validateThird:function() {
            return new Promise((resolve, reject) => {

                    this.check3=true
                
            setTimeout(() => {
                resolve(this.check3)
            }, 1000)
            })
        },
        validateFour:function(){
            return new Promise((resolve, reject) => {
                    if(!this.logement.pays || !this.logement.ville || !this.logement.quartier){
                    this.check4=false
                    if(!this.logement.pays){this.requiredPays=false;}
                    else {this.requiredPays=true;}
                    if(!this.logement.ville){this.requiredVille=false;}
                    else{this.requiredVille=true;}
                    if(!this.logement.quartier){this.requiredQuartier=false;}
                    else{this.requiredQuartier=true;}
                }else{
                    this.check4=true
                }
                setTimeout(() => {
                    resolve(this.check4)
                }, 1000)
            })

        },
        validateFive:function(){
            return new Promise((resolve, reject) => {
                this.check3=true
                setTimeout(() => {resolve(this.check3)}, 1000)
            })

        },
        onComplete(){
            this.showOverlay=true;
            let add={pays:this.logement.pays, ville:this.logement.ville, quartier:this.logement.quartier, lat:this.mapCoordinates.lat,lon:this.mapCoordinates.lng}
            //envoi formulaire création logement 
            let data={
                ref:this.logement.ref,
                description:this.logement.description,
                prixMin:this.logement.prixMin,
                prixMax:this.logement.prixMax,
                idSousType:this.sousType.idSousType,
                idBatiment:this.idBatiment,
                adresse:add,
                photos: this.photos,
                caracteristiques: [
                    {
                        libelle: "chambre",
                        valeur: this.logement.nbchambre
                    },
                    {
                        libelle: "salon",
                        valeur: this.logement.nbsalon
                    },
                    {
                        libelle: "cuisine",
                        valeur: this.logement.nbcuisine
                    },
                    {
                        libelle: "douche",
                        valeur: this.logement.nbdouche
                    },
                    {
                        libelle: "parking",
                        valeur: this.logement.nbparking
                    }
                ]

            }
            let caracteristiquesSupplementaires = $(`#${this.repeaterId}`).repeaterVal().group
            if(caracteristiquesSupplementaires!=null&&caracteristiquesSupplementaires.length>0){
                 for(let i=0; i<caracteristiquesSupplementaires.length; i++){
                    data.caracteristiques.push(caracteristiquesSupplementaires[i])
                }
                console.log('caracteristiquesSupplementaires',caracteristiquesSupplementaires)
            }
           

            if(this.action=='add'){
                axios.post("logements",data).then(response =>{
                    this.resetModal()
                    this.showOverlay=false;
                    storage.set('logements',null);
                    this.$emit("logementAdded");
                    return App.notifySuccess(response.message)
                })
                .catch(error => {
                    this.showOverlay=false;
                    notif.error(error.message);
                });
            }
            if(this.action=='edit'){
                for(let i=0; i<this.editCaracteristiques.length; i++){
                    data.caracteristiques.push(this.editCaracteristiques[i])
                }
                console.log('caractéristiques à envoyer',data.caracteristiques)
                axios.put(`logements/${ this.editLogement.idLogement}`,data).then(response =>{
                    if (!response.success) {
                        this.showOverlay=false;
                        return App.alertError(response.message)
                    }
                    this.resetModal()
                    this.showOverlay=false;
                    this.editLogement=null;
                    storage.set('logements',null);
                    this.$emit("editSuccessfull", response.result);
                    return App.notifySuccess(response.message)
                     
                })
                .catch(error => {
                    this.showOverlay=false;
                    notif.error(error.message);
                });
            }
            
        },
        
        async getLogementsData(){
            try {
                 this.typesLogement = await axios.get("types-logements?all=true").then(response => response.result);
            } catch (error) {
                notif.error(error.message);
            }
            try {
                 this.sousTypesLogements = await axios.get("soustypes-logements").then(response => response.result);
            } catch (error) {
                notif.error(error.message);
            }
            this.showOverlay=false;
        },
        uploadImageSuccess(formData, index, fileList) {
            this.photos=[];
           console.log("taille Totale", fileList.length-1,"formaData",formData);
            for (let i = 0; i < fileList.length; i++) {
                //console.log("essai",fileList[i].path)
                this.photos.push(fileList[i].path);
            }
             console.log("photosTaille", this.photos.length);
        },
        beforeRemove(index, done, fileList) {
            console.log("index", index, fileList);
            var r = confirm("voulez vous supprimer cette image");
            if (r == true) {
                done();
            } else {
                console.log("erreur");
            }
        },
        editImage(formData, index, fileList) {
            console.log("edit data", fileList);
        },
        //liste de tous les pays
        /*async getAllCountries(){
            let url = 'https://restcountries.eu/rest/v2/all';
            try {
               this.tousLesPays = await fetch(url).then(res =>res.json());
            } catch (error) {
                console.log(error);
            }
        },*/
        //chargement des catégories en focntion du type de logement sélectionné
        changeType(a) {
            this.sousType=[];
            let data = [];
            for (let i = 0; i < this.sousTypesLogements.length; i++) {
                data.push(this.sousTypesLogements[i]);
            }
            let result = data.filter(x => x.idType == this.type.idType);
            this.sousTypes = result;
            console.log("sous-type",this.sousTypes)
        },
        handleDrag() {
                // get center and zoom level, store in localstorage
                let center = {
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                };
                let zoom = this.map.getZoom();

                // storage.set('center', center)
                // storage.set('zoom', zoom)
                localStorage.center = JSON.stringify(center);
                localStorage.zoom = zoom;
        },
        //recupération de tous les batiments
        async getAllBatiments() {
            this.tousLesBatiments = await axios.get('batiments').then(response => response.result || [])
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        /**
         * Permet de preremplir automatiquement les coordonnées du logement a partir du batiment selectionné
         */
        selectAdresseBatiment(idBatiment) {
            const batiment = this.tousLesBatiments.find(elt => elt.idBatiment == idBatiment)
            if (batiment) {
                if (!php.empty(batiment.adresse)) {
                    this.logement.pays = batiment.adresse.pays || ''            
                    this.logement.ville = batiment.adresse.ville || ''            
                    this.logement.quartier = batiment.adresse.quartier || ''            
                    this.logement.lon = batiment.adresse.lon || ''            
                    this.logement.lat = batiment.adresse.lat || '' 
                }
            }
        }

    },
    created() {
            // does the user have a saved center? use it instead of the default
            if(localStorage.center) {
                this.myCoordinates = JSON.parse(localStorage.center);
            } else {
                // get user's coordinates from browser request
                this.$getLocation({})
                    .then(coordinates => {
                        this.myCoordinates = coordinates;
                    })
                    .catch(error => alert(error));
            }

            // does the user have a saved zoom? use it instead of the default
            if(localStorage.zoom) {
                this.zoom = parseInt(localStorage.zoom);
            }
    },

    async mounted(){
        if (!php.empty(this.logement)) {
            this.makeRepeater()
            //this.idLogement = this.logement.idLogement
        }
        const interval = setInterval(() => {
            if (this.$refs.mapRef) {
                this.$refs.mapRef.$mapPromise.then(map => this.map = map);
                clearInterval(interval)
            }
        }, 50)
       await this.getAllBatiments();
       await this.getLogementsData();

       if (this.batiment) {
           this.showSelectBatiment = true
           this.idBatiment = this.batiment.idBatiment
       }
       if(this.editLogement){
           console.log("provenance = édition")
           this.logement.ref= this.editLogement.refLogement;  this.logement.description= this.editLogement.descLogement; 
           this.logement.prixMin= this.editLogement.prixMin;  this.logement.prixMax= this.editLogement.prixMax; 
           this.logement.pays= this.editLogement.adresse.pays;  this.logement.ville= this.editLogement.adresse.ville; 
           this.logement.quartier= this.editLogement.adresse.quartier;  this.logement.lat= this.editLogement.adresse.lat; 
           this.logement.lon= this.editLogement.adresse.lon;  this.photos=this.editLogement.photos; 
            //this.typesLogement.push(this.editLogement.sousTypeLogement.typeLogement); 
            this.type = this.editLogement.sousTypeLogement.typeLogement;
            //this.sousTypes.push(this.editLogement.sousTypeLogement); 
            this.sousType=this.editLogement.sousTypeLogement
           this.logement.nbchambre= this.editLogement.adresse.lat; 
           if(this.editLogement.batiment!= null){
               this.showSelectBatiment=true
               this.idBatiment=this.editLogement.batiment.idBatiment
           }
           
           for(let i=0; i<=this.editLogement.caracteristiques.length; i++){
               if(this.editLogement.caracteristiques[i]!=null && this.editLogement.caracteristiques[i].libelleCaracteristique =='chambre'){
                   this.logement.nbchambre=this.editLogement.caracteristiques[i].valeur
               }
               if(this.editLogement.caracteristiques[i]!=null && this.editLogement.caracteristiques[i].libelleCaracteristique =='salon'){
                   this.logement.nbsalon=this.editLogement.caracteristiques[i].valeur
               }
               if(this.editLogement.caracteristiques[i]!=null && this.editLogement.caracteristiques[i].libelleCaracteristique =='cuisine'){
                   this.logement.nbcuisine=this.editLogement.caracteristiques[i].valeur
               }
               if(this.editLogement.caracteristiques[i]!=null && this.editLogement.caracteristiques[i].libelleCaracteristique =='douche'){
                   this.logement.nbdouche=this.editLogement.caracteristiques[i].valeur
               } 
               if(this.editLogement.caracteristiques[i]!=null && this.editLogement.caracteristiques[i].libelleCaracteristique !='douche'&&
               this.editLogement.caracteristiques[i].libelleCaracteristique !='cuisine'&&this.editLogement.caracteristiques[i].libelleCaracteristique !='salon'
               &&this.editLogement.caracteristiques[i].libelleCaracteristique !='chambre'){
                   let caracActuelles={
                       libelle: this.editLogement.caracteristiques[i].libelleCaracteristique,
                       valeur: this.editLogement.caracteristiques[i].valeur
                   }
                   this.editCaracteristiques.push(caracActuelles)
               }
            }
            console.log('caracActuelles',this.editCaracteristiques)
          /* if(this.editLogement.photos.length>0){
               let inter
               for (let i=0; i<=this.editLogement.photos.length;i++){
                   inter=await this.getBase64(this.editLogement.photos[i].image)
                   this.photos.push(inter)
               }
           }*/
           this.$refs['logementForm'].activateAll();
       }
       //difénition automatique du marker en fonction de la position de l'utilisateur
       this.drawMarker();
    }
}
</script>
<style scoped>
.is-red{
    border-color:red;
}
    .leloader,
.leloader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.leloader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #e74c3c;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.centered-element{
    margin-left:27%
}
</style>