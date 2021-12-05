<template>
    <div>
        <div class="row justify-content-between positionner">
            <!--
                <b-button v-if="canViewContrat" variant="outline-info" class="mr-1 positionner1" @click.prevent="showContrat"><i class="ik ik-eye"></i> {{$t('data.occupation_consulter_contrat')}} </b-button>
                <b-button v-if="canUpdateOccupation" variant="outline-warning" class="mr-1 positionner2" @click.prevent="$emit('makeUpdate', occupation)"><i class="ik ik-edit-1"></i>{{$t('data.occupation_editer_occupation')}}</b-button>
            -->            
            <div class="card col-lg-3 col-md-12 col-sm-12">
                <div class="card-body">
                    <div class="text-center"> 
                        <h4 class="card-title">{{$t('data.occupation_occupation_numero')}} {{ occupation.idOccupation }}</h4>
                        <div v-if="occupation.dateFin == null">
                            <b-badge variant="warning">{{$t('data.occupation_bail_en_cours')}}</b-badge>
                             <!--<b-button variant="danger" @click="showMsgBoxTwo" class="ml-2 p-1 mt-1 mb-0" v-b-tooltip.top="$t('data.occupation_cloturer_bail')"><i class="fas fa-eject"></i></b-button>-->
                             <!-- <button type="button" class="btn btn-icon btn-dark ml-1" v-b-tooltip.top="$t('data.occupation_cloturer_bail')" @click="showMsgBoxTwo"><i class="ik ik-target"></i></button> -->
                        </div>
                        <div v-else>
                            <b-badge variant="danger">{{$t('data.occupation_bail_termine_le')}}<br> {{ $date(occupation.dateFin).format('DD MMMM YYYY') }}</b-badge>
                        </div>
                    </div>
                </div>
                <div class="card-body pt-0">                         
                    <div v-if="occupation.impayerTotal > 0" class="d-flex align-items-center justify-content-between">
                        <hr class="w-25 bg-danger"> Aperçu des impayés <hr class="w-25 bg-danger">
                    </div>
                    <div v-if="totalImpayes > 0" class="jumbotron pt-10 pb-10 px-2">
                        <dl class="row mb-0 text-muted">
                            <dd class="mt-1 col-5 pr-0"><i style="width: 1.5em" class="d-inline-block fa fa-money-bill"></i> Loyer</dd>
                            <dt class="mt-1 col-7 pl-1 truncate font-weight-bold fa-lg" v-b-tooltip.right="$t('data.occupation_impayer_loyer')">{{ occupation.impayerLoyer + ' F' }}</dt>
                            <dd class="mt-1 col-5 pr-0"><i style="width: 1.5em" class="d-inline-block fa fa-lightbulb"></i> Lumière</dd>
                            <dt class="mt-1 col-7 pl-1 truncate font-weight-bold fa-lg" v-b-tooltip.right="$t('data.occupation_impayer_lumiere')">{{ occupation.impayerEnergie + ' F' }}</dt>
                            <dd class="mt-1 col-5 pr-0"><i style="width: 1.5em" class="d-inline-block fa fa-water"></i> Eau</dd>
                            <dt class="mt-1 col-7 pl-1 truncate font-weight-bold fa-lg" v-b-tooltip.right="$t('data.occupation_impayer_eau')">{{ occupation.impayerEau + ' F' }}</dt>
                            <dd class="mt-1 col-5 pr-0"><i style="width: 1.5em" class="d-inline-block fa fa-file-invoice"></i> Charges</dd>
                            <dt class="mt-1 col-7 pl-1 truncate font-weight-bold fa-lg" v-b-tooltip.right="$t('data.occupation_impayer_charges')">{{ occupation.impayerCharges + ' F' }}</dt>
                            <dd class="mt-1 col-5 pr-0"><i style="width: 1.5em" class="d-inline-block fa fa-dollar-sign"></i> Total</dd>
                            <dt class="mt-1 col-7 pl-1 truncate font-weight-bold fa-lg" v-b-tooltip.right="$t('data.occupation_total_impayer')" :class="{'text-danger' : totalImpayes > 10000}">{{ occupation.impayerTotal + ' F' }}</dt>
                        </dl>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <hr class="w-25 bg-danger">{{$t('data.occupation_locataire')}} <hr class="w-25 bg-danger">
                    </div>
                    <span class="d-inline-block w-100 mb-1 text-center h4">{{ occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }}</span>    
                    <span class="d-inline-block w-100 mb-1 text-center text-muted">{{ occupation.locataire.profession }}</span>    
                    <div class="jumbotron pt-10 pb-10 px-2">
                        <dl class="row text-muted">
                            <div class="d-flex pl-3 w-100" v-if="!empty(occupation.locataire.cniLocataire)">
                                <dd class="mt-1"><i class="fa fa-id-card"></i></dd>
                                <dt class="mt-1 ml-3 truncate fa-lg" :v-b-tooltip="$t('data.occupation_numero_cni')">{{ occupation.locataire.cniLocataire }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100" v-if="!empty(occupation.locataire.tel) || !empty(occupation.locataire.tel2)">
                                <dd class="mt-1"><i class="fa fa-phone"></i></dd>
                                <dt class="mt-1 ml-3 truncate fa-lg" :v-b-tooltip="$t('data.occupation_numero_telephone')">{{ occupation.locataire.tel + ' / ' + occupation.locataire.tel2 }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100" v-if="!empty(occupation.locataire.email) || !empty(occupation.locataire.email2)">
                                <dd class="mt-1"><i class="fa fa-envelope"></i></dd>
                                <dt class="mt-1 ml-3 truncate fa-lg" :v-b-tooltip="$t('data.occupation_email')">{{ occupation.locataire.email + ' / ' + occupation.locataire.email2 }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100" v-if="!empty(occupation.locataire.dateNaiss)">
                                <dd class="mt-1"><i class="fas fa-calendar-alt"></i></dd>
                                <dt class="mt-1 ml-3 truncate fa-lg" :v-b-tooltip="$t('data.occupation_date_naissance')">{{ $date(occupation.locataire.dateNaiss).format('DD MMMM YYYY') }}</dt>
                            </div>
                        </dl>
                        <b-button :to="{name: 'habitants', query: {target: occupation.locataire.idLocataire}}" size="sm" block variant="outline-secondary">{{$t("data.occupation_voir_dossier")}}</b-button>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <hr class="w-25 bg-danger">{{$t('data.occupation_logement')}}<hr class="w-25 bg-danger">
                    </div>
                    <span class="d-inline-block w-100 mb-1 text-center h4">{{ occupation.logement.refLogement }}</span>    
                    <span class="d-inline-block w-100 mb-1 text-center text-muted">{{ occupation.logement.sousTypeLogement.libelleSousType }}</span>    
                    <div class="jumbotron pt-10 pb-10 px-2">
                        <dl class="row text-muted">
                            <div class="d-flex pl-3 w-100">
                                <dd class="mt-1"><i class="fa fa-dollar-sign"></i></dd>
                                <dt class="mt-1 ml-3 truncate fa-lg" :v-b-tooltip="$t('data.occupation_voir_plage_loyer')">{{ occupation.logement.prixMin + 'F' }} - {{ occupation.logement.prixMax + 'F' }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100">
                                <dd class="mt-1"><i class="fa fa-map-marker-alt"></i></dd>
                                <dt class="mt-1 ml-3 truncate fa-lg" :v-b-tooltip="$t('data.occupation_localisation')">{{ localisation }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100">
                                <dd class="mt-1" v-if="occupation.logement.batiment"><i class="fa fa-building"></i></dd>
                                <dt class="mt-1 ml-3 truncate fa-lg" v-if="occupation.logement.batiment" :v-b-tooltip="$t('data.occupation_batiment')">{{ occupation.logement.batiment.nomBatiment }}</dt>
                            </div>
                            <div class="d-flex pl-3 w-100">
                                <dd class="mt-1" v-if="occupation.logement.batiment"><i class="fas fa-city"></i></dd>
                                <dt class="mt-1 ml-3 truncate fa-lg" v-if="occupation.logement.batiment" :v-b-tooltip="$t('data.occupation_cite')">{{ occupation.logement.batiment.cite.nomCite }}</dt>
                            </div>
                        </dl>
                        <b-button :to="{name: 'logements', query: {target: occupation.logement.idLogement}}" size="sm" block variant="outline-secondary">{{$t("data.occupation_voir_details")}}</b-button>
                    </div>
                </div>
            </div>
            <div class="card col-lg-9 col-md-12 col-sm-12">
                <ul class="nav nav-pills custom-pills" id="pill-options" role="tablist" >
                    <li class="nav-item">
                        <a class="nav-link active font-weight-bold h6" data-toggle="pill" href="#generalites">{{$t('data.occupation_generalite')}}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link font-weight-bold h6" data-toggle="pill" href="#loyers">{{$t('data.occupation_loyers')}}</a>
                    </li>
                      <li class="nav-item">
                        <a class="nav-link font-weight-bold h6" data-toggle="pill" href="#charges">{{$t('data.occupation_charges')}}</a>
                    </li>
                    <li class="nav-item" v-if="occupation.modeEau == 'index' || occupation.modeEnergie == 'index'">
                        <a class="nav-link font-weight-bold h6" data-toggle="pill" href="#indexes">{{$t('data.occupation_indexes')}}</a>
                    </li>
                    <li class="nav-item"><a class="nav-link font-weight-bold h6" data-toggle="pill" href="#depots">Dépôts</a></li>
                    <li class="nav-item" v-if="canViewContrat"><a class="nav-link font-weight-bold h6" data-toggle="pill" href="#contrat">Contrat</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle font-weight-bold pb-0 h6" data-toggle="dropdown" href="#">Options &nbsp;<i class="fa-sm fas fa-caret-down"></i></a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item font-weight-bold" href="#" @click.prevent="$bvModal.show('chargeForm')"><i class="fa fa-file-invoice"></i> Ajouter une charge</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item font-weight-bold" href="#" @click.prevent="$bvModal.show('reglerImpayer')"><i class="fa fa-dollar-sign"></i> Regler les impayés</a>
                            <a class="dropdown-item font-weight-bold" href="#" @click.prevent="$bvModal.show('rechargeCompte')"><i class="fa fa-charging-station"></i> Recharger le compte</a>
                            <!-- <a class="dropdown-item font-weight-bold" href="#" @click.prevent="$bvModal.show('creerCompte')"><i class="fa fa-plus"></i> Ajouter un compte</a> -->
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item font-weight-bold" href="#" @click.prevent="$emit('makeUpdate', occupation)" v-if="canUpdateOccupation"><i class="ik ik-edit-1"></i> {{$t('data.occupation_editer_occupation')}}</a>
                            <a class="dropdown-item font-weight-bold" href="#" @click.prevent="showMsgBoxTwo" v-if="occupation.dateFin == null"><i class="fas fa-eject"></i> {{ $t('data.occupation_cloturer_bail') }}</a>
                        </div>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="generalites">
                        <div class="card-body">
                            <h4 class="border-bottom">{{$t('data.occupation_informations')}}</h4>
                            <b-row class="mb-1 row">
                                <div class="text-dark pt-2 rounded col-lg-6 col-md-12 col-sm-12 my-2" style="background: #fff;">
                                    <dl class="row" >
                                        <dd class="mt-1 col-5">Solde</dd>
                                        <dt class="mt-1 col-7 font-weight-bold fa-lg"> <span class="" style="">{{ occupation.solde + ' FCFA' }}</span> </dt>
                                        <dd class="mt-1 col-5">{{$t('data.occupation_informations_loyer')}}</dd>
                                        <dt class="mt-1 col-7 font-weight-bold fa-lg"> <span class="" style="">{{ occupation.loyerBase + ' FCFA' }}</span> </dt>
                                        <dd class="mt-1 col-5">{{$t('data.occupation_informations_mode_paiement')}}</dd>
                                        <dt class="mt-1 col-7 font-weight-bold fa-lg"><span class="" style=""> {{ occupation.modePaiement }}</span></dt>
                                        <dd class="mt-1 col-5">Début du bail</dd>
                                        <dt class="mt-1 col-7 font-weight-bold fa-lg">{{ $date(occupation.dateDeb).format('DD MMMM YYYY') }}</dt>
                                        <dd class="mt-1 col-5" v-if="occupation.dateFin">{{$t("data.occupation_informations_date_fin_bail")}}</dd>
                                        <dt class="mt-1 col-7 font-weight-bold fa-lg" v-if="occupation.dateFin">{{ $date(occupation.dateFin).format('DD MMMM YYYY') }}</dt>
                                    </dl>
                                </div>
                                <div class="text-dark pt-2 rounded col-lg-6 col-md-12 col-sm-12 my-2" style="background: #fff;">
                                    <dl class="row">
                                        <dd class="mt-1 col-5">{{$t('data.occupation_caution_payee')}}</dd>
                                        <dt class="mt-1 col-7 font-weight-bold fa-lg"><span class="" style=""> {{ occupation.caution + ' FCFA' }}</span></dt>
                                        <dd class="mt-1 col-5">P.U Lumière</dd>
                                        <dt class="mt-1 col-7 font-weight-bold fa-lg">{{ occupation.puEnergie + 'F' }} / {{ occupation.modeEnergie == 'index' ? 'kw' : 'mois' }}</dt>
                                        <dd class="mt-1 col-5">P.U Eau</dd>
                                        <dt class="mt-1 col-7 font-weight-bold fa-lg">{{ occupation.puEau + 'F' }} / <span v-if="occupation.modeEau == 'index'">m<sup>3</sup></span><span v-else>{{$t('data.occupation_mois')}}</span></dt>
                                        <dd class="mt-1 col-5" v-if="!empty(occupation.dureeBail)">{{$t('data.occupation_duree_prevu_bail')}}</dd>
                                        <dt class="mt-1 col-7 font-weight-bold fa-lg" v-if="!empty(occupation.dureeBail)"> <span class="" style="">{{ occupation.dureeBail + ' ' + $t('data.occupation_mois') }}</span></dt>
                                        <dd class="mt-1 col-5">{{$t("data.occupation_cree_le")}}</dd>
                                        <dt class="mt-1 col-7 font-weight-bold fa-lg">{{ $date(occupation.createdAt).format('DD MMMM YYYY - HH:mm') }}</dt>                                        
                                    </dl>
                                </div>
                            </b-row>
                            <h4 class="border-bottom">Graphes</h4>
                            <div>

                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="indexes" v-if="occupation.modeEau == 'index' || occupation.modeEnergie == 'index'">
                        <b-container class="my-3">
                            <ul class="nav nav-tabs">
                                <li class="nav-item" v-if="'index' == occupation.modeEau"><a class="nav-link" :class="{'active' : tab_indexe == 'eau'}" @click.prevent="tab_indexe = 'eau'" data-toggle="pill" href="#">{{$t('data.occupation_indexes_eau')}}</a></li>
                                <li class="nav-item" v-if="'index' == occupation.modeEnergie"><a class="nav-link" :class="{'active' : tab_indexe == 'energie'}" @click.prevent="tab_indexe = 'energie'" data-toggle="pill" href="#">{{$t('data.occupation_indexes_electricte')}}</a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade show active mt-1">
                                    <b-table  sticky-header="600px" striped hover responsive :items="indexes" :fields="[
                                        { key: 'mois', label: $t('data.occupation_mois'), sortable: true },
                                        { key: 'annees', label: $t('data.occupation_annee'), sortable: true },
                                        { key: 'nouveau', label: $t('data.occupation_index_courant'), sortable: true },
                                        { key: 'ancien', label: $t('data.occupation_ancien_index'), sortable: true },
                                        { key: 'consommation', label: $t('data.occupation_consommation'), sortable: true },
                                        { key: 'montant', label: $t('data.occupation_montant'), sortable: true },
                                        { key: 'show_details', label: $t('data.occupation_details') }
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
                                                            <dd class="mt-1 col-5">{{$t('data.occupation_avance')}}</dd>
                                                            <dt class="mt-1 col-7">{{ empty(row.item.avance) ? '0 F' : row.item.avance + ' F' }}</dt>
                                                            <dd class="mt-1 col-5">{{$t('data.occupation_reste')}}</dd>
                                                            <dt class="mt-1 col-7">{{ empty(row.item.reste) ? '0 F' : row.item.reste + ' F' }}</dt>
                                                        </dl>
                                                    </b-col>
                                                    <b-col>
                                                        <dl class="row text-muted">
                                                            <dd class="mt-1 col-5">{{$t('data.occupation_status')}}</dd>
                                                            <dt class="mt-1 col-7">
                                                                <div class="d-flex" v-if="_calcul_consommation_indexe(row.item, tab_indexe) == 0">
                                                                    <b-badge>{{$t('data.occupation_consommation_non_consomme')}}</b-badge>
                                                                </div>
                                                                <div class="d-flex" v-else-if="empty(row.item.avance)">
                                                                    <b-badge variant="danger">{{$t('data.occupation_consommation_non_payer')}}</b-badge>
                                                                    <b-button class="ml-1 py-1" size="sm" @click.prevent="buyIndexe(row.item, tab_indexe)" v-b-tooltip="'Payer maintenant'"><i class="fa fa-coins"></i></b-button>
                                                                </div>
                                                                <div class="d-flex" v-else-if="_calcul_consommation_indexe(row.item, tab_indexe) > row.item.avance">
                                                                    <b-badge variant="warning">{{$t('data.occupation_avancer')}}</b-badge>
                                                                    <b-button class="ml-1 py-1" size="sm" @click.prevent="buyIndexe(row.item, tab_indexe)" v-b-tooltip="'Completer le paiement'"><i class="fa fa-coins"></i></b-button>
                                                                </div>
                                                                <b-badge variant="success" v-else>{{$t('data.occupation_payer')}}</b-badge>
                                                            </dt>
                                                            <dd class="mt-1 col-5">{{$t('data.occupation_date_paiement')}}</dd>
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
                            { key: 'mois', label: $t('data.occupation_mois'), sortable: true },
                            { key: 'annees', label: $t('data.occupation_annee'), sortable: true },
                            { key: 'montant', label: $t('data.occupation_montant_a_payer'), sortable: true },
                            { key: 'montantPayer', label: $t('data.occupation_montant_paye'), sortable: true },
                            { key: 'observation', label: $t('data.occupation_observation') },
                        ]">
                            <template #cell(mois)="data">{{ $dayjs(data.item.periode).format('MMMM')}}</template>
                            <template #cell(annees)="data">{{ $dayjs(data.item.periode).format('YYYY')}}</template>
                            <template #cell(montant)="data"> {{ data.item.montant }} F</template>
                            <template #cell(montantPayer)="data"> {{ data.item.montantPayer }} F</template>
                            <template #cell(observation)="data"> 
                                <div class="d-flex" v-if="empty(data.item.montantPayer) || data.item.montantPayer <= 0">
                                    <b-badge variant="danger">{{$t('data.occupation_consommation_non_payer')}}</b-badge>
                                    <b-button class="ml-1 py-1" size="sm" @click.prevent="buyLoyer(data.item)" :v-b-tooltip="$t('data.occupation_tooltip_payer_maintenant')"><i class="fa fa-coins"></i></b-button>
                                </div>
                                <div class="d-flex"  v-else-if="data.item.montantPayer < data.item.montant">
                                    <b-badge variant="warning">{{$t('data.occupation_avancer')}}</b-badge>
                                    <b-button class="ml-1 py-1" size="sm" @click.prevent="buyLoyer(data.item)" :v-b-tooltip="$t('data.occupation_tooltip_completer_paiement')"><i class="fa fa-coins"></i></b-button>
                                </div>
                                <b-badge variant="success" v-else>{{$t('data.occupation_payer_le')}} {{ $dayjs(data.item.datePaiement).format('DD MMMM YYYY') }}</b-badge>
                            </template>
                        </b-table></b-container>
                    </div> 

                    <!--GESTION DES CHARGES -->
                    <div class="tab-pane fade " id="charges">
                        <b-container>
                            <b-overlay :show="showOverlayTable" rounded="sm"><b-table sticky-header="600px" striped hover responsive :items="occupation.charges" :fields="[
                                { key: 'periode', label: 'Période', sortable: true },
                                { key: 'nature', label: 'Nature', sortable: true },
                                { key: 'montant', label: $t('data.occupation_a_payer'), sortable: true },
                                { key: 'montantPayer', label: $t('data.occupation_payer'), sortable: true },
                                { key: 'observation', label: $t('data.occupation_observation') },
                                { key: 'statut', label: $t('data.occupation_status')},
                                { key: 'Action', label: $t('data.batiment_form_label_action')},
                            ]">
                                <template #cell(periode)="data">{{ $dayjs(data.item.periode).format('MMMM YYYY') }}</template>
                                <template #cell(nature)="data">{{ data.item.typeCharge.libelle }}</template>
                                <template #cell(montant)="data"> {{ data.item.montant }} F</template>
                                <template #cell(montantPayer)="data"> {{ data.item.montantPayer }} F</template>
                                <template #cell(observation)="data"> 
                                    <b-badge variant="danger" v-if="empty(data.item.montantPayer) || data.item.montantPayer <= 0">{{$t('data.occupation_consommation_non_payer')}}</b-badge>
                                    <b-badge variant="warning" v-else-if="data.item.montantPayer < data.item.montant">{{$t('data.occupation_avancer')}}</b-badge>
                                    <b-badge variant="success" v-else>{{$t('data.occupation_payer_le')}} {{ $dayjs(data.item.datePaiement).format('DD MMMM YYYY') }}</b-badge>
                                </template>
                                <template #cell(statut)="data"> 
                                    <b-badge variant="success"  v-if="data.item.etatCharge">{{$t('data.occupation_actif')}}</b-badge>
                                    <b-badge variant="danger" v-else>{{$t('data.occupation_terminer')}}</b-badge>
                                </template>
                                <template #cell(action)="row"> 
                                    <b-dropdown size="sm" right>
                                        <template #button-content><i class="fa fa-ellipsis-h"></i></template>
                                        <b-dropdown-item href="#" @click.prevent="changeState(row.item)">{{ row.item.etatCharge ? $t('data.occupation_marquer_comme_terminer') : $t('data.occupation_activer_charge') }}</b-dropdown-item>
                                        <b-dropdown-item href="#" @click.prevent="buyCharge(row.item)">{{$t('data.occupation_charge_payer')}}</b-dropdown-item>
                                        <b-dropdown-divider />
                                        <b-dropdown-item href="#" @click="row.toggleDetails">{{$t('data.occupation_details')}}</b-dropdown-item>
                                    </b-dropdown>
                                </template>
                                <template #row-details="row">
                                    <b-card class="m-0">
                                        <div class="d-flex justify-content-end">
                                            <a href="#" @click="row.toggleDetails" class="text-danger"><i class="fa fa-times"></i></a>
                                        </div>
                                        <dl>
                                            <dt>{{$t('data.occupation_description_charge')}}</dt>
                                            <dd><p>{{ row.item.observation }}</p></dd>
                                        </dl>
                                    </b-card>
                                </template>
                            </b-table></b-overlay>
                        </b-container>
                    </div> 

                    <div class="tab-pane fade " id="depots">
                        <b-container>
                            <b-overlay :show="showOverlayTable" rounded="sm"><b-table sticky-header="600px" striped hover responsive :items="occupation.depots" :fields="[
                                { key: 'date', label: 'Date du dépôt', sortable: true },
                                { key: 'montant', label: 'Montant du dépôt', sortable: true },
                                { key: 'compte', label: 'Compté crédité', sortable: true },
                                { key: 'observation', label: $t('data.occupation_observation') },
                            ]">
                                <template #cell(date)="data">{{ $dayjs(data.item.dateDepot).format('dddd, DD MMM YYYY - HH:mm') }}</template>
                                <template #cell(montant)="data"> {{ data.item.montant }} F</template>
                                <template #cell(observation)="data"> {{ data.item.description | truncate(75) }}</template>
                            </b-table></b-overlay>
                        </b-container>
                    </div> 

                    <div class="tab-pane fade" id="contrat">
                        <contrat-occupation :occupation="occupation" />                   
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
        <b-modal id="rechargeCompte" size="sm" :title="$t('data.occupation_recharger_compte')" @hidden="resetForm" @ok="doRecharge" @show="() => { recharge.idCompte = occupation.comptes.find(elt => elt.typeCompte.toLowerCase() == 'principal').idCompte }">
            <template #modal-footer="{ ok, cancel }">
                <b-button size="sm" @click="cancel()">{{$t('data.occupation_recharger_compte_annuler')}}</b-button>
                <b-button size="sm" variant="danger" @click="ok()" :disabled="submitted">{{$t('data.cite_valider_cite')}} <b-spinner v-if="submitted" small /></b-button>
            </template>
            <b-form-group :label="$t('data.occupation_compte_a_recharger')">
                <b-form-select v-model="recharge.idCompte" :options="occupation.comptes" value-field="idCompte" text-field="typeCompte" />
            </b-form-group>
            <b-form-group :label="$t('data.occupation_montant_de_la_recharge')">
                <b-form-input type="number" min="1" :placeholder="$t('data.occupation_montant_de_la_recharge_exemple')" v-model="recharge.montant" />
            </b-form-group>
            <b-form-group label="Observation">
                <b-form-textarea placeholder="Vous pouvez ajouter une observation pour cette recharge" v-model="recharge.description" rows="2" max-rows="4" />
            </b-form-group>
            <b-form-group label="Date">
                <date-picker v-model="recharge.dateDepot" placeholder="Quand est-ce que vous avez perçu l'argent" format="dddd, DD MMMM YYYY" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
            </b-form-group>
        </b-modal>
        <!--MODAL CREER UN COMPTE -->
        <b-modal id="creerCompte" size="sm" :title="$t('data.occupation_creer_compte_pour_occupation')" @hidden="resetForm" @ok="createCompte">
            <template #modal-footer="{ ok, cancel }">
                <b-button size="sm" @click="cancel()">{{$t('data.occupation_recharger_compte_annuler')}}</b-button>
                <b-button size="sm" variant="danger" @click="ok()" :disabled="submitted">Valider <b-spinner v-if="submitted" small /></b-button>
            </template>
            <b-form-group :label="$t('data.occupation_creer_compte_label_compte')">
                <b-form-input v-model="creerCompte.typeCompte" :placeholder="$t('data.occupation_creer_compte_label_compte_exemple')" />
            </b-form-group>
            <b-form-group :label="$t('data.occupation_creer_compte_solde_initial')">
                <b-form-input type="number" min="1" :placeholder="$t('data.occupation_creer_compte_solde_initial_exemple')" v-model="creerCompte.solde" />
            </b-form-group>
        </b-modal>

        <!--MODAL PAYER UNE CHARGE -->
        <b-modal id="payerCharge" size="sm" :title="$t('data.occupation_payer_charge_titre')" @hidden="resetForm" @ok="payCharge">
            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="danger" @click="ok()" :disabled="submitted">{{$t('data.cite_valider_cite')}} <b-spinner v-if="submitted" small /></b-button>
            </template>
            <b-form-group :label="$t('data.occupation_payer_charge_montant')" :description="$t('data.occupation_payer_charge_description')">
                <b-form-input type="number" min="1" :placeholder="$t('data.occupation_payer_charge_description_exemple')" v-model="payerCharge.montant" />
            </b-form-group>
        </b-modal>

        <!--MODAL POUR PAYER UN INDEXE -->
        <b-modal id="payerIndexe" size="sm" :title="$t('data.occupation_reglement_indexe_titre')" @hidden="resetForm" @ok="payIndexe">
            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="danger" @click="ok()" :disabled="submitted">{{$t('data.cite_valider_cite')}} <b-spinner v-if="submitted" small /></b-button>
            </template>
            <b-form-group :label="$t('data.occupation_payer_charge_montant')" :description="$t('data.occupation_payer_charge_description')">
                <b-form-input type="number" min="1" :placeholder="$t('data.occupation_payer_charge_description_exemple')" v-model="payerIndexe.montant" />
            </b-form-group>
        </b-modal>

        <!--MODAL POUR PAYER UN LOYER -->
        <b-modal id="payerLoyer" size="sm" :title="$t('data.occupation_reglement_loyer_titre')" @hidden="resetForm" @ok="payLoyer">
            <template #modal-footer="{ ok }">
                <b-button size="sm" variant="danger" @click="ok()" :disabled="submitted">{{$t('data.cite_valider_cite')}} <b-spinner v-if="submitted" small /></b-button>
            </template>
            <b-form-group :label="$t('data.occupation_payer_charge_montant')"  :description="$t('data.occupation_payer_charge_description')">
                <b-form-input type="number" min="1" :placeholder="$t('data.occupation_payer_charge_description_exemple')" v-model="payerLoyer.montant" />
            </b-form-group>
        </b-modal>

        <!-- MODAL POUR REGLER LES IMPAYES -->
        <b-modal id="reglerImpayer" title="Regler les impayés" no-close-on-backdrop @hidden="resetForm" hide-footer>
            <b-form-group label="Selectionnez une période" class="mb-2">
                <div class="d-flex">
                    <b-form-select class="form-control mr-1" size="sm" v-model="periode.mois" :options="mois" />
                    <b-form-select class="form-control ml-1" size="sm" v-model="periode.annee" :options="annees" />
                </div>
            </b-form-group>
            <div v-if="!empty(periodeCourante)">
                <payer-loyer-form :occupation="occupation" :periodeCourante="periodeCourante" @payed="handleReglerImpayer" />
            </div>
        </b-modal>
    </div>
</template>

<script>
import chargeForm from "@/views/finances/charges/chargeForm.vue";
import contratOccupation from './contratOccupation.vue';
import PayerLoyerForm from '@/components/form/PayerLoyerForm.vue';

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';

const php = require('phpjs')
const {mois:_mois, annees:_annees, periodeCourante:_periodeCourante} = require('../../../helpers/date')

export default {
    data:() =>({
        submitted: false,
        recharge: {idCompte: null, montant: null, description: null, dateDepot: null},
        creerCompte: {typeCompte: null, solde: 0},
        payerCharge: {montant: 0, idCharge: null},
        payerIndexe: {montant: 0, idIndexe: null},
        payerLoyer: {montant: 0, idLoyer: null},

        periode: {annee: null, mois: null},

        tab_indexe: 'eau',
        title:'Ajouter une charge',
        action:"add",
        showOverlayTable:false
    }),
    props: {
        occupation: {type: Object, required: true}
    },
    components: {
        chargeForm,
        DatePicker,
        contratOccupation,
        PayerLoyerForm
    },

     computed: { 
        mois() {
            return _mois(this.periode.annee).map(elt => ({...elt, text: php.ucfirst(elt.text)}))
        },
        periodeCourante() {
            return _periodeCourante(this.periode)
        },
        annees: () => _annees(),

         permissions() {
            const permissions = storage.get("userPermissions")
            if (php.empty(permissions)) {
                return []
            }
            return permissions
        },
        indexes() {
            return this.indexes_type(this.tab_indexe)/* .sort((a, b) => {
                  return this.$dayjs().diff(b.periode) - this.$dayjs().diff(a.periode)
            }) */
        },
        totalImpayes() {
            return this.occupation.impayerTotal
        },
        localisation() {
            const logement = this.occupation.logement
            if (!php.empty(logement.adresse)) {
                return logement.adresse.ville + ' ' + logement.adresse.pays
            }
            if (!php.empty(logement.batiment)) {
                if (!php.empty(logement.batiment.adresse)) {
                    return logement.batiment.adresse.ville + ' ' + logement.batiment.adresse.pays
                }
            }
            return ''
        },
        canViewContrat() {
            if(this.permissions.includes("view_contrat")){
                return true;
            }
            return false;
                
        },
        canUpdateOccupation() {
            if(this.permissions.includes("update_occupation")){
                return true;
            }
            return false;    
        },
    },
    mounted(){
        this.$root.$on("new-charge", newCharge => {
            this.occupation.charges.unshift(newCharge);
            this.$bvModal.hide('chargeForm');
        });
        this.recharge.dateDepot = this.$dayjs().format('YYYY-MM-DD HH:mm')
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
         * cloturer un bail en cours
         */
        showMsgBoxTwo() {
            this.boxTwo = ''

            this.$bvModal.msgBoxConfirm('Bien vouloir confirmer que vous voulez mettre fin à ce bail', {
                title: 'CONFIRMATION DE CLOTURE',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'OUI',
                cancelTitle: 'NON',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
          .then(value => {
                if (true === value) {
                    axios.put('occupations/'+ this.occupation.idOccupation +'/close').then(response => {
                        this.$bvModal.hide('rechargeCompte')
                        this.$emit('change', this.occupation)
                        return App.notifySuccess(response.message)
                    }).catch(error => {
                        this.submitted = false
                        return App.alertError("Opération Annulée ou Erreur survenue")
                    })
                }
              this.boxTwo = value
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
                $('[data-toggle="pill"][href="#depots"]').click()
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

        buyIndexe(indexe, type) {
            this.payerIndexe.idIndexe = indexe.idIndexe
            this.payerIndexe.montant = this._calcul_consommation_indexe(indexe, type) - indexe.avance
            this.$bvModal.show('payerIndexe')
        },
        payIndexe(bvModalEvt) {
            bvModalEvt.preventDefault()
            if (php.empty(this.payerIndexe.montant)) {
                return App.error('Veuillez entrer le montant à payer')
            }
            this.submitted = true 
            axios.put('indexes/' + this.payerIndexe.idIndexe + '/buy', {montant: this.payerIndexe.montant}).then(async(response) => {
                this.occupation.indexes = await axios.get('occupations/'+this.occupation.idOccupation+'/indexes').then(res => res.result || [])
                this.occupation.comptes = await axios.get('occupations/'+this.occupation.idOccupation+'/comptes').then(res => res.result || [])
                this.submitted = false 
                this.$bvModal.hide('payerIndexe')
                return App.notifySuccess(response.message)
            }).catch(error => {
                this.submitted = false 
                return App.alertError(error.message)
            })
        },

        buyLoyer(loyer) {
            this.payerLoyer.idLoyer = loyer.idLoyer
            this.payerLoyer.montant = loyer.montant - loyer.montantPayer;
            this.$bvModal.show('payerLoyer')
        },
        payLoyer(bvModalEvt) {
            bvModalEvt.preventDefault()
            if (php.empty(this.payerLoyer.montant)) {
                return App.error('Veuillez entrer le montant à payer')
            }
            this.submitted = true 
            axios.put('loyers/' + this.payerLoyer.idLoyer + '/buy', {montant: this.payerLoyer.montant}).then(async(response) => {
                this.occupation.loyers = await axios.get('occupations/'+this.occupation.idOccupation+'/loyers').then(res => res.result || [])
                this.occupation.comptes = await axios.get('occupations/'+this.occupation.idOccupation+'/comptes').then(res => res.result || [])
                this.submitted = false 
                this.$bvModal.hide('payerLoyer')
                return App.notifySuccess(response.message)
            }).catch(error => {
                this.submitted = false 
                return App.alertError(error.message)
            })
        },
        
        handleReglerImpayer() {
            this.$bvModal.hide('reglerImpayer')
            this.$emit('change', this.occupation)
        },
        


        resetForm() {
            this.recharge = {...this.recharge, idCompte: null, montant: null, description: null}
            this.creerCompte = {typeCompte: null, solde: 0}
            this.payerCharge = {montant: 0, idCharge: null}
            this.payerIndexe = {montant: 0, idIndexe: null}
            this.payerLoyer = {montant: 0, idLoyer: null}
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
</style>