<template>
    <div>
        <h3>Modifier le message</h3>
        <hr>
        <b-alert show fade variant="danger" v-if="error"> {{ error }}</b-alert>
        <!-- Create Item Form -->
        <b-form @submit.prevent="editMessage">

            <!-- Text input -->
            <b-form-group id="input-group-text" label="Message :" label-for="input-text">
                <b-form-textarea
                    id=input-text
                    size="sm"
                    required
                    v-model="message.text"
                    placeholder="Entrer votre message"
                ></b-form-textarea>
            </b-form-group>

            <!-- Submit Button -->
            <b-button class="float-right" type="submit" variant="primary">Valider</b-button>
        </b-form>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data () {
            return {
                message: {
                    text: ''
                },
                error: ''
            }
        },
        methods: {
            async editMessage() {
                try {
                    let response = await axios.put("messages/"+this.$route.params.messageId, this.message);

                    this.$router.replace({
                        name: 'messagesList',
                        params: { message: response.data.success}
                    })
                    
                } catch (err) {
                    this.error = err.response.data.error
                }

            }
        },
        mounted () {
            axios.get('messages/'+this.$route.params.messageId).then(response => {
                this.message = response.data;
            })
        }
    }
</script>