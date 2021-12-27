<template>
  <v-container>
    <v-card>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="4">
              <v-select
                :items="analysts"
                item-text="email"
                item-value="id"
                :rules="[(v) => !!v || 'Analista não informado ou inválido.']"
                label="Analista"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-menu
                ref="menu"
                v-model="menuDate"
                :close-on-content-click="false"
                :return-value.sync="fault.date"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="picker"
                    label="Data"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="picker"
                  locale="pt-br"
                  no-title
                  scrollable
                  @input="menuDate = false"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                :rules="[
                  (v) => !!v || 'Atendimento não informado ou inválido.',
                ]"
                label="Atendimento"
                required
                v-model="fault.code"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="fault"
                :hint="fault.level"
                :items="faults"
                item-text="name"
                item-value="id"
                label="Falta"
                persistent-hint
                return-object
                single-line
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
  name: "ServiceComponent",
  components: {
    SnackbarComponent,
  },
  data: () => ({
    picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menuDate: false,
    defaultFault: {
      id: "",
      name: "",
      level: "",
      analyst: {
        id: "",
        name: "",
        email: "",
        team: {
          id: "",
          name: "",
          supervisor: {
            id: "",
            name: "",
            active: false,
          },
        },
      },
      code: "",
      date: null,
    },
    fault: {
      id: "",
      analyst: {
        id: "",
        name: "",
        email: "",
        team: {
          id: "",
          name: "",
          supervisor: {
            id: "",
            name: "",
            active: false,
          },
        },
      },
      code: "",
      fault: {
        id: "",
        name: "",
        level: "",
      },
      date: null,
    },
    analysts: [
      {
        id: "1",
        email: "zé.sup.shop",
      },
      {
        id: "2",
        email: "maria.sup.shop",
      },
    ],
    faults: [
      {
        id: "1",
        name: "Falta 1",
        level: "Nível 1",
      },
      {
        id: "2",
        name: "Falta 2",
        level: "Nível 2",
      },
      {
        id: "3",
        name: "Falta 3",
        level: "Nível 3",
      },
    ],
    snack: {
      visible: false,
      text: "Cadastro realizado com sucesso.",
    },
  }),
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
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
