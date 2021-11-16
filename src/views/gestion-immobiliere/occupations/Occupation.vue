<template>
    <div>
        <div class="row justify-content-between positionner">
                <b-button variant="outline-info" class="mr-1 positionner1" @click.prevent="showContrat"><i class="ik ik-eye"></i>Consulter le contrat</b-button>
                <b-button variant="outline-warning" class="mr-1 positionner2" @click.prevent="$emit('makeUpdate', occupation)"><i class="ik ik-edit-1"></i>Editer l'occupation</b-button>
            <div class="card col-lg-3 col-md-12 col-sm-12">
                <div class="card-body">
                    <div class="text-center"> 
                        <h4 class="card-title">Occupation n° {{ occupation.idOccupation }}</h4>
                        <div v-if="occupation.dateFin == null">
                            <b-badge variant="warning" v-if=" _calcul_impayes('total') > 0">Bail en cours</b-badge>
                            <b-badge variant="success" v-else>Bail en cours</b-badge>
                        </div>
                        <div v-else>
                            <b-badge variant="danger">Bail terminé le <br> {{ $date(occupation.dateFin).format('DD MMMM YYYY') }}</b-badge>
                        </div>
                    </div>
                </div>
                <div class="card-body pt-0">                         
                    <div v-if="totalImpayes > 0" class="d-flex align-items-center justify-content-between">
                        <hr class="w-25 bg-danger"> Aperçu <hr class="w-25 bg-danger">
                    </div>
                    <div v-if="totalImpayes > 0" class="jumbotron pt-10 pb-10 px-2">
                        <dl class="row mb-0 text-muted">
                            <dd class="mt-1 col-1"><i class="fa fa-money-bill"></i></dd>
                            <dt class="mt-1 col-10 truncate" v-b-tooltip.right="'Impayés de loyer'">{{ _calcul_impayes('loyer') + ' F' }}</dt>
                            <dd class="mt-1 col-1"><i class="fa fa-lightbulb"></i></dd>
                            <dt class="mt-1 col-10 truncate" v-b-tooltip.right="'Impayés de lumière'">{{ _calcul_impayes('energie') + ' F' }}</dt>
                            <dd class="mt-1 col-1"><i class="fa fa-water"></i></dd>
                            <dt class="mt-1 col-10 truncate" v-b-tooltip.right="'Impayés d\'eau'">{{ _calcul_impayes('eau') + ' F' }}</dt>
                            <dd class="mt-1 col-1"><i class="fa fa-file-invoice"></i></dd>
                            <dt class="mt-1 col-10 truncate font-weight-bold" v-b-tooltip.right="'Impayés de charges'">{{ _calcul_impayes('charges') + ' F' }}</dt>
                            <dd class="mt-1 col-1"><i class="fa fa-dollar-sign"></i></dd>
                            <dt class="mt-1 col-10 truncate font-weight-bold" v-b-tooltip.right="'Total des impayés'" :class="{'text-danger' : totalImpayes > 10000}">{{ totalImpayes + ' F' }}</dt>
                        </dl>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <hr class="w-25 bg-danger"> Locataire <hr class="w-25 bg-danger">
                    </div>
                    <span class="d-inline-block w-100 mb-1 text-center">{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }}</span>    
                    <span class="d-inline-block w-100 mb-1 text-center text-muted">{{ occupation.locataire.profession }}</span>    
                    <div class="jumbotron pt-10 pb-10 px-2">
                        <dl class="row text-muted">
                            <div class="d-flex pl-3 w-100">
                                <dd class="mt-1"><i class="fa fa-id-card"></i></dd>
                                <dt class="mt-1 ml-3 truncate" v-b-tooltip="'Numéro de CNI'">{{ occupation.locataire.cniLocataire }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100">
                                <dd class="mt-1"><i class="fa fa-phone"></i></dd>
                                <dt class="mt-1 ml-3 truncate" v-b-tooltip="'Numéro de téléphone'">{{ occupation.locataire.tel + ' / ' + occupation.locataire.tel2 }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100">
                                <dd class="mt-1"><i class="fa fa-envelope"></i></dd>
                                <dt class="mt-1 ml-3 truncate" v-b-tooltip="'Email'">{{ occupation.locataire.email + ' / ' + occupation.locataire.email2 }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100">
                                <dd class="mt-1"><i class="fas fa-calendar-alt"></i></dd>
                                <dt class="mt-1 ml-3 truncate" v-b-tooltip="'Date de naissance'">{{ $date(occupation.locataire.dateNaiss).format('DD MMMM YYYY') }}</dt>
                            </div>
                        </dl>
                        <b-button :to="{name: 'habitants', query: {target: occupation.locataire.idLocataire}}" size="sm" block variant="outline-secondary">Voir le dossier</b-button>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <hr class="w-25 bg-danger">Logement<hr class="w-25 bg-danger">
                    </div>
                    <span class="d-inline-block w-100 mb-1 text-center">{{ occupation.logement.refLogement }}</span>    
                    <span class="d-inline-block w-100 mb-1 text-center text-muted">{{ occupation.logement.sousTypeLogement.libelleSousType }}</span>    
                    <div class="jumbotron pt-10 pb-10 px-2">
                        <dl class="row text-muted">
                            <div class="d-flex pl-3 w-100">
                                <dd class="mt-1"><i class="fa fa-dollar-sign"></i></dd>
                                <dt class="mt-1 ml-3 truncate" v-b-tooltip="'Plage de loyer'">{{ occupation.logement.prixMin + 'F' }} - {{ occupation.logement.prixMax + 'F' }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100">
                                <dd class="mt-1"><i class="fa fa-map-marker-alt"></i></dd>
                                <dt class="mt-1 ml-3 truncate" v-b-tooltip="'Localisation'">{{ occupation.logement.adresse.ville + ' ' + occupation.logement.adresse.pays }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100">
                                <dd v-if="occupation.logement.batiment" class="mt-1"><i class="fa fa-building"></i></dd>
                                <dt v-if="occupation.logement.batiment" class="mt-1 ml-3 truncate" v-b-tooltip="'Batiment'">{{ occupation.logement.batiment.nomBatiment }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100">
                                <dd v-if="occupation.logement.batiment" class="mt-1"><i class="fas fa-city"></i></dd>
                                <dt v-if="occupation.logement.batiment" class="mt-1 ml-3 truncate" v-b-tooltip="'Cité'">{{ occupation.logement.batiment.cite.nomCite }}</dt>
                            </div>
                        </dl>
                        <b-button :to="{name: 'logements', query: {target: occupation.logement.idLogement}}" size="sm" block variant="outline-secondary">Voir les details</b-button>
                    </div>
                </div>
            </div>
            <div class="card col-lg-9 col-md-12 col-sm-12">
                <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist" >
                    <li class="nav-item">
                        <a class="nav-link active font-weight-bold h6" data-toggle="pill" href="#generalites">Généralités</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link font-weight-bold h6" data-toggle="pill" href="#loyers">Loyers</a>
                    </li>
                      <li class="nav-item">
                        <a class="nav-link font-weight-bold h6" data-toggle="pill" href="#charges">charges</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link font-weight-bold h6" data-toggle="pill" href="#indexes">Indexes</a>
                    </li>
                    <li class="nav-item"><a class="nav-link font-weight-bold h6" data-toggle="pill" href="#comptes">Comptes</a></li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="generalites">
                        <div class="card-body">
                            <h4 class="border-bottom h1">Informations</h4>
                            <b-row class="mb-1 row">
                                <div class="text-dark pt-2 rounded col-lg-6 col-md-12 col-sm-12 my-2" style="background: #fff;">
                                    <dl class="row" >
                                        <dd class="mt-1 col-6 h6 font-weight-bold ">Loyer</dd>
                                        <dt class="mt-1 col-6"> <span class="" style="">{{ occupation.loyerBase + ' FCFA' }}</span> </dt>
                                        <dd class="mt-1 col-6 h6 font-weight-bold">Mode de paiement</dd>
                                        <dt class="mt-1 col-6"><span class="" style=""> {{ occupation.modePaiement }}</span></dt>
                                        <dd class="mt-1 col-6 h6 font-weight-bold">Date de début du bail</dd>
                                        <dt class="mt-1 col-6">{{ $date(occupation.dateDeb).format('dddd, DD MMMM YYYY') }}</dt>
                                        <dd class="mt-1 col-6 h6 font-weight-bold" v-if="occupation.dateFin">Date de fin du bail</dd>
                                        <dt class="mt-1 col-6" v-if="occupation.dateFin">{{ $date(occupation.dateFin).format('dddd, DD MMMM YYYY') }}</dt>
                                        <dd class="mt-1 col-6 h6 font-weight-bold">Occupation créée le</dd>
                                        <dt class="mt-1 col-6">{{ $date(occupation.createdAt).format('dddd, DD MMMM YYYY HH:mm') }}</dt>
                                    </dl>
                                </div>
                                <div class="text-dark pt-2 rounded col-lg-6 col-md-12 col-sm-12 my-2" style="background: #fff;">
                                    <dl class="row">
                                        <dd class="mt-1 col-6 h6 font-weight-bold">Nombre de mois d'avance</dd>
                                        <dt class="mt-1 col-6"> <span class="" style="">{{ occupation.loyerBase + ' FCFA' }}</span></dt>
                                        <dd class="mt-1 col-6 h6 font-weight-bold">Caution payée</dd>
                                        <dt class="mt-1 col-6"><span class="" style=""> {{ occupation.modePaiement }}</span></dt>
                                        <dd class="mt-1 col-6 h6 font-weight-bold">Facturation d'energie</dd>
                                        <dt class="mt-1 col-6">{{ occupation.puEnergie + 'F' }} par {{ occupation.modeEnergie == 'index' ? 'kw' : 'mois' }}</dt>
                                        <dd class="mt-1 col-6 h6 font-weight-bold">Facturation d'eau</dd>
                                        <dt class="mt-1 col-6">{{ occupation.puEau + 'F' }} par <span v-if="occupation.modeEau == 'index'">m<sup>3</sup></span><span v-else>mois</span></dt>
                                    </dl>
                                </div>
                            </b-row>
                            <div class="border-bottom d-flex justify-content-between mb-2">
                                <h4 class="h1">Comptes</h4>
                                <b-button-group>
                                    <b-button class="float-right btn-icon" v-b-tooltip="'Effectuer une recharge'" @click.prevent="$bvModal.show('rechargeCompte')"><i class="fa fa-charging-station"></i></b-button>
                                    <b-button class="float-right btn-icon" v-b-tooltip="'Créer compte'" @click.prevent="$bvModal.show('creerCompte')"><i class="fa fa-plus"></i></b-button>
                                </b-button-group>
                            </div>
                            <dl class="row my-2" v-for="(compte, i) in occupation.comptes" :key="compte.idCompte || i">
                                <dd class="col-5 h6">Compte : <span class="font-weight-bold" style="color: #f5365c;">{{ compte.typeCompte }}</span></dd>
                                <dt class="col-7 fa-lg text-primary">{{ compte.solde }} F</dt>
                            </dl>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="indexes">
                        <b-container class="my-3">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><a class="nav-link" :class="{'active' : tab_indexe == 'eau'}" @click.prevent="tab_indexe = 'eau'" data-toggle="pill" href="#">Indexes d'eau</a></li>
                                <li class="nav-item"><a class="nav-link" :class="{'active' : tab_indexe == 'energie'}" @click.prevent="tab_indexe = 'energie'" data-toggle="pill" href="#">Indexes d'électricité</a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade show active mt-1">
                                    <b-table  sticky-header="600px" striped hover responsive :items="indexes" :fields="[
                                        { key: 'mois', label: 'Mois', sortable: true },
                                        { key: 'annees', label: 'Année', sortable: true },
                                        { key: 'nouveau', label: 'Indexe courant', sortable: true },
                                        { key: 'ancien', label: 'Ancien indexe', sortable: true },
                                        { key: 'consommation', label: 'Consommation', sortable: true },
                                        { key: 'montant', label: 'Montant', sortable: true },
                                        { key: 'show_details', label: 'Details' }
                                    ]">
                                        <template #cell(mois)="data">{{ $dayjs(data.item.periode).format('MMMM')}}</template>
                                        <template #cell(annees)="data">{{ $dayjs(data.item.periode).format('YYYY')}}</template>
                                        <template #cell(consommation)="data">{{ data.item.nouveau - data.item.ancien }}</template>
                                        <template #cell(montant)="data"><span :class="{'text-success': _calcul_consommation_indexe(data.item, tab_indexe) <= data.item.avance, 'text-warning': _calcul_consommation_indexe(data.item, tab_indexe) > data.item.avance, 'text-danger': empty(data.item.avance)}">
                                            {{ _calcul_consommation_indexe(data.item, tab_indexe) }} F
                                        </span></template>
                                        <template #cell(show_details)="row"><b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails"></b-form-checkbox></template>
                                        <template #row-details="row">
                                            <b-card class="m-0">
                                                <b-row>
                                                    <b-col>
                                                        <dl class="row text-muted">
                                                            <dd class="mt-1 col-5">Avance</dd>
                                                            <dt class="mt-1 col-7">{{ empty(row.item.avance) ? '0 F' : row.item.avance + ' F' }}</dt>
                                                            <dd class="mt-1 col-5">Reste</dd>
                                                            <dt class="mt-1 col-7">{{ empty(row.item.reste) ? '0 F' : row.item.reste + ' F' }}</dt>
                                                        </dl>
                                                    </b-col>
                                                    <b-col>
                                                        <dl class="row text-muted">
                                                            <dd class="mt-1 col-5">Statut</dd>
                                                            <dt class="mt-1 col-7">
                                                                <b-badge variant="danger" v-if="empty(row.item.avance)">Non payé</b-badge>
                                                                <b-badge variant="warning" v-else-if="_calcul_consommation_indexe(row.item, tab_indexe) > row.item.avance">Avancé</b-badge>
                                                                <b-badge variant="success" v-else>Payé</b-badge>
                                                            </dt>
                                                            <dd class="mt-1 col-5">Date de paiement</dd>
                                                            <dt class="mt-1 col-7">{{ empty(row.item.datePaiement) ? 'Non disponible' : $date(row.item.datePaiement).format('DD MMMM YYYY') }}</dt>
                                                        </dl>
                                                    </b-col>
                                                </b-row>
                                            </b-card>
                                        </template>
                                    </b-table>
                                </div>
                            </div>
                        </b-container>    
                    </div>

                    <div class="tab-pane fade " id="loyers">
                        <b-container><b-table  sticky-header="600px" striped hover responsive :items="occupation.loyers" :fields="[
                            { key: 'mois', label: 'Mois', sortable: true },
                            { key: 'annees', label: 'Année', sortable: true },
                            { key: 'montant', label: 'Montant à payer', sortable: true },
                            { key: 'montantPayer', label: 'Montant payé', sortable: true },
                            { key: 'observation', label: 'Observation' },
                        ]">
                            <template #cell(mois)="data">{{ $dayjs(data.item.periode).format('MMMM')}}</template>
                            <template #cell(annees)="data">{{ $dayjs(data.item.periode).format('YYYY')}}</template>
                            <template #cell(montant)="data"> {{ data.item.montant }} F</template>
                            <template #cell(montantPayer)="data"> {{ data.item.montantPayer }} F</template>
                            <template #cell(observation)="data"> 
                                <b-badge variant="danger" v-if="empty(data.item.montantPayer) || data.item.montantPayer <= 0">Impayé</b-badge>
                                <b-badge variant="warning" v-else-if="data.item.montantPayer < data.item.montant">Avancé</b-badge>
                                <b-badge variant="success" v-else>Payé le {{ $dayjs(data.item.datePaiement).format('DD MMMM YYYY') }}</b-badge>
                            </template>
                        </b-table></b-container>
                    </div> 

                    <!--GESTION DES CHARGES -->
                    <div class="tab-pane fade " id="charges">
                        <b-container>
                            <div class="d-flex align-items-center justify-content-end mb-1"><btnAdd  message="Nouvelle charge" v-b-modal.chargeForm /></div>
                            <b-overlay :show="showOverlayTable" rounded="sm"><b-table sticky-header="600px" striped hover responsive :items="occupation.charges" :fields="[
                                { key: 'mois', label: 'Mois', sortable: true },
                                { key: 'annees', label: 'Année', sortable: true },
                                { key: 'montant', label: 'A payer', sortable: true },
                                { key: 'montantPayer', label: 'Payé', sortable: true },
                                { key: 'observation', label: 'Observation' },
                                { key: 'statut', label: 'Statut'},
                                { key: 'Action', label: 'Action'},
                            ]">
                                <template #cell(mois)="data">{{ $dayjs(data.item.periode).format('MMMM')}}</template>
                                <template #cell(annees)="data">{{ $dayjs(data.item.periode).format('YYYY')}}</template>
                                <template #cell(montant)="data"> {{ data.item.montant }} F</template>
                                <template #cell(montantPayer)="data"> {{ data.item.montantPayer }} F</template>
                                <template #cell(observation)="data"> 
                                    <b-badge variant="danger" v-if="empty(data.item.montantPayer) || data.item.montantPayer <= 0">Impayé</b-badge>
                                    <b-badge variant="warning" v-else-if="data.item.montantPayer < data.item.montant">Avancé</b-badge>
                                    <b-badge variant="success" v-else>Payé le {{ $dayjs(data.item.datePaiement).format('DD MMMM YYYY') }}</b-badge>
                                </template>
                                <template #cell(statut)="data"> 
                                    <b-badge variant="success"  v-if="data.item.etatCharge">Actif</b-badge>
                                    <b-badge variant="danger" v-else>Terminé</b-badge>
                                </template>
                                <template #cell(action)="row"> 
                                    <b-dropdown size="sm" right>
                                        <template #button-content><i class="fa fa-ellipsis-h"></i></template>
                                        <b-dropdown-item href="#" @click.prevent="changeState(row.item)">{{ row.item.etatCharge ? 'Marquer comme terminée' : 'Activer la charge' }}</b-dropdown-item>
                                        <b-dropdown-item href="#" @click.prevent="buyCharge(row.item)">Payer</b-dropdown-item>
                                        <b-dropdown-divider />
                                        <b-dropdown-item href="#" @click="row.toggleDetails">Détails</b-dropdown-item>
                                    </b-dropdown>
                                </template>
                                <template #row-details="row">
                                    <b-card class="m-0">
                                        <div class="d-flex justify-content-end">
                                            <a href="#" @click="row.toggleDetails" class="text-danger"><i class="fa fa-times"></i></a>
                                        </div>
                                        <dl>
                                            <dt>Nature de la charge</dt>
                                            <dd>{{ row.item.typeCharge.libelle }}</dd>
                                        </dl>
                                        <dl>
                                            <dt>Description</dt>
                                            <dd><p>{{ row.item.observation }}</p></dd>
                                        </dl>
                                    </b-card>
                                </template>
                            </b-table></b-overlay>
                        </b-container>
                    </div> 
                </div>
            </div>
        </div>
         <!--MODAL POUR AJOUTER OU MODIFIER UNE CHARGE-->
        <b-modal id="chargeForm" size="sm" hide-footer no-close-on-backdrop>
            <template #modal-title>
            <span class="ml-4 text-form-charge">{{ title }}</span>
            </template>
            <div>
                <charge-form :action="action" :occupation="occupation"/>
            </div>
        </b-modal>

        <!--MODAL RECHARGER UN COMPTE -->
        <b-modal id="rechargeCompte" size="sm" title="Recharge de compte" @hidden="resetForm" @ok="doRecharge" @show="() => { recharge.idCompte = occupation.comptes.find(elt => elt.typeCompte.toLowerCase() == 'principal').idCompte }">
            <template #modal-footer="{ ok, cancel }">
                <b-button size="sm" @click="cancel()">Annuler</b-button>
                <b-button size="sm" variant="danger" @click="ok()" :disabled="submitted">Valider <b-spinner v-if="submitted" small /></b-button>
            </template>
            <b-form-group label="Compte à recharger">
                <b-form-select v-model="recharge.idCompte" :options="occupation.comptes" value-field="idCompte" text-field="typeCompte" />
            </b-form-group>
            <b-form-group label="Montant de la recharge">
                <b-form-input type="number" min="1" placeholder="Ex: 5000" v-model="recharge.montant" />
            </b-form-group>
        </b-modal>
        <!--MODAL CREER UN COMPTE -->
        <b-modal id="creerCompte" size="sm" title="Créer un compte à l'occupation" @hidden="resetForm" @ok="createCompte">
            <template #modal-footer="{ ok, cancel }">
                <b-button size="sm" @click="cancel()">Annuler</b-button>
                <b-button size="sm" variant="danger" @click="ok()" :disabled="submitted">Valider <b-spinner v-if="submitted" small /></b-button>
            </template>
            <b-form-group label="Label du compte">
                <b-form-input v-model="creerCompte.typeCompte" placeholder="Ex: Lumière" />
            </b-form-group>
            <b-form-group label="Solde initial">
                <b-form-input type="number" min="1" placeholder="Ex: 5000" v-model="creerCompte.solde" />
            </b-form-group>
        </b-modal>

        <!--MODAL PAYER UNE CHARGE -->
        <b-modal id="payerCharge" size="sm" title="Règlement de la charge" @hidden="resetForm" @ok="payCharge">
            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="danger" @click="ok()" :disabled="submitted">Valider <b-spinner v-if="submitted" small /></b-button>
            </template>
            <b-form-group label="Montant" description="Entrez le montant à préléver dans le compte">
                <b-form-input type="number" min="1" placeholder="Ex: 5000" v-model="payerCharge.montant" />
            </b-form-group>
        </b-modal>

        <!--MODAL POUR VOIR LE CONTRAT DE BAIL -->
        <b-modal id="payerCharge" size="sm" title="Règlement de la charge" @hidden="resetForm" @ok="payCharge">
            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="danger" @click="ok()" :disabled="submitted">Valider <b-spinner v-if="submitted" small /></b-button>
            </template>
            <b-form-group label="Montant" description="Entrez le montant à préléver dans le compte">
                <b-form-input type="number" min="1" placeholder="Ex: 5000" v-model="payerCharge.montant" />
            </b-form-group>
        </b-modal>
    </div>
</template>

<script>
import chargeForm from "@/views/finances/charges/chargeForm.vue";
const php = require('phpjs')

export default {
    data:() =>({
        submitted: false,
        recharge: {idCompte: null, montant: null},
        creerCompte: {typeCompte: null, solde: 0},
        payerCharge: {montant: 0, idCharge: null},

        tab_indexe: 'eau',
        title:'Ajouter une charge',
        action:"add",
        showOverlayTable:false
    }),
    props: {
        occupation: {type: Object, required: true}
    },
    components: {
        chargeForm
    },

     computed: { 
        indexes() {
            return this.indexes_type(this.tab_indexe).sort((a, b) => {
                  return this.$dayjs().diff(b.periode) - this.$dayjs().diff(a.periode)
            })
        },
        totalImpayes() {
            return this._calcul_impayes('total')
        }
    },
    beforeMount() {
       /*  axios.get(`occupations/${this.$route.params.id}`).then(response => response.result || {}).then(occupation => {
            this.occupation = occupation
        }) */
    },
    mounted(){
        console.log(this.occupation)
        this.$root.$on("new-charge", newCharge => {
            this.occupation.charges.unshift(newCharge);
            this.$bvModal.hide('chargeForm');
            console.log('nouvelle charge ajoutée')
    });

    },
    methods: {
        empty: (val) => php.empty(val),


        indexes_type(type) {
            return this.occupation.indexes.filter(elt => elt.typeIndexe == type)
        },
        /**
         * Formatteur du montant totale de la consommation via les indexe
         */
        _calcul_consommation_indexe(indexe, type) {
            let mode = this.occupation.modeEau, 
                pu = this.occupation.puEau,
                consommation = 1
                
            if (type == 'energie') {
                mode = this.occupation.modeEnergie
                pu = this.occupation.puEnergie
            }

            if (mode == 'index') {
                consommation = indexe.nouveau - indexe.ancien
            }

            return consommation * pu
        },

        _calcul_impayes(type) {
            let total = 0;
            
            if (type == 'loyer') {
                this.occupation.loyers.forEach(elt => {
                    total += elt.montant - elt.montantPayer
                })
            }
            else if (type == 'charges') {
                this.occupation.charges.forEach(elt => {
                    total += elt.montant - elt.montantPayer
                })
            }
            else if (type == 'total') {
                total = this._calcul_impayes('loyer') + this._calcul_impayes('eau') + this._calcul_impayes('energie') + this._calcul_impayes('charges')
            }
            else {
                this.indexes_type(type).forEach(elt => {
                    elt.avance = parseInt(elt.avance || 0)
                    total += this._calcul_consommation_indexe(elt, type) - elt.avance
                });
            }
            return total
        },
        /**
         * mise à jour de la liste des charges lors de l'ajout d'une charge
         */
        pushCharge(){
            console.log('nouvelle charge ajoutée');
            this.occupation.charges.unshift(response.result)
        },
        /**
         * changer le statut d'une charge
         */
        changeState(charge){
            this.showOverlayTable=true;
            let url='/charges/'+charge.idCharge+'/change-state'
            axios.put(url).then(response =>{
                if (!response.success) {
                    this.showOverlayTable=false;
                    return App.alertError(response.message)
                }

                let url2='occupations/'+charge.idOccupation+'/charges'
                axios.get(url2).then(response => response.result || []).then(charges => {
                    this.occupation.charges=charges;
            })
              this.showOverlayTable=false;

                return App.notifySuccess(response.message)
                    
            })
        
        },

        /**
         * Execute la recharge
         */
        doRecharge(bvModalEvt) {
            bvModalEvt.preventDefault()

            if (php.empty(this.recharge.idCompte) || php.empty(this.recharge.montant)) {
                return App.error('Veuillez remplir tous les champs du formulaire')
            }
            this.submitted = true
            axios.post('comptes/' + this.recharge.idCompte + '/recharge', this.recharge).then(response => {
                this.occupation.comptes = this.occupation.comptes.map(elt => {
                    if (elt.idCompte == this.recharge.idCompte) {
                        elt.solde += parseInt(this.recharge.montant)
                    }
                    return elt
                })
                this.$bvModal.hide('rechargeCompte')
                this.$emit('change', this.occupation)
                return App.notifySuccess(response.message)
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message)
            })
        },
        /**
         * 
         */
        createCompte(bvModalEvt) {
            bvModalEvt.preventDefault()

            if (php.empty(this.creerCompte.typeCompte) || php.empty(this.creerCompte.solde)) {
                return App.error('Veuillez remplir tous les champs du formulaire')
            }
            const data = {...this.creerCompte, idOccupation: this.occupation.idOccupation}
            this.submitted = true
            axios.post('comptes', data).then(response => {
                this.occupation.comptes.push(response.result)
                this.$bvModal.hide('creerCompte')
                this.$emit('change', this.occupation)
                return App.notifySuccess(response.message)
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message)
            })
        },

        buyCharge(charge) {
            this.payerCharge.idCharge = charge.idCharge
            this.payerCharge.montant = charge.montant - charge.montantPayer
            this.$bvModal.show('payerCharge')
        },
        payCharge(bvModalEvt) {
            bvModalEvt.preventDefault()
            if (php.empty(this.payerCharge.montant)) {
                return App.error('Veuillez entrer le montant à payer')
            }
            this.submitted = true 
            axios.put('charges/' + this.payerCharge.idCharge + '/buy', {montant: this.payerCharge.montant}).then(async(response) => {
                this.occupation.charges = await axios.get('occupations/'+this.occupation.idOccupation+'/charges').then(res => res.result || [])
                this.occupation.comptes = await axios.get('occupations/'+this.occupation.idOccupation+'/comptes').then(res => res.result || [])
                this.submitted = false 
                this.$bvModal.hide('payerCharge')
                return App.notifySuccess(response.message)
            }).catch(error => {
                this.submitted = false 
                return App.alertError(error.message)
            })
        },


        resetForm() {
            this.recharge = {idCompte: null, montant: null}
            this.creerCompte = {typeCompte: null, solde: 0}
            this.payerCharge = {montant: 0, idCharge: null}
            this.submitted = false
        },
        //traitement affichage du contrat de bail
        showContrat(){
            console.log('contrat',this.occupation)
            this.$emit('showDetails', this.occupation)
        }

    }
    
}
</script>
<style scoped>
.text-form-charge {
    font-size: 1em;
    color: #212121ef;
    font-weight: 800;
    text-align: center;
    margin-top: 2px;
}

.positionner{
    position: relative;
}
.positionner1{
    position: absolute;
    top:-5%;
    left: 48%;
}
.positionner2{
    position: absolute;
    top:-5%;
    left: 62%;
}

</style>