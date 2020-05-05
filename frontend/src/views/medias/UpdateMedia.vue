<template>
    <div>
        <h3>Modification du media</h3>
        <hr>
        <b-alert show fade variant="danger" v-if="error"> {{ error }}</b-alert>
        <!-- Create Item Form -->
        <b-form @submit.prevent="editMedia" enctype="multipart/form-data">
            <!-- Image preview -->
            <div class="mb-3" id="preview">
                <img :src="imgPreview ? imgPreview : media.mediaUrl" />
            </div>

            <!-- Image input -->
            <div class="mb-3">Selectionner une image</div>
            <input 
                type="file"
                ref="file"
                @change="selectFile"
            />

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
                media: {},
                imgPreview: '',
                file: '',
                error: ''
            }
        },
        methods: {
            selectFile() {
                this.file = this.$refs.file.files[0];
                this.imgPreview = URL.createObjectURL(this.file);
            },
            async editMedia() {
                const formData = new FormData();
                formData.append('file', this.file);

                try {
                    let response = await axios.put("medias/"+this.$route.params.mediaId, formData);

                    this.$router.replace({
                        name: 'mediasList',
                        params: { message: response.data.success}
                    })
                    
                } catch (err) {
                    this.error = err.response.data.error
                }

            }
        },
        mounted () {
            axios.get("medias/"+this.$route.params.mediaId).then(response => {
                this.media = response.data;
            })
        }
    }
</script>