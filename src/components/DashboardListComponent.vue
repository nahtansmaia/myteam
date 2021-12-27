<template>
  <v-container>
    <v-card>
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
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
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
    desserts: [
      {
        id: "",
        analyst: {
          id: "",
          name: "name",
          email: "analista.sup.shop",
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
        date: new Date().toLocaleDateString(),
        quantity: 17,
        goal: 18,
        hitGoal: true,
        closedOthers: 4,
        supervisor: {
          id: "",
          name: "Nome supervisor",
          active: false,
        },
        fiveStars: 15,
        fourStars: 2,
        threeStars: 0,
        twoStars: 0,
        oneStars: 0,
        firstContactResolution: 81,
        ratingPercentage: 93,
      },
      {
        id: "",
        analyst: {
          id: "",
          name: "name2",
          email: "analista2.sup.shop",
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
        date: new Date().toLocaleDateString(),
        quantity: 15,
        goal: 18,
        hitGoal: false,
        closedOthers: 3,
        supervisor: {
          id: "",
          name: "Nome supervisor 2",
          active: false,
        },
        fiveStars: 15,
        fourStars: 2,
        threeStars: 0,
        twoStars: 0,
        oneStars: 0,
        firstContactResolution: 81,
        ratingPercentage: 93,
      },
      {
        id: "",
        analyst: {
          id: "",
          name: "name 3",
          email: "analista3.sup.shop",
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
        date: new Date().toLocaleDateString(),
        quantity: 16,
        goal: 18,
        hitGoal: true,
        closedOthers: 4,
        supervisor: {
          id: "",
          name: "Nome supervisor",
          active: false,
        },
        fiveStars: 15,
        fourStars: 2,
        threeStars: 0,
        twoStars: 0,
        oneStars: 0,
        firstContactResolution: 81,
        ratingPercentage: 93,
      },
    ],
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