<template>
  <div>
    <h2>Modification du profil</h2>
    <hr>
    <b-alert show fade variant="danger" v-if="error"> {{ error }}</b-alert>

    <b-form @submit.prevent="editUser" enctype="multipart/form-data">
      <!-- Image preview -->
      <div class="mb-3" id="preview">
          <img :src="imgPreview ? imgPreview : user.imgUrl" />
      </div>

      <!-- Image input -->
      <div class="mb-3">Selectionner une image</div>
      <input 
          type="file"
          ref="file"
          @change="selectFile"
      />

      <!-- Lastname input -->
      <b-form-group id="input-group-1" label="Votre nom :" label-for="input-lastname">
        <b-form-input id="input-lastname" type="text" placeholder="Entrer votre nom" required v-model="user.lastname" ></b-form-input>
      </b-form-group>

      <!-- Firstname input -->
      <b-form-group id="input-group-2" label="Votre prenom :" label-for="input-firstname">
        <b-form-input id="input-firstname" type="text" placeholder="Entrer votre prenom" required v-model="user.firstname" ></b-form-input>
      </b-form-group>

      <!-- Email input -->
      <b-form-group id="input-group-3" label="Adresse email :" label-for="input-email" >
        <b-form-input id="input-email" type="email" placeholder="Entrer votre adresse email" required v-model="user.email" ></b-form-input>
      </b-form-group>

      <b-button class="float-right" type="submit" variant="primary">Modifier</b-button>
    </b-form>
  </div>
</template>

<script>
  import axios from "axios"
  
  export default {
    name: "Register",
    components: {
      //
    },
    data() {
      return {
        user: {
          lastname: '',
          firstname: '',
          email: '',
        },
        file: '',
        imgPreview: '',
        error:''
      }
    },
    methods: {
      selectFile() {
        this.file = this.$refs.file.files[0];
        this.imgPreview = URL.createObjectURL(this.file);
      },
      async editUser() {
            var formData = new FormData();
            formData.append('file', this.file);
            formData.append('lastname', this.user.lastname);
            formData.append('firstname', this.user.firstname);
            formData.append('email', this.user.email);

            try {
                let response = await axios.put("/users/me", formData);
                // console.log(response.data);

                this.$router.replace({ name: 'userProfile', params: { message: response.data.success }});
            } catch (err) {
                this.error = err.response.data.error
            }
        },
    },
    mounted () {
        axios.get("users/me").then(response => {
            this.user = response.data;
        })
    }
  };
</script>
