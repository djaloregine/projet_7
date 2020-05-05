<template>
    <div>
        <b-row>
            <b-col sm="8">
                <h3>Annonce</h3>
            </b-col>
            <b-col sm="4">
                <template v-if="item.UserId === userInfos.id || userInfos.isAdmin === true">
                    <div class="float-right">
                        <router-link :to="{ name: 'updateItem', params: { itemId: item.id}}">
                            <b-button variant="warning">Modifier</b-button>
                        </router-link>

                        <b-button v-on:click="deleteItem" variant="danger" class="ml-2">Supprimer</b-button>
                    </div>
                </template>
            </b-col>
        </b-row>
        <hr>
        <b-media>
            <template v-slot:aside>
                <b-img :src="user.imgUrl" width="64" :alt="user.firstname"></b-img>
            </template>

            <h5 class="mt-0">{{ user.firstname }} {{ user.lastname }}</h5>
            <p>{{ item.title }}</p>
            <p>{{ item.description }}</p>
            <p>Prix : {{ item.price }}</p>
            <b-img :src="item.imageUrl" fluid alt=""></b-img>
        </b-media>
    </div>
</template>

<script>
    import axios from "axios"
    import { mapGetters } from 'vuex'

    export default {
        name: "showItem",
        computed: {
            ...mapGetters({
                userInfos: 'auth/user'
            })
        },
        data () {
            return {
                item: {},
                user: {}
            }
        },
        methods: {
            async deleteItem() {
                try {
                    let response = await axios.delete("items/"+this.$route.params.itemId);
                    console.log(response);

                    this.$router.replace({
                        name: 'itemsList',
                        params: { message: response.data.success}
                    });
                } catch (err) {
                    this.error = err.response.data.error
                }
            }
        },
        mounted () {
            axios.get('items/'+this.$route.params.itemId).then(response => {
                this.item = response.data
                this.user = response.data.User
            })
        }
    };
</script>
