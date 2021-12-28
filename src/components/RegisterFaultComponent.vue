<template>
  <v-container>
    <v-card flat>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="fault.name"
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
                v-model="fault.level"
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
import faultAxios from "../services/fault.js";
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
      this.snack = {
        visible: false,
        text: "Cadastro realizado com sucesso.",
      };
    },
    submit() {
      this.saveFault(this.fault);
      this.resetForm();
    },
    saveFault(fault) {
      faultAxios.ListFaults().then((response) => {
        response.data.forEach((element) => {
          if (element.name === fault.name) {
            this.snack.visible = true;
            this.snack.text = "Já existe uma falta cadastrada com este nome.";
            return;
          }
        });
      });
      faultAxios
        .saveFault(fault)
        .then(() => {
          this.snack.visible = true;
        })
        .catch((error) => {
          console.error(error);
        });
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