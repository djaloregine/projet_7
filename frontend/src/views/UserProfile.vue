<template>
  <div>
    
    <h3>Mon profil</h3>
    <hr>
    <img :src="user.imgUrl" alt="Phote de profil">
    <br>
    <p>Prenom : {{ user.firstname }}</p>
    <p>Nom : {{ user.lastname }}</p>
    <p>Email : {{ user.email }}</p>
  </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "UserProfile",
        components: {
            //
        },
        data () {
            return {
                user: {}
            }
        },
        mounted () {
            axios.get('users/me').then(response => {
                this.user = response.data
            })
        }
    };
</script>
