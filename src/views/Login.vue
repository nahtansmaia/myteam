<template>
  <div class="login">
    <v-row>
      <v-col cols="6" class="text-center">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
        <h1 class="display-2 font-weight-bold mb-3">
          Bem vindo ao <span class="text-primary">MyTeam</span>
        </h1>

        <p class="subheading font-weight-regular">
          Ajuda supervisores a administrar seus times de forma fácil e
          rápida.
        </p>
      </v-col>
      <v-col cols="6" class="text-center">
        <h1>Login</h1>
        <div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="[(v) => !!v || 'E-mail é obrigatório']"
              label="E-mail"
              type="email"
              autofocus
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="[(v) => !!v || 'Senha é obrigatória']"
              label="Senha"
              type="password"
            ></v-text-field>
            <v-btn color="primary" block @click="login" :disabled="!valid">
              Entrar
            </v-btn>
            <v-btn block @click="login"> Entrar com Google </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
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
