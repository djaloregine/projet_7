<template>
    <div>
        <router-link :to="{ name: 'showMessage', params: {messageId: message.id }}">
            <b-card>
                <b-media>
                    <template v-slot:aside>
                        <b-img :src="message.User.imgUrl" width="64" :alt="message.User.firstname"></b-img>
                    </template>

                    <h5 class="mt-0">{{ message.User.firstname }} {{ message.User.lastname }}</h5>
                    <p>{{ message.text }}</p>
                </b-media>
            </b-card>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "MessageCard",
        props: ['message']
    };
</script>
