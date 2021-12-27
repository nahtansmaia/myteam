<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                :model="fault.name"
                :rules="[(v) => !!v || 'Nome não informado ou inválido.']"
                label="Nome"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                :items="levelList"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Nível não informado ou inválido.']"
                label="Nível"
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
  name: "RegisterFaultComponent",
  components: {
    SnackbarComponent,
  },
  data: () => ({
    formIsValid: false,
    defaultFault: Object.freeze({
      id: "",
      name: "",
      level: "",
    }),
    fault: {
      id: "",
      name: "",
      level: "",
    },
    levelList: [
      { id: "ALIGNMENT", name: "Alinhamento" },
      { id: "LIGHT", name: "Leve" },
      { id: "SEVERE", name: "Grave" },
    ],
    snack: {
      visible: false,
      text: "Cadastro realizado com sucesso.",
    },
  }),
  methods: {
    resetForm() {
      this.fault = Object.assign({}, this.defaultFault);
    },
    submit() {
      this.snack.visible = true;
      this.resetForm();
    },
  },
};
</script>

<style lang="scss">
.v-text-field {
  label {
    color: var(--featured-darker) !important;
  }
  input {
    background-color: transparent !important;
    color: var(--featured-lighter) !important;
  }
  .v-input__slot::after {
    border-color: var(--featured-lighter) !important;
  }
  .v-input__slot::before {
    border-color: var(--featured-lighter) !important;
  }
  .v-label--active label {
    color: var(--featured-lighter) !important;
  }
  .v-icon {
    color: var(--featured-lighter) !important;
  }
}
.v-select__selection {
  color: var(--featured-darker) !important;
}
.v-list-item__title {
  color: var(--featured-darker) !important;
  border-radius: 8px;
}
</style>