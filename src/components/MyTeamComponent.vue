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
        :items-per-page="15"
        :footer-props="{
          'items-per-page-text': 'Registros por página:',
          'items-per-page-all-text': 'Todos',
          'items-per-page-options': [15, 30, 50, -1],
        }"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="mr-2" @click="editItem(item)"> mdi-magnify </v-icon>
        </template>
        <template v-slot:no-data>
          <span>Ops! Não localizamos nenhum registro.</span>
          <v-spacer />
          <v-btn class="btnPrincipal" small @click="reaload">
            Recarregar
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog class="dialogAccount" v-model="dialog" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mb-2" v-bind="attrs" v-on="on"> Novo </v-btn>
      </template>
      <v-card>
        <h1 class="analyst">{{ editedItem.name }}</h1>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="editedItem.name"
              label="Nome"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="editedItem.email"
              label="Email"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headersPerformance"
          :items="performances"
          :search="searchPerformance"
          :items-per-page="3"
          hide-default-footer
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="mr-2" @click="editItem(item)"> mdi-magnify </v-icon>
          </template>
          <template v-slot:no-data>
            <span>Ops! Não localizamos nenhum registro.</span>
            <v-spacer />
            <v-btn class="btnPrincipal" small @click="reaload">
              Recarregar
            </v-btn>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btnPrincipal" text @click="dialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import anaystAxios from "../services/analyst.js";
import teamAxios from "../services/team.js";
import performanceAxios from "../services/performance.js";

export default {
  name: "DashboardListComponent",
  data: () => ({
    search: "",
    searchPerformance: "",
    headers: [
      {
        text: "Nome",
        align: "start",
        value: "name",
      },
      { text: "Email", value: "email" },
      { text: "Detalhe", value: "actions", sortable: false, align: "end" },
    ],
    headersPerformance: [
      {
        text: "Data",
        align: "start",
        value: "date",
      },
      { text: "Resolução 1º", value: "firstContactResolution", align: "end" },
      { text: "Meta", value: "goal", align: "end" },
      { text: "Quantidade", value: "quantity", align: "end" },
      { text: "Encerrado de outros", value: "closedOthers", align: "end" },
      { text: "5 estrelas", value: "fiveStars", align: "end" },
      { text: "4 estrelas", value: "fourStars", align: "end" },
      { text: "3 estrelas", value: "threeStars", align: "end" },
      { text: "2 estrelas", value: "twoStars", align: "end" },
      { text: "1 estrela", value: "oneStars", align: "end" },
      { text: "%", value: "ratingPercentage", align: "center" },
    ],
    desserts: [],
    performances: [],
    team: {},
    user: {},
    editedIndex: -1,
    editedItem: {
      name: "",
      sector: "",
      active: true,
    },
    dialog: false,
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.getPerformance();
      this.dialog = true;
    },
    getAnalysts(teamId) {
      anaystAxios
        .getAnalystWithTeam(teamId)
        .then((response) => {
          this.desserts = response.data;
          console.log(this.desserts[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getPerformance() {
      performanceAxios.ListPerformances().then((response) => {
        this.performances = response.data;
        console.log(this.performances);
      });
    },
    async getTeam() {
      await teamAxios
        .getTeamWithName("Equipe de " + this.user.name)
        .then((response) => {
          this.team = JSON.parse(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async reaload() {
      this.user = JSON.parse(localStorage.getItem("user"));
      await this.getTeam();

      this.getAnalysts(this.team.id);
    },
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    await this.getTeam();

    this.getAnalysts(this.team.id);
  },
};
</script>

<style lang="scss" scoped>
.analyst {
  color: var(--featured-lighter) !important;
}
.v-card {
  padding-left: 5px;
  padding-right: 5px;
}
</style>