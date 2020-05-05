<template>
    <div>
        <h3>Ajouter une annonce</h3>
        <hr>
        <b-alert show fade variant="danger" v-if="error"> {{ error }}</b-alert>
        
        <!-- Create Item Form -->
        <b-form @submit.prevent="createItem" enctype="multipart/form-data">
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

            <!-- Title input -->
            <b-form-group id="input-group-1" label="Titre :" label-for="input-title" >
                <b-form-input
                    id="input-title"
                    type="text"
                    placeholder="Entrer un titre"
                    required
                    v-model="item.title"
                >
                </b-form-input>
            </b-form-group>

            <!-- Description input -->
            <b-form-group id="input-group-2" label="Description :" label-for="input-description">
                <b-form-input
                    id="input-description"
                    type="text"
                    placeholder="Entrer une description"
                    required
                    v-model="item.description"
                >
                </b-form-input>
            </b-form-group>

            <!-- Price input -->
            <b-form-group id="input-group-2" label="Prix :" label-for="input-price">
                <b-form-input 
                    id="input-price" 
                    type="number"
                    placeholder="Entrer un prix" 
                    required 
                    v-model="item.price" 
                >
                </b-form-input>
            </b-form-group>

            <!-- Submit Button -->
            <b-button class="float-right" type="submit" variant="primary">Créer l'annonce</b-button>
        </b-form>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "AddItem",
        components: {
            //
        },
        data () {
            return {
                item: {
                    title: '',
                    description: '',
                    price: ''
                },
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
            async createItem() {
                const formData = new FormData();
                formData.append('title', this.item.title);
                formData.append('description', this.item.description);
                formData.append('price', this.item.price);
                formData.append('file', this.file);

                console.log(formData);

                try {
                    let response = await axios.post("items", formData);
                    console.log(response.data);

                    this.$router.replace({
                        name: 'itemsList',
                        params: { message: response.data.success}
                    })
                } catch (err) {
                    this.error = err.response.data.error
                }
            }
        }
    }
</script>