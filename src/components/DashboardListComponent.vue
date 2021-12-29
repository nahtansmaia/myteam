<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :items-per-page="10"
        :footer-props="{
          'items-per-page-text': 'Registros por página:',
          'items-per-page-all-text': 'Todos',
          'items-per-page-options': [15, 30, 50, -1],
        }"
      >
        <template v-slot:no-data>
          <span>Ops! Não localizamos nenhum registro.</span>
          <v-spacer />
          <v-btn class="btnPrincipal" small @click="getPerformance"> Recarregar </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import performanceAxios from "../services/performance.js";
export default {
  name: "DashboardListComponent",
  data: () => ({
    search: "",
    headers: [
      {
        text: "Analista",
        align: "start",
        value: "analyst.email",
      },
      { text: "Data", value: "date", align: "center" },
      { text: "Supervisor", value: "supervisor.name" },
      { text: "Quantidade", value: "quantity", align: "end" },
      { text: "Resolução 1º", value: "firstContactResolution", align: "end" },
      { text: "Encerrado de outros", value: "closedOthers", align: "end" },
    ],
    desserts: [],
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
  }),
  methods: {
    getPerformance() {
      performanceAxios
        .ListPerformances()
        .then((response) => {
          this.desserts = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getPerformance();
  },
};
</script>