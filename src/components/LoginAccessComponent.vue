<template>
  <div class="access">
    <h2>Login</h2>
    <div>
      <v-form class="form" ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="supervisor.email"
          :rules="[(v) => !!v || 'E-mail é obrigatório']"
          label="E-mail"
          type="email"
          autofocus
        ></v-text-field>
        <v-text-field
          v-model="supervisor.password"
          :rules="[(v) => !!v || 'Senha é obrigatória']"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          label="Senha"
        ></v-text-field>
        <v-btn
          class="btnPrincipal"
          block
          @click="getSupervisorWithLogin(supervisor)"
          :disabled="!valid"
        >
          Entrar
        </v-btn>
      </v-form>
    </div>
    <SnackBarComponent
      :visible="snack.visible"
      :text="snack.text"
      @requestClose="snack.visible = false"
    />
  </div>
</template>

<script>
import SnackBarComponent from "../components/SnackbarComponent.vue";
import supervisorAxios from "../services/supervisor.js";
import sha256 from "crypto-js/sha256";

export default {
  name: "LoginAccessComponent",
  components: {
    SnackBarComponent,
  },

  data: () => ({
    showPassword: false,
    valid: false,
    snack: {
      visible: false,
      text: "E-mail ou senha inválidos",
    },
    supervisor: {
      email: "",
      password: "",
    },
  }),
  methods: {
    getSupervisorWithLogin(supervisor) {
      const senha = supervisor.password;
      const myhash = sha256(senha);

      supervisorAxios
        .getSupervisorWithEmailAndPassword(
          supervisor.email,
          myhash.toString().toUpperCase()
        )
        .then((response) => {
          this.supervisor = response.data;
          this.supervisor.initial = this.supervisor.name.charAt(0).toUpperCase();
          localStorage.setItem("user", JSON.stringify(this.supervisor));
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
          this.snack.visible = true;
        });
    },
  },
};
</script>

<style lang="scss">
.access {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--featured-lighter) !important;

  h2 {
    margin-bottom: 3rem;
    font-size: 2.5rem;
    color: var(--light) !important;
  }

  div {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;

    .v-text-field {
      label {
        color: var(--light) !important;
      }
      input {
        background-color: transparent !important;
        color: var(--light) !important;
      }
      .v-input__slot::after {
        border-color: var(--light) !important;
      }
      .v-input__slot::before {
        border-color: var(--light) !important;
      }
      .v-label--active label {
        color: var(--light) !important;
      }
      .v-icon {
        color: var(--light) !important;
      }
      .v-input__icon {
        justify-content: flex-end;
      }
    }
  }
}
</style>
