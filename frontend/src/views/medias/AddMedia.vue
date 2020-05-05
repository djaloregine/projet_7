<template>
    <div>
        <h3>Ajouter un media</h3>
        <hr>
        <b-alert show fade variant="danger" v-if="error"> {{ error }}</b-alert>
        <!-- Create Item Form -->
        <b-form @submit.prevent="createMedia" enctype="multipart/form-data">
            <!-- Image preview -->
            <div class="mb-3" id="preview">
                <img v-if="imgPreview" :src="imgPreview" />
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
            async createMedia() {
                const formData = new FormData();
                formData.append('file', this.file);

                try {
                    let response = await axios.post("medias", formData);

                    this.$router.replace({
                        name: 'mediasList',
                        params: { message: response.data.success}
                    })
                    
                } catch (err) {
                    this.error = err.response.data.error
                }

            }
        }
    }
</script>