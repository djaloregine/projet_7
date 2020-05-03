<template>
  <div>
    <h2>Inscription</h2>
    <hr>
    <b-alert show fade variant="danger" v-if="error"> {{ error }}</b-alert>

    <b-form @submit.prevent="onSubmit">
      <div class="mb-3" id="preview">
        <img v-if="url" :src="url" />
      </div>
      <!-- Image input -->
      <b-form-group id="input-group-5" label="Image de profil :">
        <b-form-file
          v-model="form.file"
          placeholder="Choisir un fichier ou déposer le ici..."
          drop-placeholder="Déposer le fichier ici..."
          @change="onFileChange"
        ></b-form-file>
      </b-form-group>

      <!-- Lastname input -->
      <b-form-group id="input-group-1" label="Votre nom :" label-for="input-lastname">
        <b-form-input id="input-lastname" type="text" placeholder="Entrer votre nom" required v-model="form.lastname" ></b-form-input>
      </b-form-group>

      <!-- Firstname input -->
      <b-form-group id="input-group-2" label="Votre prenom :" label-for="input-firstname">
        <b-form-input id="input-firstname" type="text" placeholder="Entrer votre prenom" required v-model="form.firstname" ></b-form-input>
      </b-form-group>

      <!-- Email input -->
      <b-form-group id="input-group-3" label="Adresse email :" label-for="input-email" >
        <b-form-input id="input-email" type="email" placeholder="Entrer votre adresse email" required v-model="form.email" ></b-form-input>
      </b-form-group>

      <!-- Password input -->
      <b-form-group id="input-group-4" label="Votre mot de passe :" label-for="input-password">
        <b-form-input id="input-password" type="password" placeholder="Entrer votre mot de passe" required v-model="form.password" ></b-form-input>
      </b-form-group>

      <b-button class="float-right" type="submit" variant="primary">Se connecter</b-button>
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
        form: {
          lastname: '',
          firstname: '',
          email: '',
          password: '',
          file: ''
        },
        url: '',
        error:''
      }
    },
    methods: {
      onSubmit() {
        axios.post('/auth/register', this.form)
          .then(response => {
            if(response.status === 200) {
              this.$router.replace({ name: 'login', params: { message: response.data.success }});
            }
          })
          .catch((err) => {
            this.error = err.response.data.error
          })
      },

      onFileChange(e) {
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);
      }
    }
  };
</script>

<style>
  #preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #preview img {
    max-width: 100%;
    max-height: 300px;
  }
</style>
