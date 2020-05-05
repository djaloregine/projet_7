<template>
    <div>
        <b-row>
            <b-col sm="8">
                <h3>Les annonces</h3>
            </b-col>
            <b-col sm="4">
                <router-link :to="{ name: 'addItem'}">
                    <b-button class="float-right" variant="success">Ajouter</b-button>
                </router-link>
            </b-col>
        </b-row>
        <hr>
        <b-alert show dismissible fade variant="success" v-if="$route.params.message"> {{ $route.params.message }}</b-alert>
        
        <template v-if="items.length == null">
            <b-alert show variant="secondary" >Il n'y a aucunes annonces !</b-alert>
        </template>

        <template v-else>
            <ItemCard v-for="item in items" :key="item.id" :item="item" />
        </template>
    </div>
</template>

<script>
    import axios from "axios"
    import ItemCard from '@/components/items/ItemCard'

    export default {
        name: "itemsList",
        components: {
            ItemCard
        },
        data () {
            return {
                items: {}
            }
        },
        mounted () {
            axios.get('items').then(response => {
                this.items = response.data
                // console.log(this.items)
            })
        }
    };
</script>
