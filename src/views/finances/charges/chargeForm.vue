<template>
    <b-overlay :show="showOverlay" rounded="sm">
      <b-row>
        <b-col>
          <b-form-group
            label="Montant"
            description="combien voulez-vous attribuer ?"
          >
            <b-form-input
              v-model="charge.montant"
              placeholder="Ex: 3000"
              type="number"
              trim
            ></b-form-input>
          </b-form-group>
        </b-col>
        <!--<b-col>
            <b-form-group label="Date à laquelle la dépense a été éffectuée">
                <date-picker v-model="charge.date" placeholder="Selectionnez une date" format="dddd, DD MMMM YYYY" valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
            </b-form-group>                        
        </b-col>-->
      </b-row>
  
      <!--<b-row>
        <b-col cols="7">
          <b-form-group label="description">
            <b-form-textarea
              class="mb-2"
              placeholder="pourquoi attibuez-vous cette charge ?"
              rows="7"
              v-model="charge.description"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col cols="5">
            <div class="form-group">
                <label>Type de charge concernée</label>
                <v-select label="libelle" :options="typesCharges"  v-model="idTypeCharge"></v-select>
            </div>
        </b-col>
      </b-row>-->
      <b-row>
        <b-col>
          <b-form-group label="Description">
            <b-form-textarea
              class="mb-2"
              placeholder="pourquoi attribuez-vous cette charge ?"
              rows="6"
              v-model="charge.observation"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
            <div class="form-group">
                <label>Type de charge concernée</label>
                <v-select label="libelle" :options="typesCharges"  v-model="typeCharge" @input="setType"></v-select>
            </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
            <b-form-checkbox v-model="charge.etatCharge"><span class="mt-3">Statut</span></b-form-checkbox>
        </b-col>
      </b-row>

           


        <hr>
        <div class="float-right">
        <b-button @click.prevent="submitModal" variant="danger">Valider</b-button>
    </div>
    </b-overlay>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';
import notif from "@/plugins/notif.js";
const php = require("phpjs");


export default {
  name: "charge-form",
  data: () => ({
   disabled:false,

    charge: {
      idTypeCharge: "",
      montant: "",
      date: "",
      observation: "",
      etatCharge:true
    },
    typesCharges:[],
    typeCharge:'',
    commandeAction:"",
    showOverlay: true,
    sendForm: false

  }),
  components: {
    DatePicker
  },
  props: {
        action: {type: String, required: true, default: "add"},
        occupation: { type: Object},
    },
  methods: {
     setType(){
       this.charge.idTypeCharge=this.typeCharge.idTypeCharge;
     },

    resetModal() {
      this.charge = {
        idTypeCharge: '',
        montant: '',
        date: '',
        description: ''
      };

      setTimeout(() => {
        this.$emit('closeDepenseModal');
      }, 500);
    },

    //validation formulaire d'ajout/modification d'une dépense
    submitModal(bvModalEvt) {
        
      bvModalEvt.preventDefault();
      if (php.empty(this.charge.montant) || php.empty(this.charge.idTypeCharge)) {
                return App.error('Un montant, une date et la raison de la charge sont obligatoires')
      }
      if (this.charge.montant =='') {
        return App.error('Vous devez spécifier un montant')
      }
      if (this.idTypeCharge =='') {
        return App.error('Vous devez spécifier selectionner le type de charge qu\'il s\'agit')
      }
      if (this.action == "add") {
        console.log('charge', this.charge)
          this.showOverlay = true;
            axios.post('occupations/'+this.occupation.idOccupation+'/charges',this.charge).then(response =>{
                  this.resetModal();
                   this.showOverlay = false;
                  this.$root.$emit("new-charge", response.result);
                  return App.notifySuccess(response.message)
                 
            })
            .catch(error => {
                this.showOverlay = false;
                 notif.error(error.message);
            });
  
      }
    },
    //recupération de la liste des types de charge
    async getTypesCharges(){
            if(storage.get('types-charges')!=null&&storage.get('types-charges').length>0){
                this.typesCharges=storage.get('types-charges');
            }
            else{
                try {
                    this.typesCharges = await axios.get("constants/types-charges").then(response => response.result);
                    storage.set('types-charges',this.typesCharges)
                } catch (error) {
                    console.log(error.message);
                }
            }
            this.showOverlay=false;
    }

  },
  async mounted(){
    await this.getTypesCharges()
  }

};
</script>
<style scoped>
 .disabled {
    pointer-events:none;
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;   
 }
</style>
