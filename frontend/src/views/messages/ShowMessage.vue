<template>
    <div>
        <b-row>
            <b-col sm="8">
                <h3>Message</h3>
            </b-col>
            <b-col sm="4">
                <div class="float-right">
                    <router-link :to="{ name: 'updateMessage', params: { messageId: message.id}}">
                        <b-button variant="warning">Modifier</b-button>
                    </router-link>

                    <b-button v-on:click="deleteMessage" variant="danger" class="ml-2">Supprimer</b-button>
                </div>
            </b-col>
        </b-row>
        <hr>
        <b-media>
            <template v-slot:aside>
                <b-img :src="user.imgUrl" width="64" :alt="user.firstname" rounded="circle"></b-img>
            </template>

            <h5 class="mt-0">{{ user.firstname }} {{ user.lastname }}</h5>
            <p>{{ message.text }}</p>
        </b-media>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "showMessage",
        data () {
            return {
                message: {},
                user: {}
            }
        },
        methods: {
            async deleteMessage() {
                try {
                    let response = await axios.delete("messages/"+this.$route.params.messageId);

                    this.$router.replace({
                        name: 'messagesList',
                        params: { message: response.data.success}
                    });
                } catch (err) {
                    this.error = err.response.data.error
                }
            }
        },
        mounted () {
            axios.get('messages/'+this.$route.params.messageId).then(response => {
                this.message = response.data;
                this.user = response.data.User;
            })
        }
    }
</script>
