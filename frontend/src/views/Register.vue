<template>
  <div>
    <h2>Inscription</h2>
    <hr>
    <b-form @submit.prevent="onSubmit">

      <b-form-group id="input-group-1" label="Votre nom :" label-for="input-lastname">
        <b-form-input id="input-lastname" type="text" placeholder="Entrer votre nom" required v-model="form.lastname" ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Votre prenom :" label-for="input-firstname">
        <b-form-input id="input-firstname" type="text" placeholder="Entrer votre prenom" required v-model="form.firstname" ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Adresse email :" label-for="input-email" >
        <b-form-input id="input-email" type="email" placeholder="Entrer votre adresse email" required v-model="form.email" ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Votre mot de passe :" label-for="input-password">
        <b-form-input id="input-password" type="password" placeholder="Entrer votre mot de passe" required v-model="form.password" ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Se connecter</b-button>
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
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        axios.post('/auth/register', this.form).then(response => {
          // console.log(response)
          if(response.status === 200) {
            this.$router.replace({ name: 'login', params: { message: response.data.success }});
          }
        })
      }
    }
  };
</script>

<style></style>
