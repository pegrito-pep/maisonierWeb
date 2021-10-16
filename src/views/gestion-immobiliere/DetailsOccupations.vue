<template>
    <div>
        <page-description title="Occupation" description="Details d'occupation" icon="star" :path="['Gestion Immobilière', 'Mes Occupations']" />
        <div class="card-deck">
            <div class="card col-3">
                <div class="card-body">
                    <div class="text-center"> 
                        <h4 class="card-title">Occupation n° {{ occupation.idOccupation }}</h4>
                        <b-badge variant="success" v-if="occupation.dateFin == null">Bail en cours</b-badge>
                        <b-badge variant="danger" v-else>Bail terminé le {{ $date(occupation.dateFin).format('DD MMMM YYYY') }}</b-badge>
                    </div>
                </div>
                <div class="card-body pt-0">                         
                    <div class="d-flex align-items-center justify-content-between">
                        <hr class="w-25 bg-danger"> Logement <hr class="w-25 bg-danger">
                    </div>
                    <span class="d-inline-block w-100 mb-1 text-center">{{ occupation.logement.refLogement }}</span>    
                    <span class="d-inline-block w-100 mb-1 text-center text-muted">{{ occupation.logement.sousTypeLogement.libelleSousType }}</span>    
                        <div class="jumbotron pt-10 pb-10 px-2">
                        <dl class="row text-muted">
                            <dd class="mt-1 col-1"><i class="fa fa-dollar-sign"></i></dd>
                            <dt class="mt-1 col-10 truncate" v-b-tooltip="'Plage de loyer'">{{ occupation.logement.prixMin + 'F' }} - {{ occupation.logement.prixMax + 'F' }}</dt>
                            <dd class="mt-1 col-1"><i class="fa fa-map-marker-alt"></i></dd>
                            <dt class="mt-1 col-10 truncate" v-b-tooltip="'Localisation'">{{ occupation.logement.adresse.ville + ' ' + occupation.logement.adresse.pays }}</dt>
                            <dd v-if="occupation.logement.batiment" class="mt-1 col-1"><i class="fa fa-building"></i></dd>
                            <dt v-if="occupation.logement.batiment" class="mt-1 col-10 truncate" v-b-tooltip="'Batiment'">{{ occupation.logement.batiment.nomBatiment }}</dt>
                            <dd v-if="occupation.logement.batiment" class="mt-1 col-1"><i class="fas fa-city"></i></dd>
                            <dt v-if="occupation.logement.batiment" class="mt-1 col-10 truncate" v-b-tooltip="'Cité'">{{ occupation.logement.batiment.cite.nomCite }}</dt>
                        </dl>
                        <b-button :to="{name: 'logements', query: {target: occupation.logement.idLogement}}" size="sm" block variant="outline-secondary">Voir les details</b-button>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <hr class="w-25 bg-danger"> Locataire <hr class="w-25 bg-danger">
                    </div>
                    <span class="d-inline-block w-100 mb-1 text-center">{{ occupation.locataire.titre + ' ' + occupation.locataire.nomLocataire + ' ' + occupation.locataire.prenomLocataire }}</span>    
                    <span class="d-inline-block w-100 mb-1 text-center text-muted">{{ occupation.locataire.profession }}</span>    
                        <div class="jumbotron pt-10 pb-10 px-2">
                        <dl class="row text-muted">
                            <dd class="mt-1 col-1"><i class="fa fa-id-card"></i></dd>
                            <dt class="mt-1 col-10 truncate" v-b-tooltip="'Numéro de CNI'">{{ occupation.locataire.cniLocataire }}</dt>
                            <dd class="mt-1 col-1"><i class="fa fa-phone"></i></dd>
                            <dt class="mt-1 col-10 truncate" v-b-tooltip="'Numéro de téléphone'">{{ occupation.locataire.tel + ' / ' + occupation.locataire.tel2 }}</dt>
                            <dd class="mt-1 col-1"><i class="fa fa-envelope"></i></dd>
                            <dt class="mt-1 col-10 truncate" v-b-tooltip="'Email'">{{ occupation.locataire.email + ' / ' + occupation.locataire.email2 }}</dt>
                            <dd class="mt-1 col-1"><i class="fas fa-calendar-alt"></i></dd>
                            <dt class="mt-1 col-10 truncate" v-b-tooltip="'Date de naissance'">{{ $date(occupation.locataire.dateNaiss).format('DD MMMM YYYY') }}</dt>
                        </dl>
                        <b-button to="#" size="sm" block variant="outline-secondary">Voir le dossier</b-button>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="pill" href="#generalites">Généralités</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="pill" href="#indexes">Indexes</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="pill" href="#charges">Charges</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="pill" href="#loyers">Loyers</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="generalites">
                        <div class="card-body">
                            <b-row>
                                <b-col cols="12" class="mb-1">
                                    <dl class="row text-muted">
                                        <dd class="mt-1 col-4">Loyer</dd>
                                        <dt class="mt-1 col-8">{{ occupation.loyerBase + ' F' }}</dt>
                                        <dd class="mt-1 col-4">Mode de paiement</dd>
                                        <dt class="mt-1 col-8">{{ occupation.modePaiement }}</dt>
                                        <dd class="mt-1 col-4">Facturation d'energie</dd>
                                        <dt class="mt-1 col-8">{{ occupation.puEnergie + 'F' }} par {{ occupation.modeEnergie == 'index' ? 'kw' : 'mois' }}</dt>
                                        <dd class="mt-1 col-4">Facturation d'eau</dd>
                                        <dt class="mt-1 col-8">{{ occupation.puEau + 'F' }} par <span v-if="occupation.modeEau == 'index'">m<sup>3</sup></span><span v-else>mois</span></dt>
                                        <dd class="mt-1 col-4">Date de debut du bail</dd>
                                        <dt class="mt-1 col-8">{{ $date(occupation.dateDeb).format('dddd, DD MMMM YYYY') }}</dt>
                                        <dd class="mt-1 col-4" v-if="occupation.dateFin">Date de fin du bail</dd>
                                        <dt class="mt-1 col-8" v-if="occupation.dateFin">{{ $date(occupation.dateFin).format('dddd, DD MMMM YYYY') }}</dt>
                                        <dd class="mt-1 col-4">Occupation créée le</dd>
                                        <dt class="mt-1 col-8">{{ $date(occupation.createdAt).format('dddd, DD MMMM YYYY HH:mm') }}</dt>
                                    </dl>
                                </b-col>
                            </b-row>
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
                                        <template #cell(montant)="data"> {{ _calcul_consommation_indexe(data.item, tab_indexe) }} F</template>
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
                                                            <dt class="mt-1 col-7">{{ empty(row.item.datePaiement) ? 'Non disponible' : $date(row.item.datePaiement).format('DDDD MMMM YYYY') }}</dt>
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
                    <div class="tab-pane fade " id="previous-month" role="tabpanel" aria-labelledby="pills-setting-tab">
                        
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>

const php = require('phpjs')

export default {
    data:() =>({
        submitted: false,
        occupation: {},

        tab_indexe: 'eau'
    }),
    components: {
        
    },

     computed: { 
        indexes() {
            return this.occupation.indexes.filter(elt => elt.typeIndexe == this.tab_indexe).sort((a, b) => {
                  return this.$dayjs().diff(b.periode) - this.$dayjs().diff(a.periode)
            })
        }
    },
    beforeMount() {
        axios.get(`occupations/${this.$route.params.id}`).then(response => response.result || {}).then(occupation => {
            this.occupation = occupation
        })
    },
    methods: {
        empty: (val) => php.empty(val),

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
        }
    }
    
}
</script>