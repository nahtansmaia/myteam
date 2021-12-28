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
                return-object
                v-model="audit.analyst"
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
                :return-value.sync="audit.date"
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
                v-model="audit.code"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                v-model="audit.fault"
                :items="faults"
                item-text="name"
                return-object
                label="Falta"
                persistent-hint
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
import analystAxios from "../services/analyst.js";
import faultAxios from "../services/fault.js";
import auditAxios from "../services/audit.js";
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
    defaultAudit: {
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
    audit: {
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
    analysts: [],
    faults: [],
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
      this.snack.visible = true;
      this.createAudit(this.audit);
      this.resetForm();
    },
    createAudit(audit) {
      audit.date = this.picker + "T00:00:00";
      auditAxios.saveAudit(audit).then(() => {
        this.snack.visible = true;
      }).catch((error) => {
        this.snack.text = "Erro ao lançar falta.";
        this.snack.visible = true;
        console.error(error);
      });
    },
    getAnalysts() {
      analystAxios
        .ListAnalysts()
        .then((response) => {
          this.analysts = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getFaults() {
      faultAxios
        .ListFaults()
        .then((response) => {
          this.faults = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    loadAllObjects() {
      this.getAnalysts();
      this.getFaults();
    },
  },
  created() {
    this.loadAllObjects();
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
