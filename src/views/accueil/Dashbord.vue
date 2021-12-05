<template>
    <div>
        <b-row class="clearfix">
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="widget">
                    <div class="widget-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="state">
                                <h6>{{ $t('data.dashbord_logements') }}</h6>
                                <h2>{{ nbrLogement }}</h2>
                            </div>
                            <div class="icon">
                                <i class="fa fa-home"></i>
                            </div>
                        </div>
                        <small class="fa-lg text-muted mt-10 d-block">{{ nbrLogementLibre }} {{ $t('data.dashbord_disponibles') }}</small>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" :class="{'bg-success': tauxOccupationLogement >= 80, 'bg-warning': (tauxOccupationLogement >= 30 && tauxOccupationLogement < 80), 'bg-danger': tauxOccupationLogement < 30 }" role="progressbar" :aria-valuenow="tauxOccupationLogement" aria-valuemin="0" aria-valuemax="100" :style="'width: ' + tauxOccupationLogement + '%;'">{{ tauxOccupationLogement }}% {{ $t('data.dashbord_occupe') }}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="widget">
                    <div class="widget-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="state">
                                <h6> {{ $t('data.dashbord_locataires') }}</h6>
                                <h2>{{ nbrLocataire }}</h2>
                            </div>
                            <div class="icon">
                                <i class="fa fa-user-tie"></i>
                            </div>
                        </div>
                        <small class="fa-lg text-muted mt-10 d-block">{{ nbrLocataireActif }} {{ $t('data.dashbord_actifs') }}</small>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" :class="{'bg-success': tauxLocataireActif >= 80, 'bg-warning': (tauxLocataireActif >= 30 && tauxLocataireActif < 80), 'bg-danger': tauxLocataireActif < 30 }" role="progressbar" :aria-valuenow="tauxLocataireActif" aria-valuemin="0" aria-valuemax="100" :style="'width: ' + tauxLocataireActif + '%;'">{{ tauxLocataireActif }}% {{ $t('data.dashbord_actif') }}</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="widget">
                    <div class="widget-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="state">
                                <h6>{{ $t('data.dashbord_evenements')}}</h6>
                                <h2>410</h2>
                            </div>
                            <div class="icon">
                                <i class="ik ik-calendar"></i>
                            </div>
                        </div>
                        <small class="text-small mt-10 d-block">{{ $t('data.dashbord_total_evenement')}}</small>
                    </div>
                    <div class="progress progress-sm">
                        <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="31" aria-valuemin="0" aria-valuemax="100" style="width: 31%;"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="widget">
                    <div class="widget-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="state">
                                <h6>{{ $t('data.dashbord_commentaires')}}</h6>
                                <h2>41,410</h2>
                            </div>
                            <div class="icon">
                                <i class="ik ik-message-square"></i>
                            </div>
                        </div>
                        <small class="text-small mt-10 d-block">{{ $t('data.dashbord_total_commentaire')}}</small>
                    </div>
                    <div class="progress progress-sm">
                        <div class="progress-bar bg-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%;"></div>
                    </div>
                </div>
            </div>
        </b-row>
        <b-row class="mt-3">
            <b-col lg="6" sm="12">
                <div class="card">
                    <div class="card-header"><h3>{{ $t('data.dashbord_recouvrement_du_mois')}}</h3></div>
                    <div class="card-body">
                        <doughnut-chart v-if="chartDatas.recouvrement != null" :chart-data="chartDatas.recouvrement" />
                    </div>
                </div>
            </b-col>
            <b-col lg="3" sm="12">
                <div class="card">
                    <div class="card-header"><h3>{{ $t('data.dashbord_logements')}}</h3></div>
                    <div class="card-body">
                        <pie-chart v-if="chartDatas.logements != null" :chart-data="chartDatas.logements" />
                    </div>
                </div>
            </b-col>
             <b-col lg="3" sm="12">
                <div class="card">
                    <div class="card-header"><h3>{{ $t('data.dashbord_locataires')}}</h3></div>
                    <div class="card-body">
                        <pie-chart v-if="chartDatas.locataires != null" :chart-data="chartDatas.locataires" />
                    </div>
                </div>
            </b-col>
            <b-col cols="12">
                <div class="card">
                    <div class="card-header"><h3>{{ $t('data.dashbord_recouvrement_annuel')}}</h3></div>
                    <div class="card-body">
                        <bar-chart v-if="chartDatas.recouvrements != null" :chart-data="chartDatas.recouvrements" :options="{
                            tooltips: {
                                 callbacks: {
                                    label: function(tooltipItems, data) {
                                        return tooltipItems.yLabel + ' F';
                                    }
                                }
                            }}" 
                        />
                    </div>
                </div>
            </b-col>
            <b-col cols="12">
                <div class="card">
                    <div class="card-header"><h3>{{ $t('data.dashbord_Logements_par_batiment')}}</h3></div>
                    <div class="card-body">
                        <bar-chart v-if="chartDatas.batiments != null" :chart-data="chartDatas.batiments" />
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import BarChart from '../../components/charts/BarChart.vue'
import DoughnutChart from '../../components/charts/DoughnutChart.vue'
import PieChart from '../../components/charts/PieChart.vue'
const php = require('phpjs')
export default {
  components: { DoughnutChart, BarChart, PieChart },
    name: 'Dashbord',
    data: () => ({
        nbrLocataire: 0,
        nbrLocataireFemme : 0,
        nbrLocataireHomme: 0,
        nbrLocataireActif: 0,
        nbrLogement: 0,
        nbrLogementLibre: 0,
        montantAttendu: 0,
        montantPercu: 0,
        recetteMensuelle: 0,
        grosImpayer: [],
        dernieresRecettes: [],

        chartDatas: {
            logements: null,
            locataires: null,
            batiments: null,
            recouvrement: null,
            recouvrements: null,
        }
    }),
    computed: {
        tauxOccupationLogement() {
            if (this.nbrLogement == 0) {
                return 0
            }
            return Math.floor((this.nbrLogementOccuper * 100) / this.nbrLogement)
        },
        tauxLocataireActif() {
            if (this.nbrLocataire == 0) {
                return 0
            }
            return Math.floor((this.nbrLocataireActif * 100) / this.nbrLocataire)
        },
        nbrLogementOccuper() {
            return this.nbrLogement - this.nbrLogementLibre
        }
    },
    beforeMount() {
        this.getStats()
    },
    methods: {
        getStats() {
            axios.get('stats').then(response => response.result).then(result => {
                this.nbrLocataire = result.nbrLocataire
                this.nbrLogement = result.nbrLogement
                this.nbrLogementLibre = result.nbrLogementLibre
                this.nbrLocataireFemme = result.nbrLocataireFemme
                this.nbrLocataireHomme = result.nbrLocataireHomme
                this.nbrLocataire = result.nbrLocataire
                this.nbrLocataireActif = result.nbrLocataireActif
                this.montantAttendu = result.montantAttendu
                this.montantPercu = result.montantPercu
                
                this.fillChartData(result)
            })
        },


        async fillChartData (stats) {
            this.chartDatas.locataires = {
                labels: ['Homme', 'Femme', 'Actif'],
                datasets: [{
                    backgroundColor: ['rgba(4,189,254,0.6)', 'rgba(237,28,36,0.6)', 'rgba(88,216,163,1)'],
                    data: [this.nbrLocataireHomme, this.nbrLocataireFemme, this.nbrLocataireActif]
                }]
            }
            this.chartDatas.recouvrement = {
                labels: ['Montant attendu', 'Montant perçu'],
                datasets: [{
                    backgroundColor: ['rgba(4,189,254,0.6)', 'rgba(237,28,36,0.6)'],
                    data: [this.montantAttendu, this.montantPercu]
                }]
            }
            this.chartDatas.recouvrements = {
				labels: [ "Jan", "Fev", "Mars", "Avr", "Mai", "Juin", "Juillet", "Août", "Sept", "Oct", "Nov", "Dec"],
				datasets: [
					{
						label: 'Montant attendu',
						backgroundColor: 'rgba(4,189,254,0.6)',
						pointBackgroundColor: 'white',
						borderWidth: 1,
						pointBorderColor: '#249EBF',
						data: stats.montantAttenduMois
					},
                    {
						label: 'Montant perçu',
						backgroundColor: 'rgba(237,28,36,0.6)',
						pointBackgroundColor: 'white',
						borderWidth: 1,
						pointBorderColor: '#249EBF',
						data: stats.montantPercuMois
					}
                ]
			}
            this.chartDatas.logements = {
                labels: ['Libres', 'Occupés'],
                datasets: [{
                    backgroundColor: ['rgba(237,28,36,0.6)', 'rgba(88,216,163,1)'],
                    data: [this.nbrLogementLibre, this.nbrLogementOccuper]
                }]
            }
            let batiments = await axios.get('stats/batiments').then(response => response.result || [])
            batiments = php.array_slice(batiments, 0, batiments.length > 20 ? 20 : batiments.length)
            this.chartDatas.batiments = {
				labels: batiments.map(elt => elt.nomBatiment),
				datasets: [
					{
						label: 'Nombre de logements',
						backgroundColor: '#f87979',
						pointBackgroundColor: 'white',
						borderWidth: 1,
						pointBorderColor: '#249EBF',
						data: batiments.map(elt => elt.logements.length)
					}
                ]
			}
        },
    }
}
</script>