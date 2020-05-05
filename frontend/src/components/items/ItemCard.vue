<template>
    <div>
        <router-link :to="{ name: 'showItem', params: {itemId: item.id } }">
            <b-card>
                <b-media>
                    <template v-slot:aside>
                        <b-img :src="item.User.imgUrl" width="64" :alt="item.User.firstname"></b-img>
                    </template>

                    <h5 class="mt-0">{{ item.User.firstname }} {{ item.User.lastname }}</h5>
                    <p>{{ item.title }}</p>
                    <p>{{ item.description }}</p>
                    <p>Prix : {{ item.price }}</p>
                    <b-img :src="item.imageUrl" fluid alt=""></b-img>
                </b-media>
            </b-card>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "ItemCard",
        props: ['item']
    };
</script>
