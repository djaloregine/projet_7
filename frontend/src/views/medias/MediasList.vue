<template>
    <div>
        <b-row>
            <b-col sm="8">
                <h3>Forum multimédia</h3>
            </b-col>
            <b-col sm="4">
                <router-link :to="{ name: 'addMedia'}">
                    <b-button class="float-right" variant="success">Ajouter</b-button>
                </router-link>
            </b-col>
        </b-row>
        <hr>
        <b-alert show dismissible fade variant="success" v-if="$route.params.message"> {{ $route.params.message }}</b-alert>
        
        <MediaCard v-for="media in medias" :key="media.id" :media="media" class="mb-2" />
        <b-alert show variant="secondary" v-if="medias.length == null">Il n'y a aucun contenu multimédia !</b-alert>
    </div>
</template>

<script>
    import axios from "axios"
    import MediaCard from '@/components/medias/MediaCard'

    export default {
        name: "mediasList",
        components: {
            MediaCard
        },
        data () {
            return {
                medias: {}
            }
        },
        mounted () {
            axios.get('medias').then(response => {
                this.medias = response.data
                // console.log(this.medias)
            })
        }
    };
</script>
