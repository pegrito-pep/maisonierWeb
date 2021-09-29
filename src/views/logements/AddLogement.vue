<template>
<b-modal id="modal-lg" size="lg" title="Formulaire d'ajout d'un logement" ref="logement-modal" :ok-disabled="true" no-close-on-backdrop hide-header-close>
    <div>
        <b-overlay :show="showOverlay" rounded="sm">
            <form-wizard  title='' subtitle='' nextButtonText='suivant' backButtonText='Précedent' finishButtonText='Enregistrer' aria-labelledby="demoModalLabel"  @on-complete="onComplete"
                            @on-loading="setLoading"
                            @on-validate="handleValidation"
                            shape="circle"
                            color="#e74c3c">

                <tab-content title="Informations sur le logement"
                            icon="ik ik-home" 
                            :before-change="validateAsync">
                    <!--<b-row>-->
                        <!--<b-col> 
                            <div class="form-group">
                                <label for="exampleInputUsername1">Reférence </label>
                                <input type="text" class="form-control" id="reference" required placeholder="reférence du logement" v-model="logement.ref">
                                <span v-if="!requiredRef" style="color:red;">Reference obligatoire</span>
                            </div>
                        </b-col>
                        <b-col> 
                            
                        </b-col>-->
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
                                <label>Type de logement </label>
                                <b-form-select
                                    v-model="idType"
                                    :options="typesLogement"
                                    class="mb-3"
                                    value-field="idType"
                                    v-on:change="changeType(`${idType}`)"
                                    text-field="libelleType"
                                    disabled-field="notEnabled"
                                ></b-form-select>
                            </div>
                        </b-col>
                        <b-col> 
                            <div class="form-group">
                                <label>Catégorie associée </label>
                                <b-form-select
                                    v-model="idSousType"
                                    :options="sousTypes || []"
                                    class="mb-3"
                                    :class="!requiredSousType ? 'is-red' : ''"
                                    value-field="idSousType"
                                    text-field="libelleSousType"
                                ></b-form-select>
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
                                ></b-form-textarea>
                            </div>
                        </b-col>
                    </b-row>
                        <toggle-button v-model="showSelectBatiment"/>
                            <span class="ml-2" style="font-size: 1.5em;">Votre logement est-il associé à un batiment ?</span>
                            <transition enter-active-class="animated zoomIn">
                                        <div class="form-group" v-if="showSelectBatiment">
                                            <label>Batiment associé</label>
                                            <b-form-select
                                                v-model="idBatiment"
                                                :options="tousLesBatiments"
                                                class="mb-3"
                                                value-field="idBatiment"
                                                text-field="nomBatiment"
                                                disabled-field="notEnabled"
                                            ></b-form-select>
                                        </div>
                            </transition>
                </tab-content>
                <tab-content title="Informations sur le coût"
                            icon="fas fa-money-check-alt"
                            :before-change="validateSecond">
                    <div class="form-group">
                        <label for="exampleInputUsername1">Prix Minimal</label>
                        <input type="number" step="1000" min="1000" class="form-control" id="prixMin" required placeholder="Prix Minimal Ex:18500" v-model="logement.prixMin">
                            <span v-if="!requiredPrixMin" style="color:red;">Le prix minimal est obligatoire</span>
                        </div>
                    <div class="form-group">
                        <label for="exampleInputUsername1">Prix Maximal</label>
                        <input type="number" step="1000" min="1000" class="form-control" id="prixMax" required placeholder="Prix Maximal Ex:21000" v-model="logement.prixMax">
                        <span v-if="!requiredPrixMax" style="color:red;">Le prix maximal est obligatoire</span>
                        </div>
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
                    <div class="form-group">
                        <label>Pays </label>
                        <b-form-select
                            v-model="logement.pays"
                            :options="tousLesPays"
                            class="mb-3"
                            value-field="name"
                            text-field="name"
                        ></b-form-select>
                        <span v-if="!requiredPays" style="color:red;">Vous devez selectionner un pays</span>
                    </div>
                    <div class="form-group">
                        <label>Ville </label>
                        <input type="text" class="form-control" id="ville" required placeholder="Ville Ex:Yaoundé" v-model="logement.ville">
                        <span v-if="!requiredVille" style="color:red;">Ville obligatoire</span>
                    </div>
                    <div class="form-group">
                        <label>Quartier </label>
                        <input type="text" class="form-control" id="quartier" required placeholder="Quartier Ex:Nsam" v-model="logement.quartier">
                        <span v-if="!requiredQuartier" style="color:red;">Quartier obligatoire</span>
                    </div>
                </tab-content>
                <tab-content title="Coordonnées du logement" icon="ik ik-map-pin" :before-change="validateFive">
                    
                    <b-row>
                        <b-col> 
                            <div class="form-group">
                                <label>Latitude </label>
                                <input type="text" class="form-control" id="lat" v-model="mapCoordinates.lat">
                            </div>
                        </b-col>
                        <b-col> 
                            <div class="form-group">
                                <label>Longitude </label>
                                <input type="text" class="form-control" id="longitude" v-model="mapCoordinates.lng">
                            </div>
                        </b-col>
                    </b-row>
                    <div>
                        <h1>Coordonnées de ma position:</h1>
                        <p>{{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude</p>
                    </div>
                    <div>
                        <GmapMap
                            :center="myCoordinates"
                            :zoom="zoom"
                            style="width:640px; height:360px; margin: 32px auto;"
                            ref="mapRef"
                            @dragend="handleDrag"
                        ></GmapMap>
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
                </b-row>
                <b-row>
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
                    <b-col> 
                        <label>Nombre de Piscine<span v-if="logement.nbpiscine >1">(s)</span></label>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-btn variant="outline-info" @click="logement.nbpiscine--">-</b-btn>
                            </b-input-group-prepend>
                                <b-form-input type="number" min="0.00" v-model="logement.nbpiscine"></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="outline-secondary" @click="logement.nbpiscine++">+</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col> 
                        <label>Nombre de Garage<span v-if="logement.nbgarage >1">(s)</span></label>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-btn variant="outline-info" @click="logement.nbgarage--">-</b-btn>
                            </b-input-group-prepend>
                                <b-form-input type="number" min="0.00" v-model="logement.nbgarage"></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="outline-secondary" @click="logement.nbgarage++">+</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col> 
                        <label>Nombre de Sona<span v-if="logement.nbsona >1">(s)</span></label>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-btn variant="outline-info" @click="logement.nbsona--">-</b-btn>
                            </b-input-group-prepend>
                                <b-form-input type="number" min="0.00" v-model="logement.nbsona"></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="outline-secondary" @click="logement.nbsona++">+</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
                </tab-content>
                <div class="leloader" v-if="loadingWizard"></div>
            </form-wizard>
        </b-overlay>
    </div>
    <template #modal-footer>
            <b-button size="sm" @click="resetModal">
                Fermer
            </b-button>
    </template>
</b-modal>
     
</template>
<script>
import notif from "@/plugins/notif.js";
import { ToggleButton } from 'vue-js-toggle-button'
 import Vue from 'vue'
Vue.component('ToggleButton', ToggleButton)
import VueUploadMultipleImage from "vue-upload-multiple-image";
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
export default {
    name: 'add-logement',
    data:()=>({
        loadingWizard: false,
        showOverlay:true,
        reference:"une reference est propre à chaque logement",
        logement:{
            ref:"",
            description:"",
            prixMin:"",
            prixMax:"",
            pays:"",
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
        zoom: 14,
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
        idType: null,
        idSousType:null,
        typesLogement:[],
        sousTypesLogements:[],
        sousTypes:[],
        tousLesBatiments:[],
        idBatiment:null,
        images: [],
        photos:[],
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
        showSelectBatiment:false
    }),
    components: {
        FormWizard,
        TabContent,
        VueUploadMultipleImage,
        //ToggleButton
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
                   lat: this.map.getCenter().lat().toFixed(4),
                    lng: this.map.getCenter().lng().toFixed(4)
                }
                console.log("lat",mapCoordinates.lat,"lng",mapCoordinates )
            }
    },
    methods:{
            resetModal() {
                this.logement = {
                    ref: '', description: '', prixMin: '', prixMax: '',
                    pays: '', ville: '', quartier: '', lat: '', lon: '', nbchambre: '',
                    nbcuisine: '', nbsalon: '', nbdouche: '', nbparking: '', nbpiscine: '',
                    nbgarage: '', nbsona: ''
            
                }
                this.$refs['logement-modal'].hide();
                setTimeout(() => {
                    this.$emit('closeLogementModal');
                }, 500);
                
            },
            setLoading: function(value) {
                this.loadingWizard = value
            },
            handleValidation: function(isValid, tabIndex){
                console.log('Tab: '+tabIndex+ ' valid: '+isValid)
            },
            validateAsync:function() {
                return new Promise((resolve, reject) => {
                    
                   if(!this.logement.ref || !this.idSousType){
                        this.check=false
                        if(!this.logement.ref){
                            this.reference=""
                            this.requiredRef=false;}
                        else{this.requiredRef=true;}
                        if(!this.idSousType){this.requiredSousType=false;}
                        else{this.requiredSousType=true;}
                    }else{
                        this.check=true
                    }
                setTimeout(() => {
                    resolve(this.check)
                }, 1000)
                })
            },
             validateSecond:function() {
                return new Promise((resolve, reject) => {
                    
                   if(!this.logement.prixMin || !this.logement.prixMax){
                        this.check2=false
                        if(!this.logement.prixMin){this.requiredPrixMin=false;}
                        else {this.requiredPrixMin=true;}
                        if(!this.logement.prixMax){this.requiredPrixMax=false;}
                        else{this.requiredPrixMax=true;}
                    }else{
                        this.check2=true
                    }
                setTimeout(() => {
                    resolve(this.check2)
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
                    idSousType:this.idSousType,
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
                    },
                    {
                        libelle: "piscine",
                        valeur: this.logement.nbpiscine
                    },
                    {
                        libelle: "sona",
                        valeur: this.logement.nbsona
                    },
                    {
                        libelle: "garage",
                        valeur: this.logement.nbgarage
                    }
                    ]

                }
                console.log("données envoyées",data)
                axios.post("logements",data).then(response =>{
                   this.logement.ref=null;this.logement.description=null;
                    this.logement.prixMin=null;this.logement.prixMax=null;this.idSousType=null;this.idBatiment=null;
                    this.logement.pays=null;this.logement.ville=null;this.logement.quartier=null;this.mapCoordinates.lat=null;
                    this.photos=[];
                    this.mapCoordinates.lng=null;
                    this.logement.nbchambre=null;this.logement.nbsalon=null;this.logement.nbcuisine=null;this.logement.nbdouche=null;
                    this.logement.nbparking=null;this.logement.nbpiscine=null;this.logement.nbsona=null;this.logement.nbgarage=null;
                    //this.$root.$emit("new-logement-added", response.result);
                    this.$root.$emit("new-logement-added");
                })
                .catch(error => {notif.error(error.message);});
                   setTimeout(() => {
                        this.$refs['logement-modal'].hide()
                        this.showOverlay=false;
                    }, 1000);
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
        //recuperation de la liste des types de Logements
        async getTypesLogements(){
            this.typesLogement = await axios.get("types-logements?all=true").then(response => response.result);
        },
        //liste de tous les sosu-types de logements
        async getSousTypesLogement(){
            this.sousTypesLogements = await axios.get("soustypes-logements").then(response => response.result);
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
        async getAllCountries(){
            let url = 'https://restcountries.eu/rest/v2/all';
            try {
               this.tousLesPays = await fetch(url).then(res =>res.json());
            } catch (error) {
                console.log(error);
            }
        },
        //chargement des catégories en focntion du type de logement sélectionné
        changeType(a) {
            let data = [];
            for (let i = 0; i < this.sousTypesLogements.length; i++) {
                data.push(this.sousTypesLogements[i]);
            }
            let result = data.filter(x => x.idType == a);
            this.sousTypes = result;
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
           this.tousLesBatiments=await axios.get("batiments").then(response => response.result)
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
        const interval = setInterval(() => {
            if (this.$refs.mapRef) {
                this.$refs.mapRef.$mapPromise.then(map => this.map = map);
                clearInterval(interval)
            }
        }, 50)
       await this.getAllBatiments();
       //await this.getAllCountries();
       await this.getLogementsData();
      /*  await  this.getTypesLogements();
       await this.getSousTypesLogement(); */
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
</style>