<template>
    <div>
        <b-row>
            <b-col sm="8">
                <h3>Mon profil</h3>
            </b-col>
            <b-col sm="4">
                <div class="float-right">
                    <router-link :to="{ name: 'updateUser', params: { userId: user.id}}">
                        <b-button variant="warning">Modifier</b-button>
                    </router-link>

                    <b-button v-on:click="deleteUser" variant="danger" class="ml-2">Supprimer</b-button>
                </div>
            </b-col>
        </b-row>
        <hr>
        <b-alert show dismissible fade variant="success" v-if="$route.params.message"> {{ $route.params.message }}</b-alert>

        <img :src="user.imgUrl" :alt="user.lastname" class="mb-3" width="400">

        <p>Nom : {{ user.lastname }}</p>
        <p>Prenom : {{ user.firstname }}</p>
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
        methods: {
            async deleteUser() {
                
                try {
                    let response = await axios.delete("users/me");
                    console.log(response);

                    localStorage.clear();
                    
                    document.location.reload(true);

                    this.$router.replace({
                        name: 'login',
                        params: { message: "Compte supprimé !"}
                    })

                } catch (err) {
                    this.error = err.response.data.error
                }
            }
        },
        mounted () {
            axios.get('users/me').then(response => {
                this.user = response.data
            })
        }
    };
</script>
