<template>
    <div>
        <b-row>
            <b-col sm="8">
                <h3>Les annonces</h3>
            </b-col>
            <b-col sm="4">
                <div class="float-right">
                    <router-link :to="{ name: 'addItem'}">
                        <b-button variant="warning">Modifier</b-button>
                    </router-link>

                    <router-link :to="{ name: 'addItem'}">
                        <b-button variant="danger" class="ml-2">Supprimer</b-button>
                    </router-link>
                </div>
            </b-col>
        </b-row>
        <hr>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "showItem",
        data () {
            return {
                item: {}
            }
        },
        mounted () {
            axios.get('items/'+this.$route.params.itemId).then(response => {
                this.item = response.data
                // console.log(this.item)
            })
        }
    };
</script>
