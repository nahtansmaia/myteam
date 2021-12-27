<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                :model="user.name"
                :rules="[(v) => !!v || 'Nome não informado ou inválido.']"
                label="Nome"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.email"
                label="E-mail"
                :rules="[(v) => !!v || 'E-Mail não informado ou inválido.']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="supervisorList"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Supervisor não informado ou inválido.']"
                label="Supervisor"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="resetForm" outlined> Cancelar </v-btn>
          <v-btn class="btnPrincipal" @click="submit()"> Cadastrar </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <SnackbarComponent
      :visible="snack.visible"
      :text="snack.text"
      @requestClose="snack.visible = false"
    />
  </v-container>
</template>

<script>
import SnackbarComponent from "./SnackbarComponent.vue";
export default {
  name: "RegisterAnalystComponent",
  components: {
    SnackbarComponent,
  },
  data: () => ({
    formIsValid: false,
    defaultUser: Object.freeze({
      id: "",
      name: "",
      email: "",
      team: {
        id: "",
        name: "",
        supervisor: {
          id: "",
          name: "",
          active: null,
        },
      },
    }),
    user: {
      id: "",
      name: "",
      email: "",
      team: {
        id: "",
        name: "",
        supervisor: {
          id: "",
          name: "",
          active: null,
        },
      },
    },
    snack: {
      visible: false,
      text: "Cadastro realizado com sucesso.",
    },
    supervisorList: [
      {
        id: "1",
        name: "castro.sup.shop",
        active: true,
      },
      {
        id: "2",
        name: "igorpontes.sup.shop",
        active: false,
      },
    ],
  }),
  methods: {
    resetForm() {
      this.user = Object.assign({}, this.defaultUser);
    },
    submit() {
      this.snack.visible = true;
      this.resetForm();
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  padding: 1ch !important;

  label {
    font-size: 0.8rem !important;
  }
  .v-messages__message {
    font-size: 0.6rem !important;
  }
}
</style>