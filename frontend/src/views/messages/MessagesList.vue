<template>
    <div>
        <b-row>
            <b-col sm="8">
                <h3>Forum messages</h3>
            </b-col>
            <b-col sm="4">
                <router-link :to="{ name: 'addMessage'}">
                    <b-button class="float-right" variant="success">Ajouter</b-button>
                </router-link>
            </b-col>
        </b-row>
        <hr>
        <b-alert show dismissible fade variant="success" v-if="$route.params.message"> {{ $route.params.message }}</b-alert>

        <b-alert show variant="secondary" v-if="messages.length == null">Il n'y a aucuns messages !</b-alert>
        <MessageCard v-for="message in messages" :key="message.id" :message="message" class="mb-2" />
    </div>
</template>

<script>
    import axios from "axios"
    import MessageCard from '@/components/messages/MessageCard'

    export default {
        name: "messagesList",
        components: {
            MessageCard
        },
        data () {
            return {
                messages: {}
            }
        },
        mounted () {
            axios.get('messages').then(response => {
                // console.log(this.messages)
                this.messages = response.data
            })
        }
    };
</script>