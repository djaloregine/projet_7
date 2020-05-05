<template>
    <div>
        <b-row>
            <b-col sm="8">
                <h3>Media</h3>
            </b-col>
            <b-col sm="4">
                <div class="float-right">
                    <router-link :to="{ name: 'updateMedia', params: { mediaId: media.id}}">
                        <b-button variant="warning">Modifier</b-button>
                    </router-link>

                    <b-button v-on:click="deleteMedia" variant="danger" class="ml-2">Supprimer</b-button>
                </div>
            </b-col>
        </b-row>
        <hr>
        <b-media>
            <template v-slot:aside>
                <b-img :src="user.imgUrl" width="64" :alt="user.firstname" rounded="circle"></b-img>
            </template>

            <h5 class="mt-0">{{ user.firstname }} {{ user.lastname }}</h5>
            <b-img :src="media.mediaUrl" fluid alt=""></b-img>
        </b-media>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "showMedia",
        data () {
            return {
                media: {},
                user: {}
            }
        },
        methods: {
            async deleteMedia() {
                try {
                    let response = await axios.delete("medias/"+this.$route.params.mediaId);

                    this.$router.replace({
                        name: 'mediasList',
                        params: { message: response.data.success}
                    });
                } catch (err) {
                    this.error = err.response.data.error
                }
            }
        },
        mounted () {
            axios.get("medias/"+this.$route.params.mediaId).then(response => {
                this.media = response.data;
                this.user = response.data.User;
            })
        }
    }
</script>
