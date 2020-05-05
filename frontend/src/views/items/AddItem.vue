<template>
    <div>
        <h3>Ajouter une annonce</h3>
        <hr>
        <!-- Create Item Form -->
        <b-form @submit.prevent="createItem">
            <!-- Image preview -->
            <div class="mb-3" id="preview">
                <img v-if="imageUrl" :src="imageUrl" />
            </div>
            
            <!-- Image input -->
            <b-form-group id="input-group-file" label="Image de l'annonce :">
                <b-form-file class="mt-3" plain @change="onFileChange"></b-form-file>
            </b-form-group>

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
                imageUrl: ''
            }
        },
        methods: {
            async createItem() {
                console.log('item :  '+ this.item);
                // let response = await axios.post("items", {
                //         headers: {
                //             'Content-Type': this.item.imageUrl
                //         },
                //         body: this.item
                //     });
                let response = await axios.post("items", this.item, {file: this.imageUrl});
                console.log(response.data);
            },
            onFileChange(e) {
                const file = e.target.files[0];
                this.item.imageUrl = URL.createObjectURL(file);
            }
        }
    }
</script>