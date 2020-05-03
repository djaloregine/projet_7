<template>
  <div>
    
    <h3>Dashboard - Liste des fonctionnalités</h3>
    <hr>
    <b-alert show dismissible fade variant="success" v-if="$route.params.message"> {{ $route.params.message }}</b-alert>

    <b-row class="mb-3">
      <b-col md="6" sm="12" class="mt-3">
        <router-link :to="{ name: 'mediasList'}">
          <b-card header="Forum multimédia" class="text-center">
            <b-card-text>Partagez vos dernières images ici !</b-card-text>
          </b-card>
        </router-link>
          
      </b-col>
      <b-col md="6" sm="12" class="mt-3">
        <router-link :to="{ name: 'itemsList'}">
          <b-card header="Annonces" class="text-center">
            <b-card-text>Retrouvez les dernières annonces de ventes ici !</b-card-text>
          </b-card>
        </router-link>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6" sm="12" class="mt-3">
        <router-link :to="{ name: 'messagesList'}">
          <b-card header="Forum messages" class="text-center">
            <b-card-text>Venez discutez et voir les derniers messages ici !</b-card-text>
          </b-card>
        </router-link>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {}
};
</script>

<style>
  a,
  a:hover {
    color: #000!important;
    text-decoration: none;
  }
</style>
