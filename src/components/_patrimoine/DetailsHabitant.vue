<template>
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'occupations'}" @click.prevent="section = 'occupations'">Occupations</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'charges'}" @click.prevent="section = 'charges'">Charges</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'loyers'}" @click.prevent="section = 'loyers'">Loyers</a></li>
            <li class="nav-item"><a data-toggle="tab" href="#" class="nav-link" :class="{'active' : section == 'logements'}" @click.prevent="section = 'Logements'">Logements</a></li>
        </ul>
        <div class="tab-content mt-3">
            <div class="tab-pane fade show active">
                <b-container fluid v-if="section == 'occupations'" style="height: 75vh; overflow-y: auto; overflow-x: hidden">
                        <b-alert variant="info" show v-if="!occupations.length">
                            <i class="fa fa-exclamation-triangle fa-3x float-left"></i> 
                            <span class="h4 d-inline-flex ml-2">Aucune Occupation affectée à ce résident pour le moment</span>
                              <b-button class="mt-1" variant="light" @click.prevent="addOccupation">Ajouter une occupation</b-button>
                        </b-alert>   
                        <div v-else style="height: 75vh;">
                            <paginator no-control hr="bottom" :total="occupations.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                            <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                                <b-row class="layout-wrap">
                                    <b-col v-for="(batiment, i) in items" :key="batiment.idBatiment || i" cols="6">
                                        <batiment @deleted="removeBatiment" :batiment="batiment" is-sub />
                                    </b-col>
                                </b-row>    
                            </div> 
                        </div>       
                </b-container>
                <b-container fluid v-if="section == 'logements'">
                    <!--<b-row>
                        <b-col cols="6">
                            <span class="d-inline-block w-100 my-1">Pays: <b>{{ logement.adresse.pays }}</b></span>
                            <span class="d-inline-block w-100 my-1">Ville: <b>{{ logement.adresse.ville }}</b></span>
                            <span class="d-inline-block w-100 my-1">Quartier: <b>{{ logement.adresse.quartier }}</b></span>
                        </b-col>
                        <b-col cols="6">
                            <span class="d-inline-block w-100 my-1">Logitude: <b>{{ logement.adresse.lon }}</b></span>
                            <span class="d-inline-block w-100 my-1">Latitue: <b>{{ logement.adresse.lat }}</b></span>
                        </b-col>
                    </b-row>
                    <b-container class="mt-4 p-0"> <GmapMap
                        :center="{lat: parseFloat(logement.adresse.lat), lng: parseFloat(logement.adresse.lon)}" :zoom="14"
                        class="w-100" style="height:340px;"
                    /></b-container>-->
                </b-container>
                 <!--<div v-if="section == 'logements'">
                    <b-alert variant="info" show v-if="!batiment.logements.length">
                        <i class="fa fa-exclamation-triangle fa-3x float-left"></i> 
                        <span class="h4 d-inline-flex ml-2">Aucun logement enregistré pour le moment</span>
                    </b-alert>   
                    <div v-else style="height: 75vh;">
                        <paginator no-control hr="bottom" :total="batiment.logements.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" />                   
                        <div style="height: 90%; overflow-y: auto; overflow-x: hidden">
                            <b-row class="layout-wrap">
                                <b-col v-for="(logement, i) in items" :key="logement.idLogement || i" cols="6">
                                    <logement @deleted="removeLogement" :logement="logement" is-sub />
                                </b-col>
                            </b-row>    
                        </div> 
                    </div>       
                </div>--> 
                <b-container fluid v-if="section == 'loyers'">
                   <!--- <b-row>
                        <b-col cols="7">
                            <span class="d-inline-block w-100 my-1">Type de logement: <b>{{ logement.sousTypeLogement.libelleSousType }}</b></span>
                            <span class="d-inline-block w-100 my-1">Etat: <b-badge variant="success" v-if="!logement.etatLogement">Libre</b-badge><b-badge variant="danger" v-else>Occupé</b-badge></span>
                        </b-col>
                        <b-col cols="5">
                            <span class="d-inline-block w-100 my-1">Prix minimal: <b>{{ logement.prixMin + ' F' }}</b></span>
                            <span class="d-inline-block w-100 my-1">Prix maximal: <b>{{ logement.prixMax + ' F' }}</b></span>
                        </b-col>
                    </b-row>
                    <div class="jumbotron pt-10 pb-10 mt-2 mb-0"><p>{{ logement.descLogement }}</p></div>
                    <hr/>
                    <div>
                         <b-badge v-for="(c, i) in caracteristiques" :key="i" variant="secondary">{{ c.valeur + ' ' + c.libelleCaracteristique }}</b-badge>
                    </div>-->
                </b-container>
                <div v-if="section == 'charges'"  style="height: 75vh; overflow-y: auto; overflow-x: hidden">
                    <!--<b-row>
                        <b-col cols="12" v-for="(annonce, i) in logement.annonces" :key="annonce.idAnnonce || i">
                            <div class="card p-0 shadow">
                                <div class="card-body p-0 d-flex">
                                    <b-img :src="photos[i] || photos[0]" style="height: 8em; width: 8em"></b-img>
                                    <div class="ml-2 p-2">
                                        <div>
                                            <b-badge :variant="annonce.publish ? 'success' : 'danger'">{{ annonce.publish ? 'Déja publiée' : 'Pas encore publiée' }}</b-badge>
                                            &nbsp;
                                            <b-badge variant="light"><i class="fa fa-clock"></i> Créée le {{ $date(annonce.createdAt).format("DD.MM.YYYY") }} </b-badge>
                                        </div>
                                        <h5 class="my-2"><a href="#" class="text-red ">{{ annonce.titreAnnonce }}</a></h5>
                                        <b-badge v-for="(tag, i) in annonce.tags.split(',')" :key="i" variant="secondary">{{ tag }}</b-badge>
                                    </div>
                                </div>
                            </div>
                        </b-col>
                    </b-row>-->
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    components: {

    },
    props: {
        habitant: {type: Object, required: true}
    },
    data: () => ({
        section: 'occupations',
        /**
         * Données manipuler par la section occupations
         */
        occupations:[],
        setOccupation:false,
    }),
    computed: {

    },
    mounted() {
    },
    methods: {
        //methode d'appel du formulaire d'ajout d'une occupation
        addOccupation(){
            this.setOccupation=true;
        },
        /**
         * recupération de la liste des occupations de l'habitant sélectionné si elles existent
         */
        getOccupations(){
            axios.get("locataires/"+habitant.idLocataire+"/occupations").then(response =>{
                 this.occupations=response.result;
            })
        }


    }
}
</script>

<style>

</style>