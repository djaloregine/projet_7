<template>
  <div>
    
    <h3>Dashboard - Liste des fonctionnalités</h3>
    <hr>
    <b-alert show dismissible fade variant="success" v-if="$route.params.message"> {{ $route.params.message }}</b-alert>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {}
};
</script>
