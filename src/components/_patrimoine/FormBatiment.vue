<template>
    <b-overlay :show="showOverlay" rounded="sm"><div class="d-flex flex-column justify-content-between h-100">
        <div :id="repeaterId"  :style="cite != null ? 'height: 73.5vh;' : ''">
            <div class="d-flex flex-column justify-content-between" style="height: 95%; overflow-y: auto; overflow-x: hidden"><div data-repeater-list="group">
                <b-row data-repeater-item>
                    <b-col>
                        <b-form-group label="Nom du batiment">
                            <b-form-input name="nom" v-model="nom" placeholder="Ex: Batiment A" trim></b-form-input>
                        </b-form-group>
                        <b-form-group label="Reference">
                            <b-form-input name="ref" v-model="ref" placeholder="Ex: B1" trim></b-form-input>
                        </b-form-group>
                        <b-form-group v-if="cite == null" label="Photo">
                            <img-inputer v-model="photo.batiment" :img-src="$getBase64(photo.batiment, false)" placeholder="Ajouter la photo du batiment" theme="light" size="xl" bottom-text="déposez le fichier ici ou cliquez pour modifier" icon="img" />
                        </b-form-group>
                    </b-col> 

                    <b-col>
                        <b-form-group v-if="cite != null" label="Photo">
                             <img-inputer name="test" placeholder="Ajouter la photo du batiment" theme="light" size="xl" bottom-text="déposez le fichier ici ou cliquez pour modifier" icon="img" />
                        </b-form-group>
                        <div v-else>
                            <b-form-group label="Cité">
                                <v-select class="py-1" :options="cites" v-model="idCite" :reduce="cite => cite.idCite" label="nomCite">
                                    <template #option="{ nomCite, refCite, idCite }">
                                        {{ nomCite }}
                                        <br />
                                        <span class="text-muted"> {{ idCite != -1 ? 'Reference: ' : ''}}{{ refCite }}</span>
                                        <hr class="m-0 bg-danger" v-if="idCite == -1" style="border-width: 1.5px">
                                    </template>
                                </v-select>
                            </b-form-group>
                            <b-carousel v-show="idCite != -1" :interval="0" controls v-model="selected_index_cite" ref="citeCarousel">
                                <b-carousel-slide style="height: 20em" v-for="(cite, i) in slideCites" :key="i" :img-src="cite.image || '/img/bgCity.jpg'" class="fluid w-100 responsive border"/>
                            </b-carousel>
                            <div v-if="idCite == -1">
                                <b-row>
                                    <b-col><b-form-group label="Nom de la cité">
                                        <b-form-input v-model="nomCite" placeholder="Ex: Cité de la joie" trim />
                                    </b-form-group></b-col>
                                    <b-col><b-form-group label="Reférence de la cité">
                                        <b-form-input v-model="refCite" placeholder="Ex: CDJ" trim />
                                    </b-form-group></b-col>
                                </b-row>
                                <b-form-group label="Photo">
                                    <img-inputer v-model="photo.cite" :img-src="$getBase64(photo.cite, false)" placeholder="Ajouter la photo de la cité" theme="light" size="xl" bottom-text="déposez le fichier ici ou cliquez pour modifier" icon="img" />
                                </b-form-group>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="1" class="m-0 p-0 mr-2" v-if="cite != null"><b-form-group label="Action">
                        <b-button data-repeater-delete variant="outline-danger"><i class="fa fa-times"></i></b-button>
                    </b-form-group></b-col>   
                </b-row>   
            </div></div>

            <div class="w-100 d-flex justify-content-end align-items-center mt-4">
                <b-button v-if="null != cite" variant="outline-primary" data-repeater-create>Ajouter un élément</b-button>
                <b-button variant="danger" @click="submitForm" class="ml-2" :disabled="submitted">Valider <b-spinner v-if="submitted" small /></b-button>    
            </div>
        </div> 
    </div></b-overlay>
</template>

<script>
const php = require('phpjs')

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
        photo: { batiment: null, cite: null },
        selected_index_cite: null
    }),
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
        repeaterId() {
            return `repeat-added-batiment-form-${php.empty(this.cite) ? php.uniqid() : this.cite.idCite}`
        },
        slideCites() {
            return this.cites.filter(elt => elt.idCite != -1)
        }
    },
    created() {
        this.getCites()
    },
    mounted() {
        if (!php.empty(this.cite)) {
            this.makeRepeater()
            this.idCite = this.cite.idCite
        }
    },

    methods: {
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
            }
            else {
                this.cites.unshift({
                    nomCite: 'Créer une nouvelle cité', refCite: 'Ajout d\'une cité inexistante', idCite: -1
                })
            }
            this.showOverlay = false
        },

        makeRepeater() {
            setTimeout(() => {
                $(`#${this.repeaterId}`).repeater({ isFirstItemUndeletable: true  })
            }, 500);
        },

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
                batiments: []
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
                    let batiments = $(`#${this.repeaterId}`).repeaterVal().group

                    console.log(batiments);
                    return;

                    if (php.empty(batiments[0].nom) || php.empty(batiments[0].ref)) {
                        return App.error('Vous devez remplir au moins les informations du premier batiment')
                    }
                    data.batiments = batiments
                }
                
                axios.post('batiments', data).then(response => {
                    this.$emit('batimentAdded', response.result)
                    this.submitted = false
                    return App.notifySuccess(response.message)
                }).catch(error => {
                    this.submitted = false
                    return App.notifyError(error.message)
                })
            }

            if (this.action == 'edit' && !php.empty(this.batiment)) {
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
        
    }
}
</script>