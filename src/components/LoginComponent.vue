<template>
  <div class="login">
    <v-row>
      <v-col cols="6" class="text-center">
        <apresentation-component />
      </v-col>
      <v-col cols="6" class="text-center">
        <login-access-component />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ApresentationComponent from './LoginApresentationComponent.vue';
import LoginAccessComponent from './LoginAccessComponent.vue';

export default {
  name: "LoginComponent",
  components: {
    ApresentationComponent,
    LoginAccessComponent,
  },

  data() {
    return {
      email: "",
      password: "",
      valid: false,
    };
  },
  methods: {
    login() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>
