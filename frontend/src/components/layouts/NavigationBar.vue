<template>
    <div>
        <b-navbar toggleable="lg" class="mb-4" type="dark" variant="dark">
            <b-container>
                <b-navbar-brand href="#">
                    <router-link :to="{ name: 'dashboard'}">
                        <img src="@/assets/logos/icon-left-font-monochrome-white.svg" height="38" class="d-inline-block align-top" alt="">
                    </router-link>
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>

                    <b-navbar-nav class="ml-auto">
                        <template v-if="authentificated">
                            <b-nav-item>
                                <router-link :to="{ name: 'dashboard'}">Dashboard</router-link>
                            </b-nav-item>
                            <b-nav-item>
                                <router-link :to="{ name: 'userProfile'}">{{ user.firstname }} {{ user.lastname }}</router-link>
                            </b-nav-item>
                            <b-nav-item @click.prevent="signOut">Deconnexion</b-nav-item>
                        </template>

                        <template v-else>
                            <b-nav-item href="#">
                                <router-link :to="{ name: 'login'}">Connexion</router-link>
                            </b-nav-item>
                            <b-nav-item href="#">
                                <router-link :to="{ name: 'register'}">Inscription</router-link>
                            </b-nav-item>
                        </template>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>                
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                authentificated: 'auth/authentificated',
                user: 'auth/user'
            })
        },

        methods: {
            ...mapActions({
                signOutAction: 'auth/signOut'
            }),

            signOut () {
                this.signOutAction().then(() => {
                    this.$router.replace({
                        name: 'login',
                        params: { message: "Vous êtes déconnecté !"}
                    })
                })
            }
        }

    }
</script>

<style scoped>
    .nav-item a {
        color: #fff!important;
        text-transform: capitalize;
        /* text-decoration: none; */
    }
</style>