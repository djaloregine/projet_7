<template>
  <div id="app">
    <NavigationBar />
    
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
  import NavigationBar from './components/layouts/NavigationBar.vue';

  export default {
    components: {
      NavigationBar
    }
  }
</script>