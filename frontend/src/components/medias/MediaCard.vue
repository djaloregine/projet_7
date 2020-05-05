<template>
    <div>
        <router-link :to="{ name: 'showMedia', params: {mediaId: media.id } }">
            <b-card>
                <b-media>
                    <template v-slot:aside>
                        <b-img :src="media.User.imgUrl" width="64" :alt="media.User.firstname"></b-img>
                    </template>

                    <h5 class="mt-0">{{ media.User.firstname }} {{ media.User.lastname }}</h5>
                    <b-img :src="media.mediaUrl" fluid alt=""></b-img>
                </b-media>
            </b-card>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "MediaCard",
        props: ['media']
    };
</script>
