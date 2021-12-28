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
                :rules="[(v) => !!v || 'Analista não informado ou inválido.']"
                label="Analista"
                required
                v-model="service.analyst"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-menu
                ref="menu"
                v-model="menuDate"
                :close-on-content-click="false"
                :return-value.sync="service.date"
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
            <v-col cols="12" sm="4">
              <v-select
                :items="supervisors"
                item-text="name"
                return-object
                :rules="[(v) => !!v || 'Supervisor não informado ou inválido.']"
                label="Supervisor"
                required
                v-model="service.supervisor"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.quantity"
                label="Quantidade"
                type="number"
                :rules="[(v) => !!v || 'Quantidade não informada ou inválida.']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.goal"
                label="Meta"
                type="number"
                :rules="[(v) => !!v || 'Meta não informada ou inválida.']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.closedOthers"
                label="Encerrado de outros"
                type="number"
                :rules="[
                  (v) =>
                    !!v || 'Encerrado de outros não informado ou inválido.',
                ]"
                required
              ></v-text-field
            ></v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="service.firstContactResolution"
                label="Resolução primeiro contato"
                type="number"
                :rules="[
                  (v) =>
                    !!v ||
                    'Resolução primeiro contato não informada ou inválida.',
                ]"
                required
              ></v-text-field
            ></v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="service.ratingPercentage"
                label="Percentual de avaliação"
                type="number"
                :rules="[
                  (v) =>
                    !!v || 'Percentual de avaliação não informada ou inválida.',
                ]"
                required
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.oneStars"
                label="Uma estrela"
                type="number"
                :rules="[
                  (v) => !!v || 'Uma estrela não informada ou inválida.',
                ]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.twoStars"
                label="Duas estrela"
                type="number"
                :rules="[
                  (v) => !!v || 'Duas estrelas não informada ou inválida.',
                ]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.threeStars"
                label="Três estrela"
                type="number"
                :rules="[
                  (v) => !!v || 'Três estrelas não informada ou inválida.',
                ]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.fourStars"
                label="Quatro estrelas"
                type="number"
                :rules="[
                  (v) => !!v || 'Quatro estrelas não informada ou inválida.',
                ]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field
                v-model="service.fiveStars"
                label="Cinco estrelas"
                type="number"
                :rules="[
                  (v) => !!v || 'Cinco estrelas não informada ou inválida.',
                ]"
                required
              ></v-text-field>
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
import supervisorAxios from "../services/supervisor.js";
import analystAxios from "../services/analyst.js";
import performanceAxios from "../services/performance.js";

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
    defaultService: Object.freeze({
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
      date: null,
      quantity: null,
      goal: null,
      hitGoal: false,
      closedOthers: null,
      supervisor: {
        id: "",
        name: "",
        active: false,
      },
      fiveStars: null,
      fourStars: null,
      threeStars: null,
      twoStars: null,
      oneStars: null,
      firstContactResolution: null,
      ratingPercentage: null,
    }),
    service: {
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
      date: null,
      quantity: null,
      goal: null,
      hitGoal: false,
      closedOthers: null,
      supervisor: {
        id: "",
        name: "",
        active: false,
      },
      fiveStars: null,
      fourStars: null,
      threeStars: null,
      twoStars: null,
      oneStars: null,
      firstContactResolution: null,
      ratingPercentage: null,
    },
    analysts: [],
    supervisors: [],
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
      this.service = Object.assign({}, this.defaultService);
      this.snack = {
        visible: false,
        text: "Cadastro realizado com sucesso.",
      };
    },
    submit() {
      this.createService(this.service);
      this.resetForm();
    },
    getSupervisors() {
      supervisorAxios
        .ListSupervisors()
        .then((response) => {
          this.supervisors = response.data;
        })
        .catch((error) => {
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
    createService(service) {
      service.date = this.picker + "T00:00:00";
      performanceAxios
        .savePerformance(service)
        .then((response) => {
          this.service = response.data;
          this.snack.visible = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    loadAllObjects() {
      this.getSupervisors();
      this.getAnalysts();
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
