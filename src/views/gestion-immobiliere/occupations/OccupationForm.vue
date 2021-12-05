<template>
    <b-overlay :show="showOverlay" rounded="sm">
        <form-wizard ref="occupationForm" title='' subtitle='' :nextButtonText='$t("data.batiment_form_wizard_suivant")' :backButtonText='$t("data.batiment_form_wizard_precedent")' :finishButtonText='$t("data.batiment_form_wizard_bouton_enregistrer")' aria-labelledby="demoModalLabel"  @on-complete="onComplete"
            @on-loading="setLoading"
            shape="circle"
            color="#e74c3c">
            
            <tab-content :title="$t('data.occupation_form_wizard_tab_content_titre_1')"
                icon="fas fa-info-circle" 
                   :before-change="validateFirst" 
                >
                <b-row class="mb-4">
                    <b-col>
                        <b-form-group :label="$t('data.occupation_form_label_logement_de_occupation')">
                            <div style="height: 10.5em">
                                <v-select :options="logements" v-model="occupation.idLogement" :reduce="logement => logement.idLogement" label="refLogement"  @input="setSlide_logement" />
                                <b-carousel :interval="0" controls v-model="selected_index_logement" ref="logementCarousel">
                                    <b-carousel-slide style="height: 10.5em" class="fluid w-100 responsive border-0" 
                                        v-for="(logement, i) in logements" :key="i" :img-src="empty(logement.photos) ? '/img/bgHousing.jpg' : logement.photos[0].image"
                                    />
                                </b-carousel>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group :label="$t('data.occupation_form_label_logement_de_occupant')">
                            <div style="height: 10.5em">
                                <v-select :options="locataires" v-model="occupation.idLocataire" :reduce="locataire => locataire.idLocataire" label="nomLocataire"  @input="setSlide_locataire" :disabled="disabled" >
                                <!--<v-select :options="locataires" v-model="occupation.idLocataire" label="nomLocataire"  @input="setSlide_locataire"  :class="{ disabled: disabled == true }" />-->
                                    <template #option="{ nomLocataire, prenomLocataire}">
                                        {{ nomLocataire }}
                                        <br />
                                        <span class="text-muted">{{ prenomLocataire }}</span>
                                    </template>
                                </v-select>
                                <b-carousel :interval="0" controls v-model="selected_index_locataire" ref="locataireCarousel" v-if="provenance =='1'">
                                    <b-carousel-slide style="height: 10.5em" class="fluid w-100 responsive border-0"
                                        v-for="(locataire, i) in locataires" :key="i" :img-src="locataire.avatar"
                                    />
                                </b-carousel>
                                <b-carousel :interval="0" controls v-model="selected_index_locataire" ref="locataireCarousel" v-if="provenance =='2'">
                                    <b-carousel-slide style="height: 10.5em" class="fluid w-100 responsive border-0"
                                    :img-src="locataire.avatar"
                                    />
                                </b-carousel>
                            </div>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="mt-4">
                    <b-col class="col-4">
                        <b-form-group :label="$t('data.occupation_informations_date_debut_bail')">
                            <date-picker v-model="occupation.debut" :placeholder="$t('data.occupation_form_label_selectionner_date')" format="dddd, DD MMMM YYYY" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                        </b-form-group>
                    </b-col>
                     <b-col class="col-2">
                        <b-form-group :label="$t('data.occupation_form_label_duree_du_bail')">
                            <b-form-input :class="!requiredAvance ? 'is-red' : ''" type="number"  v-model="occupation.dureeBail" :placeholder="$t('data.occupation_form_label_duree_du_bail_exemple')" trim></b-form-input>
                            <span v-if="!requiredAvance" style="color:red;">{{$t('data.logement_reference_du_logement_obligatoire')}}</span>
                        </b-form-group>
                    </b-col>
                    <b-col class="mt-4">
                        <b-form-checkbox v-model="occupation.endLastBail" switch>
                            <span class="fa-lg">{{$t('data.occupation_form_label_mettre_fin_au_bail_precedent')}}</span>
                        </b-form-checkbox>
                    </b-col>
                </b-row>
            </tab-content>
        
            <tab-content :title="$t('data.occupation_form_wizard_tab_content_titre_2')"
                icon="ik ik-dollar-sign"
                :before-change="validateSecond" >
                <!--LOYERS-->
                <b-row>
                    <b-col>
                        <!--<CustomInputGroup :class="!requiredLoyer ? 'is-red' : ''"   label="Loyer" description="Combien devra payer le résident" placeholder="Ex: 45000" v-model="occupation.loyer" />-->
                            <b-form-group :label="$t('data.occupation_informations_loyer')"  :description="$t('data.occupation_form_label_combien_doit_payer_le_resident')">
                                <b-form-input :class="!requiredLoyer ? 'is-red' : ''" type="number"  v-model="occupation.loyer" :placeholder="$t('data.occupation_form_label_combien_doit_payer_le_resident_exemple')" />
                            </b-form-group>
                        
                    </b-col>
                    <b-col>
                        <!--<CustomSelectGroup label="Mode de paiement" description="Le résident devra t-il payer son loyer courant avant ou après l'avoir consommé" v-model="occupation.mode" :options="payoptions"  />-->
                        <div class="form-group">
                            <label>{{$t('data.occupation_informations_mode_paiement')}}</label>
                            <v-select label="text" :options="payoptions" v-model="occupation.mode" :reduce="mode => mode.value" :class="!requiredMode ? 'is-red' : ''" class="pb-5"></v-select>
                            <span v-if="!requiredMode" style="color:red;">{{$t('data.logement_reference_du_logement_obligatoire')}}</span>
                        </div>
                    </b-col>
                     <b-col class="col-4">
                        <!--<CustomInputGroup label="Nombre de mois d'avance" description="Combien de mois le locataire a t-il avancé" placeholder="Ex: 6" v-model="occupation.avance" min="1" type="number" />-->
                        <b-form-group :label="$t('data.occupation_form_label_nombre_de_mois_avance')" :description="$t('data.occupation_form_label_nombre_de_mois_avance_description')">
                                <b-form-input :class="!requiredAvance ? 'is-red' : ''" type="number"  v-model="occupation.avance" :placeholder="$t('data.occupation_form_label_duree_du_bail_exemple')" trim></b-form-input>
                                <span v-if="!requiredAvance" style="color:red;">{{$t('data.logement_reference_du_logement_obligatoire')}}</span>
                        </b-form-group>
                    </b-col>
                     <b-col class="col-2">
                        <!--<CustomInputGroup label="Caution" description="somme versée faisant office de caution" placeholder="Ex: 25000" v-model="occupation.caution" min="1" type="number" />-->
                        <b-form-group :label="$t('data.occupation_form_label_caution')" :description="$t('data.occupation_form_label_caution_description')">
                                <b-form-input :class="!requiredCaution ? 'is-red' : ''" type="number"  v-model="occupation.caution" :placeholder="$t('data.occupation_form_label_combien_doit_payer_le_resident_exemple')" trim></b-form-input>
                                <span v-if="!requiredCaution" style="color:red;">{{$t('data.logement_reference_du_logement_obligatoire')}}</span>
                        </b-form-group>
                    </b-col>
                </b-row>

                <!--CHARGES-->
                <b-row>
                    <b-col>
                        <!--<CustomSelectGroup label="Facturation d'eau" description="Comment s'effectuera la facturation en eau de ce résident" v-model="occupation.eau" :options="eauoptions"  />-->
                         <div class="form-group">
                            <label>{{$t('data.occupation_facture_eau')}}</label>
                            <v-select label="text" :options="eauoptions" v-model="occupation.eau" :reduce="eau => eau.value" :class="!requiredEau ? 'is-red' : ''"></v-select>
                            <span v-if="!requiredEau" style="color:red;">{{$t('data.logement_reference_du_logement_obligatoire')}}</span>
                        </div>
                    </b-col>
                    <b-col>
                        <!--<CustomInputGroup :label="occupation.eau == 'forfait' ? 'Taux forfataire' : 'Prix unitaire de l\'eau'" description="" placeholder="Ex: 1500" v-model="occupation.puEau" min="0" type="number" />-->
                        <b-form-group :label="occupation.eau == 'forfait' ? 'Taux forfataire' : 'Prix unitaire de l\'eau'" description="">
                            <b-form-input :class="!requiredPuEau ? 'is-red' : ''" min="0" type="number"  v-model="occupation.puEau" placeholder="Ex: 1500" trim></b-form-input>
                            <span v-if="!requiredPuEau" style="color:red;">{{$t('data.logement_reference_du_logement_obligatoire')}}</span>
                        </b-form-group>
                    </b-col>
                    <b-col v-if="occupation.eau == 'index'">
                        <!--<CustomInputGroup label="Index initial" description="Index du compteur d'eau à l'entrée du locataire" placeholder="Ex: 095" v-model="occupation.indexEau" min="0" type="number" />-->
                        <b-form-group :label="$t('data.occupation_form_label_indexe_initial')" :description="$t('data.occupation_form_label_indexe_initial_description')">
                            <b-form-input :class="!requiredIndex ? 'is-red' : ''" min="0" type="number"  v-model="occupation.indexEau" :placeholder="$t('data.occupation_form_label_indexe_initial_exemple')" trim ></b-form-input>
                            <span v-if="!requiredIndex" style="color:red;">{{$t('data.logement_reference_du_logement_obligatoire')}}</span>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <!--<CustomSelectGroup label="Facturation d'électricité" description="Comment s'effectuera la facturation en électricité de ce résident" v-model="occupation.energie" :options="eauoptions"  />-->
                        <div class="form-group">
                            <label>{{$t('data.occupation_facture_energie')}}</label>
                            <v-select label="text" :options="eauoptions"  v-model="occupation.energie" :reduce="eau => eau.value" :class="!requiredELectricite ? 'is-red' : ''"></v-select>
                            <span v-if="!requiredELectricite" style="color:red;">{{$t('data.logement_reference_du_logement_obligatoire')}}</span>
                        </div>
                    </b-col>
                    <b-col>
                        <!--<CustomInputGroup :label="occupation.energie == 'forfait' ? 'Taux forfataire' : 'Prix unitaire de l\'energie'" description="L'exemple suggéré suppose une consommation par forfait" placeholder="Ex: 2500" v-model="occupation.puEnergie" min="0" type="number" />-->
                        <b-form-group :label="occupation.energie == 'forfait' ? $t('data.occupation_form_taux_forfaitaire') : $t('data.occupation_form_prix_unitaire_electricite')" :description="$t('data.occupation_form_taux_forfaitaire_description')">
                                <b-form-input :class="!requiredPuEnergie ? 'is-red' : ''" type="number" min="0"  v-model="occupation.puEnergie" :placeholder="$t('data.occupation_form_prix_unitaire_electricite')" trim></b-form-input>
                                <span v-if="!requiredPuEnergie" style="color:red;">{{$t('data.logement_reference_du_logement_obligatoire')}}</span>
                        </b-form-group>
                    </b-col>
                    <b-col v-if="occupation.energie == 'index'">
                        <!--<CustomInputGroup label="Index initial" description="Index du compteur d'energie à l'entrée du locataire" placeholder="Ex: 095" v-model="occupation.indexEnergie" min="0" type="number" />-->
                        <b-form-group :label="$t('data.occupation_form_label_indexe_initial')" :description="$t('data.occupation_form_label_indexe_electricite_initial_description')">
                            <b-form-input :class="!requiredPuEnergie ? 'is-red' : ''" type="number" min="0"  v-model="occupation.indexEnergie" :placeholder="$t('data.occupation_form_indexe_initial_electricite_exemple')" trim></b-form-input>
                            <span v-if="!requiredPuEnergie" style="color:red;">{{$t('data.logement_reference_du_logement_obligatoire')}}</span>
                        </b-form-group>
                    </b-col>
                </b-row>
            </tab-content>    

            <tab-content :title="$t('data.occupation_form_wizard_tab_content_titre_3')"
                        icon="fas fa-file-contract"  
                >
                <div class="templateChoix mb-4">
                    <b-col xl="2" lg="2" cols="12" sm="6" v-for="(item, index) in contrats" :key="index" @click="contratSelect(item, index)">
                        <div class="contratTheme" :class="{'active-contrat': selectedContrat == index}">
                            <div class="contratImage">
                               <img src="../../../assets/img/c.png"  :alt="$t('data.occupation_form_template_contrat_bail_location')">
                            </div>
                            <div class="contratType" :class="{'active-contrat': selectedContrat == index}">
                                <span>
                                    {{item.libelleModele}}
                                </span>
                            </div>
                        </div>
                    </b-col>
                </div>
                <b-overlay :show="showOverlay2" rounded="sm">
                    <div class="well-display" style="height: 130em; margin-top: 100px">
                        <vue-editor v-model="content" style="height: 123em;"></vue-editor>
                    </div>
                </b-overlay>
            </tab-content>
            <div class="leloader" v-if="loadingWizard"></div>
        </form-wizard>
           <div class="float-right">
                <b-button @click.prevent="resetModal" variant="secondary">{{$t('data.logement_form_fermer')}}</b-button>
            </div>                  
    </b-overlay>
</template>
<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';

  import CustomInputGroup from "@/components/parts/CustomInputGroup.vue";
import CustomSelectGroup from "@/components/parts/CustomSelectGroup.vue";

import notif from "@/plugins/notif.js";
const php = require("phpjs");
import { VueEditor } from "vue2-editor";

import { mapGetters} from "vuex"

export default {
  name: "occupation-form",
    components: {
        DatePicker,
        CustomInputGroup,
        CustomSelectGroup,
        FormWizard,
        TabContent,
        VueEditor
    },
    props: {
        locataire: { type: Object},
        provenance: {type: Number, required: true, default: "1"},
        action: {type: String, required: true, default: "add"},
        editOccupation:{ type:Object}
    },
  data: () => ({
    duree: [null, null],
    selected_index_logement: -1,
    selected_index_locataire: -1,
    selected_value: "",
    occupation: {
      loyer: "",
      mode: "prepayer",
      energie: "index",
      eau: "index",
      puEnergie: "",
      puEau: "",
      idLogement: "",
      idLocataire: "",
      debut:"",
      indexEnergie: 0,
      indexEau: 0,
      endLastBail: false,
      avance: 1,
      contrats:"",
      dureeBail:0,
      caution:1,
      contrat:""
    },
     loadingWizard: false,
     content:"<h1 class=\"ql-align-center\"><strong>CONTRAT DE BAIL A USAGE D'HABITATION </strong></h1><p><br></p><p><br></p><h3>	<strong>DESIGNATION DES PARTIES</strong></h3><p><br></p><h3>	<strong><u>LE COMPLEXE INDUSTRIEL DU CAMEROUN en abrégé ( CIC )</u></strong></h3><p>	</p><p>	 siège : <strong>.{{ LOGEMENT_ADRESSE_PAYS}}</strong></p><p>	</p><p>	Représenté par : <strong>.{{  NOM_BAILLEUR }}</strong></p><p>  </p><p>    N° de CNI : <strong>{{  CNI_BAILLEUR }}</strong></p><p><br></p><p>	Date de Délivrance : ....................</p><p><br></p><p>    Tél : <strong>{{  TEL_BAILLEUR }}</strong></p><p><br></p><p>                ci-après désigné  <strong>&lt;&lt; BAILLEUR &gt;&gt;</strong></p><p><br></p><p>																								<strong>ET</strong></p><p><br></p><h3>		</h3><h3>		<strong><u>Le LOCATAIRE</u></strong></h3><p>		</p><p>			 NOM:<strong> {{ LOCATAIRE_NOMS_PRENOMS }}</strong></p><p>	</p><p>			Né 	le : <strong>{{ LOCATAIRE_DATE_NAISSANCE  }}</strong></p><p>  </p><p>  		    Fils de  : ............</p><p><br></p><p>	        Exercant  de: ........</p><p><br></p><p>            N° de CNI: <strong>{{ LOCATAIRE_CNI }}</strong></p><p>		</p><p>			Date de délivrance: .................</p><p><br></p><p>			Tel: <strong>{{ LOCATAIRE_TEL  }}</strong></p><p><br></p><p>						 ci-après désigné  &lt;&lt; LE PRENEUR&gt;&gt;</p><p><br></p><h2>	</h2><h3>				<strong>IL A ETE ARRETE ET CONVENU CE QUI SUIT</strong></h3><p><br></p><p><br></p><h3>	<strong>Article 1: OBJET-USAGE DES LIEUX</strong></h3><p>	</p><p>	1.1 Le bailleur loue par les présentes au preneur qui accepte les lieux ci-après décrits à l'article 2, situé au quartier Mvan à usage exclusif d'habitation.</p><p><br></p><p>	1.2 Ils ne pourront être utilisé même temporairement à d'autres usages que celui ainsi arrêté sous</p><p>			peine de résiliation de plein droit de bail, suivi d'un délaissement immédiat à la première demande du bailleur&nbsp;.</p><p><br></p><p><br></p><h3>	<strong>Article 2: DESIGNATION-COMPOSITION-ETAT DES LIEUX</strong></h3><p><br></p><p>	2.1 Les locaux objet du présent bail se présentent ainsi qu'il suit :</p><ul><li>		<strong>{{ CARACTERISTIQUES_LOGEMENT }}</strong></li></ul><p><br></p><p>   2.2 Il n'est pas fait plus ample description des lieux loués, le preneur déclarant les connaitre parfaitement pour les avoir vu, visité, et accepté  tels quels avant conclusion du présent contrat</p><p><br></p><p>	2.2 A défaut des lieux ci-dessus, le preneur reconnait  qu'il sera réputé avoir occupé les lieux en parfait état.</p><p><br></p><h3><strong>Article 3: DUREE DU BAIL-AVENANT DE RENOUVELEMENT</strong></h3><p><br></p><p>	3.1 Le présent bail est inclus pour une durée ferme et définitive <strong>{{ CONTRAT_DUREE }}</strong> mois ? Sauf si les parties en disposent autrement</p><p><br></p><p>	3.2 Un mois avant la fin du bail , il est inclus un nouveau bail si nécessaire pour la même durée à la même demande écrite du locataire.</p><p><br></p><p>	3.3 En cas d'acceptation du bailleur ou de son silence garder jusqu'au moins deux semaines avant l'expiration du bail, le renouvellement est acquis et dans tous les cas pour une durée supplémentaire d'un an.</p><p><br></p><h3><strong>Article 4: PRIX DU LOYER ET DES REDEVANCES D'OCCUPATION</strong></h3><p><br></p><p>	 4.1 Le prix du loyer mensuel hors taxes consenti pour la présente location est de : <strong>{{ PRIX_LOYER }} FCFA</strong></p><p>	</p><p>    4.2 Que le preneur accepte payer ainsi que les accessoires, à chaque échéance ci-après indiquée ;</p><p><br></p><p>	4.3 Le loyer est payable mensuellement ;</p><p><br></p><p>	4.4 Le preneur s'oblige à s'acquitter ses loyers et accessoires par terme et d'avance à Yaoundé, au plus tard le premier jour de chaque mois ;</p><p><br></p><p>	4.5 Les paiements tant du loyer que de accessoires seront effectuées par des versements en espèces entre les mains du bailleur ou de tout autre mandataire détenteur d'une bonne et valable procuration ;</p><p><br></p><p><br></p><h3><strong>Article 5: FRAIS D'ETABLISSEMENT, DEPENSES D'ENREGISTREMENT, TIMBRE DE TAXES DIVERSES, ET FRAIS DE POURSUITES </strong></h3><p><br></p><p>5.1 Tous les frais fixés par les règlements publics relatifs à l'établissement de présentes ( frais d'enregistrement, frais de timbre et pénalités de toutes natures), sont   à la charge du preneur;</p><p><br></p><p>5.2 Les taxes fixées par les administrations publiques, communales sont également à sa charge et dues dans les conditions et aux dates fixées par ces administrations ; il devra justifier de leurs acquis avant de déménager ;</p><p><br></p><p>5.3 En cas de règlement tardif de ces taxes par le preneur, les pénalités administratives et fiscales en résultant sont à la charge du preneur;</p><p><br></p><p>5.4 Les frais droits et honoraires auxquels pourront donner lieu le présent acte et ses suites, y compris les frais de poursuites de  toutes natures, seront supportés par le preneur;</p><p><br></p><h3><strong>Article 6: LA CAUTION OU DEPOT DE GARANTIE</strong></h3><p><br></p><p>6.1 Le montant de la caution ou du dépôt de garantie est de : <strong>{{ MONTANT_CAUTION }} FCFA</strong></p><p><br></p><p>6.2 Le preneur a versé la somme de <strong>{{ AVANCE }} FCFA</strong> correspondant à une avance de <strong>{{ NBRE_MOIS }}</strong> mois de loyer.</p><p><br></p><p>6.3 Le dernier terme du loyer ne sera ni imputable sur le dépôt de garantie ; Celui-ci restera conservé à titre de sûreté de bonne exécution du présent bail;</p><p><br></p><p>6.4 Le preneur ne pourra exiger le remboursement de la caution ou du dépôt de garantie en fin de jouissance, dès complet déménagement,  remise de toutes les clés et des lieux en état initial d'occupation ; </p><p><br></p><h3><strong>Article 7: ENTRETIEN TRAVAUX REPARATIONS-REGLEMENTS D'IMMEUBLE</strong></h3><p><br></p><p>7.1 Le preneur entretiendra les lieux loués en bon état de réparation locative, en jouira en bon père de famille et les restituera en fin de bail en bon état.</p><p><br></p><p>7.2 Le preneur devra notamment refaire les badigeons, peinture de boiserie, des murs, portes, plafonnage, etc... conformément aux dispositions de l'article 1 754 code civil aussi souvent que besoin sera ;</p><p><br></p><p>7.3 Le bailleur ne sera tenu d'exécuter au cours du bail que les grosses réparations qui pourraient, conformément aux disposition de l'article 1 720 du code civil, devenir nécessaires, toute autre réparation quelle qu'elle soit restant à chaque charge du preneur qui en supportera les conséquences.</p><p><br></p><h3><strong>Article 8: CESSION DE BAIL SOUS LOCATION</strong></h3><p><br></p><p>8.1 Le présent bail est signé intuitu personnage, toute cession des droits au présent contrat, toute sous location est interdite ;</p><p><br></p><h3><strong>Article 9: REGLEMENT URBAIN</strong></h3><p><br></p><p>9.1 Le preneur satisfera à toutes les prescriptions de police, de voirie et d'hygiène ;</p><p><br></p><h3><strong>Article 10: ASSURANCES-RESPONSABILITES-RECOURS DIVERS</strong></h3><p><br></p><p>10.1 Le preneur est responsable de toutes dégradations commises, et de tous sinistres directs et indirects qui pourraient être survenus par lui, par les occupants de son chef, ou par des tiers quelconques se trouvant même momentanément sur les lieux loués par lui, ou ayant un rapport quelconque avec&nbsp;lui ;</p><p><br></p><p>10.2 Il sera particulièrement responsable et de plein droit, des dégâts causés en cours d'aménagement, ainsi que ceux résultant des activités des personnes effectuant pour son compte des travaux sur les lieux, ou celle des personnes vivants avec lui ;</p><p><br></p><p>10.3 Il renonce à tous recours en responsabilité contre le bailleur, et pourra exiger de ce dernier aucune indemnité, ni diminution de loyer dans les cas ci-après en cas d'interruption dans le service de l'eau, d'électricité, par suite d'accident ou d’événements indépendants de la volonté du bailleur ;</p><p><br></p><p><br></p><h3><strong>Article 11: VISITES-ACCES DES LIEUX-REMISE DES CLES</strong></h3><p><br></p><p>11.1 Le preneur après avoir été au moins vingt quatre (24) heures à l'avance, devra laissé le bailleur ( en personne ou celle de son représentant préposé ) visité les lieux loués chaque fois qu'il le jurera nécessaire, pour tous travaux, relevés, et inspections utiles;</p><p><br></p><p>11.2 Il devra également laisser pénétré les architectures ou entrepreneurs et leur personnel pour tous travaux rendus nécessaires ;</p><p><br></p><p><br></p><h3><strong>Article 12: ELECTRICITE-EAU-TELEPHONE-IMAGETV-INTERNET</strong></h3><p><br></p><p>12.1 Le preneur paiera directement au concessionnaire le montant des abonnement ou consommation d'eau, d'électricité, de téléphone, d'image TV et Internet ; il fera son affaire personnelle;</p><p><br></p><p>12.2 Consommation en eau:&nbsp;&nbsp;Le preneur s'engage à payer la somme de <strong> {{ FORFAIT_EAU }} FCFA </strong> par mois représentant le montant du forfait convenu.</p><p class=\"index_eau\">12.2 Consommation en eau:&nbsp;La consommation en eau du preneur sera calculée chaque mois sur la base des indexes qui seront relevés sur son compteur avec une facturation de <strong> {{ PU_EAU }} le KWh </strong>. A son entrée, l'index relevé est de <strong> {{ INDEX_EAU }}.</strong></p><p>12.3 Consommation en électricité:&nbsp;&nbsp;Le preneur s'engage à payer la somme de <strong>{{ FORFAIT_ELECTRICITE }} FCFA</strong> par mois représentant le montant du forfait convenu.</p><p class=\"index_electricite\">12.3 Consommation en électricité:&nbsp;La consommation en électricité du preneur sera calculée chaque mois sur la base des indexes qui seront relevés sur son compteur électrique avec une facturation de<strong> {{ PU_ELECTRICITE }} le KWh </strong> . A son entrée, l'index relevé est de <strong>{{ INDEX_ELECTRICITE }} . </strong></p><p><br></p><p><br></p><h3><strong>Article 13: TOLERENCES</strong></h3><p><br></p><p>13.1 Toutes tolérances de la part du bailleur, quelles qu'en aient pu être la fréquence et la durée au sujet des clause et conditions du présent accord, ne pourront jamais être considérés comme apportant des modifications ou suppressions de ces clauses et conditions, ni comme génératrice d'un droit quelconque ;</p><p><br></p><h3><strong>Article 14: CLAUSE RESOLUTOIRE - PRIVILEGE DU BAILLEUR</strong></h3><p><br></p><p>14.1 Les parties conviennent expressément que le présent bail sera considéré comme résilié de plein droit et le contrat éteint définitivement pour l'avenir, sans aucune formalité, entre elles dans les hypothèses ci-après :</p><p><br></p><p>&nbsp;&nbsp;&nbsp;a-) En cas du décès du preneur ,</p><p><br></p><p>	 b-) En&nbsp;cas de non paiement à son écheance&nbsp;d'un seul terme de loyer, ou d'une quelconque somme due en vertu des présentes et huit jours après sommation de payer restée infructueuse ;</p><p><br></p><p><br></p><p>14.2 Dans tous les cas de résiliation, sans préjudice des autres voies de droit, le mobilier garnissant les lieux loués, pourra au gré du bailleur, être séquestré sur place ou dans un garde meuble, aux frais, risque et périls sur requête signés par Monsieur le Président du Tribunal de Première Instance de Yaoundé EKOUNOU, à charge de lui en référé en cas de difficultés ;</p><p><br></p><p>&nbsp;&nbsp;&nbsp;</p><p>14.3 Le séquestre du mobilier fait conformément à la clause ci-dessus pourra être levé, soit par accords amiable signés entre les parties, soit à la suite d'une procédure judiciaire définitive de liquidation de l'intégralité des droits du bailleur.</p><p><br></p><p><br></p><p>14.4 En cas de résiliation amiable, les parties acceptent organiser dans les accords écrits particuliers les modalités de liquidation des droits de chacune d'elles, celle-ci pouvant prévoir qu'il soit défalqué la caution ou du dépôt de garantie, indépendamment des loyers, arriérés de loyers et accessoires, les frais de remise des locaux en état, et plus généralement toute somme due,</p><p><br></p><p><br></p><p><br></p><h3><strong>Article 15: DELAISSEMENT FORCE DE L'IMMEUBLE OU EXPULSION</strong></h3><p><br></p><p>	15.1 Après extinction du présent bail, ou en cas d'acquisition définitive de la clause résolutoire, le délaissement forcé de l'immeuble sera poursuivi et exécuté suivant la simple procédure de référé engagé devant le Tribunal de Première Instance de Yaoundé Ekounou ;</p><h2><br></h2><h3><strong>Article 16: OCCUPATION DES LIEUX APRES CESSATION OU RESILIATION DU BAIL</strong></h3><p><br></p><p>	16.1 Au cas où après cessation ou résiliation du bail, et pour quelque cause que ce soient, les lieux ne seraient pas restitués en l'état au bailleur, et libre de toute occupation, il lui sera dû une indemnité contractuelle d'occupation ;</p><h2><br></h2><h3><strong>Article 17: ELECTION DE DOMICILE - ATTRIBUTION DE COMPETENCE</strong></h3><p><br></p><p>	17.1 Pour l'exécution des présentes, les parties font élection de domicile à leur adresse respective à Yaoundé</p><p><br></p><p>	17.2 A défaut d'accords écrit particuliers amiables terminant tout litige entre les parties en cours d'exécution du présent bail, le président du Tribunal de Première Instance de Yaoundé Ekounou ou tout juge délégué par lui, siègent en chambre de conseil, ou en matière d'urgence est la juridiction contractuelle unique pour trancher tout différend né entre les parties;</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p>",
     check2:true,
     modeleContratVide:{
        idModele:0,
        idUtilisateur:"",
        libelleModele:"Modèle Vide",
        contenu:"<h1><br></h1><h1 class=\"ql-align-center\"><strong>CONTRAT DE BAIL</strong></h1>"
     },
    showOverlay2:false,
    contrats:[],
    selectedContrat: 0,
    logements:[],
    locataires:[],
    showOverlay:false,
    requiredLoyer:true,
    requiredAvance:true,
    requiredCaution:true,
    requiredLoyer:true,
    requiredMode:true,
    requiredLogement:true,
    requiredLocataire:true,
    requiredELectricite:true,
    requiredEau:true,
    requiredPuEau:true,
    requiredPuEnergie:true,
    requiredIndex:true,
    /*données manipulées du fait de l'appel du fait
    *de l'appel du formulaire de création d'un occupation 
    *à différents endroits
    */
   disabled:false,
   stateLocataire:null,
   payoptions: [{ text: 'Prépayé', value: 'prepayer' }, { text: 'Postpayé', value: 'postpayer' }],
   eauoptions: [{ value: 'index', text: 'Index' }, { value: 'forfait', text: 'Forfait' },],
  }),
  watch: {
    selected_index_logement(value) {
        const logement = this.logements[value]

        this.occupation.idLogement = logement.idLogement;
        this.indexEnergie = (logement.lastIndexEnergie) ? logement.lastIndexEnergie.nouveau : 0
        this.indexEau = (logement.lastIndexEau) ? logement.lastIndexEau.nouveau : 0
    },
     selected_index_locataire(value) {
      this.occupation.idLocataire = this.locataires[value].idLocataire;
    },
    loyer(value)  {
        this.occupation.loyer = value
    }
  },
    computed: {
        logementSelected() {
            return this.logements.find(elt => elt.idLogement == this.occupation.idLogement)
        },
        loyer: {
            get() {
                const logement = this.logementSelected
                if (!logement) {
                    return 0;
                }
                return (logement.prixMin + logement.prixMax) / 2
            },
            set(value) {
                this.occupation.loyer = value
            }      
        },
        indexEnergie: {
            get() {
                const logement = this.logementSelected
                if (logement && logement.lastIndexEnergie) {
                    return logement.lastIndexEnergie.nouveau
                }
                return 0
            },
            set(value) {
               this.occupation.indexEnergie = value
            }
        },
        indexEau: {
            get() {
                const logement = this.logementSelected
                if (logement && logement.lastIndexEau) {
                    return logement.lastIndexEau.nouveau
                }
                return 0
            },
            set(value) {
              this.occupation.indexEau = value
            }
        },
        ...mapGetters(['user'])
    },
  methods: {
    /**emission évènement pour fermer le formulaire
     * de création d'une annonce et basculer à la création préalable d'un logement
     */
    createLogement(){
      this.$emit('createLogementSecond') 
    },
    /**emission évènement pour fermer le formulaire de création d'une occupation
     *  et basculer à la création préalable d'un locataire
     */
    createLocataire(){
      this.$emit('createLocataire') 
    },
    empty(val) {
        return php.empty(val)
    },
    contratSelect(item, index){
        this.selectedContrat = index
        console.log(item)
        this.showOverlay2=true;
        setTimeout(() => {
                this.content=this.fillData(item.contenu)
                this.showOverlay2=false;
        }, 2000)
      
    },

    /**
     * Set l'image du carousel lorsqu'on change le logement
     */
    setSlide_logement(value) {
        for (let index = 0; index < this.logements.length; index++) {
            const logement = this.logements[index]
            if (logement.idLogement == value) {
                this.$refs.logementCarousel.setSlide(index);
                this.indexEnergie = (logement.lastIndexEnergie) ? logement.lastIndexEnergie.nouveau : 0
                this.indexEau = (logement.lastIndexEau) ? logement.lastIndexEau.nouveau : 0
                break;
            }
        }
    },
    setSlide_locataire(value) {
      for (let index = 0; index < this.locataires.length; index++) {
        if (this.locataires[index].idLocataire == value) {
            console.log(this.locataires[index])
            this.locataireSelect = this.locataires[index]
          this.$refs.locataireCarousel.setSlide(index);
          break;
        }
      }
    },

    resetModal() {
      this.occupation = {
        loyer: "",
        mode: "",
        energie: "index",
        eau: "index",
        puEnergie: "",
        puEau: "",
        idLogement: "",
        debut:"",
        indexEnergie: 0,
        indexEau: 0,
        dureeBail:"",
        caution:0,

        endLastBail: false
      };
      if(this.provenance !=2){
        this.occupation.idLocataire=''
        this.occupation.idLogement=''
      }
    },
    //méthodes liées au form-wizard
    setLoading: function(value) {
        this.loadingWizard = value
    },
    validateFirst:function() {
        return new Promise((resolve, reject) => {
            
            if(!this.occupation.idLogement || !this.occupation.idLocataire){
                if(!this.occupation.idLogement){this.requiredLogement=false;}
                else {this.requiredLogement=true;}
                if(!this.occupation.idLocataire){this.requiredLocataire=false;}
                else{this.requiredLocataire=true;}
        
                this.check0=false
            }else{
                this.check0=true
            }
        setTimeout(() => {
            resolve(this.check0)
        }, 1000)
        })
    },
    validateSecond:function() {
        return new Promise((resolve, reject) => {
            
            if((!this.occupation.loyer || !this.occupation.avance  || !this.occupation.mode || !this.occupation.caution)&&this.editOccupation==null){
                
                if(!this.occupation.loyer){this.requiredLoyer=false;}
                else {this.requiredLoyer=true;}
                if(!this.occupation.avance){this.requiredAvance=false;}
                else{this.requiredAvance=true;}
                if(!this.occupation.mode){this.requiredMode=false;}
                else{this.requiredMode=true;}
                if(!this.occupation.caution){
                    console.log('entrée ici 1')
                    this.requiredCaution=false;}
                else{this.requiredCaution=true;}
                if(!this.occupation.puEnergie){this.requiredPuEnergie=false;}
                else{this.requiredPuEnergie=true;}
                if(!this.occupation.puEau){this.requiredPuEau=false;}
                else{this.requiredPuEau=true;}
                this.check2=false
            }else{
                this.check2=true
            }
            //pré-remplissage du modèle de contrat avec remplacement des différentes clés
            this.content = this.fillData(this.content)
            
            console.log('entrée ici 2')
            setTimeout(() => {
                resolve(this.check2)
            }, 1000)
        })
    },
    getAdresse(logement, key) {
        if (!php.empty(logement.adresse)) {
            return logement.adresse[key]
        }
        if (!php.empty(logement.batiment)) {
            if (!php.empty(logement.batiment.adresse)) {
                return logement.batiment.adresse[key]
            }
        }
        return '..............'
    },
    fillData(content){
        console.log('debug1')
            let logementSelect = this .logements.find(x => x.idLogement === this.occupation.idLogement)
            let locataireSelect = this.locataires.find(x => x.idLocataire === this.occupation.idLocataire)
            console.log('logementSelect',  logementSelect.caracteristiques)
            let caract = ""
                for (let i = 0; i < logementSelect.caracteristiques.length; i++) {
                    let nbre
                    if(logementSelect.caracteristiques[i].valeur==""||logementSelect.caracteristiques[i].valeur==null){
                        nbre=1
                    }else{
                        nbre=logementSelect.caracteristiques[i].valeur
                    }
                    caract = caract + nbre +  logementSelect.caracteristiques[i].libelleCaracteristique + ' ,'
                }
            console.log('debug2')
            let ancienContent=content;
            let newContent=ancienContent.replace('{{  NOM_BAILLEUR }}',this.user.profil.titre+'. '+this.user.nom+' '+this.user.prenom || '..............')
                           .replace('{{  CNI_BAILLEUR }}' ,this.user.profil.cni || '..............')
                           .replace('{{  TEL_BAILLEUR }}' ,this.user.tel || '..............')
                           .replace('{{ LOGEMENT_ADRESSE_PAYS}}' , this.getAdresse(logementSelect, 'pays'))
                           .replace('{{ LOCATAIRE_NOMS_PRENOMS }}' ,locataireSelect.titre+' '+locataireSelect.nomLocataire+' '+locataireSelect.prenomLocataire)
                           .replace('{{ LOCATAIRE_DATE_NAISSANCE  }}' ,locataireSelect.dateNaiss || '.............')
                           .replace('{{ LOCATAIRE_CNI }}' ,locataireSelect.cniLocataire || '.............')
                           .replace('{{ LOCATAIRE_TEL  }}' ,locataireSelect.tel || '..............')
                           .replace('{{ CONTRAT_DUREE }}' ,this.occupation.dureeBail || '.............')
                           .replace('{{ PRIX_LOYER }}' ,this.occupation.loyer || '.............')
                           .replace('{{ MONTANT_CAUTION }}' ,this.occupation.caution || '.............')
                           .replace('{{ AVANCE }}' ,this.occupation.avance * this.occupation.loyer || '.............')
                           .replace('{{ CARACTERISTIQUES_LOGEMENT }}' ,caract)
                           .replace('{{ NBRE_MOIS }}' ,this.occupation.avance || '.............')
                           .replace('{{ LOGEMENT_ADRESSE_QUARTIER }}' ,this.getAdresse(logementSelect, 'quartier'))
                           .replace('{{ LOGEMENT_ADRESSE_VILLE }}' ,this.getAdresse(logementSelect, 'ville'))
                           .replace('{{ LOGEMENT_ADRESSE_VILLE }}' ,this.getAdresse(logementSelect, 'ville'))
                           .replace('{{ LOGEMENT_ADRESSE_QUARTIER }}' ,this.getAdresse(logementSelect, 'quartier'))
                           .replace('{{ REF_LOGEMENT }}' ,logementSelect.refLogement || '.............');
            console.log('debug3')
            let p1 = document.querySelector(".forfait_eau");
            let p2 = document.querySelector(".index_eau");
            let p3 = document.querySelector(".forfait_electricite");
            let p4 = document.querySelector(".index_electricite");
            console.log('debug4')
            console.log('p1', p1)
            console.log('p2', p2)
            console.log('p3', p3)
            console.log('p4', p4)
            if(this.occupation.eau=='index'){
                if(p1!=null&&p1!=undefined){
                    console.log('entreé 2')
                    newContent=newContent.replace(p1.innerHTML,'')
                           .replace('{{ PU_EAU }}',this.occupation.puEau || '.............')
                           .replace('{{ INDEX_EAU }}',this.occupation.indexEau || '.............')
                }
            }
            if(this.occupation.eau=='forfait'){
                if(p2!=null&&p2!=undefined){
                     newContent=newContent.replace(p2.innerHTML,'')
                          .replace('{{ FORFAIT_EAU }}',this.occupation.puEau || '.............')
                          console.log('contenu p2',p2.innerHTML || '.............')
                }
            }
            if(this.occupation.energie=='index'){
                if(p3!=null&&p3!=undefined){
                    newContent=newContent.replace(p3.innerHTML,'')
                           .replace('{{ PU_ELECTRICITE }}',this.occupation.puEnergie || '.............')
                           .replace('{{ INDEX_ELECTRICITE }}',this.occupation.indexEnergie || '.............')
                    console.log('contenu p3',p3.innerHTML)
                }
            }
            if(this.occupation.energie=='forfait'){
                if(p4!=null&&p4!=undefined){
                    newContent=newContent.replace(p4.innerHTML,'')
                          .replace('{{ FORFAIT_ELECTRICITE }}',this.occupation.puEnergie || '.............')
                    console.log('contenu p4',p4.innerHTML)
                }
            }
            console.log('debug5')
            return  newContent;
    },
    //validation formulaire d'ajout/modification d'ajout d'une occupation
    onComplete() {
        //bvModalEvt.preventDefault();
            this.occupation.contrat=this.content;
            console.log(this.occupation);
        if (this.action == "add") {
            this.showOverlay = true;

            axios.post('occupations', this.occupation).then(response => {
                this.$emit('occupationAdded')
                this.resetModal();
                console.log(response);
                this.showOverlay = false;
                return App.notifySuccess(response.message)
            }).catch(error => {
                this.showOverlay = false;
                return  App.alertError(error.message)
            })
        }
        if(this.action=='edit'){
                console.log('nouvelle occupation',this.occupation)
                axios.put(`occupations/${ this.editOccupation.idOccupation}`,this.occupation).then(response =>{
                    if (!response.success) {
                        this.showOverlay=false;
                        return App.alertError(response.message)
                    }
                    this.resetModal()
                    this.showOverlay=false;
                    this.editOccupation=null;
                    this.$emit("editSuccessfull", response.result);
                    return App.notifySuccess(response.message)
                     
                })
                .catch(error => {
                    this.showOverlay=false;
                    notif.error(error.message);
                });
            }
    },

   async getInitialiseData(){
     this.showOverlay = true
        try {
            //this.logements = await axios.get("logements").then(response => response.result || []);
    
                this.logements = await axios.get("logements").then(response => response.result.sort((a,b) => (a.refLogement > b.refLogement) ? 1 : ((b.refLogement > a.refLogement) ? -1 : 0)) || []);
                if (this.logements[0]) {
                    const logement = this.logements[0]
                    this.occupation.idLogement = logement.idLogement;

                    if (logement.lastIndexEnergie) {
                        this.indexEnergie = logement.lastIndexEnergie.nouveau
                    }
                    if (logement.lastIndexEau) {
                        this.indexEau = logement.lastIndexEau.nouveau
                    }
                    this.loyer = (logement.prixMin + logement.prixMax) / 2
                }
                } catch (error) {
                    notif.error(error.message);
                }
            if(this.provenance!=2){
                try {
                    this.locataires=await axios.get("locataires").then(response => response.result.sort((a,b) => (a.nomLocataire > b.nomLocataire) ? 1 : ((b.nomLocataire > a.nomLocataire) ? -1 : 0)) || []);
                if (this.locataires[0]) {
                    this.occupation.idLocataire = this.locataires[0].idLocataire;
                }
                } catch (error) {
                notif.error(error.message);
                }
            }
            this.contrats = await axios.get("modeles-contrats").then(response => response.result || []);
            this.contrats.push(this.modeleContratVide)
            if(this.contrats.length>0)
           this.content=this.contrats[0].contenu;
            this.showOverlay = false
    },

    //reinitialisation du formulaire de création d'une occupation
    resetModal() {
        this.occupation = {
            loyer: null, mode: null, energie: "index", eau: "index",
            puEnergie: null, puEau: null, idLogement: null, idLocataire: null, debut: null, indexEnergie: 0,
            indexEau: 0, endLastBail: false, avance: 1, contrats: null, dureeBail: 0,
            caution: 1
        }
        //this.editOccupation=null;
        this.action='add'
        this.$emit('closeOccupationModal');
    },
  
  },
  async mounted() {
    await this.getInitialiseData();
    if(this.locataire !=null){
        this.provenance=2
        this.disabled=true;
      this.stateLocataire=this.locataire;
      this.occupation.idLocataire = this.locataire.idLocataire
    }

    if(this.editOccupation){
            console.log("provenance = édition", this.editOccupation)
           this.occupation.idLogement= this.editOccupation.idLogement; 
           this.occupation.idLocataire= this.editOccupation.idLocataire;

            this.setSlide_logement(this.occupation.idLogement)
           this.setSlide_locataire(this.occupation.idLocataire)

           this.occupation.loyer=this.editOccupation.loyerBase; 
           this.occupation.caution=this.editOccupation.caution; 
           this.occupation.mode=this.editOccupation.modePaiement; 
           this.occupation.debut=this.editOccupation.dateDeb; 
           this.occupation.energie=this.editOccupation.modeEnergie; 
           this.occupation.eau=this.editOccupation.modeEau; 
           this.occupation.puEnergie=this.editOccupation.puEnergie; 
           this.occupation.puEau=this.editOccupation.puEau; 
           this.occupation.dureeBail=this.editOccupation.dureeBail; 

           this.$refs['occupationForm'].activateAll();
       }


  }
};
</script>
<style scoped>

.is-red{
    border-color:red;
}

.text-form-annone {
  font-family: "font-1", sans-serif;
  font-size: 2.1em;
  color: #0a0701fa;
  
}
 .disabled {
    pointer-events:none;
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;   
 }
     .leloader,.leloader:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
    }
.templateChoix{
    height: 120px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
}
.contratTheme{
    height: 150px;
    width: 100%;
    cursor: pointer;
    margin-bottom: 100px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 12px;
    border-radius: 5px;
}
.contratType{
    background: #191c22;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: 500;
    /* border-left: rgb(231, 76, 60) solid;
    border-right: rgb(231, 76, 60) solid; */
    overflow: hidden;
    height: 60px;
    width: 148px !important;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.contratType.active-contrat{
    background-color: rgb(231, 76, 60);
}

.contratType.active-contrat span{
    font-weight: 900;
}


.contratImage{
    height: 90%;
    width: 100%;
}
.contratImage img {
    height: 100%;
    width: 100%;
}
.well-display{
    margin-top:4em;
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