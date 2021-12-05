<template>
    <b-overlay :show="showOverlay" rounded="sm"><div class="d-flex flex-column justify-content-between h-100">
         <form-wizard ref="logementForm"  title='' subtitle='' :nextButtonText="$t('data.batiment_form_wizard_suivant')" :backButtonText="$t('data.batiment_form_wizard_precedent')" :finishButtonText='$t("data.batiment_form_wizard_bouton_enregistrer")' aria-labelledby="demoModalLabel"  @on-complete="submitForm"
                        @on-loading="setLoading"
                        @on-validate="handleValidation"
                        shape="circle"
                        color="#e74c3c">
            <tab-content :title="$t('data.batiment_form_wizard_tab_content_1_titre')" icon="ik ik-info" :before-change="validateFirst">
                <div class="d-flex flex-column justify-content-between" style="height: 95%; overflow-y: auto; overflow-x: hidden"><div data-repeater-list="group">
                <b-row>
                    <b-col>
                        <b-form-group :label="$t('data.batiment_form_label_nom_batiment')">
                            <b-form-input name="nom" v-model="nom" :placeholder="$t('data.batiment_form_label_nom_batiment_exemple')" trim></b-form-input>
                            <span v-if="!requiredNom" style="color:red;">{{$t('data.batiment_form_nom_batiment_obligatoire')}}</span>
                        </b-form-group>
                        <b-form-group :label="$t('data.batiment_form_label_batiment_reference')">
                            <b-form-input name="ref" v-model="ref" placeholder="Ex: B1" trim></b-form-input>
                             <span v-if="!requiredRef" style="color:red;">{{$t('data.batiment_form_batiment_reference')}}</span>
                        </b-form-group>
                        <b-form-group v-if="cite == null" label="Photo">
                            <img-inputer v-model="photo.batiment" :img-src="$getBase64(photo.batiment, false)" placeholder="Ajouter la photo du batiment" theme="light" size="xl" bottom-text="déposez le fichier ici ou cliquez pour modifier" icon="img" />
                        </b-form-group>
                    </b-col> 

                    <b-col>
                        <b-form-group v-if="cite != null" :label="$t('data.batiment_form_label_batiment_photo')">
                             <img-inputer name="test" :placeholder="$t('data.batiment_form_label_batiment_photo_placeholder')" theme="light" size="xl" :bottom-text="$t('data.batiment_form_label_batiment_photo_bottom_text')" icon="img" />
                        </b-form-group>
                        <div v-else>
                            <b-form-group :label="$t('data.batiment_form_label_batiment_cite')">
                                <v-select class="py-1" :options="cites" v-model="idCite" :reduce="cite => cite.idCite" label="nomCite">
                                    <template #option="{ nomCite, refCite, idCite }">
                                        {{ nomCite }}
                                        <br />
                                        <span class="text-muted"> {{ idCite != -1 ? $t("data.batiment_form_label_batiment_cite_reference")+ ': ' : ''}}{{ refCite }}</span>
                                        <hr class="m-0 bg-danger" v-if="idCite == -1" style="border-width: 1.5px">
                                    </template>
                                </v-select>
                            </b-form-group>
                            <b-carousel v-show="idCite != -1" :interval="0" controls v-model="selected_index_cite" ref="citeCarousel">
                                <b-carousel-slide style="height: 20em" v-for="(cite, i) in slideCites" :key="i" :img-src="cite.image || '/img/bgCity.jpg'" class="fluid w-100 responsive border"/>
                            </b-carousel>
                            <div v-if="idCite == -1">
                                <b-row>
                                    <b-col><b-form-group :label="$t('data.batiment_form_label_batiment_nom_cite')">
                                        <b-form-input v-model="nomCite" :placeholder="$t('data.batiment_form_label_batiment_nom_cite_exemple')" trim />
                                        <span v-if="!requiredNomCite" style="color:red;">{{$t('data.batiment_form_label_batiment_nom_cite_obligatoire')}}</span>
                                    </b-form-group></b-col>
                                    <b-col><b-form-group :label="$t('data.batiment_form_label_batiment_label_cite_reference')">
                                        <b-form-input v-model="refCite" :placeholder="$t('data.batiment_form_label_batiment_label_cite_reference_exemple')" trim />
                                        <span v-if="!requiredNomCite" style="color:red;">{{$t('data.batiment_form_label_batiment_cite_reference_obligatoire')}}</span>
                                    </b-form-group></b-col>
                                </b-row>
                                <b-form-group :label="$t('data.batiment_form_label_batiment_photo')">
                                    <img-inputer v-model="photo.cite" :img-src="$getBase64(photo.cite, false)" :placeholder="$t('data.batiment_form_label_batiment_ajouter_photo_cite')" theme="light" size="xl" :bottom-text="$t('data.batiment_form_label_batiment_photo_bottom_text')" icon="img" />
                                </b-form-group>
                            </div>
                        </div>
                    </b-col>
                    <!--<b-col cols="1" class="m-0 p-0 mr-2" v-if="cite != null"><b-form-group :label="$t('data.batiment_form_label_action')">
                        <b-button data-repeater-delete variant="outline-danger"><i class="fa fa-times"></i></b-button>
                    </b-form-group></b-col>-->   
                </b-row>   
            </div></div>
                <div class="w-100 d-flex justify-content-end align-items-center mt-4">
                    <!--<b-button v-if="null != cite" variant="outline-primary" data-repeater-create>{{$t("data.batiment_form_label_ajouter_element")}}</b-button>-->
                    <!--<b-button variant="danger" @click="submitForm" class="ml-2" :disabled="submitted">Valider <b-spinner v-if="submitted" small /></b-button> -->   
                </div>
            </tab-content>
            <tab-content :title="$t('data.batiment_form_wizard_tab_content_2_titre')" icon="fa fa-map-marker">
                <b-row>
                    <b-col>
                        <b-row>
                            <div class="form-group">
                                <label>{{$t('data.batiment_form_label_pays')}}</label>
                                 <b-form-select
                                    v-model="pays"
                                    :options="tousLesPays"
                                    class="mb-3"
                                    value-field="name"
                                    text-field="name"
                                ></b-form-select>
                                 <!--<v-select label="libellePays" style="min-width:2em" :options="tousLesPays"  v-model="pays" :reduce="pays => pays.libellePays"></v-select>-->
                                <span v-if="!requiredPays" style="color:red;">{{$t("data.batiment_form_label_pays_obligatoire")}}</span>
                            </div>
                        </b-row>
                        <b-row>
                            <b-col>
                                <label>{{$t('data.batiment_form_label_ville')}} </label>
                                <input type="text" class="form-control" id="ville" required :placeholder="$t('data.batiment_form_label_ville_placeholder')" v-model="ville">
                                <span v-if="!requiredVille" style="color:red;">{{$t('data.batiment_form_label_ville_obligatoire')}}</span>
                            </b-col>
                            <b-col>
                                <label>{{$t('data.batiment_form_label_quartier')}}</label>
                                <input type="text" class="form-control" id="quartier" required placeholder="Quartier Ex:Nsam" v-model="quartier">
                                <span v-if="!requiredQuartier" style="color:red;">{{$t('data.batiment_form_label_quartier_obligatoire')}}</span>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row class="ml-4 mt-2">
                            <label>{{$t('data.batiment_form_latitude')}} </label>
                            <input type="text" class="form-control" id="lat" v-model="mapCoordinates.lat">
                        </b-row>
                        <b-row class="ml-4  mt-4">
                            <label>{{$t('data.batiment_form_longitude')}} </label>
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
            <div class="leloader" v-if="loadingWizard"></div>
        </form-wizard>
    </div>
    </b-overlay>
</template>

<script>
const php = require('phpjs')
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
export default {
    data: () => ({
        submitted: false,
        showOverlay: true,

        cites: [],
        idCite: -1,
        nom: null,
        ref: null,
        nomCite: null,
        refCite: null,
        pays: null,
        ville:null, 
        quartier: null,
        photo: { batiment: null, cite: null },
        selected_index_cite: null,
        requiredPays:true,
        requiredVille:true,
        requiredQuartier:true,
        valeurPays:'Cameroun',
       /* tousLesPays:[
        {
          libellePays: 'Afghanistan'
        },
        {
          libellePays: 'Afrique du Sud'
        },
        {
          libellePays: 'Albanie'
        },
        {
          libellePays: 'Algérie'
        },
        {
          libellePays: 'Allemagne'
        },
        {
          libellePays: 'Andorre'
        },
        {
          libellePays: 'Angola'
        },
        {
          libellePays: 'Anguilla'
        },
        {
          libellePays: 'Antarctique'
        },
        {
          libellePays: 'Antigua-et-Barbuda'
        },
        {
          libellePays: 'Antilles néerlandaises'
        },
        {
          libellePays: 'Arabie saoudite'
        },
        {
          libellePays: 'Argentine'
        },
        {
          libellePays: 'Arménie'
        },
        {
          libellePays: 'Aruba'
        },
        {
          libellePays: 'Australie'
        },
        {
          libellePays: 'Autriche'
        },
        {
          libellePays: 'Azerbaïdjan'
        },
        {
          libellePays: 'Bahamas'
        },
        {
          libellePays: 'Bahreïn'
        },
        {
          libellePays: 'Bangladesh'
        },
        {
          libellePays: 'Barbade'
        },
        {
          libellePays: 'Bélarus'
        },
        {
          libellePays: 'Belgique'
        },
        {
          libellePays: 'Belize'
        },
        {
          libellePays: 'Bénin'
        },
        {
          libellePays: 'Bermudes'
        },
        {
          libellePays: 'Bhoutan'
        },
        {
          libellePays: 'Bolivie'
        },
        {
          libellePays: 'Bosnie-Herzégovine'
        },
        {
          libellePays: 'Botswana'
        },
        {
          libellePays: 'Brésil'
        },
        {
          libellePays: 'Brunéi Darussalam'
        },
        {
          libellePays: 'Bulgarie'
        },
        {
          libellePays: 'Burkina Faso'
        },
        {
          libellePays: 'Burundi'
        },
        {
          libellePays: 'Cambodge'
        },
        {
          libellePays: 'Cameroun'
        },{
          libellePays: 'Canada'
        },
        {
          libellePays: 'Cap-Vert'
        },
        {
          libellePays: 'Ceuta et Melilla'
        },

        {
          libellePays: 'Chili'
        },
        {
          libellePays: 'Chine'
        },
        {
          libellePays: 'Chypre'
        },
        {
          libellePays: 'Colombie'
        },
        {
          libellePays: 'Comores'
        },
        {
          libellePays: 'Congo-Brazzaville'
        },
        {
          libellePays: 'Corée du Nord'
        },
        {
          libellePays: '"Corée du Sud'
        },
        {
          libellePays: 'Costa Rica'
        },
        {
          libellePays: 'Côte d’Ivoire'
        },
        {
          libellePays: 'Croatie'
        },
        {
          libellePays: 'Cuba'
        },
        {
          libellePays: 'Danemark'
        },
        {
          libellePays: 'Diego Garcia'
        },
        {
          libellePays: 'Djibouti'
        },
        {
          libellePays: 'Dominique'
        },
        {
          libellePays: 'Égypte'
        },
        {
          libellePays: 'El Salvador'
        },
        {
          libellePays: 'Émirats arabes unis'
        },
        {
          libellePays: 'Équateur'
        },
        {
          libellePays: 'Érythrée'
        },
        {
          libellePays: 'Espagne'
        },
        {
          libellePays: 'Estonie'
        },
        {
          libellePays: 'État de la Cité du Vatican'
        },

        {
          libellePays: 'États fédérés de Micronésie'
        },

        {
          libellePays: 'États-Unis'
        },
        {
          libellePays: 'Éthiopie'
        },
        {
          libellePays: 'Fidji'
        },
        {
          libellePays: 'Finlande'
        },{
          libellePays: 'France'
        },
        {
          libellePays: 'Gabon'
        },
        {
          libellePays: 'Gambie'
        },
        {
          libellePays: 'Géorgie'
        },
        {
          libellePays: 'Géorgie du Sud et les îles Sandwich du Sud'
        },
        {
          libellePays: 'Ghana'
        },
        {
          libellePays: 'Gibraltar'
        },
        {
          libellePays: 'Grèce'
        },
        {
          libellePays: 'Grenade'
        },
        {
          libellePays: 'Groenland'
        },
        {
          libellePays: 'Guadeloupe'
        },
        {
          libellePays: 'Guam'
        },
        {
          libellePays: 'Guatemala'
        },
        {
          libellePays: 'Guernesey'
        },
        {
          libellePays: 'Guinée'
        },
        {
          libellePays: 'Guinée équatoriale'
        },
        {
          libellePays: 'Guinée-Bissau'
        },
        {
          libellePays: 'Guyana'
        },
         {
          libellePays: 'Guyane française'
        },
         {
          libellePays: 'Haïti'
        },
         {
          libellePays: 'Honduras'
        },
         {
          libellePays: 'Hongrie'
        },

         {
          libellePays: 'Île Bouvet'
        },
         {
          libellePays: 'Île Christmas'
        },
         {
          libellePays: 'Île Clipperton'
        },
         {
          libellePays: 'Île de l\'Ascension'
        },
         {
          libellePays: 'Île de Man'
        },
         {
          libellePays: 'Île Norfolk'
        },
         {
          libellePays: 'Îles Åland'
        },
         {
          libellePays: 'Îles Caïmans'
        },
         {
          libellePays: 'Îles Canaries'
        },
         {
          libellePays: 'Îles Cocos - Keeling'
        },
         {
          libellePays: 'Îles Cook'
        },
         {
          libellePays: 'Îles Féroé'
        },
         {
          libellePays: 'Îles Heard et MacDonald'
        },
         {
          libellePays: 'Îles Malouines'
        },
         {
          libellePays: 'Îles Mariannes du Nord'
        },
         {
          libellePays: 'Îles Marshall'
        },
         {
          libellePays: 'Îles Mineures Éloignées des États-Unis'
        },
         {
          libellePays: 'Îles Salomon'
        },
         {
          libellePays: 'Îles Turks et Caïques'
        },
         {
          libellePays: 'Îles Vierges britanniques'
        },
         {
          libellePays: 'Îles Vierges des États-Unis'
        },
         {
          libellePays: 'Inde'
        },
         {
          libellePays: 'Indonésie'
        },
         {
          libellePays: 'Irak'
        },
         {
          libellePays: 'Iran'
        },
         {
          libellePays: 'Irlande'
        },
         {
          libellePays: 'Islande'
        },
         {
          libellePays: 'Israël'
        },
         {
          libellePays: 'Italie'
        },
         {
          libellePays: 'Jamaïque'
        },
         {
          libellePays: 'Japon'
        },
         {
          libellePays: 'Jersey'
        },
         {
          libellePays: 'Jordanie'
        },
         {
          libellePays: 'Kazakhstan'
        },
         {
          libellePays: 'Kenya'
        },
         {
          libellePays: 'Kirghizistan'
        },
         {
          libellePays: 'Kiribati'
        },
         {
          libellePays: 'Koweït'
        },
         {
          libellePays: 'Laos'
        },
         {
          libellePays: 'Lesotho'
        },
         {
          libellePays: 'Lettonie'
        },
         {
          libellePays: 'Liban'
        }, 
	{
          libellePays: 'Libéria'
        },
	{
          libellePays: 'Libye'
        },
        {
          libellePays: 'Liechtenstein'
        },
        {
          libellePays: 'Lituanie'
        },
        {
          libellePays: 'Luxembourg'
        },
        {
          libellePays: 'Macédoine'
        },
	{
          libellePays: 'Madagascar'
        },
	{
          libellePays: 'Malaisie'
        },
	{
          libellePays: 'Malawi'
        },
	{
          libellePays: 'Maldives'
        },
	{
          libellePays: 'Mali'
        },
	{
          libellePays: 'Malte'
        },
	{
          libellePays: 'Maroc'
        },
	{
          libellePays: 'Martinique'
        },
	{
          libellePays: 'Maurice'
        },
	{
          libellePays: 'Mauritanie'
        },
	{
          libellePays: 'Mayotte'
        },
	{
          libellePays: 'Mexique'
        },

	{
          libellePays: 'Moldavie'
        },
	{
          libellePays: 'Monaco'
        },

	{
          libellePays: 'Mongolie'
        },

	{
          libellePays: 'Monténégro'
        },
	{
          libellePays: 'Montserrat'
        },
	{
          libellePays: 'Mozambique'
        },
	{
          libellePays: 'Myanmar'
        },
	{
          libellePays: 'Namibie'
        },
	{
          libellePays: 'Nauru'
        },
	{
          libellePays: 'Népal'
        },
	{
          libellePays: 'Nicaragua'
        },
	{
          libellePays: 'Niger'
        },
	{
          libellePays: 'Nigéria'
        },
	{
          libellePays: 'Niue'
        },
	{
          libellePays: 'Norvège'
        },
	{
          libellePays: 'Nouvelle-Calédonie'
        },
	{
          libellePays: 'Nouvelle-Zélande'
        },
	{
          libellePays: 'Oman'
        },
	{
          libellePays: 'Ouganda'
        },
	{
          libellePays: 'Ouzbékistan'
        },
	{
          libellePays: 'Pakistan'
        },
	{
          libellePays: 'Palaos'
        },
	{
          libellePays: 'Panama'
        },
	{
          libellePays: 'Papouasie-Nouvelle-Guinée'
        },
	{
          libellePays: 'Paraguay'
        },
	{
          libellePays: 'Pays-Bas'
        },
	{
          libellePays: 'Pérou'
        },
	{
          libellePays: 'Philippines'
        },
	{
          libellePays: 'Pitcairn'
        },
	{
          libellePays: 'Pologne'
        },
	{
          libellePays: 'Polynésie française'
        },
	{
          libellePays: 'Porto Rico'
        },
	{
          libellePays: 'Portugal'
        },
	{
          libellePays: 'Qatar'
        },
	{
          libellePays: 'R.A.S. chinoise de Hong Kong'
        },
	{
          libellePays: 'R.A.S. chinoise de Macao'
        },
	{
          libellePays: 'régions éloignées de l’Océanie'
        },
	{
          libellePays: 'République centrafricaine'
        },
	{
          libellePays: 'République démocratique du Congo'
        },
	{
          libellePays: 'République dominicaine'
        },
	{
          libellePays: 'République tchèque'
        },
	{
          libellePays: 'Réunion'
        },
	{
          libellePays: 'Roumanie'
        },
	{
          libellePays: 'Royaume-Uni'
        },
	{
          libellePays: 'Russie'
        },
	{
          libellePays: 'Rwanda'
        },
	{
          libellePays: 'Sahara occidental'
        },
	{
          libellePays: 'Saint-Barthélémy'
        },
	{
          libellePays: 'Saint-Kitts-et-Nevis'
        },
	{
          libellePays: 'SM Saint-Marin'
        },
	{
          libellePays: 'MF Saint-Martin'
        },
	{
          libellePays: 'Saint-Pierre-et-Miquelon'
        },
	{
          libellePays: 'Saint-Vincent-et-les Grenadines'
        },
	{
          libellePays: 'Sainte-Hélène'
        },
	{
          libellePays: 'Sainte-Lucie'
        },
	{
          libellePays: 'Samoa'
        },
	{
          libellePays: 'Samoa américaines'
        },
	{
          libellePays: 'Sao Tomé-et-Principe'
        },
	{
          libellePays: 'Sénégal'
        },
	{
          libellePays: 'Serbie'
        },
	{
          libellePays: 'Serbie-et-Monténégro'
        },
	{
          libellePays: 'Seychelles'
        },
	{
          libellePays: 'Sierra Leone'
        },
	{
          libellePays: 'Singapour'
        },
	{
          libellePays: 'Slovaquie'
        },
	{
          libellePays: 'Slovénie'
        },
	{
          libellePays: 'Somalie'
        },
	{
          libellePays: 'Soudan'
        },
	{
          libellePays: 'Sri Lanka'
        },
	{
          libellePays: 'Suède'
        },
	{
          libellePays: 'Suisse'
        },
	{
          libellePays: 'Suriname'
        },
	{
          libellePays: 'Svalbard et Île Jan Mayen'
        },
	{
          libellePays: 'Swaziland'
        },
	{
          libellePays: 'Syrie'
        },
	{
          libellePays: 'Tadjikistan'
        },
	{
          libellePays: 'Taïwan'
        },
	{
          libellePays: 'Tanzanie'
        },
	{
          libellePays: 'Tchad'
        },
	{
          libellePays: 'Terres australes françaises'
        },
	{
          libellePays: 'Territoire britannique de l\'océan Indien'
        },
	{
          libellePays: 'Territoire palestinien'
        },
	{
          libellePays: 'Thaïlande'
        },
	{
          libellePays: 'Timor oriental'
        },
	{
          libellePays: 'Togo'
        },
	{
          libellePays: 'Tokelau'
        },
	{
          libellePays: 'Tonga'
        },
	{
          libellePays: 'Trinité-et-Tobago'
        },
	{
          libellePays: 'Tristan da Cunha'
        },
	{
          libellePays: 'Tunisie'
        },
	{
          libellePays: 'Turkménistan'
        },
	{
          libellePays: 'Turquie'
        },
	{
          libellePays: 'Tuvalu'
        },
	{
          libellePays: 'Ukraine'
        },
	{
          libellePays: 'Union européenne'
        },
	{
          libellePays: 'Uruguay'
        },
	{
          libellePays: 'Vanuatu'
        },
	{
          libellePays: 'Venezuela'
        },
	{
          libellePays: 'Viêt Nam'
        },
	{
          libellePays: 'Wallis-et-Futuna'
        },
	{
          libellePays: 'Yémen'
        },
	{
          libellePays: 'Zambie'
        },
	{
          libellePays: 'Zimbabwe'
        },
    ],*/
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
        indexForm:5,
        loadingWizard: false,
        check:true,
        requiredNom:true,
        requiredRef:true,
        requiredNomCite:true,
        requiredRefCite:true,
        map:null,
        myCoordinates: {
            lat: 0,
            lng: 0
        },
        zoom: 17,
        markers:[]
    }),
    component:{
        FormWizard,
        TabContent,
    },
    watch: {
        selected_index_cite(value) {
            this.idCite = this.slideCites[value].idCite
        },
        idCite(value) {
            this.setSlide_cite(value)
        }
    },
    props: {
        action: {type: String, default: 'add'},
        batiment: {type: Object, default: null},
        cite: {type: Object, default: null},
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
        /*repeaterId() {
            return `repeat-added-batiment-form-${php.empty(this.cite) ? php.uniqid() : this.cite.idCite}`
        },*/
        slideCites() {
            return this.cites.filter(elt => elt.idCite != -1)
        }
    },
    created() {
        this.getCites()
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
    mounted() {
        if (!php.empty(this.cite)) {
            //this.makeRepeater()
            this.idCite = this.cite.idCite
        }
        //difénition automatique du marker en fonction de la position de l'utilisateur
        const interval = setInterval(() => {
            if (this.$refs.mapRef) {
                this.$refs.mapRef.$mapPromise.then(map => this.map = map);
                clearInterval(interval)
            }
        }, 50)
        this.drawMarker();
    },

    methods: {
        /**methode pour placer un marker */
        drawMarker(){
            this.markers= [
                {
                    position: this.myCoordinates,
                }
            ]
        },
        validateFirst:function() {
            return new Promise((resolve, reject) => {
                
                if(!this.nom || !this.ref || !this.nomCite&&this.idCite==-1 || !this.refCite&&this.idCite==-1){
                    this.check=false
                    if(!this.nom){this.requiredNom=false;}
                    else{this.requiredNom=true;}
                    if(!this.ref){this.requiredRef=false;}
                    else{this.requiredRef=true;}
                   if(!this.nomCite){this.requiredNomCite=false;}
                    else{this.requiredNomCite=true;}
                    if(!this.refCite){this.refCite=false;}
                    else{this.refCite=true;}
                }else{
                    this.check=true
                }
            setTimeout(() => {
                resolve(this.check)
            }, 1000)
            })
        },
        setLoading: function(value) {
            this.loadingWizard = value
        },
        handleValidation: function(isValid, tabIndex){
            console.log('Tab: '+tabIndex+ ' valid: '+isValid)
            this.indexForm=this.indexForm+1;
            console.log('indexFom: ',this.indexForm)
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
        async getCites() {
            let cites = storage.get('cites')
            if (php.empty(cites)) {
                cites = await axios.get('cites').then(response => response.result || [])
                storage.set('cites', cites, 10)
            }
            this.cites = cites || []
            
            if (!php.empty(this.batiment)) {
                this.nom = this.batiment.nomBatiment
                this.ref = this.batiment.refBatiment
                this.photo.batiment = this.batiment.image
                this.idCite = this.batiment.idCite
                if (!php.empty(this.batiment.adresse)) {
                    this.pays = this.batiment.adresse.pays
                    this.ville = this.batiment.adresse.ville
                    this.quartier = this.batiment.adresse.quartier
                    this.mapCoordinates.lat = this.batiment.adresse.lat
                    this.mapCoordinates.lng = this.batiment.adresse.lon
                }
                this.idCite = this.batiment.idCite
                this.idCite = this.batiment.idCite
            }
            else {
                this.cites.unshift({
                    nomCite: 'Créer une nouvelle cité', refCite: 'Ajout d\'une cité inexistante', idCite: -1
                })
            }
            this.showOverlay = false
        },

        /*makeRepeater() {
            setTimeout(() => {
                $(`#${this.repeaterId}`).repeater({ isFirstItemUndeletable: true  })
            }, 500);
        },*/

        /**
        * Set l'image du carousel lorsqu'on change le logement
        */
        setSlide_cite(value) {
            for (let index = 0; index < this.slideCites.length; index++) {
                if (this.slideCites[index].idCite == value && !php.empty(this.$refs.citeCarousel)) {
                    this.$refs.citeCarousel.setSlide(index);
                    break;
                }
            }
        },

        /**
         * Validation du formulaire d'ajout/modification du batiment
         */
        async submitForm() {

            if (php.empty(this.nom) || php.empty(this.ref) || php.empty(this.idCite)) {
                return App.error('Veuillez remplir le nom et la reference du batiment')
            }
            
            if (this.idCite == -1 && (php.empty(this.nomCite) || php.empty(this.refCite))) {
                return App.error('Veuillez entrer le nom et la reference de la cité')
            }

            this.submitted = true 

            let data = {
                nom: this.nom, 
                idCite: this.idCite, 
                ref: this.ref, 
                photo: await this.$getBase64(this.photo.batiment),
                batiments: [],
                adresse: {
                    pays:this.pays, 
                    ville:this.ville, 
                    quartier:this.quartier, 
                    lat:this.mapCoordinates.lat, 
                    lon:this.mapCoordinates.lng
                }
            }

            if (this.action == 'add') {
                if (data.idCite == -1) {
                    try {
                        let response = await axios.post('cites', { nom: this.nomCite, ref: this.refCite, photo: await this.$getBase64(this.photo.cite) })
                        data.idCite = response.result.idCite
                    } catch (error) {
                        return App.alertError(error.message)
                    }
                }
                if (!php.empty(this.cite)) {
                    /*let batiments = $(`#${this.repeaterId}`).repeaterVal().group

                    console.log(batiments);
                    //return;

                    if (php.empty(batiments[0].nom) || php.empty(batiments[0].ref)) {
                        return App.error('Vous devez remplir au moins les informations du premier batiment')
                    }
                    data.batiments = batiments*/
                }
                
                axios.post('batiments', data).then(response => {
                    this.$emit('batimentAdded', response.result)
                    this.submitted = false
                    this.resetModal();
                    return App.notifySuccess(response.message)
                }).catch(error => {
                    this.submitted = false
                    return App.notifyError(error.message)
                })
            }

            if (this.action == 'edit' && !php.empty(this.batiment)) {
                console.log('data',data)
                axios.put(`batiments/${this.batiment.idBatiment}`, data).then(response => {
                    this.$emit('batimentUpdated', {...data, idBatiment: this.batiment.idBatiment})
                    this.submitted = false
                    return App.notifySuccess(response.message)
                }).catch(error => {
                    this.submitted = false
                    return App.notifyError(error.message)
                })
            }
   
        },
         resetModal() {
           this.idCite= -1,
           this.nom = null,
           this.ref = null,
           this.nomCite= -1,
           this.refCite = null,
           this.pays = null,
           this.ville= null,
           this.quartier = null,
           this.photo= { batiment: null, cite: null },
           this.mapCoordinates = { lat: null, lng: null};

        },
        
    }
}
</script>
<style>

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