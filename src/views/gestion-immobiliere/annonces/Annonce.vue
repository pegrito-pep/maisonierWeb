<template>
  <div class="list-item list-item-grid">
    <div class="card mb-3">
      <div class="d-flex">
        <a class="w-100 d-flex card-img" @click.prevent="showDetails" href="#" style="overflow: hidden; border-radius: 10px;">
          <b-carousel v-if="annonce.photos.length" :interval="4000" controls indicators background="#ababab" img-width="1024" img-height="15em">
            <b-carousel-slide style="height: 15em; overflow: hidden; border-radius: 10px" class="responsive border-0" v-for="(photo, i) in annonce.photos" :key="i" :img-src="photo" />
          </b-carousel>
          <img v-else src="/img/image-defauft-annonce.jpeg" alt="" style="height: 15em;" class="list-thumbnail responsive border-0">
          <b-badge
            pill
            class="position-absolute badge-top-left"
            :variant="annonce.publish ? 'success' : 'danger'"
            >{{
              annonce.publish ? $t('data.annonce_details_etat_publiee') : $t('data.annonce_details_etat_non_publiee')
            }}</b-badge
          >
          <b-badge
            pill
            class="position-absolute badge-top-left-2"
            variant="secondary"
            v-b-tooltip.bottom="dateCreation"
            ><i class="fa fa-clock"></i>
            {{ $date(annonce.createdAt).format("DD.MM.YYYY") }}
          </b-badge>
        </a>
      </div>
      <div class="d-flex flex-grow-1 min-width-zero card-content">
        <div
          style="height: 11em; overflow-y: hidden"
          class="
            card-body
            align-self-center
            d-flex
            flex-column flex-md-row
            justify-content-between
            min-width-zero
            align-items-md-center
          "
        >
          <div class="max-lines-1">
            <h5 class="text-dark font-weight-bold">
              {{ php.ucfirst(annonce.titreAnnonce.toLowerCase()) }}
            </h5>
            <b-badge
              v-for="(tag, i) in annonce.tags.split(',')"
              :key="i"
              variant="secondary"
              >{{ tag }}</b-badge
            >
          </div>
          <hr />
          <p class="text-muted text-small max-lines-3">
            {{ annonce.descAnnonce }}
          </p>
        </div>
        <div class="d-flex justify-content-between p-3 mb-5">
          <div>
            <i class="fas fa-money-bill-wave"></i
            ><strong class="price">
              {{
                (annonce.logement.prixMax + annonce.logement.prixMin) / 2
              }}
              FCFA</strong
            >
          </div>
          <div class="btn-actions d-flex justify-content-between">
            <a
              href="#"
              @click.prevent="$emit('makeUpdate', annonce)"
              v-if="!isSub&&canUpdateAnnonce"
              v-b-tooltip.bottom="$t('data.annonce_editer_tooltip_annonce')"
              ><i class="fas fa-pen"></i
            ></a>
            <a
              href="#"
              @click.prevent="showDetails"
              v-if="!isSub&&canSeeDetailsAnnonce"
              v-b-tooltip.bottom="$t('data.annonce_detail_tooltip_annonce')"
              ><i class="ik ik-eye"></i
            ></a>
            <a
              href="#"
              @click.prevent="showMenu(annonce.idAnnonce)"
              class="show-list"
              v-b-tooltip.bottom="$t('data.annonce_menu_tooltip_annonce')"
              ><i class="fa fa-ellipsis-v"></i
            ></a>
          </div>

          <div
            :class="'py-4 animated bounceIn showModal s' + annonce.idAnnonce"
          >
            <button
              @click.prevent="closeMenu(annonce.idAnnonce)"
              v-b-tooltip.bottom="'Fermer'"
              class="btn close text-dark border-0 closebtn"
              style="font-size: 36px; color: red"
            >
              &times;</button
            ><br />
            <a
              href="#"
              @click.prevent="accessTo"
              v-if="!isSub&&canViewLogement"
              v-b-tooltip.left="$t('data.annonce_details_tooltip_acceder_au_logement')"
              class="d-block"
              ><b-button
                class="btn-icon my-1 mr-2"
                variant="dark"
                style="width: 25px; height: 25px"
                ><i
                  class="fa fa-share-square"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                ></i></b-button
              >{{$t('data.annonce_details_tooltip_acceder_au_logement')}}
            </a>
            <a 
              href="#"
              v-b-tooltip.left="$t('data.annonce_details_tooltip_publier_annonce')"
              v-if="!annonce.publish&&canPublishAnnonce"
              @click="publier(annonce)"
              class="d-block"
              ><b-button
                class="btn-icon my-1 mr-2"
                variant="primary"
                style="width: 25px; height: 25px"
                ><i
                  class="fas fa-share"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                ></i></b-button
              >{{$t('data.annonce_details_tooltip_publier_annonce')}}</a
            >

            <a href="#" v-b-tooltip.left="$t('data.annonce_details_tooltip_propositions_annonce')" class="d-block"
              ><b-button
                class="btn-icon my-1 mr-2"
                :variant="annonce.nbrPropostions > 0 ? 'success' : 'secondary'"
                id="button-nombre-propositions"
                style="width: 25px; height: 25px"
                ><i
                  class="fas fa-sticky-note"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                ></i></b-button
              >{{$t('data.annonce_details_tooltip_propositions_annonce')}}</a
            >
            <a v-if="canCommentAnnonce"
              href="#"
              v-b-tooltip.left="$t('data.annonce_details_tooltip_commenter_annonce')"
              class="d-block"
              ><b-button
                class="btn-icon my-1 mr-2"
                variant="info"
                style="width: 25px; height: 25px"
                ><i
                  class="fa fa-comments"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                ></i></b-button
              >{{$t('data.annonce_details_tooltip_commenter_annonce')}}</a
            >
            <a v-if="canDeleteAnnonce"
              href="#"
              @click.prevent="remouve"
              v-b-tooltip.left="$t('data.annonce_details_tooltip_supprimer_annonce')"
              class="d-block"
              ><b-button
                class="btn-icon my-1 mr-2"
                variant="danger"
                style="width: 25px; height: 25px"
                ><i
                  class="ik ik-trash-2"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                ></i></b-button
              >{{$t('data.annonce_details_tooltip_supprimer_annonce')}}</a
            >
          </div>

          <!-- <a href="#" @click.prevent="accessTo" v-if="isSub" v-b-tooltip.bottom="'Accéder aux détails'"><i class="ik ik-link"></i></a>
                    <a href="#" @click.prevent="$emit('makeDuplication', annonce)" v-if="!isSub" v-b-tooltip.bottom="'Dupliquer'"><i class="ik ik-copy"></i></a>
                    <a href="#" @click.prevent="$emit('makeUpdate', logement)" v-if="!isSub" v-b-tooltip.bottom="'Editer'" ><i class="ik ik-edit-2"></i></a>
                    <a href="#" @click.prevent="remove" class="list-delete" v-b-tooltip.bottom="'Supprimer'"><i class="ik ik-trash-2"></i></a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const php = require("phpjs");
import notif from "@/plugins/notif.js";
export default {
  data: () => ({
    open: true,
    permissions: storage.get("userPermissions"),

  }),
  props: {
    annonce: { type: Object, required: true },
    isSub: { type: Boolean, default: false },
  },
  computed: {
    dateCreation() {
      const day = this.$date(this.annonce.createdAt);
      return `Créée le ${day.format("dddd, DD MMMM YYYY")} à ${day.format(
        "HH:mm"
      )}`;
    },
    php() {
      return php;
    },
    canUpdateAnnonce() {
            if(this.permissions.includes("update_annonce")){
                return true;
            }
            return false;
                
    },
    canDeleteAnnonce() {
            if(this.permissions.includes("delete_annonce")){
                return true;
            }
            return false;    
    },
    canSeeDetailsAnnonce(){
        if(this.permissions.includes("view_annonce")){
            return true;
        }
        return false;   
    },
    canViewLogement(){
       if(this.permissions.includes("view_logement")){
                return true;
        }
        return false;
    },
    canPublishAnnonce(){
      if(this.permissions.includes("publish_annonce")){
                return true;
        }
        return false;
    },
    canCommentAnnonce(){
      if(this.permissions.includes("comment_annonce")){
                return true;
        }
        return false;
    }
  },
  methods: {
    /**
     * Acces rapide au logement pour lequel l'annonce a étée publiée
     */
    accessTo() {
      this.$router.push({
        name: "logements",
        query: { target: this.annonce.idLogement },
      });
    },
    /**
     * Publier une annonce
     */
    //**suppréssion d'une annonce */
    remouve() {
      App.confirm(
        `Voullez vous vraiment supprimer l'annonce " <b>${this.annonce.titreAnnonce}</b> " ?`,
        {
          confirm: () => {
            axios
              .delete(`annonces/${this.annonce.idAnnonce}`)
              .then((response) => {
                if (!response.success) {
                  return App.notifyError(response.message);
                }
                this.$emit("deleted", this.annonce.idAnnonce);
                return App.notifySuccess(response.message);
              })
              .catch((error) => {
                App.notifyError(error.message);
              });
          },
        }
      );
    },
    publier(item) {
      let url = "annonces/" + item.idAnnonce + "/publish";
      axios
        .put(url)
        .then((response) => {
          this.$root.$emit("annonce-published-ok");
          notif.success(response.message);
        })
        .catch((error) => {
          notif.error(error.message);
        });
    },
    showMenu(id) {
      document.querySelector(`.showModal.s${id}`).style.display = "block";
    },
    closeMenu(id) {
      document.querySelector(`.showModal.s${id}`).style.display = "none";
    },
    /**
     * Affiche la modale avec les details de l'element
     */
    showDetails() {
      if (this.isSub) {
        return false;
      }
      this.$emit("showDetails", this.annonce);
    },
  },
};
</script>

<style scoped>
.max-lines-3 {
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.max-lines-1 {
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.btn-actions {
  width: 90px;
  margin-top: 10px;
}

.btn-actions i {
  font-size: 18px;
  border-radius: 50%;
  padding: 6px;
}
.btn-actions i:hover {
  background: grey;
}
.btn-actions i:nth-child(1) {
  margin-top: -5px;
}
.closebtn {
  margin-top: -20px;
}

.price {
  font-weight: 600;
  font-size: 16px;
  color: #f5365c;
}
.btn-action:hover {
  color: #f5365c;
}
.showModal {
  display: none;
  height: auto;
  width: 13rem;
  border: 1px solid rgba(128, 128, 128, 0.171);
  background: #fff;
  border-radius: 8px;
  position: absolute;
  bottom: 5rem;
  right: -2em;
  padding: 0 10px;
}

.card {
  border-radius: 15px;
}
</style>